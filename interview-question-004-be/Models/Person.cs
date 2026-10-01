using System.ComponentModel.DataAnnotations;

namespace Example.Interview.Models;

public enum Sex
{
    Male,
    Female
}

public sealed class Person : IValidatableObject
{
    [Required, MaxLength(100)]
    public string FirstName { get; set; } = "";

    [Required, MaxLength(100)]
    public string LastName { get; set; } = "";

    [Key, Required, EmailAddress, MaxLength(255)]
    public string Email { get; set; } = "";

    [Required, RegularExpression(@"^[0-9]{9,10}$", ErrorMessage = "Phone must contain 9-10 digits.")]
    public string Phone { get; set; } = "";

    [Required, MaxLength(2_800_000)]
    public string Profile { get; set; } = "";

    [Required]
    public DateOnly? BirthDate { get; set; }

    [Required, MaxLength(100)]
    public string Occupation { get; set; } = "";

    [Required, EnumDataType(typeof(Sex))]
    public Sex? Sex { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (BirthDate > DateOnly.FromDateTime(DateTime.Today))
            yield return new ValidationResult("Birth date cannot be in the future.", [nameof(BirthDate)]);

        if (string.IsNullOrEmpty(Profile)) yield break;

        var isValidBase64 = true;
        try
        {
            Convert.FromBase64String(Profile);
        }
        catch (FormatException)
        {
            isValidBase64 = false;
        }

        if (!isValidBase64)
            yield return new ValidationResult("Profile must be a valid Base64 image.", [nameof(Profile)]);
    }
}
