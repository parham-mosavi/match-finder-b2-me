namespace api.Repositoris;

public class AccountRepository : IAccountRepository
{
    #region dependency injections
    private readonly IMongoCollection<AppUser> _collection;
    // constructor - dependency injections
    public AccountRepository(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<AppUser>("users");
    }
    #endregion

    public async Task<LoggedInDto?> RegisterAsync(AppUser userInput, CancellationToken cancellationToken)
    {
        AppUser user = await _collection.Find(doc
        => doc.Email == userInput.Email).FirstOrDefaultAsync(cancellationToken);

        if (user is not null)
            return null;


        await _collection.InsertOneAsync(userInput, null, cancellationToken);  ///////????????????????????????????????

        LoggedInDto loggedInDto = new LoggedInDto(
            UserName: userInput.UserName,
            Age: userInput.Age
        );

        return loggedInDto;
    }

    public async Task<LoggedInDto?> LoginAsync(LoginDto userInput, CancellationToken cancellationToken)
    {
        AppUser appUser = await _collection.Find(doc
        => doc.UserName == userInput.UserName && doc.Password == userInput.Password).FirstOrDefaultAsync(cancellationToken);

        if (appUser is null)
        {
            return null;
        }

        LoggedInDto loggedInRes = new LoggedInDto(
            UserName: appUser.UserName,
            Age: appUser.Age
        );

        return loggedInRes;
    }

    public async Task<DeleteResult?> DeleteByIdAsync(string userId, CancellationToken cancellationToken)
    {
        AppUser appUser = await _collection.Find(doc
         => doc.Id == userId).FirstOrDefaultAsync(cancellationToken);

        if (appUser is null)
            return null;

        return await _collection.DeleteOneAsync<AppUser>(Doc => Doc.Id == userId, cancellationToken); ///////?????????????????????
    }
}