using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegistrationDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 8, ErrorMessage ="You must be specifay password between 8 and 10")]
        public string Password { get; set; }
    }
}
