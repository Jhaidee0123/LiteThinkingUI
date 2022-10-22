import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public networkStatus = false;
  public networkStatus$ = Subscription.EMPTY;
  public online$ = new Observable<boolean>();
  public loading$ = new Observable<boolean>();

  private readonly durationInSeconds = 5;

  constructor(
    private readonly loadingService: LoadingService,
    private readonly snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.checkNetworkStatus();
    this.online$.subscribe();
    this.loading$ = this.loadingService.loading$.pipe(delay(0));
  }

  public ngOnDestroy(): void {
    this.checkNetworkStatus();
  }

  private openSnackBar(): void {
    this.snackBar.open('You are offline ', '', {
      duration: this.durationInSeconds * 1000,
    });
  }

  private checkNetworkStatus(): void {
    this.networkStatus = navigator.onLine;
    this.online$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    ).pipe(
      map(() => navigator.onLine),
      tap((online) => {
        if (!online) {
          this.openSnackBar();
        }
      })
    );

    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe((status) => {
        this.networkStatus = status;
      });
  }
}
