using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace DTO
{
    public class UserQuestionDTO
    {
        public int QuestionId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserKind { get; set; }
        public string UserMail { get; set; }
        public string OuestionTitle { get; set; }
        public string QuestionContent { get; set; }
        public string ProffestionName { get; set; }
        public System.DateTime QuestionDate { get; set; }
        public Int16 QuestionView { get; set; }
    }
}
