import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { PermisoDTO } from 'app/permiso/permiso.model';


@Injectable({
  providedIn: 'root',
})
export class PermisoService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/permisos';

  getAllPermisoes() {
    return this.http.get<PermisoDTO[]>(this.resourcePath);
  }

  getPermiso(idPermiso: number) {
    return this.http.get<PermisoDTO>(this.resourcePath + '/' + idPermiso);
  }

  createPermiso(permisoDTO: PermisoDTO) {
    return this.http.post<number>(this.resourcePath, permisoDTO);
  }

  updatePermiso(idPermiso: number, permisoDTO: PermisoDTO) {
    return this.http.put<number>(this.resourcePath + '/' + idPermiso, permisoDTO);
  }

  deletePermiso(idPermiso: number) {
    return this.http.delete(this.resourcePath + '/' + idPermiso);
  }

}
