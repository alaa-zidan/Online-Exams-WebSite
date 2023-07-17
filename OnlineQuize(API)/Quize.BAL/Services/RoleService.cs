using Quize.DAL.Models;
using Quize.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quize.BAL.Services
{
    public class RoleService : IRoleService
    {
        private readonly IGenericRepository<Role> IRoleRepository;
        public RoleService(IGenericRepository<Role> IRoleRepository)
        {
            this.IRoleRepository = IRoleRepository;
        }
        public void Delete(int id)
        {
            IRoleRepository.Delete(id);
            IRoleRepository.Save();

        }

        public IEnumerable<Role> GetAll()
        {
            return IRoleRepository.GetAll();
        }

        public Role GetById(int id)
        {
            return IRoleRepository.GetById(id);
        }

        public Role GetByIdAsNoTracking(int id)
        {
            return IRoleRepository.GetByIdAsNoTracking(id);
        }

        public void Insert(Role role)
        {
            IRoleRepository.Insert(role);
            IRoleRepository.Save();
        }

        public void Update(Role role)
        {
            IRoleRepository.Update(role);
            IRoleRepository.Save();
        }
    }
}
