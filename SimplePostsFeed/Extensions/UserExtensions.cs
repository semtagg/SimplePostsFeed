using System.Linq;
using System.Security.Claims;

namespace SimplePostsFeed.Extensions
{
    public static class UserExtensions
    {
        public static string GetUserName(this ClaimsPrincipal user)
        {
            return user.Claims.FirstOrDefault(c => c.Type == "_userName")?.Value;
        }
    }
}
