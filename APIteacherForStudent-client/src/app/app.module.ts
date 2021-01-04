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
import { HeaderComponent } from './display/header/header.component';
import { FooterComponent } from './display/footer/footer.component';
import { AskQuestionComponent } from './Question/ask-question/ask-question.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AnswersComponent}  from './Answer/answers/answers.component';
import { HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';
import { TextEditorComponent } from './text-editor/text-editor.component';

import { from } from 'rxjs';
import { ReactiveFormsModule} from '@angular/forms';
import { ItemQuestionComponent } from './Question/item-question/item-question.component';
import { EditQuestionComponent } from './Question/edit-question/edit-question.component';
import { DetailsSecretaryComponent } from './School/details-secretary/details-secretary.component';
import { OrderbyPipe } from './orderby.pipe';
import { LanguagesPipe } from './Proffestion/languages.pipe';

import { SchoolComponent } from './School/school/school.component';

import {KeyValuePipe,DatePipe}from '@angular/common';
import { UpdatingClassesForUserComponent } from './School/updating-classes-for-teacher/updating-classes-for-teacher.component';
import { EditAnswerComponent } from './Answer/edit-answer/edit-answer.component';
import { ItemAnswerComponent } from './Answer/item-answer/item-answer.component';
import { TeacherWatchesAnswersComponent } from './Answer/teacher-watches-answers/teacher-watches-answers.component';
import { ForgetPasswordComponent } from './User/forget-password/forget-password.component';
import { ApprovedClassForStudentComponent } from './School/approved-class-for-student/approved-class-for-student.component';
import { PersonalAreaComponent } from './PersonalArea/personal-area/personal-area.component';
import { ClassesAndUserComponent } from './PersonalArea/classes-and-user/classes-and-user.component';
import { AnswerAndOpinionComponent } from './PersonalArea/answer-and-opinion/answer-and-opinion.component';
import { AnswersToQuestionsComponent } from './PersonalArea/answers-to-questions/answers-to-questions.component';
import { QuestionsUserAskedComponent } from './PersonalArea/questions-user-asked/questions-user-asked.component';
import { UserDetailsComponent } from './PersonalArea/user-details/user-details.component';
import { LoginScreenComponent } from './display/login-screen/login-screen.component';
import { LoginGuestComponent } from './User/login-guest/login-guest.component';
import { CommentQAComponent } from './PersonalArea/comment-qa/comment-qa.component';
import { DialogComponent } from './dialog/dialog.component';
import { EditTeacherClassComponent } from './School/edit-teacher-class/edit-teacher-class.component';
import { StudentMarksComponent } from './PersonalArea/student-marks/student-marks.component';
import { PointsLaudingComponent } from './display/points-lauding/points-lauding.component';
import { AddProffestionComponent } from './Proffestion/add-proffestion/add-proffestion.component';
import { ReloadComponentComponent } from './reload-component/reload-component.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AnswersComponent,
    AppComponent,
    LoginComponent,
    ApdateDetailsTeacherComponent,
    AddQuestionComponent,
    AnswerToQuestionComponent,
    HeaderComponent,
    FooterComponent,
    AskQuestionComponent,
    QuestionsComponent,
    ItemQuestionComponent,
    EditQuestionComponent,
    DetailsSecretaryComponent,
    TextEditorComponent,
    OrderbyPipe,
    LanguagesPipe,
    SchoolComponent,
    UpdatingClassesForUserComponent,
    EditAnswerComponent,
    ItemAnswerComponent,
    TeacherWatchesAnswersComponent,
    ForgetPasswordComponent,
    ApprovedClassForStudentComponent,
    PersonalAreaComponent,
    ClassesAndUserComponent,
    AnswerAndOpinionComponent,
    AnswersToQuestionsComponent,
    QuestionsUserAskedComponent,
    UserDetailsComponent,
    LoginScreenComponent,
    LoginGuestComponent,
    CommentQAComponent,
    DialogComponent,
    EditTeacherClassComponent,
    StudentMarksComponent,
    PointsLaudingComponent,
    AddProffestionComponent,
    ReloadComponentComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,    
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot(),

  ],
  providers: [KeyValuePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
