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
    public class ProffestionController : ApiController
    {
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        [HttpGet]
        public List<ProffestionsDTO> GetProffestion()
        {
            return ProffestionService.GetAllProffestion();
        }
        [HttpGet]
        public  ProffestionsDTO GetById(int id)
        {
            return ProffestionService.GetProffestion(id);
        }
    }
}
