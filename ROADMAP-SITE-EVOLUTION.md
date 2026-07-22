La idea es evolucionar la landing actual sin destruir lo que ya funciona, convirtiéndola gradualmente en un sitio comercial completo.

Marketing deja de aparecer como servicio independiente. Pasa a ser una capacidad transversal junto con estrategia, UX/UI, contenido, SEO, analítica y lanzamiento.

Arquitectura objetivo
/
├── soluciones/
│   ├── sitios-web/
│   ├── software-a-medida/
│   ├── automatizacion-de-procesos/
│   ├── desarrollo-mvp/
│   ├── aplicaciones-web/
│   ├── aplicaciones-moviles/
│   └── auditoria-y-evolucion/
│
├── proyectos/
│   ├── subtech/
│   ├── entrena/
│   ├── nextdrill/
│   └── nucleo-gestor/
│
├── blog/
│   └── [slug]/
│
├── nosotros/
├── proceso/
└── contacto/

La navegación principal quedaría:

Soluciones | Proyectos | Blog | Nosotros | Contacto | Evaluar proyecto

Dentro de Soluciones:

Presencia digital
- Sitios web

Operación
- Software a medida
- Automatización de procesos

Productos digitales
- Desarrollo de MVP
- Aplicaciones web
- Aplicaciones móviles

Sistemas existentes
- Auditoría y evolución
Cómo trabajar con la IA

No le pediría:

Convierte mi landing en un sitio web completo.

Es demasiado amplio y probablemente termine:

Duplicando componentes.
Cambiando innecesariamente el diseño.
Inventando contenido.
Rompiendo rutas.
Mezclando datos con componentes.
Implementando páginas genéricas.

Trabajaría una fase por vez. Cada fase debería quedar funcional antes de avanzar.

Reglas para todos los prompts

Incluye siempre estas instrucciones:

Antes de modificar código, inspecciona la implementación actual.

Mantén la identidad visual, paleta, tipografías, animaciones y estilo general de Código Startup.

No hagas un rediseño completo.

Reutiliza los componentes existentes cuando tenga sentido.

No dupliques componentes ni contenido.

No inventes casos de éxito, testimonios, métricas, clientes ni resultados.

Mantén la web funcionando durante toda la migración.

Ejecuta lint, validaciones de TypeScript, pruebas disponibles y build antes de terminar.

Al finalizar, explícame:
1. Qué modificaste.
2. Qué archivos creaste.
3. Qué archivos eliminaste o reemplazaste.
4. Qué decisiones tomaste.
5. Qué quedó pendiente.
Fase 1: auditar el proyecto actual

Primero necesitamos que la IA entienda el repositorio.

No debe modificar todavía la web.

Prompt 1
Analiza este proyecto de Código Startup antes de implementar cambios.

El sitio actualmente funciona principalmente como una landing, pero queremos convertirlo gradualmente en un sitio web comercial robusto con páginas independientes para cada servicio.

La arquitectura objetivo será:

- /
- /soluciones
- /soluciones/sitios-web
- /soluciones/software-a-medida
- /soluciones/automatizacion-de-procesos
- /soluciones/desarrollo-mvp
- /soluciones/aplicaciones-web
- /soluciones/aplicaciones-moviles
- /soluciones/auditoria-y-evolucion
- /proyectos
- /proyectos/subtech
- /proyectos/entrena
- /proyectos/nextdrill
- /proyectos/nucleo-gestor
- /blog
- /blog/[slug]
- /nosotros
- /proceso
- /contacto

Marketing no será un servicio independiente. Estrategia, UX/UI, contenido, SEO, analítica y lanzamiento serán capacidades transversales dentro de los servicios.

En esta etapa no modifiques código.

Entrégame:

1. Stack utilizado.
2. Estructura de carpetas.
3. Sistema actual de rutas.
4. Componentes reutilizables.
5. Secciones actuales de la landing.
6. Implementación actual del blog.
7. Cómo se administran textos, servicios, proyectos y testimonios.
8. Integraciones de formularios, WhatsApp y analítica.
9. Problemas de arquitectura o duplicación.
10. Riesgos de la migración.
11. Propuesta de implementación por fases.
12. Archivos que deberían modificarse en la primera fase.

