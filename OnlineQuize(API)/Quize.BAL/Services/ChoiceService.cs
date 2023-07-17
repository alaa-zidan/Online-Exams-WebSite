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
    public class ChoiceService:IChoicesServices
    {

        private readonly IGenericRepository<Choices> IChoiceRepository;
        public ChoiceService(IGenericRepository<Choices> IChoiceRepository)
        {
            this.IChoiceRepository = IChoiceRepository;
        }
        public void Delete(int id)
        {
            var choice = IChoiceRepository.GetById(id);
            choice.IsDeleted = true;
            IChoiceRepository.Save();

        }

        public IEnumerable<Choices> GetAll()
        {
            return IChoiceRepository.GetAll();
        }
        public IEnumerable<Choices> GetQuestionChoices(int id)
        {
            return IChoiceRepository.GetAll().Where(c => c.QuestionId ==id && c.IsDeleted==false);
        }

        public Choices GetById(int id)
        {
            return IChoiceRepository.GetById(id);
        }

        public Choices GetByIdAsNoTracking(int id)
        {
            return IChoiceRepository.GetByIdAsNoTracking(id);
        }


        public void Insert(Choices choices)
        {
            IChoiceRepository.Insert(choices);
            IChoiceRepository.Save();
        }

        public void Update(Choices choices)
        {
            IChoiceRepository.Update(choices);
            IChoiceRepository.Save();
        }
    }
}
