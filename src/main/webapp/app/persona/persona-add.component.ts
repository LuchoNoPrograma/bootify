import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { PersonaService } from 'app/persona/persona.service';
import { PersonaDTO } from 'app/persona/persona.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-persona-add',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './persona-add.component.html'
})
export class PersonaAddComponent {

  personaService = inject(PersonaService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  addForm = new FormGroup({
    nombres: new FormControl(null, [Validators.maxLength(55)]),
    apellidos: new FormControl(null, [Validators.maxLength(100)]),
    fechaNacimiento: new FormControl(null),
    email: new FormControl(null, [Validators.maxLength(155)])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@persona.create.success:Persona was created successfully.`
    };
    return messages[key];
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new PersonaDTO(this.addForm.value);
    this.personaService.createPersona(data)
        .subscribe({
          next: () => this.router.navigate(['/personas'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
