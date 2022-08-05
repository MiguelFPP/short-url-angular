import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShortUrlService {
  url = 'https://api-ssl.bitly.com/v4/shorten';

  constructor(private http: HttpClient) {}


  /**
   * It takes a url as a parameter, creates a header with the token, creates a body with the url, and
   * then sends a post request to the url with the header and body
   * @param {string} url - The URL to shorten.
   * @returns Observable<any>
   */
  getUrlShort(url: string): Observable<any> {
    /* const tokenHeader = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    }); */
    const body = { long_url: url };

    return this.http.post(this.url, body);
  }
}
