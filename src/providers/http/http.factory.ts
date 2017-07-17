import { RequestOptions, XHRBackend } from '@angular/http';
import { HttpService } from './http.service';
import { TokenProvider } from '../token/token';

export function HttpFactory(backend: XHRBackend,
                            options: RequestOptions,
                            tokenProvider: TokenProvider) {

  return new HttpService(backend, options, tokenProvider);
}