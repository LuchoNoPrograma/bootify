package luis.fluoxetina.bootify.persona;

import java.util.List;
import luis.fluoxetina.bootify.usuario.Usuario;
import luis.fluoxetina.bootify.usuario.UsuarioRepository;
import luis.fluoxetina.bootify.util.NotFoundException;
import luis.fluoxetina.bootify.util.ReferencedWarning;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class PersonaService {

    private final PersonaRepository personaRepository;
    private final UsuarioRepository usuarioRepository;

    public PersonaService(final PersonaRepository personaRepository,
            final UsuarioRepository usuarioRepository) {
        this.personaRepository = personaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<PersonaDTO> findAll() {
        final List<Persona> personae = personaRepository.findAll(Sort.by("idPersona"));
        return personae.stream()
                .map(persona -> mapToDTO(persona, new PersonaDTO()))
                .toList();
    }

    public PersonaDTO get(final Long idPersona) {
        return personaRepository.findById(idPersona)
                .map(persona -> mapToDTO(persona, new PersonaDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final PersonaDTO personaDTO) {
        final Persona persona = new Persona();
        mapToEntity(personaDTO, persona);
        return personaRepository.save(persona).getIdPersona();
    }

    public void update(final Long idPersona, final PersonaDTO personaDTO) {
        final Persona persona = personaRepository.findById(idPersona)
                .orElseThrow(NotFoundException::new);
        mapToEntity(personaDTO, persona);
        personaRepository.save(persona);
    }

    public void delete(final Long idPersona) {
        personaRepository.deleteById(idPersona);
    }

    private PersonaDTO mapToDTO(final Persona persona, final PersonaDTO personaDTO) {
        personaDTO.setIdPersona(persona.getIdPersona());
        personaDTO.setNombres(persona.getNombres());
        personaDTO.setApellidos(persona.getApellidos());
        personaDTO.setFechaNacimiento(persona.getFechaNacimiento());
        personaDTO.setEmail(persona.getEmail());
        return personaDTO;
    }

    private Persona mapToEntity(final PersonaDTO personaDTO, final Persona persona) {
        persona.setNombres(personaDTO.getNombres());
        persona.setApellidos(personaDTO.getApellidos());
        persona.setFechaNacimiento(personaDTO.getFechaNacimiento());
        persona.setEmail(personaDTO.getEmail());
        return persona;
    }

    public ReferencedWarning getReferencedWarning(final Long idPersona) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Persona persona = personaRepository.findById(idPersona)
                .orElseThrow(NotFoundException::new);
        final Usuario personaUsuario = usuarioRepository.findFirstByPersona(persona);
        if (personaUsuario != null) {
            referencedWarning.setKey("persona.usuario.persona.referenced");
            referencedWarning.addParam(personaUsuario.getIdUsuario());
            return referencedWarning;
        }
        return null;
    }

}
