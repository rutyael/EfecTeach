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
    [EnableCors(origins: "http://localhost:4200/*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        [HttpGet]
       // [Route("api/UserController/getLogin")]
        public UserDTO getLogin(string password, string name)
        {
            UserDTO u= userService.Login(password, name);
            return u;
        }
        ///[HttpPost("people/create")]
        public IHttpActionResult PostUser(UserDTO postuser)
        {
            UserDTO addUser = userService.GetPostUser(postuser);
            if (addUser != null)
                return Ok(addUser);
            else
                return BadRequest();
        }
        //public UserDTO PutDetails(int id, UserDTO userDto)
        //{
        //    return userService.Put(id, userDto);
        //}
        //public IHttpActionResult RemoveClassToTeacher( [FromBody]List<UserToClassDTO_> classes)
        //{
        //    if (userService.PutRemovedClassToTeacher(classes))
        //        return Ok();
        //    return BadRequest();
        //}
        //public IHttpActionResult AddClassToTeacher([FromBody]List<UserToClassDTO_> classes)
        //{
        //    if (userService.PutAddClassToTeacher(classes))
        //        return Ok();
        //    return BadRequest();

        //}
        //public IHttpActionResult RemoveProffetsionToTeacher(int id, List<ProffestionsDTO> proffestion)
        //{
        //    bool flag = userService.PutRemoveProfestionToTeacher(id, proffestion);
        //    if (flag)
        //        return Ok();
        //    return BadRequest();
        //}
        //public IHttpActionResult AddProffetsionToTeacher(int id, [FromBody]List<ProffestionsDTO> proffestion)
        //{
        //    bool flag = userService.PutAddProfestionToTeacher(id, proffestion);
        //    if (flag)
        //        return Ok();
        //    return BadRequest();
        //}
        //public IHttpActionResult PostAnswer([FromBody]AnswerDTO answerdto)
        //{
        //    AnswerDTO answer = userService.GetPostAnswer(answerdto);
        //    if (answer != null)
        //        return Ok(answer);
        //    return BadRequest();
        //}
        //public IHttpActionResult PostQuestion([FromBody]QuestionsDTO questiondto)
        //{
        //    QuestionsDTO question = userService.GetPostQuestion(questiondto);
        //    if (question != null)
        //        return Ok();
        //    return BadRequest();
        //}
    }
}

