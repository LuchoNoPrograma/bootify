package luis.fluoxetina.bootify.usuario;

import java.util.List;
import luis.fluoxetina.bootify.permiso.Permiso;
import luis.fluoxetina.bootify.persona.Persona;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Usuario findFirstByPersona(Persona persona);

    Usuario findFirstByListaPermiso(Permiso permiso);

    List<Usuario> findAllByListaPermiso(Permiso permiso);

}
