using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace BL
{
    public class QuestionService
    {
        public static List<UserQuestionDTO> GetAllQuestion()
        {
            using (TeacherForStudentEntities1 db = new TeacherForStudentEntities1())
            {
                List<UserQuestionDTO> questions = new List<UserQuestionDTO>();
                db.Questions.ToList().ForEach(x =>
                {
                    if (x.Answers.Count() == 0)
                        questions.Add(Convertion.QuestionConvertion.ConvertToUserQuestionDTO(x));
                });
                return questions;
            }
        }
        public static UserQuestionDTO GetQuestionById(string id)
        {
            using (TeacherForStudentEntities1 db = new TeacherForStudentEntities1())
            {
                UserQuestionDTO question = new UserQuestionDTO();
                db.Questions.ToList().ForEach(x =>
                {
                    if (x.QuestionId == id)
                        question = Convertion.QuestionConvertion.ConvertToUserQuestionDTO(x);
                });
                return question;
            }
        }
    }
}
