using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class StudentProffestionLevelDTO
    {
        public float mark { get; set; }
        public string comment { get; set; }
        public ProffestionsDTO proffestion { get; set; }
    }
}
