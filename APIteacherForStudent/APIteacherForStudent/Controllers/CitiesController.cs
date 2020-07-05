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
    public class CitiesController : ApiController
    {
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        [HttpGet]
        public List<CitiesDTO> GetAllCities()
        {
            return CitiesService.GetAllCities();
        }
    }
}