No inventes información. Basa el análisis exclusivamente en el repositorio.
Resultado esperado

La IA debería decirte:

Cómo está construida la web.
Qué componentes se pueden reutilizar.
Qué contenido está hardcodeado.
Cómo están creadas las rutas.
Qué habría que refactorizar antes de agregar páginas.

No avances hasta que el diagnóstico tenga sentido.

Fase 2: crear el modelo de contenido

Antes de crear páginas, hay que evitar que todos los textos queden metidos dentro de componentes React.

Los servicios deberían almacenarse como datos estructurados o MDX.

Recomendación

Utilizar:

/content/services/
/content/projects/
/content/blog/

O, si prefieren TypeScript:

/data/services.ts
/data/projects.ts

Para Código Startup utilizaría:

MDX para artículos y casos extensos.
TypeScript o JSON tipado para datos de servicios.
Componentes React para la presentación.
Modelo de servicio
type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  hero: {
    eyebrow?: string;
    title: string;
    description: string;
  };
  audience: string[];
  problems: string[];
  solutionTypes: {
    title: string;
    description: string;
  }[];
  deliverables: string[];
  process: {
    title: string;
    description: string;
  }[];
  relatedProjects: string[];
  relatedArticles: string[];
  faq: {
    question: string;
    answer: string;
  }[];
  cta: {
    title: string;
    description: string;
    label: string;
    formType: string;
  };
  seo: {
    title: string;
    description: string;
  };
};
Prompt 2
Implementa el modelo de contenido necesario para transformar Código Startup en un sitio con páginas independientes por servicio.

No construyas todavía las páginas finales.

Necesitamos representar estos servicios:

1. Sitios web.
2. Software a medida.
3. Automatización de procesos.
4. Desarrollo de MVP.
5. Aplicaciones web.
6. Aplicaciones móviles.
7. Auditoría y evolución.

Marketing no debe aparecer como servicio independiente.

Estrategia, contenido, diseño UX/UI, SEO, analítica, arquitectura, seguridad y lanzamiento deben representarse como capacidades transversales que pueden aparecer dentro de los servicios correspondientes.

Crea una estructura tipada que permita definir para cada servicio:

- Slug.
- Nombre.
- Descripción breve.
- Hero.
- Público objetivo.
- Problemas que resuelve.
- Tipos de soluciones.
- Qué incluye.
- Proceso.
- Proyectos relacionados.
- Artículos relacionados.
- Preguntas frecuentes.
- CTA específico.
- Tipo de formulario.
- Metadatos SEO.

Requisitos:

- No dupliques textos en múltiples componentes.
- No inventes casos, estadísticas ni resultados.
- Usa placeholders claramente identificados cuando falte contenido real.
- La estructura debe poder ampliarse sin crear un componente nuevo para cada servicio.
- Mantén compatibilidad con el sistema actual.
- Agrega validación o tipado para evitar servicios incompletos.
- No elimines todavía las secciones actuales de la landing.

Al finalizar, muéstrame un ejemplo completo para el servicio de sitios web y otro para software a medida.
Fase 3: construir componentes reutilizables

Ahora la IA puede crear las piezas que usarán las páginas.

Componentes recomendados
ServiceHero
ServiceProblemList
ServiceSolutionTypes
ServiceDeliverables
ServiceCapabilities
ServiceProcess
ServiceCaseStudies
ServiceArticles
ServiceFAQ
ServiceCTA
ServiceLeadForm

También:

PageHeader
SectionHeader
ProjectCard
ArticleCard
TestimonialCard
Breadcrumbs
Prompt 3
Construye el sistema de componentes reutilizables para las páginas de servicios de Código Startup.

Todavía no crees las siete páginas completas.

Utiliza el modelo de contenido implementado anteriormente.

Necesitamos estos componentes:

- ServiceHero.
- ServiceProblemList.
- ServiceSolutionTypes.
- ServiceDeliverables.
- ServiceCapabilities.
- ServiceProcess.
- ServiceCaseStudies.
- ServiceArticles.
- ServiceFAQ.
- ServiceCTA.
- ServiceLeadForm.
- Breadcrumbs.

Requisitos:

