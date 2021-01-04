using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class FullUserAnswer
    {
        public UserAnswerDTO userAnswer { get; set; }
        public List<CommentAnswerDTO> commentsAnswer { get; set; }
        public int PopularAnswer { get; set; }
        public int EfectiveAnswer { get; set; }
        public FullUserAnswer()
        {
            commentsAnswer = new List<CommentAnswerDTO>();
        }
    }
}
