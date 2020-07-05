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
        public static List<CitiesDTO> GetAllCities()
        {
            List<Cities> cities = new List<Cities>();
            using (TeacherForStudentEntitie db = new TeacherForStudentEntitie())
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
