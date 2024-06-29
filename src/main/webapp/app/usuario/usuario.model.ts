export class UsuarioDTO {

  constructor(data:Partial<UsuarioDTO>) {
    Object.assign(this, data);
  }

  idUsuario?: number|null;
  nombreUsuario?: string|null;
  contrasena?: string|null;
  habilitado?: boolean|null;
  persona?: number|null;
  listaPermiso?: number[]|null;

}
