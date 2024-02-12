import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
 

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router ) { }

  ngOnInit(): void {
  }

  addUser() {

    // Validamos que el usuario ingrese valores
    if (this.username == '' || this.password == '' || this.confirmPassword == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Validamos que las password sean iguales
    if (this.password != this.confirmPassword) {
      this.toastr.error('Las passwords ingresadas son distintas', 'Error');
      return;
    }

    // Creamos el objeto
    const user: User = {
      username: this.username,
      password: this.password
    }

    this.loading = true;
    
    console.log(user)

    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(`El usuario ${this.username} fue registrado con exito`, 'Usuario registrado');
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        if(e.error.msg){
          this.toastr.error(e.error.msg, 'Error')
        }else{
          this.toastr.error('ocurrio un error comuniquese con el administrador', 'Error')
        } 
      }
  });

   


   /* this._userService.signIn(user).subscribe(data =>{
        this.loading = true;
        this.toastr.success(`El usuario ${this.username} fue registrado con éxito`, 'Usuario registrado');
        this.router.navigate(['/login']);
       
    }, (event: HttpErrorResponse) =>{
      this.loading = false;
      if(event.error.msg){
        this.toastr.error(event.error.msg, 'Error')
      }else{
        this.toastr.error('ocurrio un error comuniquese con el administrador', 'Error')
      } 
      
    
    });*/
    
  }
}