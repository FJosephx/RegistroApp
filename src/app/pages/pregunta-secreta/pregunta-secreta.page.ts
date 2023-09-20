import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pregunta-secreta',
  templateUrl: './pregunta-secreta.page.html',
  styleUrls: ['./pregunta-secreta.page.scss'],
})

export class PreguntaSecretaPage {
  usuario: any;
  public respuestaSecreta = '';
  contrasena = '';

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {
    const state = this.router.getCurrentNavigation()?.extras?.state;
    if (state && state['usuario']) {
      this.usuario = state['usuario'];
    }
  }

  verificarRespuesta() {
    console.log(this.usuario)
    if (this.usuario && this.respuestaSecreta === this.usuario.respuestaCorrecta) {
      this.mostrarToast('Contraseña recuperada exitosamente. Contraseña: ' + this.usuario.contrasena);
      // Respuesta correcta, redirigir a la página de contrasenia-correcta
      this.router.navigate(['/ingreso'],
      );
    } else {
      // Respuesta incorrecta, mostrar mensaje de error
      this.router.navigate(['/contrasenia-incorrecta']);
    }
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000, // Duración del mensaje en milisegundos
      position: 'top', // Posición del Toast (top, bottom, middle)
    });
    toast.present();
  }
}


