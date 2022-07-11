using System.Threading.Tasks;
using SimplePostsFeed.Models.DTO;

namespace SimplePostsFeed.Repository
{
    public interface IAppRepository
    {
        Task<PostViewModelDto[]> GetAllPosts();
        Task<PostViewModelDto[]> GetPostByUserId(int userId);
        Task CreatePost(PostViewModelDto item);
        Task UpdatePost(PostViewModelDto item);
        Task<PostViewModelDto> Delete(int id);
    }
}
