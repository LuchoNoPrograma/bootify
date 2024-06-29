package luis.fluoxetina.bootify.persona;

import jakarta.validation.constraints.Size;
import java.time.LocalDate;


public class PersonaDTO {

    private Long idPersona;

    @Size(max = 55)
    private String nombres;

    @Size(max = 100)
    private String apellidos;

    private LocalDate fechaNacimiento;

    @Size(max = 155)
    private String email;

    public Long getIdPersona() {
        return idPersona;
    }

    public void setIdPersona(final Long idPersona) {
        this.idPersona = idPersona;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(final String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(final String apellidos) {
        this.apellidos = apellidos;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(final LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

}
