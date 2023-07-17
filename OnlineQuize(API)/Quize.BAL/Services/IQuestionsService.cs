using Quize.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quize.BAL.Services
{
    public interface IQuestionsService
    {
        IEnumerable<Questions> GetAll();
        Questions GetById(int id);
        IEnumerable<Questions> GetAllQuestionOfExam(int id);
        Questions GetByIdAsNoTracking(int id);
        void Insert(Questions questions);
        void Update(Questions questions);
        void Delete(int id);
    }
}
