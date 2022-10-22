import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { CompaniesComponent } from './companies/companies.component';
import { RegisterCompanyComponent } from './companies/register-company/register-company.component';
import { CreateArticleDialogComponent } from './articles/create-article-dialog/create-article-dialog.component';
import { ExportDialogComponent } from './export-dialog/export-dialog.component';

@NgModule({
  declarations: [
    LoginComponent,
    CompaniesComponent,
    RegisterCompanyComponent,
    CreateArticleDialogComponent,
    ExportDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FeaturesModule { }
