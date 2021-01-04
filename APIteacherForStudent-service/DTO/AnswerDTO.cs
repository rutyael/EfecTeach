using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class AnswerDTO
    {
        public int AnswerId { get; set; }
        public int QuestionId { get; set; }
        public int UserId { get; set; }
        public string AnswerContant { get; set; }
        public string AnswerScoring { get; set; }
        public System.DateTime AnswerDate { get; set; }    
    }
}
