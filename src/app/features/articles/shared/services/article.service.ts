import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateArticle } from '../models/create-article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseApi = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {
  }

  public createArticle(article: CreateArticle): Observable<any> {
    return this.httpClient.post(
      `${this.baseApi}/articles/create-article`,
      article
    );
  }

  public exportArticles(inventoryId: string, email: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseApi}/articles/export-articles/${inventoryId}/${email}`);
  }
}