- Mantén el diseño visual actual de Código Startup.
- Reutiliza botones, contenedores, tarjetas y componentes existentes.
- No copies el mismo layout completo para todos los servicios.
- Los componentes deben aceptar datos y permitir cambiar orden, cantidad y contenido.
- Deben ser responsive.
- Deben cumplir criterios básicos de accesibilidad.
- Usa HTML semántico.
- Evita animaciones innecesarias.
- Respeta prefers-reduced-motion cuando corresponda.
- No agregues dependencias si no son necesarias.
- No hardcodees nombres de servicios dentro de los componentes.
- Los proyectos y artículos relacionados deben enlazar a sus páginas.
- Las preguntas frecuentes deben ser accesibles por teclado.

Crea también una página interna o ruta de desarrollo temporal para revisar visualmente todos los componentes, solo si el proyecto ya tiene una convención apropiada para hacerlo.
Fase 4: modificar navegación y footer

Antes de crear las páginas, hay que preparar el sitio para recibirlas.

Nueva navegación
Soluciones
Proyectos
Blog
Nosotros
Contacto
[Evaluar proyecto]

Marketing debe desaparecer como servicio.

Diseño, estrategia y marketing se explicarán después en una sección transversal.

Prompt 4
Actualiza la navegación principal y el footer de Código Startup para reflejar la nueva arquitectura del sitio.

La navegación principal debe contener:

- Soluciones.
- Proyectos.
- Blog.
- Nosotros.
- Contacto.
- CTA: Evaluar proyecto.

El menú de Soluciones debe organizarse así:

Presencia digital:
- Sitios web.

Operación:
- Software a medida.
- Automatización de procesos.

Productos digitales:
- Desarrollo de MVP.
- Aplicaciones web.
- Aplicaciones móviles.

Sistemas existentes:
- Auditoría y evolución.

Requisitos:

- Marketing no debe aparecer como servicio.
- Diseño tampoco debe presentarse como una línea de negocio aislada.
- Mantén estrategia, UX/UI, contenido, SEO y analítica como capacidades transversales.
- El menú debe funcionar correctamente en escritorio y móvil.
- Debe ser accesible por teclado.
- Debe indicar visualmente la ruta activa.
- El CTA debe llevar a /contacto o al formulario global definido.
- Mantén la identidad visual actual.
- No elimines todavía contenido de la home.
- Implementa temporalmente las rutas faltantes con páginas mínimas o estados controlados para evitar enlaces rotos.
- Actualiza el footer con las nuevas rutas.
Fase 5: reconstruir la home como distribuidor

La home ya no debe intentar explicar cada servicio completo.

Debe orientar al visitante.

Estructura recomendada
1. Hero.
2. Tres necesidades principales.
3. Evidencia y proyectos.
4. Problemas que resolvemos.
5. Servicios.
6. Capacidades transversales.
7. Caso destacado.
8. Proceso.
9. Blog.
10. Equipo.
11. Preguntas frecuentes.
12. CTA.
Las tres rutas principales
Crear presencia digital
Sitios web.
Digitalizar la operación
Software.
Automatización.
Lanzar un producto digital
MVP.
Aplicaciones web.
Aplicaciones móviles.

Y una cuarta alternativa secundaria:

Mejorar un sistema existente
Auditoría y evolución.
Prompt 5
Reestructura la home de Código Startup para que deje de funcionar como una landing que intenta vender todos los servicios al mismo tiempo.

La home debe funcionar como una página de orientación y distribución hacia las páginas especializadas.

Mantén la identidad visual y reutiliza las mejores secciones actuales.

Nueva estructura:

1. Hero con propuesta clara.
2. Selector de necesidad.
3. Proyectos reales.
4. Problemas que ayudamos a resolver.
5. Resumen de soluciones.
6. Capacidades transversales.
7. Caso destacado.
8. Proceso de trabajo.
9. Artículos recientes.
10. Presentación breve del equipo.
11. Preguntas frecuentes.
12. CTA final.

El selector de necesidad debe incluir:

- Necesito un sitio web.
- Quiero digitalizar un proceso.
- Quiero lanzar un producto.
- Necesito mejorar un sistema existente.

Cada opción debe llevar a la solución correspondiente.

