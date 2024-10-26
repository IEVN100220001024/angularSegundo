import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormEmpleadosComponent } from './form-empleados.component';
 
describe('FormEmpleadosComponent', () => {
  let component: FormEmpleadosComponent;
  let fixture: ComponentFixture<FormEmpleadosComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormEmpleadosComponent]
    })
    .compileComponents();
 
    fixture = TestBed.createComponent(FormEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should calculate the correct hours to pay, extra hours, and subtotal', () => {
    const form = component.formularioEmpleado;
    form.get('matricula')?.setValue('1234');
    form.get('nombre')?.setValue('Juan');
    form.get('correo')?.setValue('juan@example.com');
    form.get('edad')?.setValue(25);
    form.get('horasTrabajadas')?.setValue(45);  
 
    component.agregarEmpleado();
 
    const empleado = component.empleados[0];
    expect(empleado.horasPorPagar).toBe(40); 
    expect(empleado.horasExtras).toBe(5); 
    expect(empleado.subTotal).toBe((40 * 70) + (5 * 140)); 
  });
 
  it('should calculate the total amount to pay correctly', () => {
    const form = component.formularioEmpleado;
 

    form.get('matricula')?.setValue('1234');
    form.get('nombre')?.setValue('Juan');
    form.get('correo')?.setValue('juan@example.com');
    form.get('edad')?.setValue(25);
    form.get('horasTrabajadas')?.setValue(45);
    component.agregarEmpleado();
 
    form.get('matricula')?.setValue('5678');
    form.get('nombre')?.setValue('Maria');
    form.get('correo')?.setValue('maria@example.com');
    form.get('edad')?.setValue(30);
    form.get('horasTrabajadas')?.setValue(40);
    component.agregarEmpleado();
 
    const totalEsperado = (40 * 70 + 5 * 140) + (40 * 70); 
    expect(component.totalPagar).toBe(totalEsperado);
  });
 
  it('should load an employee into the form for modification', () => {
    const form = component.formularioEmpleado;
    component.empleados = [
      { matricula: '1234', nombre: 'Juan', correo: 'juan@example.com', edad: 25, horasTrabajadas: 45, horasPorPagar: 40, horasExtras: 5, subTotal: (40 * 70 + 5 * 140) }
    ];
 
    component.modificarEmpleado(0);
 
    expect(form.get('matricula')?.value).toBe('1234');
    expect(form.get('nombre')?.value).toBe('Juan');
    expect(form.get('correo')?.value).toBe('juan@example.com');
    expect(form.get('edad')?.value).toBe(25);
    expect(form.get('horasTrabajadas')?.value).toBe(45);
  });
 
  it('should update an employee when modified', () => {
    const form = component.formularioEmpleado;
    component.empleados = [
      { matricula: '1234', nombre: 'Juan', correo: 'juan@example.com', edad: 25, horasTrabajadas: 45, horasPorPagar: 40, horasExtras: 5, subTotal: (40 * 70 + 5 * 140) }
    ];
 
    component.modificarEmpleado(0);
 
    form.get('horasTrabajadas')?.setValue(50);
    component.agregarEmpleado();
 
    const empleadoActualizado = component.empleados[0];
    expect(empleadoActualizado.horasPorPagar).toBe(40);
    expect(empleadoActualizado.horasExtras).toBe(10);
    expect(empleadoActualizado.subTotal).toBe((40 * 70) + (10 * 140));
  });
 
  it('should delete an employee and update the total amount to pay', () => {
    component.empleados = [
      { matricula: '1234', nombre: 'Juan', correo: 'juan@example.com', edad: 25, horasTrabajadas: 45, horasPorPagar: 40, horasExtras: 5, subTotal: (40 * 70 + 5 * 140) },
      { matricula: '5678', nombre: 'Maria', correo: 'maria@example.com', edad: 30, horasTrabajadas: 40, horasPorPagar: 40, horasExtras: 0, subTotal: (40 * 70) }
    ];
 
    component.eliminarEmpleado(0);
 
    expect(component.empleados.length).toBe(1);
    expect(component.totalPagar).toBe(40 * 70); 
  });
});