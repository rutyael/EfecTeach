using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class questionAndAnswersToUser
    {
        public List<UserAnswerDTO> answersToQuestions { get; set; }
        public List<UserQuestionDTO> questions { get; set; }
        public questionAndAnswersToUser()
        {
            answersToQuestions = new List<UserAnswerDTO>();
            questions = new List<UserQuestionDTO>();
        }
    }
}
