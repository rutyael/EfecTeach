import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './User/login/login.component';
import { QuestionsComponent } from './Question/questions/questions.component';
import { QuestionServiceService } from './Question/question-service.service';
import { AnswerToQuestionComponent } from './Answer/answer-to-question/answer-to-question.component';
import { EditQuestionComponent } from './Question/edit-question/edit-question.component';
import { AskQuestionComponent } from './Question/ask-question/ask-question.component';
import { ApdateDetailsTeacherComponent } from './User/apdate-details-teacher/apdate-details-teacher.component';
import { DetailsSecretaryComponent } from './School/details-secretary/details-secretary.component';
import { AddQuestionComponent } from './Question/add-question/add-question.component';
import { TeacherWatchesAnswersComponent } from './Answer/teacher-watches-answers/teacher-watches-answers.component';
import { EditAnswerComponent } from './Answer/edit-answer/edit-answer.component';
import { SchoolComponent } from './School/school/school.component';
import { UpdatingClassesForUserComponent } from './School/updating-classes-for-teacher/updating-classes-for-teacher.component';
import { ForgetPasswordComponent } from './User/forget-password/forget-password.component';
import { ApprovedClassForStudentComponent } from './School/approved-class-for-student/approved-class-for-student.component';
import { PersonalAreaComponent } from './PersonalArea/personal-area/personal-area.component';
import { UserDetailsComponent } from './PersonalArea/user-details/user-details.component';
import { LoginScreenComponent } from './display/login-screen/login-screen.component';
import { LoginGuestComponent } from './User/login-guest/login-guest.component';
import { ReloadComponentComponent } from './reload-component/reload-component.component';
import { AboutComponent } from './about/about.component';




const routes: Routes = [
  { path: 'questions', component: QuestionsComponent },
  { path: 'signIn', component: LoginComponent },
  { path: 'signUp', component: LoginComponent },
  { path: '', component: LoginScreenComponent },
  { path: 'LoginGuest', component: LoginGuestComponent },
  { path: 'LoginGuest/PersonalArea', component: LoginGuestComponent },
  { path: 'LoginGuest/AddQuestion', component: LoginGuestComponent },
  { path: 'LoginGuest/addComment', component: LoginGuestComponent },
  { path: 'LoginGuest/addAnswer', component: LoginGuestComponent },
  { path: 'Editquestion/:id', component: EditQuestionComponent },
  { path: 'EditquestionPersonal/:id', component: EditQuestionComponent },
  { path: 'AskQuestion', component: AskQuestionComponent },
  { path: 'ApdateDetailsTeacher', component: ApdateDetailsTeacherComponent },
  { path: 'UpdateDetailsSecretary', component: DetailsSecretaryComponent },
  { path: 'RegistrationDetailsSecretary', component: DetailsSecretaryComponent },
  { path: 'addQuestion', component: AddQuestionComponent },
  { path: 'teacherWatchesAnswersStudent', component: TeacherWatchesAnswersComponent },
  { path: 'Editanswer', component: EditAnswerComponent },
  { path: 'Editanswer/:id', component: EditAnswerComponent },
  { path: 'EditanswerPersonal/:id', component: EditAnswerComponent },

  {
    path: 'school/:schoolId', component: SchoolComponent, children: [
      { path: 'UpdateDetailsSecretary', component: DetailsSecretaryComponent },
      { path: 'StudentsClasses', component: ApprovedClassForStudentComponent },
      { path: 'TeachersClasses', component: UpdatingClassesForUserComponent }
    ]
  },
  { path: 'forgotPassword', component: ForgetPasswordComponent },
  { path: 'PersonalArea', component: PersonalAreaComponent },
  { path: 'userDetails', component: UserDetailsComponent },
  {path:'reload',component:ReloadComponentComponent},
  {path:'About',component:AboutComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
