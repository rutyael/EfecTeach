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
        public static School ConvertToSchool(SchoolsDTO schooldto)
        {
            School school = new School();
            school.id = schooldto.id;
            school.comment = schooldto.comment;
            school.idSchool = schooldto.idSchool;
            school.SchoolName = schooldto.SchoolName;
            school.IdCity = schooldto.IdCity;
            school.IdSecretary = schooldto.IdSecretary;
            return school;
        }
        public static SchoolsDTO ConvertToSchoolsDTO(School school)
        {
            SchoolsDTO schooldto = new SchoolsDTO();
            schooldto.id = school.id;
            schooldto.IdCity = school.IdCity;
            schooldto.idSchool = school.idSchool;
            schooldto.SchoolName = school.SchoolName;
            schooldto.comment = school.comment;
            schooldto.IdSecretary = school.IdSecretary;
            school.ClassToSchools.ToList().ForEach(c =>
            {
                schooldto.ClassesToSchool.Add(Convertion.ClassToSchoolConvertion.ConvertToClassToSchoolDTO(c));
            });
            return schooldto;
        }
        public static ClassesJoinUserDTO ConvertToClassesJoinUserDTO(getClassesJoinUser_Result c_j_u_r)
        {
            ClassesJoinUserDTO c_j_u = new ClassesJoinUserDTO();
            c_j_u.approved = (int)c_j_u_r.approved;
            c_j_u.ClassId = c_j_u_r.ClassId;
            c_j_u.ClassName = c_j_u_r.ClassName;
            c_j_u.SchoolId = c_j_u_r.SchoolId;
            c_j_u.SchoolName = c_j_u_r.SchoolName;
            c_j_u.UserId = c_j_u_r.UserId;
            c_j_u.UserName = c_j_u_r.UserName;
            c_j_u.SchoolComment = c_j_u_r.SchoolComment;
            c_j_u.ClassComment = c_j_u_r.ClassComment;
            c_j_u.factor = c_j_u_r.factor;
            c_j_u.LastDateOfStatusChange = c_j_u_r.LastDateOfStatusChange;
            return c_j_u;
        }
    }
}
