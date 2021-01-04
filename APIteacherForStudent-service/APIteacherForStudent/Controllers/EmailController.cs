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
    public class EmailController : ApiController
    {
        //send email to user
        [HttpGet]
        public void sendEmail(string email,UserDTO user)
        {
            EmailService.SendMail(email,user);
        }
    }
}
