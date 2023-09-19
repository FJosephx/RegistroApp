import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import jsQR from 'jsqr';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, OnDestroy{
  nombreUsuario = '';
  private videoElement: HTMLVideoElement | null = null;
  private stream: MediaStream | null = null;

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['nombreUsuario']) {
      this.nombreUsuario = state['nombreUsuario'];
    }
  }


  ngOnInit() {
    this.abrirCamara();
  }

  ngOnDestroy() {
    this.detenerCamara();
  }

  async abrirCamara() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement = document.createElement('video');
      this.videoElement.id = 'cameraPreview';
      document.body.appendChild(this.videoElement);
      this.videoElement.srcObject = this.stream;
      this.videoElement.play();
  
      // Inicia la detección de códigos QR en el flujo de video
      this.videoElement.addEventListener('loadedmetadata', () => {
        const canvasElement = document.createElement('canvas');
        const canvasContext = canvasElement.getContext('2d');
        if (!canvasContext) {
          console.error('Contexto de lienzo no disponible');
          return;
        }
        canvasElement.width = this.videoElement?.videoWidth ?? 0;
        canvasElement.height = this.videoElement?.videoHeight ?? 0;
        const intervalId = setInterval(() => {
          if (!this.videoElement || !canvasContext) {
            clearInterval(intervalId);
            return;
          }
          canvasContext.drawImage(this.videoElement, 0, 0, canvasElement.width, canvasElement.height);
          const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            console.log('Datos del QR:', code.data);
            // Redirige a la página "miclase" y pasa los datos como parámetros
            this.router.navigate(['/miclase'], {
              queryParams: { datosQR: code.data },
            });
            // Detén la cámara después de escanear el QR
            this.detenerCamara();
          }
        }, 2000); // Intervalo de detección cada segundo
      });
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  }

  private detenerCamara() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
    if (this.videoElement) {
      this.videoElement.pause();
      this.videoElement.srcObject = null;
    }
  }


  async decodificarQR(dataUrl: string): Promise<string | null> {
    // Convierte el Data URL en una imagen HTML
    const img = new Image();
    img.src = dataUrl;
  
    return new Promise<string | null>((resolve) => {
      // Espera a que la imagen se cargue completamente
      img.onload = () => {
        // Crea un canvas para procesar la imagen
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context?.drawImage(img, 0, 0, img.width, img.height);
  
        // Obtiene los datos del QR utilizando jsQR
        const imageData = context?.getImageData(0, 0, img.width, img.height);
        if (imageData) {
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            resolve(code.data);
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      };
  
      // Maneja el caso en que la imagen no se pueda cargar
      img.onerror = () => {
        resolve(null);
      };
    });
  }
}
