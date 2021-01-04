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
        ///get all question
        [HttpGet]
        public QuestionsReturnDefalt GetQuestionDefalt(int index)
        {
            return QuestionService.getAllQuestionDefalt(index);
        }
        ///get question by id
        [HttpGet]
        public FullUserQuestion GetQuestion(int id)
        {
            return QuestionService.GetQuestionById(id);
        }
        ///pu question
        [HttpPut]
        public IHttpActionResult PutQuestion(QuestionsDTO question)
        {
            Boolean flag = QuestionService.putQuestion(question);
            if (flag == true)
                return Ok();
            else return BadRequest();
        }
        ///post question
        [HttpPost]
        public QuestionsDTO PostQuestion(QuestionsDTO question)
        {
            return QuestionService.PostQuestion(question);
        }
        ///get sorted question
        [HttpGet]
        public QuestionsReturnDefalt sort(string status, int idUser, string dataSort, bool ifNoAnswer, int numCallToQuestion, string Back)
        {
            return QuestionService.Sort(status, idUser, dataSort, ifNoAnswer, numCallToQuestion);
        }
        //search question
        [HttpGet]
        public List<QuestionSearch> Search(string searchQuestion, string questionLanguage)
        {
            return SearchService.Search(searchQuestion, questionLanguage);
        }
    }
}
