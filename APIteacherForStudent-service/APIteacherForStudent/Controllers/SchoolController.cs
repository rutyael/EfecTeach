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
    public class SchoolController : ApiController
    {
        ///user classes join all classes
        [HttpGet]
        public List<ClassesJoinUserDTO> GetSchoolsJoinUser(int IdUser)
        {
            return SchoolService.GetSchoolJoinUser(IdUser);
        }
        ///update classes for user
        [HttpPut]
        [Route("api/School/PutClassesToUser")]
        public IHttpActionResult PutClasseToUser(List<UserToClassDTO> classes)
        {
            string mess = "";
            SchoolService.PutClasseToUser(classes, ref mess);
            if (mess == "")
                return Ok();
            return BadRequest(mess);
        }
        ///post a school
        [HttpPost]
        public SchoolsDTO PostSchool(SchoolsDTO school)
        {
            string massge = "";
            return SchoolService.postSchool(school, ref massge);
            //if (flag)
            //    return Ok();
            //return BadRequest(massge);
        }
        ///get school by secretary
        [HttpGet]
        public SchoolsDTO GetSchoolByIdSecretary(int IdSecretary)
        {
            SchoolsDTO schoolsDTO = new SchoolsDTO();
            schoolsDTO = SchoolService.getSchoolByIdSecretary(IdSecretary);
            return schoolsDTO;
        }
        ///put details of school
        [HttpPut]
        [Route("api/School/PutClassesToSchool")]
        public IHttpActionResult PutClassesToSchool(ApdateSchoolDTO Putschool)
        {
            string massge = "פעולת העדכון נכשלה, אנא נסה שוב";
            Boolean flag = SchoolService.putSchool(Putschool);
            if (flag == true)
                return Ok();
            else
                return BadRequest(massge);
        }


    }
}

