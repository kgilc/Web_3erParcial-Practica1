package com.ipn.mx.integration;

import com.ipn.mx.domain.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
    // Búsqueda por nombre
    List<Alumno> findByNombre(String nombre);

    // Búsqueda por apellido paterno
    List<Alumno> findByPaterno(String paterno);

    // Búsqueda por apellido materno
    List<Alumno> findByMaterno(String materno);

    // Búsqueda por email
    Optional<Alumno> findByEmail(String email);
}
