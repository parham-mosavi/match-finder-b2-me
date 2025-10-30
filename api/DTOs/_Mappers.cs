using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs;

public static class _Mappers
{
    public static LoggedInDto ConvertAppUserToLoggedInDto(AppUser appUser, string tokenValue)
    {
        LoggedInDto loggedInDto = new LoggedInDto(
            UserName: appUser.UserName,
            Age: appUser.Age,
            Token: tokenValue
        );

        return loggedInDto;
    }

    public static MemberDto ConvertAppUserToMemberDto(AppUser appUser)
    {
        MemberDto memberDto = new MemberDto(
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
