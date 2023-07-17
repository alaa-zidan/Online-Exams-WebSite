import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { AboutusComponent } from './Component/aboutus/aboutus.component';
import { ContactusComponent } from './Component/contactus/contactus.component';
import { ExamCompComponent } from './Component/exam-comp/exam-comp.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { QuestionsComponent } from './Component/questions/questions.component';
import { AddEditQuestionsComponent } from './Component/add-edit-questions/add-edit-questions.component';
import { TakeExameComponent } from './Component/take-exame/take-exame.component';
import { AddExamComponent } from './Component/add-exam/add-exam.component';
import { AuthGuard } from './Component/guards/auth.guard';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { ExamsResultComponent } from './Component/exams-result/exams-result.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'Exam/:id', component : ExamCompComponent, canActivate: [AuthGuard] },
  { path: 'Dashboard', component : DashboardComponent, canActivate: [AuthGuard] },
  { path: 'Questions/:id', component : QuestionsComponent, canActivate: [AuthGuard] },
  { path: 'Add/:id', component : AddEditQuestionsComponent, canActivate: [AuthGuard] },
  { path: 'takeExam', component :TakeExameComponent, canActivate: [AuthGuard] },
  { path: 'AddExam/:id', component :AddExamComponent, canActivate: [AuthGuard] },
  { path: 'grade', component :ExamsResultComponent, canActivate: [AuthGuard]  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
