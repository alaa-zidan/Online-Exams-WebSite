using Quize.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quize.BAL.Services
{
    public interface IUserService
    {
        IEnumerable<Users> GetAll();
        Users GetById(int id);
        Users GetByIdAsNoTracking(int id);
        void Insert(Users user);
        void Update(Users user);
        void Delete(int id);
    }
}
