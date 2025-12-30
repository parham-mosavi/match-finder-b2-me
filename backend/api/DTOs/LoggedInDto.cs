namespace api.DTOs;

public record LoggedInDto(
    string UserName,
    int Age,
    string City,
    string? ProfilePhotoUrl,
    string Token
);