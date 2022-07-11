using Microsoft.EntityFrameworkCore;
using SimplePostsFeed.Models.DTO;

namespace SimplePostsFeed.Repository
{
    public class AppContext : DbContext
    {
        public AppContext (DbContextOptions<AppContext> options)
            : base(options)
        {
        }
        
        public DbSet<PostViewModelDto> Posts { get; set; }
        public DbSet<AccountViewModelDto> Accounts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PostViewModelDto>().ToTable("Post");
            modelBuilder.Entity<AccountViewModelDto>().ToTable("Account");
        }
    }
}
