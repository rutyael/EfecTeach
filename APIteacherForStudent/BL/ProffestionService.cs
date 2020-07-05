using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DAL;
namespace BL
{
    public class ProffestionService
    {
        public static List<ProffestionsDTO> GetAllProffestion()
        {
            List<ProffestionsDTO> proffestions = new List<ProffestionsDTO>();
            using (TeacherForStudentEntitie db =new TeacherForStudentEntitie())
            {
                db.Proffestions.ToList().ForEach(pro => 
                proffestions.Add(Convertion.ProffestionConvertion.ConvertToDTO(pro)));
            }
            return proffestions;
        }
        public static ProffestionsDTO GetProffestion(int id)
        {
            Proffestions pro = new Proffestions();
            using (TeacherForStudentEntitie db = new TeacherForStudentEntitie())
            {
                pro = db.Proffestions.ToList().FirstOrDefault(p => p.ProffestionId == id);
            }
            return Convertion.ProffestionConvertion.ConvertToDTO(pro);
        }
    }
}
