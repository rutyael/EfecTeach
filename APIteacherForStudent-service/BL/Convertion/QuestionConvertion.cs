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
        public static QuestionsDTO ConvertToQuestionDTO(Question question)
        {
            QuestionsDTO newQuestion = new QuestionsDTO();
            newQuestion.OuestionTitle = question.OuestionTitle;
            newQuestion.ProffestionId = question.ProffestionId;
            newQuestion.QuestionContent = question.QuestionContent;
            newQuestion.QuestionId = question.QuestionId;
            newQuestion.UserId = question.UserId;
            newQuestion.QuestionDate = question.QuestionDate;
            newQuestion.QuestionView = question.QuestionView;
            newQuestion.NumQuestioners = question.NumQuestioners;
            return newQuestion;
        }
        public static Question ConvertToQustion(QuestionsDTO questionDTO)
        {
            Question newQuestion = new Question();
            newQuestion.OuestionTitle = questionDTO.OuestionTitle;
            newQuestion.ProffestionId = questionDTO.ProffestionId;
            newQuestion.QuestionContent = questionDTO.QuestionContent;
            newQuestion.QuestionId = questionDTO.QuestionId;
            newQuestion.QuestionDate = questionDTO.QuestionDate;
            newQuestion.QuestionView = questionDTO.QuestionView;
            newQuestion.UserId = questionDTO.UserId;
            newQuestion.NumQuestioners = questionDTO.NumQuestioners;
            return newQuestion;
        }
        public static UserQuestionDTO ConvertToUserQuestionDTO(Question question)
        {
            float everg = 0;
            int sum = 0;
            int numQ = 0;
            List<int> ImportantQ = new List<int>();
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                UserQuestionDTO userQuestion = new UserQuestionDTO();
                userQuestion.OuestionTitle = question.OuestionTitle;
                userQuestion.QuestionId = question.QuestionId;
                userQuestion.QuestionContent = question.QuestionContent;
                userQuestion.QuestionDate = question.QuestionDate;
                userQuestion.QuestionView = question.QuestionView;
                userQuestion.NumQuestioners = question.NumQuestioners;
                userQuestion.ProffestionName = (db.Proffestions.FirstOrDefault(p => p.ProffestionId == question.ProffestionId)).ProffestionName;
                User user = db.Users.FirstOrDefault(u => u.UserId == question.UserId);
                userQuestion.UserKind = user.UserKind;
                userQuestion.UserMail = user.UserMail;
                userQuestion.UserName = user.UserName;
                userQuestion.UserId = user.UserId;
                userQuestion.numAnswers = question.Answers.ToArray().Length;
                numQ = question.QuestionView;
                numQ = numQ + question.NumQuestioners;
                numQ = numQ + question.Answers.ToArray().Length;
                numQ = numQ + question.CommentsQuestions.ToArray().Length;
                db.Questions.ToList().ForEach(q =>
                {
                    int num = 0;
                    num = q.QuestionView;
                    num = num + q.Answers.ToArray().Length;
                    num = num + q.NumQuestioners;
                    num = num + q.CommentsQuestions.ToArray().Length;
                    ImportantQ.Add(num);
                });
                ImportantQ.ToList().ForEach(iq => sum = sum + iq);
                everg = sum / (db.Questions.ToArray().Length);
                if (numQ >= everg)
                    userQuestion.ifImportant = true;
                else userQuestion.ifImportant = false;
                return userQuestion;
            }
        }
        public static UserQuestionDTO ConvertFromSortProcedureToUserQuestionDTO(SortByStudentProffestions_Result s_b_s_p)
        {
            Question question = new Question();
            UserQuestionDTO userQuestion = new UserQuestionDTO();
            userQuestion.NumQuestioners = s_b_s_p.NumQuestioners;
            userQuestion.OuestionTitle = s_b_s_p.OuestionTitle;
            userQuestion.ProffestionName = s_b_s_p.ProffestionName;
            userQuestion.QuestionContent = s_b_s_p.QuestionContent;
            userQuestion.QuestionDate = s_b_s_p.QuestionDate;
            userQuestion.QuestionId = s_b_s_p.QuestionId;
            userQuestion.QuestionView = s_b_s_p.QuestionView;
            userQuestion.UserId = s_b_s_p.UserId;
            userQuestion.UserKind = s_b_s_p.UserKind;
            userQuestion.UserMail = s_b_s_p.UserMail;
            userQuestion.UserName = s_b_s_p.UserName;
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                question = db.Questions.ToList().FirstOrDefault(q => q.QuestionId == s_b_s_p.QuestionId);
                userQuestion.numAnswers = question.Answers.ToArray().Length;
            }
            return userQuestion;
        }
    }
}
