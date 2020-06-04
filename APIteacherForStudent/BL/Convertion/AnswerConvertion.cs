using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DAL;

namespace BL.Convertion
{
    public class AnswerConvertion
    {
        public static AnswerDTO ConvertToDTO(Answer ans)
        {
            AnswerDTO newans = new AnswerDTO();
            newans.AnswerContant = ans.AnswerContant;
            newans.AnswerId = ans.AnswerId;
            newans.AnswerScoring = ans.AnswerScoring;
            newans.QuestionId = ans.QuestionId;
            newans.UserId = ans.UserId;
            return newans;
        }
        public static Answer ConvertToAnswer(AnswerDTO ansdto)
        {
            Answer newans = new Answer();
            newans.AnswerContant = newans.AnswerContant;
            newans.AnswerId = newans.AnswerId;
            newans.AnswerScoring = newans.AnswerScoring;
            newans.QuestionId = newans.QuestionId;
            newans.UserId = newans.UserId;
            return newans;
        }
    }
}
