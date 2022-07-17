using AutoMapper;
using SimplePostsFeed.Models;
using SimplePostsFeed.Models.DTO;

namespace SimplePostsFeed.Services
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<PostViewModelDto, PostViewModel>();
            
            CreateMap<PostViewModel, PostViewModelDto>();

            CreateMap<AccountViewModelDto, AccountViewModel>();
            
            CreateMap<AccountViewModel, AccountViewModelDto>();
        }
    }

}
