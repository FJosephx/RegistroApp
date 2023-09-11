import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})
export class MiclasePage implements OnInit {
  datosQR: any; // Variable para almacenar los datos del QR

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtener los datos del QR de los parámetros de la URL (queryParams)
    this.route.queryParams.subscribe(params => {
      if (params && params['datosQR']) {
        // Parsea la cadena JSON a un objeto
        this.datosQR = JSON.parse(params['datosQR'] );
      }
    });

    // Los datos del QR están disponibles en this.datosQR
    console.log('Datos del QR:', this.datosQR);
    console.log('Tipo de datos en datosQR:', typeof this.datosQR);
  }

  
  
}
