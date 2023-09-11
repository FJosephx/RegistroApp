import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.page.html',
  styleUrls: ['./recuperar-contrasenia.page.scss'],
})
export class RecuperarContraseniaPage {
  public correo = '';

  recuperarContrasena() {
    // Aquí puedes enviar un correo de recuperación de contraseña al correo proporcionado.
  }

}
