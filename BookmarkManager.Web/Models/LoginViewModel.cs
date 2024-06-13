using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace BookmarkManager.Web.Models
{
    public class LoginViewModel
    {
        public string Email { get; set; } 
        public string Password { get; set; }
    }
}
