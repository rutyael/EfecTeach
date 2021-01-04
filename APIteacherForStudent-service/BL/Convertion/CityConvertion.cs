using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Convertion
{
    public class CityConvertion
    {
        public static CitiesDTO ConvertToCitiesDTO(City city)
        {
            CitiesDTO citydto = new CitiesDTO();
            citydto.CityName = city.CityName;
            citydto.id = city.id;
            return citydto;
        }

        public static City ConvertToCities(CitiesDTO citydto)
        {
            City city = new City();
            city.CityName = citydto.CityName;
            city.id = citydto.id;
            return city;
        }
    }
}