Marketing no debe aparecer como servicio.

Crea una sección llamada, por ejemplo, “Todo lo necesario para construir y lanzar”, donde se expliquen como capacidades transversales:

- Estrategia.
- UX/UI.
- Desarrollo.
- Contenido.
- SEO.
- Analítica.
- Arquitectura.
- Seguridad.
- Lanzamiento y evolución.

No inventes testimonios ni métricas.

Mantén:

- La idea “Construimos productos que perduran”.
- Los proyectos reales.
- El concepto de productos construidos, lanzados y operando.
- El proceso abierto.
- Las entregas semanales.
- Alcance y precio claros.
- Propiedad y traspaso.

Reduce textos repetidos y elimina secciones que compitan entre sí.
Fase 6: crear la página índice de soluciones

Ruta:

/soluciones

Esta página es importante para personas que todavía no saben qué necesitan.

Prompt 6
Crea la página /soluciones de Código Startup.

Esta página debe ayudar a una empresa o founder a identificar qué tipo de solución necesita.

Organiza el contenido por problema, no solamente por tecnología.

Secciones:

1. Hero:
   “Una solución distinta para cada etapa de tu negocio”.

2. Necesito atraer clientes:
   - Sitios web.

3. Necesito ordenar mi operación:
   - Software a medida.
   - Automatización de procesos.

4. Quiero lanzar un producto:
   - Desarrollo de MVP.
   - Aplicaciones web.
   - Aplicaciones móviles.

5. Mi sistema necesita mejorar:
   - Auditoría y evolución.

6. Capacidades transversales:
   - Estrategia.
   - UX/UI.
   - Contenido.
   - SEO.
   - Analítica.
   - Arquitectura.
   - Seguridad.
   - Lanzamiento.

7. Proyectos relacionados.

8. CTA de evaluación.

Cada solución debe tener:

- Nombre.
- Descripción breve.
- Situaciones en que sirve.
- Enlace a su página.
- CTA contextual.

No presentes marketing como servicio.
No incluyas páginas por industria.
No inventes contenido ni resultados.
Utiliza los datos y componentes reutilizables ya creados.
Fase 7: desarrollar primero los tres servicios más importantes

No crearía las siete páginas al mismo tiempo.

Comenzaría con:

Sitios web.
Software a medida.
Desarrollo de MVP.

Representan las tres necesidades principales:

Presencia digital.
Digitalización.
Producto digital.
Prompt 7A: sitios web
Construye la página /soluciones/sitios-web utilizando el sistema de componentes y contenido existente.

Objetivo comercial:

Ayudar a empresas que necesitan una presencia profesional, generar confianza y convertir visitas en oportunidades.

La página debe incluir:

1. Hero específico.
2. Problemas habituales.
3. Tipos de sitio web.
4. Qué incluye el servicio.
5. Capacidades transversales.
6. Proceso.
7. Proyecto relacionado, si existe uno realmente apropiado.
8. Preguntas frecuentes.
9. Artículos relacionados.
10. Formulario específico.
11. CTA: “Cotizar mi sitio web”.

Problemas que puede abordar:

- El negocio depende solamente de redes sociales.
- La web no explica claramente los servicios.
- Recibe visitas, pero no genera contactos.
- Se ve poco profesional.
- No aparece correctamente en buscadores.
- No permite medir resultados.
- Es difícil de actualizar.

Tipos de solución:

- Sitio corporativo.
- Landing page.
- Catálogo de servicios.
- Web con blog.
- Rediseño web.
- Integración con WhatsApp.
- Integración con formularios, agenda o CRM.

Marketing no debe aparecer como servicio.

SEO, contenido, UX/UI y analítica deben explicarse como partes del desarrollo de una web orientada a resultados.

No prometas resultados comerciales garantizados.
No inventes casos ni métricas.
Prompt 7B: software a medida
Construye la página /soluciones/software-a-medida.

Objetivo comercial:

Ayudar a empresas que necesitan reemplazar planillas, centralizar información, reducir errores y adaptar la tecnología a su operación real.

Incluye:

