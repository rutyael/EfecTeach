using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using DTO;
using BL;
using System.Web.Http;
using System.Web.Http.Cors;

namespace APIteacherForStudent.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class PersonalAreaController : ApiController
    {
        ///get opinions for user answers
        [HttpGet]
        public AnswerAndOpinionToUser AnswerAndOpinionToUser(int idUserToOpinion)
        {
            return PersonalAreaService.answerAndOpinionToUser(idUserToOpinion);
        }
        ///get answers for user questions
        [HttpGet]
        public questionAndAnswersToUser GetAnswersUser(int idUserToAnswers)
        {
            return PersonalAreaService.GetAnswersUser(idUserToAnswers);
        }
        ///get classes and students of user ---> teacher
        [HttpGet]
        public List<teacherJoinSchools_ResultDTO> GetClassesAndStudentToUser(int idUserToClass)
        {
            return PersonalAreaService.GetClassesAndStudentToUser(idUserToClass);
        }
        ///get user questions
        [HttpGet]
        public List<UserQuestionDTO> GetQuestionUser(int idUserToQuestion)
        {
            return PersonalAreaService.GetQuestionsUser(idUserToQuestion);
        }
        ///get details of users school
        [HttpGet]
        public List<TeachersAndSecretaryToSchool> GetTeachersAndSecretaryToSchool()
        {
            return PersonalAreaService.GetTeachersAndSecretaryToSchool();
        }
        ///get school of user
        [HttpGet]
        public GetSchoolToStudent getSchoolToStudent(int idStudent)
        {
            return PersonalAreaService.getSchoolToStudent(idStudent);
        }
    }
}
