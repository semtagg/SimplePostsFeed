using Microsoft.AspNetCore.Http;

namespace SimplePostsFeed.Extensions
{
    public static class RequestExtensions
    {
        public static string GetToken(this HttpRequest request)
        {
            return request.Headers["Authorization"].ToString();
        }
    }
}
