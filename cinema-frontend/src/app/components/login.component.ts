import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    username: [''],
    password: ['']
  });

  login(): void {
    const { username, password } = this.form.value;
    if (username && password) {
      this.auth.login(username, password).subscribe(success => {
        if (success) {
          this.router.navigate(['/admin']);
        } else {
          alert('Login fallito');
        }
      });
    }
  }
}
