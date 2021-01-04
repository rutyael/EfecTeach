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

    public class StudentController : ApiController
    {
        //get student join class to set
        [HttpGet]
        public List<UserJoinClassToSetDTO> GetStudenstJoinClassToSet(int SchoolId)
        {
            return StudentService.GetStudentsJoinClassesToSet(SchoolId);
        }

        //put classes to teacher
        [HttpPut]
        public bool PutClassesToStudent(List<UserToClassDTO> classes)
        {
            return StudentService.PutClassesToStudent(classes);
        }
    }
}
