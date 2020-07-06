import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './User/login/login.component';
import {QuestionsComponent} from './Question/questions/questions.component';
import {QuestionServiceService} from './Question/question-service.service';
import { AnswerToQuestionComponent } from './Answer/answer-to-question/answer-to-question.component';
import { EditQuestionComponent } from './Question/edit-question/edit-question.component';
import { AskQuestionComponent } from './Question/ask-question/ask-question.component';
import { ApdateDetailsTeacherComponent } from './User/apdate-details-teacher/apdate-details-teacher.component';
import { StudentDetailsComponent } from './User/student-details/student-details.component';
import {DetailsSecretaryComponent} from './User/details-secretary/details-secretary.component';




const routes: Routes = [
  {path:'questions',component:QuestionsComponent},
  {path:'signIn',component:LoginComponent},
  {path:'signUp',component:LoginComponent},
  {path:'Editquestion/:id',component:EditQuestionComponent},
  {path:'AskQuestion',component:AskQuestionComponent},
  {path:'ApdateDetailsTeacher',component:ApdateDetailsTeacherComponent},
  {path:'StudentsDetails',component:StudentDetailsComponent},
  {path:'DetailsSecretary',component:DetailsSecretaryComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
