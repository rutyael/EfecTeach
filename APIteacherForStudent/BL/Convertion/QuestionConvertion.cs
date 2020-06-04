using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;
namespace BL.Convertion
{
    public class QuestionConvertion
    {
        public static QuestionsDTO ConvertToDTO(Question question)
        {
            QuestionsDTO newQuestion = new QuestionsDTO();
            newQuestion.OuestionTitle = question.OuestionTitle;
            newQuestion.ProffestionId = question.ProffestionId;
            newQuestion.QuestionContent = question.QuestionContent;
            newQuestion.QuestionId = question.QuestionId;
            newQuestion.UserId = question.UserId;
            return newQuestion;
        }
        public static Question ConvertToQustion(QuestionsDTO questionDTO)
        {
            Question newQuestion = new Question();
            newQuestion.OuestionTitle = questionDTO.OuestionTitle;
            newQuestion.ProffestionId = questionDTO.ProffestionId;
            newQuestion.QuestionContent = questionDTO.QuestionContent;
            newQuestion.QuestionId = questionDTO.QuestionId;
            newQuestion.UserId = questionDTO.UserId;
            return newQuestion;
        }
        public static UserQuestionDTO ConvertToUserQuestionDTO(Question question)
        {
            using (TeacherForStudentEntities_ db = new TeacherForStudentEntities_())
            {
                UserQuestionDTO userQuestion = new UserQuestionDTO();
                userQuestion.OuestionTitle = question.OuestionTitle;
                userQuestion.QuestionContent = question.QuestionContent;
                userQuestion.ProffestionName = (db.Proffestions.FirstOrDefault(p => p.ProffestionId == question.ProffestionId)).ProffestionName;
                User user = db.Users.FirstOrDefault(u => u.UserId == question.UserId);
                userQuestion.UserKind = user.UserKind;
                userQuestion.UserMail = user.UserMail;
                userQuestion.UserName = user.UserName;
                return userQuestion;
            }

        }
    }
}
