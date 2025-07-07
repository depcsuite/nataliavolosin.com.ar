import { slugify } from "./slugify"

export interface Article {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  image: string
  views: string
  author: {
    name: string
    avatar: string
    bio: string
  }
}

// This would typically come from a database or CMS
const articles: Article[] = [
  {
    id: 1,
    slug: "crisis-institucional-reformas-estructurales-argentina",
    title: "Crisis institucional: El momento decisivo para las reformas estructurales en Argentina",
    excerpt:
      "Un análisis exhaustivo sobre la coyuntura política actual y las oportunidades únicas que se presentan para implementar cambios profundos en el sistema institucional argentino.",
    content: `La Argentina atraviesa una crisis institucional profunda que, paradójicamente, abre una ventana de oportunidad única para implementar reformas estructurales que durante décadas fueron postergadas.

En este contexto, se hace evidente la necesidad de repensar no solo las instituciones políticas, sino también los mecanismos de control y transparencia que permitan sostener un sistema democrático sólido y confiable.

La convergencia de múltiples crisis - económica, social y política - genera un escenario donde el statu quo se vuelve insostenible, creando las condiciones necesarias para que reformas antes impensables se vuelvan no solo posibles, sino urgentes.

## Los pilares de la reforma institucional

1. **Transparencia y acceso a la información**: La implementación de sistemas robustos de transparencia no es solo una demanda ciudadana, sino una necesidad sistémica para restaurar la confianza en las instituciones.

2. **Modernización del sistema judicial**: La independencia judicial y la eficiencia en los procesos son elementos fundamentales para cualquier proyecto de país serio.

3. **Reforma del sistema electoral**: Las reglas de juego democráticas deben evolucionar para garantizar una representación más efectiva y legítima.

## Oportunidades y desafíos

La crisis actual presenta tanto oportunidades como desafíos significativos. Por un lado, existe una mayor conciencia ciudadana sobre la necesidad de cambio; por otro, los intereses creados y las resistencias corporativas representan obstáculos considerables.

La experiencia internacional demuestra que las reformas más exitosas son aquellas que logran articular un consenso amplio y sostenido en el tiempo, más allá de los cambios de gobierno.

## Conclusiones

El momento actual representa una oportunidad histórica para sentar las bases de un sistema institucional más sólido y transparente. Sin embargo, esta oportunidad requiere de liderazgo político, consenso social y una visión de largo plazo que trascienda los ciclos electorales.

La implementación exitosa de estas reformas determinará en gran medida el futuro institucional del país y la calidad de su democracia en las próximas décadas.`,
    date: "2025-01-16",
    readTime: "15 min",
    category: "Análisis Político",
    image: "/placeholder.svg?height=400&width=600",
    views: "2.3K",
    author: {
      name: "Natalia Volosin",
      avatar: "/natalia-volosin.jpg",
      bio: "Abogada, consultora, académica y comunicadora. LL.M. y J.S.D. por Yale Law School.",
    },
  },
  {
    id: 2,
    slug: "corrupcion-contrataciones-publicas-mecanismos-control",
    title: "La corrupción en las contrataciones públicas: Nuevos mecanismos de control",
    excerpt:
      "Propuestas concretas para fortalecer la transparencia en las compras del Estado basadas en experiencias internacionales exitosas.",
    content: `Las contrataciones públicas representan uno de los ámbitos más vulnerables a la corrupción en cualquier sistema democrático. En Argentina, esta problemática adquiere dimensiones particulares que requieren soluciones innovadoras y adaptadas a nuestra realidad institucional.

## El diagnóstico actual

Los mecanismos tradicionales de control han mostrado limitaciones evidentes. La falta de transparencia en los procesos, la discrecionalidad excesiva en las decisiones y la ausencia de sistemas de monitoreo efectivos han creado un ambiente propicio para prácticas corruptas.

## Propuestas de reforma

### 1. Digitalización integral
La implementación de plataformas digitales que permitan el seguimiento en tiempo real de todos los procesos de contratación, desde la planificación hasta la ejecución.

### 2. Participación ciudadana
Mecanismos que permitan a la sociedad civil participar activamente en el monitoreo de las contrataciones públicas, incluyendo sistemas de alerta temprana.

### 3. Inteligencia artificial
El uso de algoritmos para detectar patrones sospechosos en las contrataciones y alertar sobre posibles irregularidades.

## Experiencias internacionales

Países como Estonia, Corea del Sur y Chile han implementado sistemas exitosos que pueden servir como referencia para el caso argentino, adaptando sus mejores prácticas a nuestro contexto institucional.

## Conclusiones

La lucha contra la corrupción en las contrataciones públicas requiere un enfoque integral que combine tecnología, participación ciudadana y voluntad política. Solo así podremos construir un sistema más transparente y eficiente.`,
    date: "2025-01-15",
    readTime: "8 min",
    category: "Derecho Público",
    image: "/placeholder.svg?height=200&width=300",
    views: "1.8K",
    author: {
      name: "Natalia Volosin",
      avatar: "/natalia-volosin.jpg",
      bio: "Abogada, consultora, académica y comunicadora. LL.M. y J.S.D. por Yale Law School.",
    },
  },
  {
    id: 3,
    slug: "reformas-judiciales-lecciones-yale-sistema-argentino",
    title: "Reformas judiciales: Lecciones desde Yale para el sistema argentino",
    excerpt:
      "Reflexiones sobre las reformas necesarias en el Poder Judicial, comparando modelos internacionales con la realidad local.",
    content: `Durante mis años de estudio en Yale Law School, tuve la oportunidad de analizar diversos sistemas judiciales y sus procesos de reforma. Esta experiencia me permite ofrecer una perspectiva comparada sobre los desafíos que enfrenta el sistema judicial argentino.

## Los desafíos estructurales

El Poder Judicial argentino enfrenta problemas que van más allá de la coyuntura política. La lentitud de los procesos, la falta de predictibilidad en las decisiones y los cuestionamientos sobre la independencia judicial son síntomas de problemas más profundos.

## Lecciones del derecho comparado

### Estados Unidos: El modelo federal
El sistema federal estadounidense ofrece interesantes lecciones sobre la coexistencia de jurisdicciones y la especialización de tribunales.

### Reino Unido: Reformas recientes
Las reformas implementadas en el Reino Unido en las últimas décadas muestran cómo es posible modernizar un sistema judicial centenario sin perder su esencia.

### Alemania: Eficiencia y especialización
El modelo alemán demuestra cómo la especialización y la eficiencia pueden coexistir con garantías procesales sólidas.

## Propuestas para Argentina

1. **Modernización tecnológica**: Implementación de sistemas digitales para agilizar los procesos.
2. **Especialización**: Creación de tribunales especializados en materias complejas.
3. **Transparencia**: Mayor apertura en los procesos de selección y evaluación de magistrados.
4. **Capacitación continua**: Programas permanentes de actualización para jueces y funcionarios.

## El camino hacia adelante

Las reformas judiciales exitosas requieren consenso político y social. No se trata solo de cambios normativos, sino de transformaciones culturales profundas que toman tiempo en consolidarse.

La experiencia internacional nos enseña que no existe un modelo único, pero sí principios universales que pueden adaptarse a cada realidad nacional.`,
    date: "2025-01-14",
    readTime: "12 min",
    category: "Justicia",
    image: "/placeholder.svg?height=200&width=300",
    views: "1.5K",
    author: {
      name: "Natalia Volosin",
      avatar: "/natalia-volosin.jpg",
      bio: "Abogada, consultora, académica y comunicadora. LL.M. y J.S.D. por Yale Law School.",
    },
  },
  {
    id: 4,
    slug: "criminalidad-economica-desafios-procuracion-general",
    title: "Criminalidad económica: Los desafíos de la Procuración General",
    excerpt:
      "Una mirada desde adentro sobre los obstáculos y oportunidades en la persecución de delitos económicos complejos.",
    content: `Mi experiencia en la Procuración General de la Nación me permitió conocer de primera mano los desafíos que enfrenta el sistema penal argentino en la persecución de delitos económicos complejos.

## La complejidad de los delitos económicos

Los delitos económicos presentan características particulares que los distinguen de otros tipos penales. Su complejidad técnica, la sofisticación de los mecanismos utilizados y la dimensión transnacional de muchas operaciones requieren enfoques especializados.

## Obstáculos estructurales

### Falta de especialización
La ausencia de fiscales y jueces especializados en criminalidad económica genera demoras y decisiones inadecuadas.

### Recursos limitados
La investigación de delitos económicos requiere recursos técnicos y humanos que frecuentemente no están disponibles.

### Coordinación interinstitucional
La falta de coordinación entre diferentes organismos del Estado dificulta las investigaciones complejas.

## Oportunidades de mejora

### 1. Creación de unidades especializadas
Fiscalías dedicadas exclusivamente a delitos económicos con personal capacitado y recursos adecuados.

### 2. Cooperación internacional
Fortalecimiento de los mecanismos de cooperación judicial internacional para casos transnacionales.

### 3. Uso de tecnología
Implementación de herramientas tecnológicas para el análisis de grandes volúmenes de información financiera.

### 4. Capacitación continua
Programas permanentes de actualización para operadores judiciales en temas económicos y financieros.

## El rol de la sociedad civil

La participación de organizaciones de la sociedad civil es fundamental para el éxito de las políticas de persecución penal de la criminalidad económica. Su rol de monitoreo y denuncia es irreemplazable.

## Reflexiones finales

La lucha contra la criminalidad económica requiere un enfoque integral que combine voluntad política, recursos adecuados y marcos normativos modernos. Solo así podremos construir un sistema de justicia penal eficaz en este ámbito tan complejo.`,
    date: "2025-01-13",
    readTime: "10 min",
    category: "Derecho Penal",
    image: "/placeholder.svg?height=200&width=300",
    views: "2.1K",
    author: {
      name: "Natalia Volosin",
      avatar: "/natalia-volosin.jpg",
      bio: "Abogada, consultora, académica y comunicadora. LL.M. y J.S.D. por Yale Law School.",
    },
  },
  {
    id: 5,
    slug: "transparencia-gubernamental-rol-sociedad-civil",
    title: "Transparencia gubernamental: El rol de la sociedad civil",
    excerpt: "Cómo las organizaciones ciudadanas pueden ser catalizadoras del cambio institucional en Argentina.",
    content: `La transparencia gubernamental no es solo una aspiración democrática, sino una herramienta fundamental para el fortalecimiento institucional. En este proceso, la sociedad civil juega un rol protagónico que merece ser analizado y potenciado.

## El contexto argentino

Argentina ha avanzado significativamente en materia de transparencia en las últimas décadas, pero aún persisten desafíos importantes. La implementación efectiva de las normas existentes y la creación de una cultura de transparencia son tareas pendientes.

## El rol transformador de la sociedad civil

### Monitoreo y control
Las organizaciones de la sociedad civil actúan como watchdogs, monitoreando la gestión pública y denunciando irregularidades.

### Promoción de reformas
A través de la incidencia política, estas organizaciones impulsan cambios normativos y de políticas públicas.

### Educación ciudadana
La formación de ciudadanos informados y participativos es una función clave de estas organizaciones.

## Herramientas disponibles

### Acceso a la información pública
La Ley de Acceso a la Información Pública es una herramienta poderosa que debe ser utilizada de manera estratégica.

### Participación en audiencias públicas
Los espacios de participación ciudadana deben ser aprovechados para influir en las decisiones gubernamentales.

### Uso de tecnología
Las plataformas digitales permiten amplificar el impacto de las acciones de transparencia.

## Desafíos y oportunidades

### Desafíos
- Resistencia de algunos sectores del gobierno
- Limitaciones de recursos de las organizaciones
- Falta de coordinación entre diferentes actores

### Oportunidades
- Mayor conciencia ciudadana sobre la importancia de la transparencia
- Desarrollo de nuevas tecnologías
- Apoyo internacional para iniciativas de transparencia

## Casos exitosos

Existen numerosos ejemplos de organizaciones que han logrado impactos significativos en materia de transparencia, desde la publicación de datos sobre contrataciones públicas hasta la implementación de sistemas de monitoreo de políticas públicas.

## El camino hacia adelante

El fortalecimiento del rol de la sociedad civil en la promoción de la transparencia requiere:

1. **Fortalecimiento institucional** de las organizaciones
2. **Coordinación** entre diferentes actores
3. **Uso estratégico** de las herramientas disponibles
4. **Formación** de nuevos liderazgos

## Conclusiones

La transparencia gubernamental es una construcción colectiva que requiere la participación activa de todos los sectores de la sociedad. La sociedad civil tiene un rol fundamental en este proceso, pero su éxito depende del compromiso sostenido y la coordinación estratégica.

Solo a través del trabajo conjunto entre ciudadanos, organizaciones y gobierno podremos construir instituciones más transparentes y democráticas.`,
    date: "2025-01-12",
    readTime: "7 min",
    category: "Sociedad",
    image: "/placeholder.svg?height=200&width=300",
    views: "1.2K",
    author: {
      name: "Natalia Volosin",
      avatar: "/natalia-volosin.jpg",
      bio: "Abogada, consultora, académica y comunicadora. LL.M. y J.S.D. por Yale Law School.",
    },
  },
]

export function findArticleBySlug(slug: string): Article | undefined {
  // First try exact match
  let article = articles.find((a) => a.slug === slug)

  if (!article) {
    // If no exact match, try normalized slug match
    const normalizedSlug = slugify(slug)
    article = articles.find((a) => slugify(a.slug) === normalizedSlug)
  }

  return article
}

export function getAllArticles(): Article[] {
  return articles
}
