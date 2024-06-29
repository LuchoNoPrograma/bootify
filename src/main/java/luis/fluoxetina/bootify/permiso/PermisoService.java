package luis.fluoxetina.bootify.permiso;

import jakarta.transaction.Transactional;
import java.util.List;
import luis.fluoxetina.bootify.usuario.UsuarioRepository;
import luis.fluoxetina.bootify.util.NotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class PermisoService {

    private final PermisoRepository permisoRepository;
    private final UsuarioRepository usuarioRepository;

    public PermisoService(final PermisoRepository permisoRepository,
            final UsuarioRepository usuarioRepository) {
        this.permisoRepository = permisoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<PermisoDTO> findAll() {
        final List<Permiso> permisoes = permisoRepository.findAll(Sort.by("idPermiso"));
        return permisoes.stream()
                .map(permiso -> mapToDTO(permiso, new PermisoDTO()))
                .toList();
    }

    public PermisoDTO get(final Long idPermiso) {
        return permisoRepository.findById(idPermiso)
                .map(permiso -> mapToDTO(permiso, new PermisoDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final PermisoDTO permisoDTO) {
        final Permiso permiso = new Permiso();
        mapToEntity(permisoDTO, permiso);
        return permisoRepository.save(permiso).getIdPermiso();
    }

    public void update(final Long idPermiso, final PermisoDTO permisoDTO) {
        final Permiso permiso = permisoRepository.findById(idPermiso)
                .orElseThrow(NotFoundException::new);
        mapToEntity(permisoDTO, permiso);
        permisoRepository.save(permiso);
    }

    public void delete(final Long idPermiso) {
        final Permiso permiso = permisoRepository.findById(idPermiso)
                .orElseThrow(NotFoundException::new);
        // remove many-to-many relations at owning side
        usuarioRepository.findAllByListaPermiso(permiso)
                .forEach(usuario -> usuario.getListaPermiso().remove(permiso));
        permisoRepository.delete(permiso);
    }

    private PermisoDTO mapToDTO(final Permiso permiso, final PermisoDTO permisoDTO) {
        permisoDTO.setIdPermiso(permiso.getIdPermiso());
        permisoDTO.setPermiso(permiso.getPermiso());
        return permisoDTO;
    }

    private Permiso mapToEntity(final PermisoDTO permisoDTO, final Permiso permiso) {
        permiso.setPermiso(permisoDTO.getPermiso());
        return permiso;
    }

}
