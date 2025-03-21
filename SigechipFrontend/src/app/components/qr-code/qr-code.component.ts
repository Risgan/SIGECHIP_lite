import { Component, Input, OnInit,ViewChild, ElementRef } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { MascotaService } from '../../services/mascota.service';
import { environment } from '../../../environments/environment.development';
import { PropietarioService } from '../../services/propietario.service';
import { PrimengModule } from '../../shared/primeng/primeng.module';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [QRCodeModule, PrimengModule],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.scss'
})
export class QrCodeComponent implements OnInit {

  // qrData: string = 'https://neuralnet.com';

  // qrData: string = JSON.stringify({
  //   nombre: "Nico",
  //   edad: "5 años",
  //   contacto: "3022867851",
  //   correo: "johnruedaf@gmail.com",
  //   propietario: "John Rueda",
  //   url: "http://localhost:4205/petdetail/2"
  // });
  private _idMascota: number = 0;

  @Input() 
  set idMascota(value: number) {
    if (value) {
      this._idMascota = value;
      this.loadData();  // Se ejecuta cuando cambia el valor
    }
  }
  
  @ViewChild('qrContainer', { static: false }) qrContainer!: ElementRef;

  
  get idMascota(): number {
    return this._idMascota;
  }

  qrData: string = `nombre: Nico
  edad: 5 años
  contacto: 3022867851
  correo: johnruedaf@gmail.com
  propietario: John Rueda
  
  Más info: http://localhost:4205/petdetail/2`;


  constructor(
    private mascotaService: MascotaService,
    private propietarioService: PropietarioService
  ) { }

  ngOnInit() {

  }

  loadData(){
    console.log('ID Mascota:', this.idMascota);

    

    this.mascotaService.getMascotaById(this.idMascota).subscribe(mascota => {

      this.propietarioService.getPropietarioById(mascota.idPropietario).subscribe(propietario => {

        console.log('Mascota:', mascota);
        console.log('Propietario:', propietario);
        const hoy = new Date();
        const fechaNac = new Date(mascota.fechaNacimiento);

        this.qrData = `
        nombre: ${mascota.nombre}
        edad: ${hoy.getFullYear() - fechaNac.getFullYear()} años
        propietario: ${propietario.nombre} ${propietario.apellido}
        contacto: ${propietario.celular}
        correo: ${propietario.email}
        Más info: ${environment.apiFront}petdetail/${mascota.id}
        `

      });

    });
  }

  printQRCode() {
    const qrContent = document.getElementById('printQR');
  
    if (qrContent) {
      const printWindow = window.open('', '_blank');
  
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(`
          <html>
            <head>
              <title>Imprimir QR</title>
              <style>
                body { text-align: center; margin: 50px; }
              </style>
            </head>
            <body>
              ${qrContent.innerHTML}
              <script>
                setTimeout(() => { window.print(); window.close(); }, 500);
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  }
  
}
