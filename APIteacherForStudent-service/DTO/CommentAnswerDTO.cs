using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class CommentAnswerDTO
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string CommentContant { get; set; }
        public int IdAnswer { get; set; }
        public string AnswerContant { get; set; }
        public System.DateTime AnswerDate { get; set; }
        public System.DateTime date { get; set; }
    }
}
