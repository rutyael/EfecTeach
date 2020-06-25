using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class QuestionsDTO
    {
        public int QuestionId { get; set; }
        public string OuestionTitle { get; set; }
        public string QuestionContent { get; set; }
        public int UserId { get; set; }
        public int ProffestionId { get; set; }
    }
}
