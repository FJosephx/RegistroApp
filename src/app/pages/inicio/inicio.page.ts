import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, IonItem, LoadingController } from '@ionic/angular';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements AfterViewInit {
  nombreUsuario = '';
  private loading: HTMLIonLoadingElement | undefined;
  public escaneando = false;
  public datosQR = '';

  @ViewChild('video', { static: false }) private video!: ElementRef;
  @ViewChild('canvas', { static: false }) private canvas!: ElementRef;
  @ViewChild('asistencia', { read: ElementRef }) private asistencia!: ElementRef<HTMLIonCardTitleElement>


  constructor(private router: Router, private loadingController: LoadingController, private animationController: AnimationController) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['nombreUsuario']) {
      this.nombreUsuario = state['nombreUsuario'];
    }
  }

  public ngAfterViewInit(): void {
    const animation = this.animationController
      .create()
      .addElement(this.asistencia.nativeElement)
      .duration(3000)
      .easing('ease')
      .delay(0)
      .iterations(10)
      .fill('forwards')
      .keyframes([
        { offset: 0, transform: 'scale3d(1,1,1)' },
        { offset: 0.3, transform: 'scale3d(1.25,0.75,1)' },
        { offset: 0.4, transform: 'scale3d(0.75,1.25,1)' },
        { offset: 0.5, transform: 'scale3d(1.15,0.85,1)' },
        { offset: 0.65, transform: 'scale3d(0.95,1.05,1)' },
        { offset: 0.75, transform: 'scale3d(1.05,0.95,1)' },
        { offset: 1, transform: 'scale3d(1,1,1)' },
      ]);

    animation.play();
  }


  public obtenerDatosQR(source?: CanvasImageSource): boolean {
    let w = 0;
    let h = 0;
    if (!source) {
      this.canvas.nativeElement.width = this.video.nativeElement.videoWidth;
      this.canvas.nativeElement.height = this.video.nativeElement.videoHeight;
    }

    w = this.canvas.nativeElement.width;
    h = this.canvas.nativeElement.height;

    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(source ? source : this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    const qrCode: QRCode | null = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      this.escaneando = false;
      this.datosQR = qrCode.data;

      // Redirige a la página "miclase" y pasa los datos como parámetros
      this.router.navigate(['/miclase'], {
        queryParams: { datosQR: this.datosQR },
      });
    }

    return this.datosQR != '';
  }

  public async comenzarEscaneoQR() {
    try {
      const mediaProvider: MediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });

      this.video.nativeElement.srcObject = mediaProvider;
      this.video.nativeElement.setAttribute('playsinline', 'true');
      this.loading = await this.loadingController.create({});
      await this.loading.present();
      this.video.nativeElement.play();
      requestAnimationFrame(this.verificarVideo.bind(this));
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.escaneando = true;
      }
      if (this.obtenerDatosQR()) {
        console.log('Datos obtenidos');
      } else {
        if (this.escaneando) {
          console.log('Escaneando...');
          requestAnimationFrame(this.verificarVideo.bind(this));
        }
      }
    } else {
      console.log('El video aún no obtiene datos');
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

}
