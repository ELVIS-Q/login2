import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}

  // 🔹 Registrar usuario
  register(email: string, password: string): string {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const userExists = users.some((u: any) => u.email === email);
    if (userExists) {
      return 'El usuario ya existe';
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));

    return 'Registro exitoso';
  }

  // 🔹 Iniciar sesión con token
  login(email: string, password: string): string {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      // Generar un token simulado
      const token = this.generateToken();
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', email);

      return `Inicio de sesión exitoso. Token generado: ${token}`;
    }

    return 'Correo o contraseña incorrectos';
  }

  // 🔹 Generar token aleatorio (simulado)
  private generateToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  // 🔹 Obtener usuario logueado
  getCurrentUser(): string | null {
    return localStorage.getItem('currentUser');
  }

  // 🔹 Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  // 🔹 Verificar si hay sesión activa
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
