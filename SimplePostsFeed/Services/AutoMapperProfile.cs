using AutoMapper;
using SimplePostsFeed.Models;
using SimplePostsFeed.Models.DTO;

namespace SimplePostsFeed.Services
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<PostViewModel, PostViewModelDto>().ReverseMap();
            CreateMap<CreatePostViewModel, PostViewModelDto>().ReverseMap();
            CreateMap<AccountViewModel, AccountViewModelDto>().ReverseMap();
        }
    }
}
