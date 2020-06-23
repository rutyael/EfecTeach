import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './User/login/login.component';
import {QuestionsComponent} from './Question/questions/questions.component';
import {QuestionToAnswerComponent} from './Question/question-to-answer/question-to-answer.component';
import {QuestionServiceService} from './Question/question-service.service';
import { AnswerToQuestionComponent } from './Answer/answer-to-question/answer-to-question.component';
import { EditQuestionComponent } from './Question/edit-question/edit-question.component';





const routes: Routes = [
  {path:'questions',component:QuestionsComponent},
  {path:'signIn',component:LoginComponent},
  {path:'signUp',component:LoginComponent},
  {path:'Editquestion/:id',component:EditQuestionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
