import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PersonaListComponent } from './persona/persona-list.component';
import { PersonaAddComponent } from './persona/persona-add.component';
import { PersonaEditComponent } from './persona/persona-edit.component';
import { UsuarioListComponent } from './usuario/usuario-list.component';
import { UsuarioAddComponent } from './usuario/usuario-add.component';
import { UsuarioEditComponent } from './usuario/usuario-edit.component';
import { PermisoListComponent } from './permiso/permiso-list.component';
import { PermisoAddComponent } from './permiso/permiso-add.component';
import { PermisoEditComponent } from './permiso/permiso-edit.component';
import { ErrorComponent } from './error/error.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: $localize`:@@home.index.headline:Welcome to your new app!`
  },
  {
    path: 'personas',
    component: PersonaListComponent,
    title: $localize`:@@persona.list.headline:Personae`
  },
  {
    path: 'personas/add',
    component: PersonaAddComponent,
    title: $localize`:@@persona.add.headline:Add Persona`
  },
  {
    path: 'personas/edit/:idPersona',
    component: PersonaEditComponent,
    title: $localize`:@@persona.edit.headline:Edit Persona`
  },
  {
    path: 'usuarios',
    component: UsuarioListComponent,
    title: $localize`:@@usuario.list.headline:Usuarios`
  },
  {
    path: 'usuarios/add',
    component: UsuarioAddComponent,
    title: $localize`:@@usuario.add.headline:Add Usuario`
  },
  {
    path: 'usuarios/edit/:idUsuario',
    component: UsuarioEditComponent,
    title: $localize`:@@usuario.edit.headline:Edit Usuario`
  },
  {
    path: 'permisos',
    component: PermisoListComponent,
    title: $localize`:@@permiso.list.headline:Permisoes`
  },
  {
    path: 'permisos/add',
    component: PermisoAddComponent,
    title: $localize`:@@permiso.add.headline:Add Permiso`
  },
  {
    path: 'permisos/edit/:idPermiso',
    component: PermisoEditComponent,
    title: $localize`:@@permiso.edit.headline:Edit Permiso`
  },
  {
    path: 'error',
    component: ErrorComponent,
    title: $localize`:@@error.headline:Error`
  },
  {
    path: '**',
    component: ErrorComponent,
    title: $localize`:@@notFound.headline:Page not found`
  }
];
