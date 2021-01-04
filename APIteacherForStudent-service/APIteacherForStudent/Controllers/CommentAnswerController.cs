using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BL;
using DTO;

namespace APIteacherForStudent.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class CommentAnswerController : ApiController
    {
        //post comment answer
        [HttpPost]
        public CommentAnswerDTO PostCommentAnswer(CommentAnswerDTO comment)
        {
            return AnswerService.PostCommentAnswer(comment);
        }
        //get comment answer by id
        [HttpGet]
        public List<CommentAnswerDTO> GetCommentAnswerById(int idAnswer)
        {
            return AnswerService.GetCommentAnswerById(idAnswer);
        }
    }
}
