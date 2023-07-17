using Microsoft.EntityFrameworkCore;
using Quize.DAL.Models;
using Quize.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quize.BAL.Services
{
    public class QuestionService : IQuestionsService
    {
        private readonly IGenericRepository<Questions> IQuestionRepository;
        private readonly IChoicesServices choicesServices;
        public QuestionService(IGenericRepository<Questions> IQuestionRepository, IChoicesServices choicesServices)
        {
            this.IQuestionRepository = IQuestionRepository;
            this.choicesServices = choicesServices;
        }
        public void Delete(int id)
        {
            var qes = IQuestionRepository.GetById(id);
            qes.IsDeleted = true;
            var chocies = choicesServices.GetQuestionChoices(id);
            foreach (var item in chocies)
            {
                item.IsDeleted = true;
            }
            IQuestionRepository.Save();

        }

        public IEnumerable<Questions> GetAll()
        {
            return IQuestionRepository.GetAll();
        }

        public IEnumerable<Questions> GetAllQuestionOfExam(int id)
        {
            return IQuestionRepository.GetAll().Where(q => q.ExameID == id && q.IsDeleted == false)
                .Include(x => x.Choices.Where(c => c.IsDeleted == false));
        }
        public Questions GetById(int id)
        {
            return IQuestionRepository.GetById(id);
        }

        public Questions GetByIdAsNoTracking(int id)
        {
            return IQuestionRepository.GetByIdAsNoTracking(id);
        }

        public void Insert(Questions questions)
        {
            IQuestionRepository.Insert(questions);
            IQuestionRepository.Save();
        }

        public void Update(Questions questions)
        {
            IQuestionRepository.Update(questions);
            IQuestionRepository.Save();
        }
    }
}
