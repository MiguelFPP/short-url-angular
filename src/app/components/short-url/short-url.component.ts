import { Component, OnInit } from '@angular/core';
import { ShortUrlService } from 'src/app/services/short-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css'],
})
export class ShortUrlComponent implements OnInit {
  nombreUrl: string;
  urlShort: string;
  urlProcesada: boolean;
  loading: boolean;

  mostrarError: boolean;
  textError: string;

  constructor(private _shortUrlService: ShortUrlService) {
    this.nombreUrl = '';
    this.urlShort = '';
    this.urlProcesada = false;
    this.loading = false;
    this.mostrarError = false;
    this.textError = '';
  }

  ngOnInit(): void {}

  procesarUrl(): void {
    /* validar campo */
    if (this.nombreUrl === '') {
      this.mostrarError = true;
      this.textError = 'El campo no puede estar vacio';

      setTimeout(() => {
        this.mostrarError = false;
        this.textError = '';
      }, 3000);

      return;
    }

    this.urlProcesada = false;
    this.loading = true;

    setTimeout(() => {
      this.obtenerUrlShort();
    }, 2000);
  }

  obtenerUrlShort(): void {
    this._shortUrlService.getUrlShort(this.nombreUrl).subscribe(
      ({ link }) => {
        this.loading = false;
        this.urlProcesada = true;
        this.urlShort = link;
      },
      (error) => {
        console.log(error.error.description);

        this.loading = false;
        this.errorUrl('Ingrese una URL valida');
      }
    );
  }

  errorUrl(message: string): void {
    this.mostrarError = true;
    this.textError = message;
    setTimeout(() => {
      this.mostrarError = false;
      this.textError = '';
    }, 3000);
  }
}
