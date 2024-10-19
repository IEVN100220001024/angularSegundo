import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
 
 
 
@Component({
  selector: 'app-zodiaco',
  templateUrl: './zodiaco.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class ZodiacoComponent implements OnInit {
  formulario!: FormGroup;
  resultado: string = '';
  imagenSigno: string = '';
  dia: any;
  mes: any;
  anio: any;
  edad: number | undefined;
 
  constructor() {}
 
  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellidop: new FormControl('', Validators.required),
      apellidom: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('', Validators.required),
      genero: new FormControl('', Validators.required)
    });
  }
 
  calcularEdad(fechaNacimiento: Date): number {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
   
    // Verificamos si ya pasó el cumpleaños en el año actual
    if (
        hoy.getMonth() < fechaNacimiento.getMonth() ||
        (hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() < fechaNacimiento.getDate()) ||
        (hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() === fechaNacimiento.getDate() && hoy.getHours() < fechaNacimiento.getHours())
    ) {
        edad--;
    }
 
    return edad;
}
 
  calcularZodiacoChino(anio: number): { signo: string, imagenUrl: string } {
    const signosChinos = [
      { signo: 'Rata', imagenUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_XgkW5z5F-0eAAYQzf-EL6TUvzps3u1c0fg&s' },
      { signo: 'Buey', imagenUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Ox.svg' },
      { signo: 'Tigre', imagenUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5_-2vtajPrJQ8Jlx4Z4-uu7TMm3Ehrk-DFQ&s' },
      { signo: 'Conejo', imagenUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Rabbit.svg' },
      { signo: 'Dragón', imagenUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Dragon.svg/300px-Dragon.svg.png' },
      { signo: 'Serpiente', imagenUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Snake.svg' },
      { signo: 'Caballo', imagenUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRUDWiaazHzSAjCYHn1CNxK3IxD7t-pssmHw&s' },
      { signo: 'Cabra', imagenUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Goat.svg' },
      { signo: 'Mono', imagenUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGJ-z4kQsyQFTUHepVKqSEw1S6epvBb4-S1w&s' },
      { signo: 'Gallo', imagenUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWcN20LgK-rItafg6Ma6vG-a8-BzD5QW4bBA&s' },
      { signo: 'Perro', imagenUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Dog_2.svg' },
      { signo: 'Cerdo', imagenUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Boar.svg/1200px-Boar.svg.png' }
    ];
    const indice = (anio - 1900) % 12;
    return signosChinos[indice];
  }
 
  imprimirResultado(): void {
    if (this.formulario.valid) {
      const fechaNacimiento = new Date(this.formulario.get('fechaNacimiento')?.value);
      const anioNacimiento = fechaNacimiento.getFullYear();
      const edad = this.calcularEdad(fechaNacimiento);
      const { signo, imagenUrl } = this.calcularZodiacoChino(anioNacimiento);
 
      this.resultado = `Hola ${this.formulario.get('nombre')?.value} ${this.formulario.get('apellidop')?.value} ${this.formulario.get('apellidom')?.value}, tienes ${edad} años y tu signo zodiacal chino es ${signo}.`;
      this.imagenSigno = imagenUrl;
    }
  }
}