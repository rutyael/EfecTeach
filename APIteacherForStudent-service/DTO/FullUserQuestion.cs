using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class FullUserQuestion
    {
        public UserQuestionDTO userQuestion { get; set; }
        public List<CommentQuestionDTO> commentsQuestion { get; set; }
        public FullUserQuestion()
        {
            commentsQuestion = new List<CommentQuestionDTO>();
        }
    }
}
