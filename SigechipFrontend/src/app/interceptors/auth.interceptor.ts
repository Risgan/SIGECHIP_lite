import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  // Obtener el token del sessionStorage

  try {
    const token = localStorage.getItem('token');

    // Si el token existe, clonamos la solicitud y agregamos el token en el header
    if (token) {
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next(modifiedReq);
    }
  
    // Si no hay token, la solicitud original sigue sin cambios
    return next(req);
  }catch (error) {
    console.error('Error al interceptar la solicitud:', error);
    return next(req); // En caso de error, se envía la solicitud original
  }

 
};
