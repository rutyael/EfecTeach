using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class CitiesService
    {
        //get all cities
        public static List<CitiesDTO> GetAllCities()
        {
            List<City> cities = new List<City>();
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                cities = db.Cities.ToList();
            }
            List<CitiesDTO> citiesdto = new List<CitiesDTO>();
            cities.ForEach(c =>
                {
                    citiesdto.Add(Convertion.CityConvertion.ConvertToCitiesDTO(c));
                });
            return citiesdto;
        }
    }
}
