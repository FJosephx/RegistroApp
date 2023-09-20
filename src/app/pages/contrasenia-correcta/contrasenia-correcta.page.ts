import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contrasenia-correcta',
  templateUrl: './contrasenia-correcta.page.html',
  styleUrls: ['./contrasenia-correcta.page.scss'],
})

export class ContraseniaCorrectaPage {
  contrasenaRecuperada: string = '';

  constructor(private route: ActivatedRoute) {
    // Obtén el parámetro de la contraseña de la URL
    const contrasenaRecuperada = this.route.snapshot.paramMap.get('contrasena');
    if (contrasenaRecuperada) {
      this.contrasenaRecuperada = contrasenaRecuperada;
    }
  }
}
