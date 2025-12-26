
namespace api.Repositoris;

public class UserRepository : IUserRepository
{
    #region dependency injections
    // constructor - dependency injections
    private readonly IMongoCollection<AppUser> _collection;
    private readonly ITokenService _tokenService;
    private readonly IPhotoService _photoService;
    public UserRepository(IMongoClient client, IMongoDbSettings dbSettings, ITokenService tokenService, IPhotoService photoService)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<AppUser>("users");

        _tokenService = tokenService;
        _photoService = photoService;

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
}