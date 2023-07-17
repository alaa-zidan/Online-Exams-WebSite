using Quize.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quize.BAL.Services
{
    public interface IChoicesServices
    {
        IEnumerable<Choices> GetAll();
        IEnumerable<Choices> GetQuestionChoices(int id);
        Choices GetById(int id);
        Choices GetByIdAsNoTracking(int id);
        void Insert(Choices choices);
        void Update(Choices choices);
        void Delete(int id);
    }
}
