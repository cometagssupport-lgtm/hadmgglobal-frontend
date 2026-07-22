import { HttpInterceptorFn, HttpResponse, HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { encryptPayload, decryptPayload } from '../utils/crypto.util';
import { map, Observable } from 'rxjs';

export const EncryptionInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  
  // Only apply encryption if enabled in environment
  if (!environment.enablePayloadEncryption) {
    return next(req);
  }

  // 1. Encrypt outgoing request body (if present and it is a mutating request)
  let newReq = req;
  if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
    try {
      const encryptedData = encryptPayload(req.body);
      newReq = req.clone({
        body: { payload: encryptedData }
      });
    } catch (error) {
      console.error('Error encrypting request', error);
      // Fallback to unencrypted or handle error gracefully based on requirements
    }
  }

  // 2. Decrypt incoming response body
  return next(newReq).pipe(
    map((event: HttpEvent<any>) => {
      // Intercept only HttpResponse events that contain our encrypted payload structure
      if (event instanceof HttpResponse && event.body && event.body.payload) {
        try {
          const decryptedData = decryptPayload(event.body.payload);
          return event.clone({ body: decryptedData });
        } catch (error) {
          console.error('Error decrypting response', error);
        }
      }
      return event;
    })
  );
};
