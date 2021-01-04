using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ProffestionsDTO
    {
        public ProffestionsDTO()
        {
        }

        public ProffestionsDTO(int proffestionId, string proffestionName)
        {
            ProffestionId = proffestionId;
            ProffestionName = proffestionName;
        }

        public int ProffestionId { get; set; }
        public string ProffestionName { get; set; }
    }
}
