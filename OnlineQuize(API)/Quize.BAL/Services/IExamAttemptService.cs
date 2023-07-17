using Quize.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quize.BAL.Services
{
    public interface IExamAttemptService
    {
        IEnumerable<ExameAttempt> GetAll();
        IEnumerable<ExameAttempt> GetAllByUserID(int UsersID);
        ExameAttempt GetById(int id);
        ExameAttempt GetByIdAsNoTracking(int id);
        void Insert(ExameAttempt exameAttempt);
        void Update(ExameAttempt exameAttempt);
        void Delete(int id);

    }
}
