import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import Swal from 'sweetalert2';
import { LoginService } from './shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public emailPattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  public loginForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly loginService: LoginService,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  public submit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginService
        .login({
          email,
          password,
        })
        .subscribe(({ token }) => {
          Swal.fire({
            title: '<p><small>Iniciaste sesión correctamente</small></p>',
            icon: 'success',
            confirmButtonText: '<a class="fuente">Ok</a>'
          });
          localStorage.setItem('token', token);
          this.authenticationService.authenticate();
          this.router.navigate(['/companies']);
        }, () => {
          Swal.fire({
            title: '<p><small>Hubo un error iniciando sesión</small></p>',
            icon: 'error',
            confirmButtonText: '<a class="fuente">Ok</a>'
          });
        });
    }
  }

  get email(): any {
    return this.loginForm.get('email');
  }

  get password(): any {
    return this.loginForm.get('password');
  }
}
