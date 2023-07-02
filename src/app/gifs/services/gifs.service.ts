import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, Gifs } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'MRE807JYNIHIdZ0xyG8rox9mE3onP0D8';
  private baseUrl: string = 'http://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public data: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.data = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase();

    if (query.trim().length == 0) {
      return;
    }

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<Gifs>(
        `${ this.baseUrl }/search`, { params }
      )
      .subscribe((resp) => {
        this.data = resp.data;
        localStorage.setItem('resultados', JSON.stringify(resp.data));
      });
  }

  limpiar () {
    localStorage.clear();
    this._historial = [];
  }

}
