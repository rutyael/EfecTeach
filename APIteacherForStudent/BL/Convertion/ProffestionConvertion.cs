using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DAL;
namespace BL.Convertion
{
    public class ProffestionConvertion
    {
        public static ProffestionsDTO ConvertToDTO(Proffestion pro)
        {
            ProffestionsDTO newpo = new ProffestionsDTO();
            newpo.ProffestionId = pro.ProffestionId;
            newpo.ProffestionName = pro.ProffestionName;
            return newpo;
        }
        public static Proffestion ConvertToProffestion(ProffestionsDTO proDTO)
        {
            Proffestion newpo = new Proffestion();
            newpo.ProffestionId = proDTO.ProffestionId;
            newpo.ProffestionName = proDTO.ProffestionName;
            return newpo;
        }
    }
}
