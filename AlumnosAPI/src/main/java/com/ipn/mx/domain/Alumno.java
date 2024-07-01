package com.ipn.mx.domain;

import java.io.Serializable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="alumnos")
public class Alumno implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@Column(name = "nombre", length = 50, nullable = false)
    private String nombre;
	@Column(name = "paterno", length = 50, nullable = false)
    private String paterno;
	@Column(name = "materno", length = 50, nullable = false)
    private String materno;
	@Column(name = "email", length = 50, nullable = false)
    private String email;
}
