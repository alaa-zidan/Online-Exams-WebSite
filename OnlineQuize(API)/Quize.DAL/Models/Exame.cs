using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quize.DAL.Models
{
    public class Exame
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; }
        public virtual List<Questions>? Questions { get; set; } = new List<Questions>();
        public virtual List<ExameAttempt>? ExameAttempts { get; set; } = new List<ExameAttempt>();



    }
}
