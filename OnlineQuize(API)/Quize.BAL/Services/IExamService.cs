using Quize.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quize.BAL.Services
{
    public interface IExamService
    {
        IEnumerable<Exame> GetAll();
        Exame GetById(int id);
        Exame GetByIdAsNoTracking(int id);
        void Insert(Exame exam);
        void Update(Exame exam);
        void Delete(int id);
    }
}
