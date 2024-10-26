import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-empleados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-empleados.component.html',
  styleUrls: ['./form-empleados.component.css']
})

export class FormEmpleadosComponent {
  formularioEmpleado: FormGroup;
  empleados: any[] = [];
  tablaVisible = false;
  totalPagar = 0;
  indiceModificacion: number | null = null;

  constructor(private fb: FormBuilder) {
    this.formularioEmpleado = this.fb.group({
      matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(18)]],
      horasTrabajadas: ['', [Validators.required, Validators.min(0)]]
    });
    this.cargarEmpleados();
  }

  agregarEmpleado() {
    const nuevoEmpleado = this.formularioEmpleado.value;
    const horasExtras = nuevoEmpleado.horasTrabajadas > 40 ? (nuevoEmpleado.horasTrabajadas - 40) * 140 : 0;
    const horasPorPagar = nuevoEmpleado.horasTrabajadas <= 40 ? nuevoEmpleado.horasTrabajadas * 70 : 40 * 70;
    const subTotal = horasPorPagar + horasExtras;

    const empleado = {
      ...nuevoEmpleado,
      horasPorPagar,
      horasExtras,
      subTotal
    };

    if (this.indiceModificacion !== null) {
      this.empleados[this.indiceModificacion] = empleado;
      this.indiceModificacion = null;
    } else {
      this.empleados.push(empleado);
    }

    this.actualizarTotalPagar();
    this.guardarEmpleados();
    this.formularioEmpleado.reset();
  }

  mostrarTabla() {
    this.tablaVisible = true;
    this.actualizarTotalPagar();
  }

  modificarEmpleado(index: number) {
    this.formularioEmpleado.patchValue(this.empleados[index]);
    this.indiceModificacion = index;
  }

  eliminarEmpleado(index: number) {
    this.empleados.splice(index, 1);
    this.actualizarTotalPagar(); 
    this.guardarEmpleados();
  }

  actualizarTotalPagar() {
    this.totalPagar = this.empleados.reduce((acc, empleado) => acc + empleado.subTotal, 0);
  }

  guardarEmpleados() {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  cargarEmpleados() {
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
      this.actualizarTotalPagar();
    }
  }
}

