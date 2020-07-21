import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {MaterialModule} from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './Question/questions/questions.component';
import { LoginComponent } from './User/login/login.component';
import { ApdateDetailsTeacherComponent } from './User/apdate-details-teacher/apdate-details-teacher.component';
import { AddQuestionComponent } from './Question/add-question/add-question.component';
import { AnswerToQuestionComponent } from './Answer/answer-to-question/answer-to-question.component';
import { StudentDetailsComponent } from './User/student-details/student-details.component';
import { HeaderComponent } from './display/header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './display/footer/footer.component';
import { AskQuestionComponent } from './Question/ask-question/ask-question.component';
import { HelpComponent } from './help/help.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AnswersComponent}  from './Answer/answers/answers.component';
import { HttpClientModule} from '@angular/common/http';

import { from } from 'rxjs';
import { ReactiveFormsModule} from '@angular/forms';
import { ItemQuestionComponent } from './Question/item-question/item-question.component';
import { EditQuestionComponent } from './Question/edit-question/edit-question.component';



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
    ItemQuestionComponent,
    EditQuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }