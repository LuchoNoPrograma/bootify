package luis.fluoxetina.bootify.usuario;

import jakarta.validation.constraints.Size;
import java.util.List;


public class UsuarioDTO {

    private Long idUsuario;

    @Size(max = 30)
    private String nombreUsuario;

    @Size(max = 255)
    private String contrasena;

    private Boolean habilitado;

    private Long persona;

    private List<Long> listaPermiso;

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(final Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(final String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(final String contrasena) {
        this.contrasena = contrasena;
    }

    public Boolean getHabilitado() {
        return habilitado;
    }

    public void setHabilitado(final Boolean habilitado) {
        this.habilitado = habilitado;
    }

    public Long getPersona() {
        return persona;
    }

    public void setPersona(final Long persona) {
        this.persona = persona;
    }

    public List<Long> getListaPermiso() {
        return listaPermiso;
    }

    public void setListaPermiso(final List<Long> listaPermiso) {
        this.listaPermiso = listaPermiso;
    }

}
