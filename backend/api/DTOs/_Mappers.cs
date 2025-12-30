using api.Extensions;

namespace api.DTOs;

public static class _Mappers
{

    public static AppUser ConvertRegisterDtoToAppUser(RegisterDto registerDto)
    {
        AppUser appUser = new AppUser(
           Email: registerDto.Email,
           UserName: registerDto.UserName,
           Password: registerDto.Password,
           ConfirmPassword: registerDto.ConfirmPassword,
           DateOfBirth: registerDto.DateOfBirth,
           Gender: registerDto.Gender, // ""
           Introduction: string.Empty,
           LookingFor: string.Empty,
           Interests: string.Empty,
           City: string.Empty,
           Country: string.Empty,
           Photos: []
       );

        return appUser;
    }

    public static LoggedInDto ConvertAppUserToLoggedInDto(AppUser appUser, string tokenValue)
    {
        LoggedInDto loggedInDto = new LoggedInDto(
            UserName: appUser.UserName,
            Age: DateTimeExtensions.CalculateAge(appUser.DateOfBirth),
            City: appUser.City,
            ProfilePhotoUrl: appUser.Photos.FirstOrDefault(photo => photo.IsMain)?.Url_165,
            Token: tokenValue
        );

        return loggedInDto;
    }

    public static MemberDto ConvertAppUserToMemberDto(AppUser appUser)
    {
        MemberDto memberDto = new MemberDto(
            Email: appUser.Email,
            UserName: appUser.UserName,
            Age: DateTimeExtensions.CalculateAge(appUser.DateOfBirth),
            Gender: appUser.Gender,
            Photos: appUser.Photos,
            City: appUser.City,
            Country: appUser.Country
        );

        return memberDto;
    }

    public static Photo ConvertPhotoUrlsToPhoto(string[] photoUrls, bool isMain)
    {
        Photo photo = new Photo(
            Url_165: photoUrls[0],
            Url_256: photoUrls[1],
            Url_enlarged: photoUrls[2],
            IsMain: isMain
        );

        return photo;
    }
};