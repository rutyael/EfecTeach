import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { LoginComponent } from './login/login.component';
import { ApdateDetailsTeacherComponent } from './apdate-details-teacher/apdate-details-teacher.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AnswerToQuestionComponent } from './answer-to-question/answer-to-question.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { HelpComponent } from './help/help.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionToAnswerComponent } from './question-to-answer/question-to-answer.component';
import {AnswersComponent}  from './answers/answers.component';

import { from } from 'rxjs';
import { ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from './material.module';

@NgModule({
  declarations: [
    AnswersComponent,
    AppComponent,
    LoginComponent,
    ApdateDetailsTeacherComponent,
    AddQuestionComponent,
    AnswerToQuestionComponent,
    StudentDetailsComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    AskQuestionComponent,
    QuestionsComponent,
    HelpComponent,
    QuestionToAnswerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
