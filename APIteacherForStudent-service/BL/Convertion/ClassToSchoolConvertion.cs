using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Convertion
{
    public class ClassToSchoolConvertion
    {
        public static ClassToSchoolDTO ConvertToClassToSchoolDTO(ClassToSchool classtoschool)
        {
            ClassToSchoolDTO classtoschooldto = new ClassToSchoolDTO();
            classtoschooldto.id = classtoschool.id;
            classtoschooldto.idSchool = classtoschool.idSchool;
            classtoschooldto.comment = classtoschool.comment;
            classtoschooldto.className = classtoschool.className;
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                classtoschooldto.SchoolName = db.Schools.ToList().FirstOrDefault(x => x.id == classtoschool.idSchool).SchoolName;
                classtoschooldto.Proffestions = classtoschool.Proffestions.Select(p => ProffestionConvertion.ConvertToProffestionDTO(p)).ToList();
            }
            return classtoschooldto;
        }
        public static ClassToSchool ConvertToClassToSchool(ClassToSchoolDTO classtoschooldto)
        {
            ClassToSchool classtoschool = new ClassToSchool();
            classtoschool.id = classtoschooldto.id;
            classtoschool.idSchool = classtoschooldto.idSchool;
            classtoschool.comment = classtoschooldto.comment;
            classtoschool.className = classtoschooldto.className;

            return classtoschool;
        }
    }
}
