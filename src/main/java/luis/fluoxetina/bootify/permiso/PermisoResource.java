package luis.fluoxetina.bootify.permiso;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/permisos", produces = MediaType.APPLICATION_JSON_VALUE)
public class PermisoResource {

    private final PermisoService permisoService;

    public PermisoResource(final PermisoService permisoService) {
        this.permisoService = permisoService;
    }

    @GetMapping
    public ResponseEntity<List<PermisoDTO>> getAllPermisos() {
        return ResponseEntity.ok(permisoService.findAll());
    }

    @GetMapping("/{idPermiso}")
    public ResponseEntity<PermisoDTO> getPermiso(
            @PathVariable(name = "idPermiso") final Long idPermiso) {
        return ResponseEntity.ok(permisoService.get(idPermiso));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createPermiso(@RequestBody @Valid final PermisoDTO permisoDTO) {
        final Long createdIdPermiso = permisoService.create(permisoDTO);
        return new ResponseEntity<>(createdIdPermiso, HttpStatus.CREATED);
    }

    @PutMapping("/{idPermiso}")
    public ResponseEntity<Long> updatePermiso(
            @PathVariable(name = "idPermiso") final Long idPermiso,
            @RequestBody @Valid final PermisoDTO permisoDTO) {
        permisoService.update(idPermiso, permisoDTO);
        return ResponseEntity.ok(idPermiso);
    }

    @DeleteMapping("/{idPermiso}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deletePermiso(
            @PathVariable(name = "idPermiso") final Long idPermiso) {
        permisoService.delete(idPermiso);
        return ResponseEntity.noContent().build();
    }

}
