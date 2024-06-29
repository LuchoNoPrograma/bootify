export class PermisoDTO {

  constructor(data:Partial<PermisoDTO>) {
    Object.assign(this, data);
  }

  idPermiso?: number|null;
  permiso?: string|null;

}
