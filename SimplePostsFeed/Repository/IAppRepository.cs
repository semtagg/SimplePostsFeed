using System.Threading.Tasks;
using SimplePostsFeed.Models;
using SimplePostsFeed.Models.DTO;

namespace SimplePostsFeed.Repository
{
    public interface IAppRepository
    {
        Task<AuthenticatedResponse> Login(AccountViewModelDto loginModel);
        Task<AuthenticatedResponse> Refresh(TokenApiModel tokenApiModel);
        Task Revoke(string userName);
        Task<PostViewModelDto[]> GetAllPosts();
        Task<PostViewModelDto[]> GetPostByUserId(int userId);
        Task CreatePost(PostViewModelDto item);
        Task UpdatePost(PostViewModelDto item);
        Task<PostViewModelDto> DeletePost(int id);
    }
}
