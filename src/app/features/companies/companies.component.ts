import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Company } from './shared/models/company.model';
import { CompanyService } from './shared/services/company.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateArticleDialogComponent } from '../articles/create-article-dialog/create-article-dialog.component';
import * as FileSaver from 'file-saver';
import { ArticleService } from '../articles/shared/services/article.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import Swal from 'sweetalert2';
import { ExportDialogComponent } from '../export-dialog/export-dialog.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'quantity'];
  public companies: Company[] = [];
  public dataSource = [];
  public userRole: string = '';

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private readonly companyService: CompanyService,
    private readonly articleService: ArticleService,
    private readonly authService: AuthenticationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCompanies();
    this.userRole = this.authService.getUserRole();
  }

  getCompanies(): void {
    this.companyService.getCompanies().subscribe(res => {
      this.companies = res;
    })
  }

  addArticle(inventoryId: string) {
    const dialogRef = this.dialog.open(CreateArticleDialogComponent, {
      width: '250px',
      data: { inventoryId },
    });
    dialogRef.afterClosed().subscribe((article) => {
      if (article) {
        this.articleService.createArticle(article).subscribe(() => {
          Swal.fire({
            title: '<p><small>Artículo creado correctamente</small></p>',
            icon: 'success',
            confirmButtonText: '<a>Ok</a>'
          });
          this.getCompanies();
        }, () => {
          Swal.fire({
            title: '<p><small>No se pudo crear el articulo</small></p>',
            icon: 'error',
            confirmButtonText: '<a>Ok</a>'
          });
        });
      }
    });
  }

  exportToPdf(inventoryId: string): void {
    const dialogRef = this.dialog.open(ExportDialogComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe((email) => {
      if (email) {
        this.articleService.exportArticles(inventoryId, email).subscribe(res => {
          const byteCharacters = atob(res);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {type: "application/pdf"});
          FileSaver.saveAs(blob, 'test.pdf');
          Swal.fire({
            title: '<p><small>Recibirá un correo con el inventario adjunto</small></p>',
            icon: 'success',
            confirmButtonText: '<a>Ok</a>'
          });
        });
      }
    });
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }

}
