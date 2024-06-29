import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { PermisoService } from 'app/permiso/permiso.service';
import { PermisoDTO } from 'app/permiso/permiso.model';


@Component({
  selector: 'app-permiso-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './permiso-list.component.html'})
export class PermisoListComponent implements OnInit, OnDestroy {

  permisoService = inject(PermisoService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  permisoes?: PermisoDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@permiso.delete.success:Permiso was removed successfully.`    };
    return messages[key];
  }

  ngOnInit() {
    this.loadData();
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription!.unsubscribe();
  }
  
  loadData() {
    this.permisoService.getAllPermisoes()
        .subscribe({
          next: (data) => this.permisoes = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(idPermiso: number) {
    if (confirm(this.getMessage('confirm'))) {
      this.permisoService.deletePermiso(idPermiso)
          .subscribe({
            next: () => this.router.navigate(['/permisos'], {
              state: {
                msgInfo: this.getMessage('deleted')
              }
            }),
            error: (error) => this.errorHandler.handleServerError(error.error)
          });
    }
  }

}
