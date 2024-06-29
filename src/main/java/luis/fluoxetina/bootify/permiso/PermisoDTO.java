package luis.fluoxetina.bootify.permiso;

import jakarta.validation.constraints.Size;


public class PermisoDTO {

    private Long idPermiso;

    @Size(max = 155)
    private String permiso;

    public Long getIdPermiso() {
        return idPermiso;
    }

    public void setIdPermiso(final Long idPermiso) {
        this.idPermiso = idPermiso;
    }

    public String getPermiso() {
        return permiso;
    }

    public void setPermiso(final String permiso) {
        this.permiso = permiso;
    }

}
