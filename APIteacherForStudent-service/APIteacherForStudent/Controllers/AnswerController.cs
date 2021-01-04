using BL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace APIteacherForStudent.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class AnswerController : ApiController
    {
        ///post an answer
        [HttpPost]
        public IHttpActionResult PostAnswer([FromBody]AnswerDTO answerdto)
        {
            string messege = "פעולת ההוספה נכשלה, אנא נסה שנית";
            AnswerDTO answer = AnswerService.GetPostAnswer(answerdto);
            if (answer != null)
                return Ok(answer);
            return BadRequest(messege);
        }

        ///get answer for question
        [HttpGet]
        public List<FullUserAnswer> AnswersToQuestion(int idQuestion)
        {
            return AnswerService.GetAnswersForQuestion(idQuestion);
        }

        ///get students answers per teacher
        [HttpGet]
        public AnswerAndClassesToTeacher StudentAnswersAndClassesToTeacher(int ID)
        {
            return AnswerService.studentAnswersAndClassesToTeacher(ID);
        }

        //get answer by id
        [HttpGet]
        public FullUserAnswer GetAnswerById(int idAnswer)
        {
            return AnswerService.GetAnswerById(idAnswer);
        }

        //get comments question and answer to user
        [HttpGet]
        public GetCommentQA GetCommentsQA(int idUser)
        {
            return AnswerService.GetCommentsQA(idUser);
        }

    }
}
