import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService){}

  ngOnInit(): void {
  }

  login() {

    // Validamos que el usuario ingrese datos
    if (this.username == '' || this.password == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }

    // Creamos el body
    const user: User = {
      username: this.username,
      password: this.password
    }

    this.loading = true;
    this._userService.login(user).subscribe({
      next: (response: any) => {
        const token = response.token;
        console.log('token:', token);
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard']);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
      }
    });
    
  }

}
