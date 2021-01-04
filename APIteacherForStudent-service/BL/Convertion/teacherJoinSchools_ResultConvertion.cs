using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DAL;

namespace BL.Convertion
{
    public class teacherJoinSchools_ResultConvertion
    {
        public static teacherJoinSchools_ResultDTO convertToteacherJoinSchools_ResultDTO(teacherJoinSchools_Result teacherjoinSchools_Result)
        {
            teacherJoinSchools_ResultDTO teacherjoinSchools_ResultDTO = new teacherJoinSchools_ResultDTO();
            teacherjoinSchools_ResultDTO.className = teacherjoinSchools_Result.className;
            teacherjoinSchools_ResultDTO.idClass = teacherjoinSchools_Result.idClass;
            teacherjoinSchools_ResultDTO.idSchool = teacherjoinSchools_Result.idSchool;
            teacherjoinSchools_ResultDTO.SchoolName = teacherjoinSchools_Result.SchoolName;
            teacherjoinSchools_ResultDTO.UserId = teacherjoinSchools_Result.UserId;
            teacherjoinSchools_ResultDTO.UserMail = teacherjoinSchools_Result.UserMail;
            teacherjoinSchools_ResultDTO.UserName = teacherjoinSchools_Result.UserName;
            return teacherjoinSchools_ResultDTO;
        }
    }
}
