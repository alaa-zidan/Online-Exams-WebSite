using Quize.DAL.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quize.DAL.Models
{
    public class Role
    {
        public int Id { get; set; }
        [EnumDataType(typeof(UserRoleEnum), ErrorMessage = "Invalid Input")]
        public string Name { get; set; }
        public virtual List<Users>? instructor { get; set; } = new List<Users>();
    }
}
