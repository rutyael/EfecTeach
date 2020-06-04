using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class AnswerDTO
    {
        public string AnswerId { get; set; }
        public string QuestionId { get; set; }
        public string UserId { get; set; }
        public string AnswerContant { get; set; }
        public string AnswerScoring { get; set; }
    }
}
