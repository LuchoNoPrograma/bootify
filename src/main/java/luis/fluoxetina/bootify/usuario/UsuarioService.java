package luis.fluoxetina.bootify.usuario;

import jakarta.transaction.Transactional;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import luis.fluoxetina.bootify.permiso.Permiso;
import luis.fluoxetina.bootify.permiso.PermisoRepository;
import luis.fluoxetina.bootify.persona.Persona;
import luis.fluoxetina.bootify.persona.PersonaRepository;
import luis.fluoxetina.bootify.util.NotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PersonaRepository personaRepository;
    private final PermisoRepository permisoRepository;

    public UsuarioService(final UsuarioRepository usuarioRepository,
            final PersonaRepository personaRepository, final PermisoRepository permisoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.personaRepository = personaRepository;
        this.permisoRepository = permisoRepository;
    }

    public List<UsuarioDTO> findAll() {
        final List<Usuario> usuarios = usuarioRepository.findAll(Sort.by("idUsuario"));
        return usuarios.stream()
                .map(usuario -> mapToDTO(usuario, new UsuarioDTO()))
                .toList();
    }

    public UsuarioDTO get(final Long idUsuario) {
        return usuarioRepository.findById(idUsuario)
                .map(usuario -> mapToDTO(usuario, new UsuarioDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final UsuarioDTO usuarioDTO) {
        final Usuario usuario = new Usuario();
        mapToEntity(usuarioDTO, usuario);
        return usuarioRepository.save(usuario).getIdUsuario();
    }

    public void update(final Long idUsuario, final UsuarioDTO usuarioDTO) {
        final Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(NotFoundException::new);
        mapToEntity(usuarioDTO, usuario);
        usuarioRepository.save(usuario);
    }

    public void delete(final Long idUsuario) {
        usuarioRepository.deleteById(idUsuario);
    }

    private UsuarioDTO mapToDTO(final Usuario usuario, final UsuarioDTO usuarioDTO) {
        usuarioDTO.setIdUsuario(usuario.getIdUsuario());
        usuarioDTO.setNombreUsuario(usuario.getNombreUsuario());
        usuarioDTO.setContrasena(usuario.getContrasena());
        usuarioDTO.setHabilitado(usuario.getHabilitado());
        usuarioDTO.setPersona(usuario.getPersona() == null ? null : usuario.getPersona().getIdPersona());
        usuarioDTO.setListaPermiso(usuario.getListaPermiso().stream()
                .map(permiso -> permiso.getIdPermiso())
                .toList());
        return usuarioDTO;
    }

    private Usuario mapToEntity(final UsuarioDTO usuarioDTO, final Usuario usuario) {
        usuario.setNombreUsuario(usuarioDTO.getNombreUsuario());
        usuario.setContrasena(usuarioDTO.getContrasena());
        usuario.setHabilitado(usuarioDTO.getHabilitado());
        final Persona persona = usuarioDTO.getPersona() == null ? null : personaRepository.findById(usuarioDTO.getPersona())
                .orElseThrow(() -> new NotFoundException("persona not found"));
        usuario.setPersona(persona);
        final List<Permiso> listaPermiso = permisoRepository.findAllById(
                usuarioDTO.getListaPermiso() == null ? Collections.emptyList() : usuarioDTO.getListaPermiso());
        if (listaPermiso.size() != (usuarioDTO.getListaPermiso() == null ? 0 : usuarioDTO.getListaPermiso().size())) {
            throw new NotFoundException("one of listaPermiso not found");
        }
        usuario.setListaPermiso(new HashSet<>(listaPermiso));
        return usuario;
    }

}
