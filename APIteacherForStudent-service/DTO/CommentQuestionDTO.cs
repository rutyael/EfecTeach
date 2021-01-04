using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class CommentQuestionDTO
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string CommentContant { get; set; }
        public int IdQuestion { get; set; }
        public System.DateTime QuestionDate { get; set; }
        public string OuestionTitle { get; set; }
        public System.DateTime date { get; set; }
    }
}
