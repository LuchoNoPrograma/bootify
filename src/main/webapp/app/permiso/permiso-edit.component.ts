import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { PermisoService } from 'app/permiso/permiso.service';
import { PermisoDTO } from 'app/permiso/permiso.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm } from 'app/common/utils';


@Component({
  selector: 'app-permiso-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './permiso-edit.component.html'
})
export class PermisoEditComponent implements OnInit {

  permisoService = inject(PermisoService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  currentIdPermiso?: number;

  editForm = new FormGroup({
    idPermiso: new FormControl({ value: null, disabled: true }),
    permiso: new FormControl(null, [Validators.maxLength(155)])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@permiso.update.success:Permiso was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentIdPermiso = +this.route.snapshot.params['idPermiso'];
    this.permisoService.getPermiso(this.currentIdPermiso!)
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
    const data = new PermisoDTO(this.editForm.value);
    this.permisoService.updatePermiso(this.currentIdPermiso!, data)
        .subscribe({
          next: () => this.router.navigate(['/permisos'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
