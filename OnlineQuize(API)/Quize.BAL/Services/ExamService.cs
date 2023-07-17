using Quize.DAL.Models;
using Quize.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quize.BAL.Services
{
    public class ExamService : IExamService
    {
        private readonly IGenericRepository<Exame> IExamRepository;
        private readonly IQuestionsService questionsService;



        public ExamService(IGenericRepository<Exame> _IExamRepository, IQuestionsService _questionsService)
        {
            IExamRepository = _IExamRepository;
            questionsService = _questionsService;
        }
        public void Delete(int id)
        {
            var exam = IExamRepository.GetById(id);
            exam.IsDeleted = true;
            var qes = questionsService.GetAllQuestionOfExam(id);

            foreach (var q in qes)
            {
                q.IsDeleted = true;
                foreach (var item in q.Choices)
                {
                    item.IsDeleted = true;
                }
            }
            IExamRepository.Save();

        }

        public IEnumerable<Exame> GetAll()
        {
            return IExamRepository.GetAll().Where(e => e.IsDeleted == false);
        }

        public Exame GetById(int id)
        {
            return IExamRepository.GetById(id);

        }

        public Exame GetByIdAsNoTracking(int id)
        {
            return IExamRepository.GetByIdAsNoTracking(id);
        }

        public void Insert(Exame exam)
        {
            IExamRepository.Insert(exam);
            IExamRepository.Save();
        }

        public void Update(Exame exam)
        {
            IExamRepository.Update(exam);
            IExamRepository.Save();
        }
    }
}
