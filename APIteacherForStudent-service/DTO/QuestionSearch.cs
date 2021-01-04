using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class QuestionSearch
    {
        public UserQuestionDTO question { get; set; }
        public float level { get; set; }
        public UserDTO userAsk { get; set; }
    }
}
