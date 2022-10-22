import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CreateCompany } from '../shared/models/create-company.model';
import { CompanyService } from '../shared/services/company.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {
  public companyForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      address: ['', [Validators.required, Validators.minLength(1)]],
      nit: ['', [Validators.required, Validators.minLength(1)]],
      phone: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  public submit(): void {
    if (this.companyForm.valid) {
      const { name, address, nit, phone } = this.companyForm.value;
      const company: CreateCompany = {
        name,
        address,
        nit,
        phone
      }
      this.companyService
        .createCompany(company)
        .subscribe(() => {
          Swal.fire({
            title: '<p><small>Compañia creada correctamente</small></p>',
            icon: 'success',
            confirmButtonText: '<a class="fuente">Ok</a>'
          });
        }, () => {
          Swal.fire({
            title: '<p><small>No se pudo crear la compañia</small></p>',
            icon: 'error',
            confirmButtonText: '<a class="fuente">Ok</a>'
          });
        });
    }
  }

  get name(): any {
    return this.companyForm.get('name');
  }

  get address(): any {
    return this.companyForm.get('address');
  }

  get nit(): any {
    return this.companyForm.get('nit');
  }

  get phone(): any {
    return this.companyForm.get('phone');
  }

}
