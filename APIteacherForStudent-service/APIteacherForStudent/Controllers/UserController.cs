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
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        public System.Web.SessionState.HttpSessionState Session { get; }

        ///get user by username and password
        [HttpGet]
        public UserReturn getLogin(string password, string name)
        {
            UserReturn userReturn = new UserReturn();
            //var message = "משתמש זה אינו קיים במערכת, בדוק את שם המשתמש והסיסמא ונסה שוב";
            UserDTO user = userService.Login(password, name);
            if (user != null)
            {
                userReturn.user = user;
                userReturn.ifISecretary = false;
            }
            else
            {
                SecretaryDTO secretary = userService.LoginSecretary(password, name);
                if (secretary != null)
                {
                    userReturn.secretary = secretary;
                    userReturn.ifISecretary = true;
                }
                else
                    return null;
            }
           // Session["CurrentUser"] = userReturn;
            return userReturn;
            //return Content(HttpStatusCode.BadRequest, error);
        }

        ///post a user
        [HttpPost]
        public IHttpActionResult PostUser(UserDTO postuser)
        {
            string massge = "";
            UserDTO addUser = userService.GetPostUser(postuser, ref massge);
            if (addUser != null)
                return Ok(addUser);
            if (massge != "")
                return BadRequest(massge);
            var error = new
            {
                message = "נסה במועד מאוחר יותר"
            };
            return Content(HttpStatusCode.BadRequest, error);
        }

        ///update details user
        [HttpPut]
        public IHttpActionResult PutPasswordUser(NewPasswordUser newPasswordUser)
        {
            if (userService.PutPasswordUser(newPasswordUser) == true)
                return Ok("השינוי עודכן בהצלחה");
            else
                return BadRequest("הפעולה נכשלה, אנא נסה שוב");
        }
    }
}

