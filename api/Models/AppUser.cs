namespace api.Models;

public record AppUser(
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
    string Email,
    string UserName,
    string Password,
    string ConfirmPassword,
    int Age,
    string Gender,
    string City,
    string Country
);