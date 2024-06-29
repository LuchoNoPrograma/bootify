import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { UsuarioService } from 'app/usuario/usuario.service';
import { UsuarioDTO } from 'app/usuario/usuario.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm } from 'app/common/utils';


@Component({
  selector: 'app-usuario-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './usuario-edit.component.html'
})
export class UsuarioEditComponent implements OnInit {

  usuarioService = inject(UsuarioService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  personaValues?: Map<number,string>;
  listaPermisoValues?: Map<number,string>;
  currentIdUsuario?: number;

  editForm = new FormGroup({
    idUsuario: new FormControl({ value: null, disabled: true }),
    nombreUsuario: new FormControl(null, [Validators.maxLength(30)]),
    contrasena: new FormControl(null, [Validators.maxLength(255)]),
    habilitado: new FormControl(false),
    persona: new FormControl(null),
    listaPermiso: new FormControl([])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@usuario.update.success:Usuario was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentIdUsuario = +this.route.snapshot.params['idUsuario'];
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
    this.usuarioService.getUsuario(this.currentIdUsuario!)
        .subscribe({
          next: (data) => updateForm(this.editForm, data),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.editForm.markAllAsTouched();
    if (!this.editForm.valid) {
      return;
    }
    const data = new UsuarioDTO(this.editForm.value);
    this.usuarioService.updateUsuario(this.currentIdUsuario!, data)
        .subscribe({
          next: () => this.router.navigate(['/usuarios'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
