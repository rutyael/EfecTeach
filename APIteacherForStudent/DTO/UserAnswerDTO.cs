using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class UserAnswerDTO
    {
        public string UserName { get; set; }
        public string UserKind { get; set; }
        public string UserMail { get; set; }
        public string AnswerContant { get; set; }
        public string AnswerScoring { get; set; }
        public System.DateTime AnswerDate { get; set; }

    }
}
