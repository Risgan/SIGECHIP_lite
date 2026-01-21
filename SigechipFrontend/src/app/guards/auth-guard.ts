import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  debugger
  console.log(route, state);

  const url = state.url;

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      return true; // Permitir el acceso si hay un token
    }
    else if (url.startsWith('/petdetail/')) {// Comprobar si la URL comienza con '/petdetail/'
      // Permitir el acceso si la ruta empieza con '/petdetail/'
      return true;
    }
    else {
      // Redirigir a la página de login si no hay token
      window.location.href = '/login'; // Cambia esto según tu configuración de rutas
      return false;
    }
  }
  return false; // Retornar false si no es el contexto del navegador
};