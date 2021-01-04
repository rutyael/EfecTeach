using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DAL;

namespace BL.Convertion
{
    public class commentAnswerConvertion
    {
        public static CommentsAnswer ConvertToCommentAnswer(CommentAnswerDTO commentAnswerDTO)
        {
            CommentsAnswer commentAnswer = new CommentsAnswer();
            commentAnswer.CommentContant = commentAnswerDTO.CommentContant;
            commentAnswer.date = commentAnswerDTO.date;
            commentAnswer.IdAnswer = commentAnswerDTO.IdAnswer;
            commentAnswer.UserId = commentAnswerDTO.UserId;
            return commentAnswer;
        }
        public static CommentAnswerDTO ConvertToCommentAnswerDTO(CommentsAnswer commentAnswer)
        {
            User user = new User();
            Answer answer = new Answer();
            CommentAnswerDTO commentAnswerDTO = new CommentAnswerDTO();
            commentAnswerDTO.CommentContant = commentAnswer.CommentContant;
            commentAnswerDTO.date = commentAnswer.date;
            commentAnswerDTO.IdAnswer = commentAnswer.IdAnswer;
            commentAnswerDTO.UserId = commentAnswer.UserId;
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                user = db.Users.ToList().FirstOrDefault(u => u.UserId == commentAnswer.UserId);
                answer = db.Answers.ToList().FirstOrDefault(x => x.AnswerId == commentAnswer.IdAnswer);
            }
            commentAnswerDTO.UserName = user.UserName;
            commentAnswerDTO.AnswerContant = answer.AnswerContant;
            commentAnswerDTO.AnswerDate = answer.AnswerDate;
            return commentAnswerDTO;
        }
    }
}
