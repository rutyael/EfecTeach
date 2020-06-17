using BL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Cors;
namespace APIteacherForStudent.Controllers
{
    public class UserController : ApiController
    {
        [HttpGet]
        [Route("api/UserController/getLogin")]
        public UserDTO getLogin(string id, string name)
        {
            return userService.Login(id, name);
        }
        [HttpPost]
        //[Route("APIteacherForStudent/UserController/AddUser")]
        public IHttpActionResult PostUser(UserDTO postuser)
        {
            UserDTO addUser = userService.GetPostUser(postuser);
            if (addUser != null)
                return Ok(addUser);
            else
                return BadRequest();
        }
        public UserDTO PutDetails(string id, UserDTO userDto)
        {
            return userService.Put(id, userDto);
        }
        [HttpGet]
        [Route("api/UserController/GetQuestions")]
        public List<UserQuestionDTO> GetQuestions()
        {
            return userService.GetAllQuestion();
        }
        public IHttpActionResult RemoveClassToTeacher( [FromBody]List<UserToClassDTO_> classes)
        {
            if (userService.PutRemovedClassToTeacher(classes))
                return Ok();
            return BadRequest();
        }
        public IHttpActionResult AddClassToTeacher([FromBody]List<UserToClassDTO_> classes)
        {
            if (userService.PutAddClassToTeacher(classes))
                return Ok();
            return BadRequest();

        }
        public IHttpActionResult RemoveProffetsionToTeacher(string id, List<ProffestionsDTO> proffestion)
        {
            bool flag = userService.PutRemoveProfestionToTeacher(id, proffestion);
            if (flag)
                return Ok();
            return BadRequest();
        }
        public  IHttpActionResult AddProffetsionToTeacher(string id, [FromBody]List<ProffestionsDTO> proffestion)
        {
            bool flag = userService.PutAddProfestionToTeacher(id, proffestion);
            if (flag)
                return Ok();
            return BadRequest();
        }
        public IHttpActionResult PostAnswer([FromBody]AnswerDTO answerdto)
        {
            AnswerDTO answer = userService.GetPostAnswer(answerdto);
            if (answer != null)
                return Ok(answer);
            return BadRequest();
        }
        public IHttpActionResult PostQuestion([FromBody]QuestionsDTO questiondto)
        {
            QuestionsDTO question = userService.GetPostQuestion(questiondto);
            if (question != null)
                return Ok();
            return BadRequest();
        }
    }
}

