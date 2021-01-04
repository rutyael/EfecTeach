using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class QuestionsReturnDefalt
    {
        public List<UserQuestionDTO> QuestionsDefalt { get; set; }
        public int NumQuestions { get; set; }
        public QuestionsReturnDefalt()
        {
            QuestionsDefalt = new List<UserQuestionDTO>();
        }
    }
}
