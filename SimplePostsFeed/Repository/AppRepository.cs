using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SimplePostsFeed.Models.DTO;

namespace SimplePostsFeed.Repository
{
    public class AppRepository : IAppRepository
    {
        private readonly AppContext _context;

        public AppRepository(AppContext context)
        {
            _context = context;
        }
        
        public async Task<PostViewModelDto[]> GetAllPosts()
        {
            return await _context.Posts.ToArrayAsync();
        }

        public async Task<PostViewModelDto[]> GetPostByUserId(int userId)
        {
            return await _context.Posts
                .Where(p => p.UserId == userId)
                .ToArrayAsync();
        }

        public async Task CreatePost(PostViewModelDto item)
        {
            await _context.Posts.AddAsync(item);
            await _context.SaveChangesAsync();
        }

        public Task UpdatePost(PostViewModelDto item)
        {
            throw new System.NotImplementedException();
        }

        public async Task<PostViewModelDto> Delete(int id)
        {
            var item = await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);

            if (item != null)
            {
                _context.Posts.Remove(item);
                await _context.SaveChangesAsync();
            }

            return item;
        }
    }
}
