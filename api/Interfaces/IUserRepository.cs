namespace api.Interfaces;

public interface IUserRepository
{
    public Task<MemberDto?> UpdateByIdAsync(string userId, AppUser userInput, CancellationToken cancellationToken);
}