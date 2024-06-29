import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { UsuarioService } from 'app/usuario/usuario.service';
import { UsuarioDTO } from 'app/usuario/usuario.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-usuario-add',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './usuario-add.component.html'
})
export class UsuarioAddComponent implements OnInit {

  usuarioService = inject(UsuarioService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  personaValues?: Map<number,string>;
  listaPermisoValues?: Map<number,string>;

  addForm = new FormGroup({
    nombreUsuario: new FormControl(null, [Validators.maxLength(30)]),
    contrasena: new FormControl(null, [Validators.maxLength(255)]),
    habilitado: new FormControl(false),
    persona: new FormControl(null),
    listaPermiso: new FormControl([])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@usuario.create.success:Usuario was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.usuarioService.getPersonaValues()
        .subscribe({
          next: (data) => this.personaValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.usuarioService.getListaPermisoValues()
        .subscribe({
          next: (data) => this.listaPermisoValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new UsuarioDTO(this.addForm.value);
    this.usuarioService.createUsuario(data)
        .subscribe({
          next: () => this.router.navigate(['/usuarios'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
