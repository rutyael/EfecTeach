using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class SecretaryDTO
    {
        public int SecretaryId { get; set; }
        public string SecretaryName { get; set; }
        public string SecretaryPassword { get; set; }
        public string SecretaryMail { get; set; }
        public int SchoolId { get; set; }
    }
}
