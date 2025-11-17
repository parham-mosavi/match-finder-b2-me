namespace api.Controllers;

[Authorize]
public class MemberController(IMemberRepository memberRepository) : BaseApiController
{
    [HttpGet("getall")]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetAll(CancellationToken cancellationToken)
    {
        IEnumerable<AppUser>? appUser = await memberRepository.GetAllAsync(cancellationToken);

        if (appUser is null)
            return NoContent();

        List<MemberDto> memberDtos = [];

        foreach (AppUser user in appUser)
        {
            MemberDto memberDto = _Mappers.ConvertAppUserToMemberDto(user);

            memberDtos.Add(memberDto);
        }
        return memberDtos;
    }

    [HttpGet("get-by-username/{userName}")]
    public async Task<ActionResult<MemberDto>> GetByUserName(string userName, CancellationToken cancellationToken)
    {
        MemberDto? memberDto = await memberRepository.GetByUserNameAsync(userName, cancellationToken);

        if (memberDto is null)
            return BadRequest("User not found");

        return memberDto;
    }
}