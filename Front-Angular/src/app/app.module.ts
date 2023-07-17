import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './Component/home/home.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { FooterComponent } from './Component/footer/footer.component';
import { AboutusComponent } from './Component/aboutus/aboutus.component';
import { ContactusComponent } from './Component/contactus/contactus.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExamCompComponent } from './Component/exam-comp/exam-comp.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { QuestionsComponent } from './Component/questions/questions.component';
import { AddEditQuestionsComponent } from './Component/add-edit-questions/add-edit-questions.component';
import { TakeExameComponent } from './Component/take-exame/take-exame.component';
import { AddExamComponent } from './Component/add-exam/add-exam.component';
import { RegisterComponent } from './Component/register/register.component';
import { LoginComponent } from './Component/login/login.component';
import { ExamsResultComponent } from './Component/exams-result/exams-result.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AboutusComponent,
    ContactusComponent,
    ExamCompComponent,
    DashboardComponent,
    QuestionsComponent,
    AddEditQuestionsComponent,
    TakeExameComponent,
    AddExamComponent,
    ExamsResultComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
