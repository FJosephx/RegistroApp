import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import jsQR from 'jsqr';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  nombreUsuario = '';

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['nombreUsuario']) {
      this.nombreUsuario = state['nombreUsuario'];
    }
  }

  async abrirCamara() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });

      
      if (image.dataUrl !== undefined && image.dataUrl.trim() !== '') {
        console.log('Imagen capturada:', image.dataUrl);

        // Decodifica el contenido del código QR utilizando jsQR
        const qrData = await this.decodificarQR(image.dataUrl);

        if (qrData) {
          // Almacena los datos del QR
          console.log('Datos del QR:', qrData); //Verificamos en consola
          // Redirige a la página "miclase" y pasa los datos como parámetros
          this.router.navigate(['/miclase'], {
            queryParams: { datosQR: qrData },
          });
        } else {
          
          console.error('Código QR no válido.');
        }
      } else {
        
        console.error('URL de datos de imagen indefinida.');
      }
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  }

  async subirArchivo() {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');

    fileInput.addEventListener('change', async () => {
      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = async (e) => {
          if (e.target) {
            const dataUrl = e.target.result as string;

            // Decodificar el contenido del código QR utilizando jsQR
            const qrData = await this.decodificarQR(dataUrl);

            if (qrData) {
              // Almacena los datos del QR
              console.log('Datos del QR:', qrData); //Verificamos en consola
              // Redirige a la página "miclase" y pasa los datos como parámetros
              this.router.navigate(['/miclase'], {
                queryParams: { datosQR: qrData },
              });
            } else {
              
              console.error('Código QR no válido.');
            }
          }
        };

        reader.readAsDataURL(file);
      }
    });

    fileInput.click();
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