1. Hero.
2. Problemas operacionales.
3. Tipos de sistemas.
4. Qué incluye.
5. Integraciones.
6. Proceso de diagnóstico y construcción.
7. Casos relacionados reales.
8. Preguntas frecuentes.
9. Contenido relacionado.
10. Formulario específico.
11. CTA: “Evaluar mi proceso”.

Problemas posibles:

- Demasiadas planillas.
- Información duplicada.
- Procesos administrados por WhatsApp.
- Tareas manuales.
- Falta de trazabilidad.
- Sistemas que no se comunican.
- Reportes manuales.
- Herramientas genéricas que no se adaptan.

Tipos de solución:

- Sistemas internos.
- Plataformas de gestión.
- Paneles administrativos.
- Portales de clientes.
- Control operacional.
- Gestión documental.
- Flujos de aprobación.
- Reportabilidad.
- Integraciones.

Explica UX/UI, arquitectura, seguridad, analítica y acompañamiento como capacidades transversales.

No presentes marketing como servicio.
No inventes integraciones ni resultados.
Prompt 7C: MVP
Construye la página /soluciones/desarrollo-mvp.

Objetivo comercial:

Ayudar a founders y empresas a convertir una idea en una primera versión funcional que pueda ser probada con usuarios reales.

Incluye:

1. Hero.
2. Situaciones en las que conviene construir un MVP.
3. Diferencia entre idea, prototipo, MVP y producto.
4. Cómo se priorizan funcionalidades.
5. Qué incluye el servicio.
6. Proceso.
7. Caso relacionado real.
8. Entregables.
9. Preguntas frecuentes.
10. Artículos relacionados.
11. Formulario específico.
12. CTA: “Evaluar mi idea”.

Debe quedar claro que un MVP:

- No es un producto mal construido.
- No contiene todas las funcionalidades imaginadas.
- Busca validar hipótesis.
- Debe poder evolucionar.
- Requiere decisiones de producto, diseño y tecnología.

Incluye estrategia, UX/UI, desarrollo, analítica y lanzamiento como capacidades transversales.

No inventes métricas, inversiones ni resultados.
Fase 8: desarrollar los servicios secundarios

Después de validar las primeras páginas:

Automatización.
Aplicaciones web.
Aplicaciones móviles.
Auditoría y evolución.
Prompt 8
Implementa las páginas restantes de servicios utilizando la arquitectura y componentes existentes:

- /soluciones/automatizacion-de-procesos
- /soluciones/aplicaciones-web
- /soluciones/aplicaciones-moviles
- /soluciones/auditoria-y-evolucion

Cada página debe tener una propuesta y formulario específico.

Automatización:
- Reducir tareas manuales.
- Conectar herramientas existentes.
- Automatizar documentos, notificaciones, reportes y flujos.
- CTA: “Detectar tareas automatizables”.

Aplicaciones web:
- SaaS.
- Plataformas B2B.
- Portales.
- Reservas.
- Paneles.
- Sistemas de membresía.
- CTA: “Evaluar mi aplicación web”.

Aplicaciones móviles:
- Aplicaciones para clientes o trabajadores.
- Operaciones en terreno.
- Funcionamiento offline cuando corresponda.
- Notificaciones.
- Captura de información.
- CTA: “Evaluar mi aplicación móvil”.

Auditoría y evolución:
- Deuda técnica.
- Problemas de rendimiento.
- Arquitectura.
- Seguridad.
- Falta de documentación.
- Sistemas difíciles de modificar.
- CTA: “Solicitar revisión técnica”.

Requisitos:

- No dupliques contenido entre páginas.
- Usa casos reales relacionados.
- No presentes marketing como servicio.
- Explica estrategia, UX/UI, arquitectura, seguridad y analítica como capacidades transversales.
- No incluyas páginas ni secciones por industria.
Fase 9: convertir proyectos en casos de éxito

Actualmente los proyectos pueden aparecer resumidos en la home, pero cada uno debería tener página propia.

Estructura del caso
1. Contexto.
2. Problema.
3. Situación anterior.
4. Objetivo.
5. Solución.
6. Funcionalidades principales.
7. Proceso.
8. Resultado verificable.
9. Testimonio.
10. Galería.
11. Servicios relacionados.
12. CTA.
Prompt 9
Transforma la sección actual de proyectos de Código Startup en un sistema de casos de éxito.

