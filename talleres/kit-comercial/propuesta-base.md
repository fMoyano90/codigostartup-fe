# Propuesta comercial base — Talleres de IA Aplicada

> Plantilla editable. Copiar y completar los campos `{{...}}` para cada cliente (empresa o OTEC).
> **No incluir precios, márgenes ni condiciones internas** (ver `matriz-precios.md`, documento interno).
> Versión: v1.0 · Fuente de contenido de talleres: `datos-talleres.ts` (migrar a `src/data/talleres.ts` cuando exista).

---

## 1. Datos del cliente

| Campo | Valor |
|-------|-------|
| Empresa / OTEC | `{{EMPRESA}}` |
| Contacto | `{{NOMBRE_CONTACTO}}` |
| Cargo | `{{CARGO}}` |
| Correo | `{{CORREO}}` |
| Teléfono | `{{TELEFONO}}` |
| Fecha de la propuesta | `{{FECHA}}` |
| Vigencia de la propuesta | `{{VIGENCIA}}` |

## 2. Talleres seleccionados

Marcar los talleres del catálogo (`catalogo-kit.html`) que se proponen:

- [ ] Videos UGC con IA para emprendedores (4 h)
- [ ] IA para Productividad Administrativa (8 h)
- [ ] Automatización de Procesos con IA (8 h)
- [ ] IA para Recursos Humanos (8 h)
- [ ] IA para Equipos Comerciales (8 h)
- [ ] IA para Marketing (8 h)
- [ ] IA para Líderes y Jefaturas (8 h)
- [ ] IA para Gestión de Proyectos (8 h)
- [ ] IA para Operaciones y Faenas (8 h)

**Contexto de la necesidad:** `{{NECESIDAD_DEL_CLIENTE}}`

## 3. Modalidad

| Modalidad | Descripción | Aplica |
|-----------|-------------|--------|
| **Presencial in-company** | El relator se traslada a las instalaciones del cliente. Requiere sala con proyector o pantalla, conexión a internet y un computador por participante (o 1 cada 2). Ideal para faenas e industrias. | `{{SI/NO}}` |
| **Online en vivo** | Sesión por videoconferencia (Google Meet) con ejercicios en tiempo real. Requiere computador con internet y cámara/micrófono. | `{{SI/NO}}` |

## 4. Formatos de jornada y cupos sugeridos

**Talleres de 8 horas** (el resto de los talleres):

| Formato | Distribución | Uso recomendado |
|---------|--------------|-----------------|
| Jornada completa | 1 día (8 h, con pausas) | Equipos que pueden liberar un día |
| Doble media jornada | 2 × 4 h | Operaciones que no detienen la faena |
| Sesiones semanales | 4 × 2 h | Equipos con turnos o alta demanda operativa |

**Taller Videos UGC (4 horas):**

| Formato | Distribución | Uso recomendado |
|---------|--------------|-----------------|
| Media jornada | 1 × 4 h | Formato estándar para emprendedores y OTEC |

**Cupos sugeridos:** mínimo `{{MIN_CUPOS}}` · máximo `{{MAX_CUPOS}}` (recomendado 8–20 para asegurar seguimiento individual). Para grupos mayores, `{{CONDICION_GRUPOS_GRANDES}}`.

## 5. Responsabilidades

### Código Startup

- Relator/a con experiencia práctica en IA aplicada (no teórica).
- Diseño de la sesión adaptada al contexto del cliente (ejemplos del rubro).
- Material de trabajo: presentación, ejercicios paso a paso, plantillas y checklist.
- Seguimiento y apoyo posterior a la sesión: `{{APOYO_POST}}`.
- Certificado de participación por participante que complete la evaluación.

### Empresa / OTEC

- Coordinación de participantes, sala y logística (presencial) o enlace para la sesión (online).
- Asegurar que cada participante cuente con los requisitos técnicos mínimos.
- Difusión interna y gestión de asistencia.
- En caso de OTEC: inscripciones, cobro al cliente final y certificación complementaria si corresponde.

## 6. Evaluación y certificación

- **Evaluación:** ejercicio práctico final / checklist de cumplimiento por participante.
- **Certificación:** certificado de participación de Código Startup indicando taller, horas y fecha.
- **OTEC:** `{{ACUERDO_CERTIFICACION_OTEC}}`

## 7. Preguntas frecuentes (resumen comercial)

**Alcance:** los talleres cubren casos reales del rubro del cliente, sin datos sensibles de la empresa. `{{ALCANCE_EXTRA}}`

**Requisitos:** computador con internet; no se requieren conocimientos previos de IA.

**Duración:** 4 h (Videos UGC) u 8 h (resto), según formato acordado.

**Modalidad:** presencial in-company u online en vivo, según lo pactado.

**Evaluación:** cada participante completa un ejercicio práctico verificable.

**Certificación:** certificado de participación con horas y fecha.

**Contacto:** hola@codigostartup.com · WhatsApp +56 9 6607 3259

## 8. Aceptación

| Campo | Valor |
|-------|-------|
| Nombre y firma | `{{FIRMA}}` |
| Fecha de aceptación | `{{FECHA_ACEPTACION}}` |

---

**Adjuntos:** catálogo de talleres (`catalogo-kit.html`), modalidades y responsabilidades (este documento), FAQ.