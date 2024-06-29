export class PersonaDTO {

  constructor(data:Partial<PersonaDTO>) {
    Object.assign(this, data);
  }

  idPersona?: number|null;
  nombres?: string|null;
  apellidos?: string|null;
  fechaNacimiento?: string|null;
  email?: string|null;

}
