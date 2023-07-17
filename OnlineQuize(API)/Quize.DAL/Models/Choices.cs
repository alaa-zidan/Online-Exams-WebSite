using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Quize.DAL.Models
{
    public class Choices
    {
        public int Id { get; set; }
        public string Text { get; set; }
        [ForeignKey("Questions")]
        public int QuestionId { get; set; }

        public bool IsDeleted { get; set; }


        [JsonIgnore]
        public virtual Questions? Questions { get; set; }
    }
}
