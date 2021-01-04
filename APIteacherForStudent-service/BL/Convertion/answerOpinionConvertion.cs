using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DAL;

namespace BL.Convertion
{
    public class AnswerOpinionConvertion
    {
        public static answerOpinion ConvertToAnswerOpinion(answerOpinionDTO answerOpinionDTO)
        {
            answerOpinion answer = new answerOpinion();
            answer.AnswerId = answerOpinionDTO.AnswerId;
            answer.comment = answerOpinionDTO.comment;
            answer.feedback = answerOpinionDTO.feedback;
            answer.id = answerOpinionDTO.id;
            answer.scoring = answerOpinionDTO.scoring;
            answer.teacherId = answerOpinionDTO.teacherId;
            return answer;
        }
        public static answerOpinionDTO ConvertToAnswerOpinionDTO(answerOpinion answerOpinion)
        {
            User user = new User();
            answerOpinionDTO answerOpinionDTO = new answerOpinionDTO();
            answerOpinionDTO.AnswerId = answerOpinion.AnswerId;
            answerOpinionDTO.comment = answerOpinion.comment;
            answerOpinionDTO.feedback = answerOpinion.feedback;
            answerOpinionDTO.id = answerOpinion.id;
            answerOpinionDTO.scoring = answerOpinion.scoring;
            answerOpinionDTO.teacherId = answerOpinion.teacherId;
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                db.Users.ToList().ForEach(x =>
                {
                    if (x.UserId == answerOpinionDTO.teacherId)
                        user = x;
                });
            }
            answerOpinionDTO.teacherMail = user.UserMail;
            answerOpinionDTO.teacherName = user.UserName;
            return answerOpinionDTO;
        }
    }
}
