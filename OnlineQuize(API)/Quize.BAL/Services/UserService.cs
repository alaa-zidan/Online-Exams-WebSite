using Microsoft.EntityFrameworkCore;
using Quize.DAL.Models;
using Quize.DAL.Repositories;

namespace Quize.BAL.Services
{
    public class UserService : IUserService
    {
        private readonly IGenericRepository<Users> IUserRepository;
        public UserService(IGenericRepository<Users> IUserRepository)
        {
            this.IUserRepository = IUserRepository;
        }
        public void Delete(int id)
        {
            IUserRepository.Delete(id);
            IUserRepository.Save();

        }

        public IEnumerable<Users> GetAll()
        {
            return IUserRepository.GetAll().Include(u=>u.role);
        }

        public Users GetById(int id)
        {
            return IUserRepository.GetById(id);
        }

        public Users GetByIdAsNoTracking(int id)
        {
            return IUserRepository.GetByIdAsNoTracking(id);
        }

        public void Insert(Users user)
        {
            IUserRepository.Insert(user);
            IUserRepository.Save();
        }

        public void Update(Users user)
        {
            IUserRepository.Update(user);
            IUserRepository.Save();
        }
    }
}
