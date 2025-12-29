
namespace api.Repositoris;

public class UserRepository : IUserRepository
{
    #region dependency injections
    // constructor - dependency injections
    private readonly IMongoCollection<AppUser> _collection;
    private readonly ITokenService _tokenService;
    private readonly IPhotoService _photoService;
    private readonly ILogger<UserRepository> _logger;
    public UserRepository(IMongoClient client, IMongoDbSettings dbSettings, ITokenService tokenService, IPhotoService photoService, ILogger<UserRepository> logger)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<AppUser>("users");

        _tokenService = tokenService;
        _photoService = photoService;
        _logger = logger;
    }
    #endregion

    public async Task<AppUser?> GetByIdAsync(string userId, CancellationToken cancellationToken)
    {
        AppUser? appUser = await _collection.Find(doc => doc.Id == userId).FirstOrDefaultAsync(cancellationToken);

        return appUser is null ? null : appUser;
    }

    public async Task<MemberDto?> UpdateByIdAsync(string userId, AppUser userInput, CancellationToken cancellationToken)
    {
        AppUser? appUser = await _collection.Find(User => User.Id == userId).FirstOrDefaultAsync(cancellationToken);

        if (appUser is null)
            return null;

        UpdateDefinition<AppUser> updateDef = Builders<AppUser>.Update.
            Set(user => user.Email, userInput.Email.Trim().ToLower());

        await _collection.UpdateOneAsync(user => user.Id == userId, updateDef, null, cancellationToken);

        MemberDto memberDto = _Mappers.ConvertAppUserToMemberDto(appUser);

        return memberDto;
    }

    public async Task<Photo?> UploadPhotoAsync(IFormFile file, string userId, CancellationToken cancellationToken)
    {
        Photo photo;

        AppUser? appUser = await GetByIdAsync(userId, cancellationToken);

        if (appUser is null)
            return null;

        string[]? imageUrls = await _photoService.AddPhotoToDiskAsync(file, userId);

        if (imageUrls is not null)
        {
            photo = appUser.Photos.Count == 0
              ? _Mappers.ConvertPhotoUrlsToPhoto(imageUrls, true)
              : _Mappers.ConvertPhotoUrlsToPhoto(imageUrls, false);

            appUser.Photos.Add(photo);


            UpdateDefinition<AppUser> updatedUser = Builders<AppUser>.Update
                .Set(doc => doc.Photos, appUser.Photos);

            UpdateResult result = await _collection.UpdateOneAsync(doc => doc.Id == userId, updatedUser, null, cancellationToken);

            return result.ModifiedCount == 1 ? photo : null;
        }

        return null;
    }

    public async Task<UpdateResult?> SetMainPhotoAsync(string userId, string photoUrlIn, CancellationToken cancellationToken)
    {
        #region 
        FilterDefinition<AppUser>? filterOld = Builders<AppUser>.Filter
            .Where(appUser => appUser.Id == userId && appUser.Photos.Any<Photo>(photo => photo.IsMain == true));

        UpdateDefinition<AppUser>? updateOld = Builders<AppUser>.Update
            .Set(appUser => appUser.Photos.FirstMatchingElement().IsMain, false);

        await _collection.UpdateOneAsync(filterOld, updateOld, null, cancellationToken);
        #endregion

        #region 
        FilterDefinition<AppUser> filterNew = Builders<AppUser>.Filter
            .Where(appUser => appUser.Id == userId && appUser.Photos.Any<Photo>(photo => photo.Url_165 == photoUrlIn));

        UpdateDefinition<AppUser>? updateNew = Builders<AppUser>.Update
            .Set(appUser => appUser.Photos.FirstMatchingElement().IsMain, true);

        return await _collection.UpdateOneAsync(filterNew, updateNew, null, cancellationToken);
        #endregion
    }

    public async Task<UpdateResult?> DeletePhotoAsync(string userId, string urlIn, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(urlIn)) return null;

        Photo photo = await _collection.AsQueryable()
        .Where(appUser => appUser.Id == userId)
        .SelectMany(appUser => appUser.Photos)
        .Where(photos => photos.Url_165 == urlIn)
        .FirstOrDefaultAsync(cancellationToken);

        if (photo is null) return null;

        if (photo.IsMain) return null;

        bool isDeleteSuccess = await _photoService.DeletePhotoFromDiskAsync(photo);
        if (!isDeleteSuccess)
        {
            _logger.LogError("Delete Photo form disk failed");

            return null;
        }

        UpdateDefinition<AppUser> updateDef = Builders<AppUser>.Update
            .PullFilter(appUser => appUser.Photos, photo => photo.Url_165 == urlIn);

        return await _collection.UpdateOneAsync(appUser => appUser.Id == userId, updateDef, null, cancellationToken);
    }
}