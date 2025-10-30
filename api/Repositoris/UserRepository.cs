namespace api.Repositoris;

public class UserRepository : IUserRepository
{
    #region dependency injections
    // constructor - dependency injections
    private readonly IMongoCollection<AppUser> _collection;
    private readonly ITokenService _tokenService;
    public UserRepository(IMongoClient client, IMongoDbSettings dbSettings, ITokenService tokenService)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<AppUser>("users");

        _tokenService = tokenService;
    }
    #endregion

    public async Task<MemberDto?> UpdateByIdAsync(string userId, AppUser userInput, CancellationToken cancellationToken)
    {
        AppUser? appUser = await _collection.Find(User => User.Id == userId).FirstOrDefaultAsync(cancellationToken);

        if (appUser is null)
            return null;

        UpdateDefinition<AppUser> updateDef = Builders<AppUser>.Update.
            Set(user => user.Email, userInput.Email.Trim().ToLower());

        await _collection.UpdateOneAsync(user => user.Id == userId, updateDef, null, cancellationToken);

        MemberDto memberDto = new(
            Email: appUser.Email,
            UserName: appUser.UserName,
            Age: appUser.Age,
            Gender: appUser.Gender,
            City: appUser.City,
            Country: appUser.Country
        );

        return memberDto;
    }
}