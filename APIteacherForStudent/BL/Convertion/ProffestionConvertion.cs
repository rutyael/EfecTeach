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
        public static ProffestionsDTO ConvertToDTO(Proffestions pro)
        {
            ProffestionsDTO newpo = new ProffestionsDTO();
            newpo.ProffestionId = pro.ProffestionId;
            newpo.ProffestionName = pro.ProffestionName;
            return newpo;
        }
        public static Proffestions ConvertToProffestion(ProffestionsDTO proDTO)
        {
            Proffestions newpo = new Proffestions();
            newpo.ProffestionId = proDTO.ProffestionId;
            newpo.ProffestionName = proDTO.ProffestionName;
            return newpo;
        }
    }
}
