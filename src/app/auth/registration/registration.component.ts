import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  email!: string;
  password!: string;



  constructor(private authService: AuthService, private router: Router){}

  registration(email: string, password: string): void {
    this.authService.registration(email, password).subscribe(
    (response: User) => {
      this.router.navigate(['/login'])
    }
    )
  }

  back(){
    this.router.navigateByUrl('');
  }

}
