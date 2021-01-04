using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using DTO;
using BL;

namespace APIteacherForStudent.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class CommentQuestionController : ApiController
    {
        ///post comment for question
        [HttpPost]
        public CommentQuestionDTO PostCommentQuestion(CommentQuestionDTO comment)
        {
            return QuestionService.PostComment(comment);
        }

        //get comment question by id
        [HttpGet]
        public List<CommentQuestionDTO> GetCommentQuestionById(int idQuestion)
        {
            return QuestionService.GetCommentQuestionById(idQuestion);
        }
    }
}
