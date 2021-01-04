using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class GetCommentQA
    {
        public List<CommentQuestionDTO> CommentQuestions { get; set; }
        public List<CommentAnswerDTO> CommentAnswers { get; set; }
        public List<UserDTO> CommentQuestionsUser { get; set; }
        public List<UserDTO> CommentAnswersUser { get; set; }
        public GetCommentQA()
        {
            CommentAnswers = new List<CommentAnswerDTO>();
            CommentQuestions = new List<CommentQuestionDTO>();
            CommentQuestionsUser = new List<UserDTO>();
            CommentAnswersUser = new List<UserDTO>();
        }
    }
}
