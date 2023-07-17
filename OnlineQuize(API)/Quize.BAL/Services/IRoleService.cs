using Quize.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quize.BAL.Services
{
    public interface IRoleService
    {
        IEnumerable<Role> GetAll();
        Role GetById(int id);
        Role GetByIdAsNoTracking(int id);
        void Insert(Role role);
        void Update(Role role);
        void Delete(int id);
    }
}
