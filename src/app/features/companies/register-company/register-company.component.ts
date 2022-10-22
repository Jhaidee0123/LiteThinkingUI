import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EditCompanyDialogComponent } from '../edit-company-dialog/edit-company-dialog.component';
import { Company } from '../shared/models/company.model';
import { CreateCompany } from '../shared/models/create-company.model';
import { CompanyService } from '../shared/services/company.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'address', 'nit', 'phone', 'actions'];
  public companyForm!: FormGroup;
  public companies: Company[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly companyService: CompanyService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      address: ['', [Validators.required, Validators.minLength(1)]],
      nit: ['', [Validators.required, Validators.minLength(1)]],
      phone: ['', [Validators.required, Validators.minLength(1)]],
    });
    this.getCompanies();
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
          this.getCompanies();
        }, () => {
          Swal.fire({
            title: '<p><small>No se pudo crear la compañia</small></p>',
            icon: 'error',
            confirmButtonText: '<a class="fuente">Ok</a>'
          });
        });
    }
  }

  removeCompany(companyId: string) {
    this.companyService.removeCompany(companyId).subscribe(() => {
      Swal.fire({
        title: '<p><small>Compañia eliminada correctamente</small></p>',
        icon: 'success',
        confirmButtonText: '<a>Ok</a>'
      });
      this.getCompanies();
    }, () => {
      Swal.fire({
        title: '<p><small>No se pudo eliminar la compañía</small></p>',
        icon: 'error',
        confirmButtonText: '<a>Ok</a>'
      });
    });
  }

  editCompany(company: Company) {
    const dialogRef = this.dialog.open(EditCompanyDialogComponent, {
      width: '450px',
      data: { company },
    });
    dialogRef.afterClosed().subscribe((company) => {
      if (company) {
        this.companyService.updateCompany(company).subscribe(() => {
          Swal.fire({
            title: '<p><small>Compañia actualizada correctamente</small></p>',
            icon: 'success',
            confirmButtonText: '<a>Ok</a>'
          });
          this.getCompanies();
        }, () => {
          Swal.fire({
            title: '<p><small>No se pudo actualizar la compañía</small></p>',
            icon: 'error',
            confirmButtonText: '<a>Ok</a>'
          });
        });
      }
    });
  }

  getCompanies(): void {
    this.companyService.getCompanies().subscribe(res => {
      this.companies = res;
    })
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
