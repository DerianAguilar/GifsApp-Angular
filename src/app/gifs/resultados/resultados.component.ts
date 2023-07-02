import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html'
})
export class ResultadosComponent {

  get resultados () {
    return this.gifService.data;
  }

  constructor ( private gifService: GifsService ) {}

}
