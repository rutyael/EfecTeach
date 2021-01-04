using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DAL;

namespace BL.Convertion
{
    public class CommentQuestionConvertion
    {
        public static CommentsQuestion ConvertToCommentQuestion(CommentQuestionDTO commentQ_ADTO)
        {
            CommentsQuestion commentQ_A = new CommentsQuestion();
            commentQ_A.CommentContant = commentQ_ADTO.CommentContant;
            commentQ_A.date = commentQ_ADTO.date;
            commentQ_A.UserId = commentQ_ADTO.UserId;
            commentQ_A.IdQuestion = commentQ_ADTO.IdQuestion;
            return commentQ_A;
        }
        public static CommentQuestionDTO ConvertToCommentQ_ADTO(CommentsQuestion commentQ_A)
        {
            User user = new User();
            Question question = new Question();
            CommentQuestionDTO commentQ_ADTO = new CommentQuestionDTO();
            commentQ_ADTO.CommentContant = commentQ_A.CommentContant;
            commentQ_ADTO.date = commentQ_A.date;
            commentQ_ADTO.UserId = commentQ_A.UserId;
            commentQ_ADTO.IdQuestion = commentQ_A.IdQuestion;
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                user = db.Users.ToList().FirstOrDefault(u => u.UserId == commentQ_A.UserId);
                question = db.Questions.ToList().FirstOrDefault(x => x.QuestionId == commentQ_A.IdQuestion);
            }
            commentQ_ADTO.UserName = user.UserName;
            commentQ_ADTO.OuestionTitle = question.OuestionTitle;
            commentQ_ADTO.QuestionDate = question.QuestionDate;
            return commentQ_ADTO;
        }
    }
}
