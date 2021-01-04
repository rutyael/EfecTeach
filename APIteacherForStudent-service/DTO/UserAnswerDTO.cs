using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class UserAnswerDTO
    {
        /// <summary>
        /// who reply the answer
        /// </summary>
        public UserDTO Reply { get; set; }
        /// <summary>
        /// the answer
        /// </summary>
        public AnswerDTO Answer { get; set; }
        public string ProffestionName { get; set; }
        public string className { get; set; }
        public int idClass { get; set; }
    }
}
