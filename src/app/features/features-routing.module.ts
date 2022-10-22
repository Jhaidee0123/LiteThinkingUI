import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { ExternalGuard } from '../core/guards/external.guard';
import { CompaniesComponent } from './companies/companies.component';
import { RegisterCompanyComponent } from './companies/register-company/register-company.component';
import { FeaturesModule } from './features.module';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'companies',
    component: CompaniesComponent,
  },
  {
    path: 'register-company',
    component: RegisterCompanyComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FeaturesModule],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
