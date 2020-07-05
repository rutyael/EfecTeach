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
        public static CitiesDTO ConvertToCitiesDTO(Cities city)
        {
            CitiesDTO citydto = new CitiesDTO();
            citydto.CityName = city.CityName;
            citydto.id = city.id;
            return citydto;
        }

        public static Cities ConvertToCities(CitiesDTO citydto)
        {
            Cities city = new Cities();
            city.CityName = citydto.CityName;
            city.id = citydto.id;
            return city;
        }
    }
}
