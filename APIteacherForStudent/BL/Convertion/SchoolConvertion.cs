using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Convertion
{
    public class SchoolConvertion
    {
        public static Schools ConvertToSchool(SchoolsDTO schooldto)
        {
            Schools school = new Schools();
            school.id = schooldto.id;
            school.comment = schooldto.comment;
            school.idSchool = schooldto.idSchool;
            school.SchoolName = schooldto.SchoolName;
            return school;
        }
        public static SchoolsDTO ConvertToSchoolsDTO(Schools school)
        {
            SchoolsDTO schooldto = new SchoolsDTO();
            schooldto.id = school.id;
            schooldto.idCity = school.idCity;
            schooldto.idSchool = school.idSchool;
            schooldto.SchoolName = school.SchoolName;
            schooldto.comment = school.comment;
            return schooldto;
        }
    }

}
