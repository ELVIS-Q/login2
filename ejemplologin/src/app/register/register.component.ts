import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(private userService: UserService) {}

  register() {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.message = 'Por favor llena todos los campos ❌';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.message = 'Las contraseñas no coinciden ⚠️';
      return;
    }

    this.message = this.userService.register(this.email, this.password);
  }
}
