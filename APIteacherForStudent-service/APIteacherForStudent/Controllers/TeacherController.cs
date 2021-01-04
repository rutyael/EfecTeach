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

    public class TeacherController : ApiController
    {
        ///get all teachers who create new relation to classes
        [HttpGet]
        public List<UserJoinClassToSetDTO> GetTeachersJoinClassesToSet(int SchoolId)
        {
            return TeacherService.GetTeachersJoinClassesToSet(SchoolId);
        }
        ///saved approveds for relationship between teacher and class 
        [HttpPut]
        public bool SetApprovedsForTeachersClasses(List<UserToClassDTO> ApprovedsToSet)
        {
            return TeacherService.PutClassesToTeacher(ApprovedsToSet);
        }
    }
}
