import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateArticle } from '../shared/models/create-article.model';
import { ArticleService } from '../shared/services/article.service';

@Component({
  selector: 'app-create-article-dialog',
  templateUrl: './create-article-dialog.component.html',
  styleUrls: ['./create-article-dialog.component.css']
})
export class CreateArticleDialogComponent implements OnInit {
  public articleForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateArticleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      quantity: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  submit(): void {
    if (this.articleForm.valid) {
      const { name, quantity } = this.articleForm.value;
      const article: CreateArticle = {
        inventoryId: this.data.inventoryId,
        name,
        quantity
      }
      this.dialogRef.close(article);
    }

  }

}
