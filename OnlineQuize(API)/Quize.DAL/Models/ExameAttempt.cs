using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quize.DAL.Models
{
    public class ExameAttempt
    {
        public int ID { get; set; }
        [ForeignKey("User")]
        public int UserID { get; set; }
        [ForeignKey("Exame")]
        public int ExameID { get; set; }
        public virtual Exame? Exame { get; set; }
        public virtual Users? User { get; set; }
        public int Score { get; set; }

        public int HighScore { get; set; }
    }
}
