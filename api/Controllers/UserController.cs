namespace api.Controllers;

[Authorize]
public class UserController(IUserRepository userRepository) : BaseApiController
{
    [HttpPut("updatebyid")]
    public async Task<ActionResult<MemberDto>> UpdateById(AppUser userInput, CancellationToken cancellationToken)
    {
        string? userId = User.GetUserId();

        if (userId is null)
            return Unauthorized("login again");

        MemberDto? memberDto = await userRepository.UpdateByIdAsync(userId, userInput, cancellationToken);

        if (memberDto is null)
            return BadRequest("Operation failed");

        return memberDto;
    }
}