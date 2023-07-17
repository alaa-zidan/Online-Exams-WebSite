using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quize.DAL.Models
{
    public class Users
    {
        public int Id { get; set; }
        [MinLength(3)]
        public string Name { get; set; }
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public bool IsDeleted { get; set; }
        [ForeignKey("role")]
        public int RoleId { set; get; }

        public virtual Role? role { set; get; }
        public virtual List<ExameAttempt>? ExameAttempts { get; set; } = new List<ExameAttempt>();


    }
}
