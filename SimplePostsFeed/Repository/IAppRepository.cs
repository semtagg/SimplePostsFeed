using System.Threading.Tasks;
using SimplePostsFeed.Models;
using SimplePostsFeed.Models.DTO;

namespace SimplePostsFeed.Repository
{
    public interface IAppRepository
    {
        Task<AuthenticatedResponse> Register(AccountViewModel registerModel);
        Task<AuthenticatedResponse> Login(AccountViewModel loginModel);
        Task<AuthenticatedResponse> Refresh(TokenApiModel tokenApiModel);
        Task Revoke(string userName);
        Task<PostViewModel[]> GetAllPosts();
        Task<PostViewModel[]> GetPostByUserId(int userId);
        Task CreatePost(PostViewModel post, string token);
        Task UpdatePost(PostViewModel item);
        Task<PostViewModel> DeletePost(int id);
    }
}
