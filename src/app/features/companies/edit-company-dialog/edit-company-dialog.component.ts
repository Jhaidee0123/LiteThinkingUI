import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from '../shared/models/company.model';
import { EditCompany } from '../shared/models/update-company.model';

@Component({
  selector: 'app-edit-company-dialog',
  templateUrl: './edit-company-dialog.component.html',
  styleUrls: ['./edit-company-dialog.component.css']
})
export class EditCompanyDialogComponent implements OnInit {
  public companyForm!: FormGroup;
  public company!: Company;
  public gola = 'hola';
  constructor(
    private readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCompanyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.company = this.data;
    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      address: ['', [Validators.required, Validators.minLength(1)]],
      nit: ['', [Validators.required, Validators.minLength(1)]],
      phone: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  submit(): void {
    if (this.companyForm.valid) {
      const { name, address, nit, phone } = this.companyForm.value;
      const company: EditCompany = {
        companyId: this.data.company.id,
        name,
        address,
        nit,
        phone
      }
      this.dialogRef.close(company);
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
