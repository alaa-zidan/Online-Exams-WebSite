using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quize.DAL.Models.DTO
{
    public class SignUpDTO
    {
        public string Name { set; get; }
        public string Email { set; get; }
        public string password { set; get; }
    }
}
