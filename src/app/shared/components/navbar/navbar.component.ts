import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isAuthenticated$!: BehaviorSubject<boolean>;
  public adminAuthenticated$!: BehaviorSubject<boolean>;

  constructor(private readonly authenticationService: AuthenticationService) {}

  public ngOnInit(): void {
    this.isAuthenticated$ = this.authenticationService.isAuthenticated$;
    this.adminAuthenticated$ = this.authenticationService.adminAuthenticated$;
  }

  public logout(): void {
    this.authenticationService.logout();
  }
}
