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
    public class SecretaryController : ApiController
    {
        //post user
        [HttpPost]
        public IHttpActionResult PostUser(SecretaryDTO postSecretary)
        {
            string massge = "";
            SecretaryDTO addSecretary = userService.PostSecretary(postSecretary, ref massge);
            if (addSecretary != null)
                return Ok(addSecretary);
            if (massge != "")
                return BadRequest(massge);
            var error = new
            {
                message = "נסה במועד מאוחר יותר"
            };
            return Content(HttpStatusCode.BadRequest, error);

        }
    }
}
