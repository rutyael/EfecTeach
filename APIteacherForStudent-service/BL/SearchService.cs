using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BL
{
    public class SearchService
    {
        //CulculateSimilarity between two string
        public static float CulculateSimilarity(string[] grams1, string[] grams2, int gramlength)
        {
            if ((object)grams1 == null || (object)grams2 == null)
                return 0.0F;
            int count = 0;
            for (int i = 0; i < grams1.Length; i++)
            {
                for (int j = 0; j < grams2.Length; j++)
                {
                    if (grams1[i].Contains("~") || grams1[i].Contains("^"))
                    {
                        if (grams1[i].Equals(grams2[j]))
                        {
                            count++;
                            break;
                        }
                    }
                    else
                    {
                        if (NormalizedFDistance(Levenshtein(grams1[i], grams2[j]), Math.Max(grams1[i].Length, grams2[j].Length)) > 0.3)
                            continue;
                        count++;
                        break;
                    }

                }
            }
            float sim = (2.0F * (float)count) / (float)(grams1.Length + grams2.Length) * 100;
            return sim;
        }

        public static string[] BasicStopWordsSet = { "אם","כי","בתוך","לתוך","הוא","היא","הם","הן","לא","היכן","יש",
            "כן","או","היה","היו","יהיה","יהיו","להיות","תהיינה","למה","מדוע","האם","אבל","ע\"י","עבור","זה","זאת",
            "בשביל","מה","גם","הם","אז","כלומר", "רק", "בגלל", "מכיוון", "עד", "כמו", "מאד", "של", "את",
            "בעיקר", "זו","הזה","מלבד","בלבד","בין", "ובין","לבין","למשל","שבהם", "כך", "אך","למרות" ,
            " אף אחד", "שום דבר", "אי פעם"," על פי"," אף על פי"," על ידי"};
        public static string[] Chars = { "?", "!", ".", ",", "-", "\'", "\"", "=", "(", ")", "{", "}", "[", "]", "*", "\\", "/" };

        //split string to grams
        public static string[] GetDismantleSTR(string text, int gramLength)
        {
            if (text == null || text.Length == 0)
                return null;
            Chars.ToList().ForEach(c =>
            {
                text = text.Replace(c, string.Empty);
            });
            if (text.Length == 0) return null;
            ArrayList grams = new ArrayList();
            if (text.Length < gramLength)
            {
                grams.Add($"{text}~");
                grams.Add($"{text[0]}^");
                grams.Add(text);
            }
            else
            {
                string[] terms = text.Split(' ').Where(str => str != "" && BasicStopWordsSet.FirstOrDefault(s => s.Equals(str)) == null).ToArray();

                for (int i = 0; i < terms.Length; i++)
                {
                    if (terms[i].Length <= gramLength)
                    {
                        grams.Add($"{terms[i]}~");
                        grams.Add($"{terms[i][0]}^");
                        grams.Add(terms[i]);
                        continue;
                    }
                    grams.Add($"{terms[i].Substring(0, gramLength)}~");
                    grams.Add($"{terms[i][0]}^");
                    for (int j = 0; ; j++)
                    {
                        if (j + gramLength >= terms[i].Length)
                        {
                            grams.Add(terms[i].Substring(j, terms[i].Length - j));
                            break;
                        }
                        grams.Add(terms[i].Substring(j, gramLength));
                    }

                    if ((i + 1) != terms.Length)
                        grams.Add($"{terms[i][terms[i].Length - 1]} {terms[i + 1][0]}");
                }
            }
            string[] array = new string[grams.Count];
            for (int i = 0; i < grams.Count; i++) array[i] = (string)grams[i];
            return array;
        }

        //return distance levenshtein between two strings
        public static int Levenshtein(string s, string t)
        {
            if (s == t)
            {
                return 0;
            }
            int n = s.Length, m = t.Length;
            if (n == 0 || m == 0)
            {
                return n + m;
            }
            int x = 0, y, a, b, c, d, g, h = 0, k;
            int[] p = new int[n];
            for (y = 0; y < n;)
            {
                p[y] = ++y;
            }

            for (; (x + 3) < m; x += 4)
            {
                var e1 = t[x];
                var e2 = t[x + 1];
                var e3 = t[x + 2];
                var e4 = t[x + 3];
                c = x;
                b = x + 1;
                d = x + 2;
                g = x + 3;
                h = x + 4;
                for (y = 0; y < n; y++)
                {
                    k = s[y];
                    a = p[y];
                    if (a < c || b < c)
                    {
                        c = (a > b ? b + 1 : a + 1);
                    }
                    else
                    {
                        if (e1 != k)
                        {
                            c++;
                        }
                    }
                    if (c < b || d < b)
                    {
                        b = (c > d ? d + 1 : c + 1);
                    }
                    else
                    {
                        if (e2 != k)
                        {
                            b++;
                        }
                    }

                    if (b < d || g < d)
                    {
                        d = (b > g ? g + 1 : b + 1);
                    }
                    else
                    {
                        if (e3 != k)
                        {
                            d++;
                        }
                    }

                    if (d < g || h < g)
                    {
                        g = (d > h ? h + 1 : d + 1);
                    }
                    else
                    {
                        if (e4 != k)
                        {
                            g++;
                        }
                    }
                    p[y] = h = g;
                    g = d;
                    d = b;
                    b = c;
                    c = a;
                }
            }

            for (; x < m;)
            {
                var e = t[x];
                c = x;
                d = ++x;
                for (y = 0; y < n; y++)
                {
                    a = p[y];
                    if (a < c || d < c)
                    {
                        d = (a > d ? d + 1 : a + 1);
                    }
                    else
                    {
                        if (e != s[y])
                        {
                            d = c + 1;
                        }
                        else
                        {
                            d = c;
                        }
                    }
                    p[y] = d;
                    c = a;
                }
                h = d;
            }

            return h;
        }

        //return NormalizedFDistance 
        public static double NormalizedFDistance(int h, int length)
        {
            return (double)h / (double)length;
        }

        //search
        public static List<QuestionSearch> Search(string searchQuestion, string questionLanguage)
        {
            string[] ArrsearchQuestion;
            string[] ArrQuestion;
            List<QuestionSearch> questionSearches = new List<QuestionSearch>();
            Proffestion proffestion;
            QuestionSearch questionSearch = new QuestionSearch();
            float level;
            ArrsearchQuestion = GetDismantleSTR(searchQuestion, 3);
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                int EmptyResult = 0;
                db.Questions.ToList().ForEach(x =>
                {
                    proffestion = new Proffestion();
                    proffestion = db.Proffestions.ToList().FirstOrDefault(p => p.ProffestionId == x.ProffestionId);
                    if (proffestion.ProffestionName == questionLanguage)
                    {
                        questionSearch = new QuestionSearch();
                        ArrQuestion = GetDismantleSTR(x.OuestionTitle, 3);
                        if (ArrQuestion == null || ArrQuestion.Length == 0)
                        {
                            EmptyResult = 1;
                            return;
                        }
                        level = CulculateSimilarity(ArrsearchQuestion, ArrQuestion, 3);
                        questionSearch.question = Convertion.QuestionConvertion.ConvertToUserQuestionDTO(x);
                        questionSearch.level = level;
                        questionSearch.userAsk = Convertion.userConvertion.ConvertToUserDto(db.Users.ToList().FirstOrDefault(u => u.UserId == x.UserId));
                        questionSearches.Add(questionSearch);
                    }
                });
                return EmptyResult == 1 ? null : questionSearches;
            }
        }

    }
}
