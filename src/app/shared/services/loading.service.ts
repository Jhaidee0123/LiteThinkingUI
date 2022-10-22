import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public loading$ = new BehaviorSubject<boolean>(false);
  private loadingRequests = new Map<string, boolean>();

  constructor() {}

  public setLoading(url: string, loading: boolean): void {
    if (!url) {
      throw new Error('The request URL must be provided to track its status');
    }

    if (loading) {
      this.loadingRequests.set(url, loading);
      this.loading$.next(loading);
    } else if (!loading && this.loadingRequests.has(url)) {
      this.loadingRequests.delete(url);
    }

    if (this.loadingRequests.size === 0) {
      this.loading$.next(false);
    }
  }
}
