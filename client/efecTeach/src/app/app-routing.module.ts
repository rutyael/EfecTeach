import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {QuestionsComponent} from './questions/questions.component';
import {QuestionToAnswerComponent} from './question-to-answer/question-to-answer.component';




const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'questions',component:QuestionsComponent,children:[
    {path:':id',component:QuestionToAnswerComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
