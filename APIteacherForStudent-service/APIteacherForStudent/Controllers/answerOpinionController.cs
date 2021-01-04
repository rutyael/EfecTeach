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
    public class answerOpinionController : ApiController
    {
        ///post an opinion for answer
        [HttpPost]
        public IHttpActionResult PostAnswerOpinion([FromBody]answerOpinionDTO answerOpinion)
        {
            string messege;
            if (AnswerService.postAnswerOpinion(answerOpinion) == false)
            {
                messege = "פעולת ההוספה נכשלה, אנא נסה שנית";
                return BadRequest(messege);
            }
            else
            {
                messege = "חוות הדעת נוספה בהצלחה";
                return Ok(messege);
            }
        }
    }
}
