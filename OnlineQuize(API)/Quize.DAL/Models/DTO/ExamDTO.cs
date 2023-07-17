using Quize.DAL.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quize.DAL.Models.DTO
{
    public class ExamDTO
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string CorrectAnswer { get; set; }
        public string SelectedValue { get; set; }

        public int ExamID { get; set; }

        public List<Choices> choices { get; set; } = new List<Choices>();
    }
}
