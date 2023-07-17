using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quize.DAL.Models
{
    public class Questions
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string CorrectAnswer { get; set; }
        [ForeignKey("Exame")]
        public int  ExameID { get; set; }
        public virtual Exame? Exame { get; set; }
        public virtual List<Choices>? Choices { get; set; }

        public bool IsDeleted { get; set; }


    }
}
