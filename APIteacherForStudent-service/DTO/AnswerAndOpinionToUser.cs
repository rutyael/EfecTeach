using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class AnswerAndOpinionToUser
    {
        public List<UserAnswerDTO> userAnswers { get; set; }
        public List<answerOpinionDTO> opinionAnswers { get; set; }
        public AnswerAndOpinionToUser()
        {
            userAnswers = new List<UserAnswerDTO>();
            opinionAnswers = new List<answerOpinionDTO>();
        }
    }
}
