using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DAL;
namespace BL.Convertion
{
    public class ProffestionConvertion
    {
        public static ProffestionsDTO ConvertToProffestionDTO(Proffestion pro)
        {
            ProffestionsDTO newpo = new ProffestionsDTO()
            {
                ProffestionId = pro.ProffestionId,
                ProffestionName = pro.ProffestionName
            };
            return newpo;
        }
        public static Proffestion ConvertToProffestion(ProffestionsDTO proDTO)
        {
            Proffestion newpo = new Proffestion();
            newpo.ProffestionId = proDTO.ProffestionId;
            newpo.ProffestionName = proDTO.ProffestionName;
            return newpo;
        }
        public static ProffestionJoinTeacherDTO ConvertToProffestionJoinUserDTO(getProffestionsJoinTeacher_Result p_j_u_r)
        {
            ProffestionJoinTeacherDTO p_j_u = new ProffestionJoinTeacherDTO();
            p_j_u.Checked = p_j_u_r.Checked;
            p_j_u.ProffestionId = p_j_u_r.ProffestionId;
            p_j_u.ProffestionName = p_j_u_r.ProffestionName;
            p_j_u.TeacherId = p_j_u_r.TeacherId;
            p_j_u.TeacherName = p_j_u_r.TeacherName;
            return p_j_u;
        }
        
    }
}