Crea:

- /proyectos
- /proyectos/subtech
- /proyectos/entrena
- /proyectos/nextdrill
- /proyectos/nucleo-gestor

No inventes información.

Extrae únicamente los datos reales existentes en el repositorio.

Cuando falten datos, utiliza comentarios o placeholders editoriales claramente identificados, por ejemplo:

[Pendiente: describir proceso anterior del cliente]
[Pendiente: agregar resultado verificable]
[Pendiente: agregar captura]
[Pendiente: validar testimonio]

Cada caso debe incluir, cuando exista información:

- Contexto.
- Problema.
- Objetivo.
- Solución.
- Funcionalidades.
- Proceso.
- Resultado.
- Testimonio.
- Imágenes.
- Servicios relacionados.
- Artículos relacionados.
- CTA.

Crea un modelo de contenido reutilizable para casos.

Las tarjetas de proyectos de la home y las páginas de servicios deben obtener la información desde la misma fuente de datos.
Fase 10: crear Nosotros y Proceso

La confianza es fundamental al contratar software.

Prompt 10
Crea las páginas /nosotros y /proceso de Código Startup.

Página /nosotros:

- Quiénes somos.
- Por qué existe Código Startup.
- Qué tipo de problemas resolvemos.
- Cómo está formado el equipo.
- Experiencia relevante.
- Forma de trabajar.
- Productos propios.
- Valores.
- CTA para conocer el proyecto.

No inventes nombres, cargos, experiencia, reconocimientos ni cifras.
Utiliza solamente información existente en el repositorio.
Deja placeholders editoriales para lo que falte.

Página /proceso:

- Diagnóstico.
- Definición de alcance.
- Diseño y prototipo.
- Construcción.
- Entregas semanales.
- Pruebas.
- Lanzamiento.
- Evolución.

Explica como elementos transversales:

- Estrategia.
- UX/UI.
- Contenido.
- SEO cuando aplique.
- Analítica.
- Arquitectura.
- Seguridad.
- Documentación.
- Traspaso.

Debe quedar claro qué recibe el cliente, cómo participa y cómo se controla el avance.
Fase 11: crear formularios distintos por servicio

No todos deberían llegar con el mismo mensaje a WhatsApp.

Formulario general
Nombre
Empresa
Correo
WhatsApp
Tipo de proyecto
Etapa actual
Descripción
Presupuesto aproximado opcional
Formularios específicos
Sitios web
¿Tienes una web?
¿Qué quieres conseguir?
¿Qué servicios necesitas mostrar?
¿Necesitas administrar contenido?
Software
¿Qué proceso quieres digitalizar?
¿Cómo lo realizan hoy?
¿Cuántas personas participan?
¿Qué sistemas necesitan conectar?
MVP
¿Qué problema resuelve?
¿Quién lo utilizará?
¿Tienes prototipo?
¿Qué necesitas validar?
Auditoría
¿Qué problema tiene el sistema?
¿Qué tecnologías utiliza?
¿Tienes acceso al código?
¿Existe documentación?
Prompt 11
Implementa el sistema de captación de contactos de Código Startup.

Necesitamos:

1. Un formulario general en /contacto.
2. Formularios contextuales para cada servicio.
3. Validación.
4. Mensajes de éxito y error.
5. Protección básica contra spam.
6. Accesibilidad.
7. Registro de la fuente y servicio de origen.
8. Integración con el mecanismo actual de contacto, si existe.
9. Alternativa para continuar por WhatsApp.

Cada envío debe registrar:

- Página de origen.
- Servicio.
- CTA utilizado.
- Parámetros UTM disponibles.
- Fecha.
- Datos ingresados.

No expongas datos sensibles en el frontend.
No agregues un backend completo si la arquitectura actual ya utiliza un proveedor de formularios apropiado.

Crea diferentes campos según el tipo de servicio.

El CTA y formulario de cada página deben estar adaptados al servicio.

No envíes a todos los usuarios directamente a WhatsApp sin contexto.
Cuando se abra WhatsApp, genera un mensaje prellenado con la información relevante.
Fase 12: conectar el blog con los servicios

El blog tiene que distribuir tráfico hacia las páginas comerciales.

