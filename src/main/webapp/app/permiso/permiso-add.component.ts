import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { PermisoService } from 'app/permiso/permiso.service';
import { PermisoDTO } from 'app/permiso/permiso.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-permiso-add',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './permiso-add.component.html'
})
export class PermisoAddComponent {

  permisoService = inject(PermisoService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  addForm = new FormGroup({
    permiso: new FormControl(null, [Validators.maxLength(155)])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@permiso.create.success:Permiso was created successfully.`
    };
    return messages[key];
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new PermisoDTO(this.addForm.value);
    this.permisoService.createPermiso(data)
        .subscribe({
          next: () => this.router.navigate(['/permisos'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
