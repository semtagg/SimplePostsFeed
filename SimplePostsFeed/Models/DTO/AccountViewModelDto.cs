using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SimplePostsFeed.Models.DTO
{
    public class AccountViewModelDto
    {
        public int Id { get; set; }

        public string Nickname { get; set; }
    }
}
