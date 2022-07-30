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
        Task<PostViewModel[]> GetPostByUserId(string token);
        Task<PostViewModel> GetPostById(int id, string token);
        Task CreatePost(CreatePostViewModel post, string token);
        Task UpdatePost(UpdateViewModel post, string token);
        Task<PostViewModel> DeletePost(int id, string token);
    }
}
