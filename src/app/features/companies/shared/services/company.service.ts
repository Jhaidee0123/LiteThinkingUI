import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company.model';
import { CreateCompany } from '../models/create-company.model';
import { EditCompany } from '../models/update-company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseApi = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {
  }

  public createCompany(company: CreateCompany): Observable<any> {
    return this.httpClient.post(
      `${this.baseApi}/companies/create-company`,
      company
    );
  }

  public updateCompany(company: EditCompany): Observable<Company[]> {
    return this.httpClient.put<Company[]>(
      `${this.baseApi}/companies/edit-company`,
      company
    );
  }

  public removeCompany(companyId: string): Observable<any> {
    return this.httpClient.delete(
      `${this.baseApi}/companies/remove-company/${companyId}`
    );
  }

  public getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(
      `${this.baseApi}/companies/list-companies`
    );
  }
}