Metadatos recomendados para MDX
title: "..."
description: "..."
date: "..."
category: "..."
services:
  - sitios-web
audience:
  - empresas
stage: consideration
cta:
  type: service
  target: sitios-web
Prompt 12
Integra el blog de Código Startup con las páginas comerciales.

Cada artículo debe poder definir:

- Título.
- Descripción.
- Fecha.
- Autor.
- Categoría.
- Imagen.
- Servicios relacionados.
- Público.
- Etapa de decisión.
- CTA.
- Artículos relacionados.
- Estado: draft o published.

Implementa:

1. Artículos relacionados dentro de cada servicio.
2. Servicios relacionados dentro de cada artículo.
3. CTA contextual al final de cada artículo.
4. Navegación por categorías.
5. Breadcrumbs.
6. Metadatos SEO.
7. Open Graph.
8. Sitemap.
9. RSS, si encaja con el proyecto.
10. Exclusión de drafts de producción.

No utilices todos los artículos en todas las páginas.
La relación debe depender de los metadatos.

No conviertas el blog en contenido para programadores.
El público principal será founders, emprendedores, gerentes y dueños de empresa.
Fase 13: SEO técnico y metadatos

Cada servicio necesita posicionarse de manera independiente.

Prompt 13
Realiza una revisión SEO técnica del nuevo sitio de Código Startup.

Implementa o verifica:

- Title y description por página.
- Canonical.
- Open Graph.
- Twitter cards.
- Sitemap.
- Robots.
- Datos estructurados.
- BreadcrumbList.
- Organization.
- Service cuando corresponda.
- Article para el blog.
- URLs consistentes.
- Redirecciones desde rutas antiguas.
- Encabezados semánticos.
- Alt text.
- Enlaces internos.
- Página 404.
- Páginas no indexables cuando corresponda.

Evita keyword stuffing.

No inventes direcciones, teléfonos, valoraciones, precios, años de experiencia ni datos empresariales.

Asegúrate de que cada servicio tenga una intención clara y que las páginas no compitan innecesariamente por las mismas búsquedas.
Fase 14: analítica y medición

Hay que saber qué visitas realmente sirven.

Eventos mínimos
view_service
click_service_cta
start_lead_form
submit_lead_form
click_whatsapp
view_project
read_article
click_article_cta
schedule_meeting
Prompt 14
Implementa un sistema de medición para el sitio de Código Startup utilizando la herramienta de analítica que ya exista en el proyecto.

Eventos mínimos:

- view_service.
- click_service_cta.
- start_lead_form.
- submit_lead_form.
- click_whatsapp.
- view_project.
- read_article.
- click_article_cta.
- schedule_meeting.

Cada evento debe incluir contexto cuando corresponda:

- Servicio.
- Página.
- Proyecto.
- Artículo.
- Posición del CTA.
- UTM source.
- UTM medium.
- UTM campaign.

No envíes datos personales sensibles a la plataforma de analítica.

Crea una capa centralizada para registrar eventos y evita llamadas directas dispersas por todos los componentes.

Documenta cómo verificar los eventos localmente y en producción.
Fase 15: revisión final
Prompt 15
Realiza una auditoría final del sitio de Código Startup después de la migración.

Revisa:

1. Enlaces rotos.
2. Rutas.
3. Navegación móvil.
4. Formularios.
5. Mensajes de WhatsApp.
6. Responsive.
7. Accesibilidad.
8. Contraste.
9. Navegación por teclado.
10. Rendimiento.
11. Imágenes.
12. SEO técnico.
13. Metadatos.
14. Sitemap.
15. Robots.
16. Datos estructurados.
17. Analítica.
18. Errores de consola.
19. TypeScript.
20. Lint.
21. Build.
22. Páginas sin contenido.
23. Placeholders editoriales pendientes.
24. Contenido duplicado.
25. Consistencia entre CTAs.

Genera un informe dividido en:

- Bloqueadores para producción.
- Problemas importantes.
- Mejoras recomendadas.
- Mejoras opcionales.

Corrige automáticamente solamente los problemas técnicos claros que no requieran decisiones de negocio o contenido.

No inventes contenido para completar pendientes editoriales.