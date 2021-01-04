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
            newans.AnswerContant = ansdto.AnswerContant;
            newans.AnswerId = ansdto.AnswerId;
            newans.AnswerScoring = ansdto.AnswerScoring;
            newans.QuestionId = ansdto.QuestionId;
            newans.UserId = ansdto.UserId;
            newans.AnswerDate = ansdto.AnswerDate;
            return newans;
        }
        public static UserAnswerDTO ConvertToUserAnswerDTO(Answer ans)
        {
            UserAnswerDTO userAnswer = new UserAnswerDTO();
            Question question = new Question();
            Proffestion proffestion = new Proffestion();
            UserToClass userToClass = new UserToClass();
            ClassToSchool classToSchool = new ClassToSchool();
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                User reply = db.Users.ToList().FirstOrDefault(u => u.UserId == ans.UserId);
                if (reply != null)
                    userAnswer.Reply = userConvertion.ConvertToUserDto(reply);
                userAnswer.Answer = ConvertToDTO(ans);
                question = db.Questions.ToList().FirstOrDefault(x => x.QuestionId == userAnswer.Answer.QuestionId);
                proffestion = db.Proffestions.ToList().FirstOrDefault(x => x.ProffestionId == question.ProffestionId);
                userAnswer.ProffestionName = proffestion.ProffestionName;
                userToClass = db.UserToClasses.ToList().FirstOrDefault(x => x.idUser == userAnswer.Reply.UserId);
                classToSchool = db.ClassToSchools.ToList().FirstOrDefault(x => x.id == userToClass.idClass);
                userAnswer.className = classToSchool.className;
                userAnswer.idClass = classToSchool.id;
            }
            return userAnswer;
        }
        
    }
}

