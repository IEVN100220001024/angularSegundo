import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Usuarios{
  nombre:string;
  edad:number;
  email:string;
}

@Component({
  selector: 'app-ejemplo1',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ejemplo1.component.html',
  styleUrl: './ejemplo1.component.css'
})
export class Ejemplo1Component implements OnInit {
  formGroup!: FormGroup;

  materia='pwa'
  tem:string=''
  alumnos:Usuarios={
    nombre:'',
    edad:0,
    email:'',
  }

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.formGroup=this.initForm();
  }
  initForm():FormGroup{
    return this.fb.group({
      nombre:[''],
      edad:[''],
      email:[''],
    })
  }
  onSubmit():void{
    const{nombre,edad,email}=this.formGroup.value;
    this.alumnos.nombre=nombre;
    this.alumnos.edad=edad;
    this.alumnos.email=email;
    let alumnosJSON=JSON.stringify(this.alumnos);

    console.log(this.formGroup.value);

    localStorage.setItem('materia',this.materia);
    localStorage.setItem('alumno',alumnosJSON);
  }

  subImprimir():void{
    this.tem=localStorage.getItem('Materia')!
    
    const alumnosGuardado=localStorage.getItem('Alumno')
    if(alumnosGuardado){
      const alumno:Usuarios=JSON.parse(alumnosGuardado)
    }
  }

}
