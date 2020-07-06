using DTO;
using BL;
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
    public class QuestionController : ApiController
    {
        [HttpGet]
        public List<UserQuestionDTO> GetQuestions()
        {
            return QuestionService.GetAllQuestion();
        }
        [HttpGet]
        public UserQuestionDTO GetQuestion(int id)
        {
            return QuestionService.GetQuestionById(id);
        }
    }
}
