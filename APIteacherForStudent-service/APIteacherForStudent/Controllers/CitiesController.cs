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
    public class CitiesController : ApiController
    {
        ///get cities
        [HttpGet]
        public List<CitiesDTO> GetAllCities()
        {
            return CitiesService.GetAllCities();
        }

    }
}
