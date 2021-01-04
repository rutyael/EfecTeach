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
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class ProffestionController : ApiController
    {
        ///get all proffestions
        [HttpGet]
        public List<ProffestionsDTO> GetProffestion()
        {
            return ProffestionService.GetAllProffestion();
        }
        ///get proffestion by id
        [HttpGet]
        public ProffestionsDTO GetById(int id)
        {
            return ProffestionService.GetProffestion(id);
        }
        ///get teachers proffestion
        [HttpGet]
        public List<ProffestionJoinTeacherDTO> GetProffestionJoinTeacher(int TeacherId)
        {
            return ProffestionService.GetProffestionJoinTeacher(TeacherId);
        }
        ///update proffestion for teacher
        [HttpPut]
        public IHttpActionResult PutProffestionToTeacher(List<ProffestionJoinTeacherDTO> proffestions)
        {
            string mess = "";
            ProffestionService.PutProffestionToTeacher(proffestions, ref mess);
            if (mess == "")
                return Ok();
            return BadRequest(mess);
        }

        //get teacher to class proffestions
        [HttpGet]
        public List<TeacherToClassProffestionDTO> GetTeacherToClassProffestions(int ClassId, int TeacherId)
        {
            return ProffestionService.GetTeacherToClassProffestions(ClassId, TeacherId);
        }

        //get student proffestion level
        [HttpGet]
        public List<StudentProffestionLevelDTO> GetStudentProffestionsLevel(int StudentId)
        {
            return ProffestionService.GetStudentProffestionsLevel(StudentId);
        }

        //post priffestion
        [HttpPost]
        public ProffestionsDTO PostProffestion(ProffestionsDTO lang)
        {
            return ProffestionService.AddProffestion(lang);
        }
    }
}
