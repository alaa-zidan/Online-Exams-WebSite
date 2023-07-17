using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quize.DAL.Models.DTO
{
    public class ExamAttempDTO
    {
        public string UserName { get; set; }
        public string ExamName { get; set; }
        public int Grade { get; set; }
        public int HighGrade { get; set; }
    }
}
