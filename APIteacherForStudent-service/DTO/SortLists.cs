using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class SortLists
    {
        public List<UserQuestionDTO> FirstList { get; set; }
        public List<UserQuestionDTO> SecondList { get; set; }
        public SortLists()
        {
            FirstList = new List<UserQuestionDTO>();
            SecondList = new List<UserQuestionDTO>();
        }
    }
}
