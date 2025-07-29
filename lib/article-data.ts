export type Article = {
  slug: string
  title: string
  description: string
  date: string
  imageUrl?: string
  content: string
}

const articles: Article[] = [
  {
    slug: "el-telefono-de-vaudagna-es-una-bomba",
    title: "El teléfono de Vaudagna es una bomba",
    description: "Un análisis explosivo sobre el caso Vaudagna y sus implicaciones.",
    date: "2024-07-29",
    imageUrl: "/images/vaudagna-bomba.webp",
    content: `
      El caso del teléfono de Vaudagna ha sacudido los cimientos de la política. Las revelaciones contenidas en el dispositivo prometen desatar una tormenta de proporciones.
      Desde el primer momento, la información filtrada ha generado un revuelo sin precedentes. Los nombres implicados y las conversaciones expuestas sugieren una red de influencias y manejos que van más allá de lo imaginable.
      La opinión pública está atenta a cada nuevo detalle, exigiendo transparencia y justicia. Este caso no solo pone en jaque a figuras importantes, sino que también cuestiona la integridad de las instituciones.
      Es crucial que la investigación se lleve a cabo con total independencia y sin presiones externas. Solo así se podrá garantizar que la verdad salga a la luz y que los responsables rindan cuentas.
      Las repercusiones de este escándalo se sentirán por mucho tiempo, redefiniendo el panorama político y social. Es un momento decisivo para la democracia y la confianza ciudadana.
    `,
  },
  {
    slug: "intelectuales-de-milei",
    title: "Los intelectuales de Milei",
    description: "Un vistazo a las figuras intelectuales que respaldan al presidente Milei.",
    date: "2024-07-20",
    imageUrl: "/images/intelectuales-de-milei.webp",
    content: `
      El ascenso de Javier Milei a la presidencia ha estado acompañado por un grupo de intelectuales que han moldeado y difundido sus ideas. Estas figuras provienen de diversas corrientes, pero comparten una visión común sobre la economía y el rol del Estado.
      Entre ellos se encuentran economistas, filósofos y pensadores que han contribuido a la construcción del andamiaje ideológico libertario. Sus argumentos se centran en la defensa de la libertad individual, la reducción del gasto público y la desregulación de los mercados.
      La influencia de estos intelectuales no se limita al ámbito académico; también participan activamente en los medios de comunicación y en redes sociales, buscando persuadir a la opinión pública sobre la validez de las propuestas de Milei.
      Este fenómeno ha generado un intenso debate en la sociedad, con defensores y críticos de las ideas libertarias. La discusión abarca desde la viabilidad de las políticas propuestas hasta sus posibles impactos sociales.
      El rol de los intelectuales en la política es fundamental para el desarrollo de ideas y el enriquecimiento del debate público. En el caso de Milei, han sido clave para legitimar y popularizar un discurso que, hasta hace poco, era marginal en Argentina.
    `,
  },
  {
    slug: "decomiso-de-drogas",
    title: "Decomiso de drogas: un golpe al narcotráfico",
    description: "Análisis del reciente decomiso de drogas y su impacto en la lucha contra el narcotráfico.",
    date: "2024-07-15",
    imageUrl: "/images/decomiso.webp",
    content: `
      El reciente decomiso de una importante cantidad de drogas representa un golpe significativo a las redes de narcotráfico que operan en la región. Esta operación, fruto de un arduo trabajo de inteligencia, demuestra la capacidad de las fuerzas de seguridad para combatir este flagelo.
      La incautación no solo afecta las finanzas de las organizaciones criminales, sino que también interrumpe sus cadenas de suministro y distribución. Esto tiene un impacto directo en la disponibilidad de estupefacientes en las calles, contribuyendo a la reducción del consumo y sus consecuencias.
      Sin embargo, la lucha contra el narcotráfico es una tarea constante y compleja. Las organizaciones criminales son dinámicas y se adaptan rápidamente a los nuevos escenarios. Por ello, es fundamental mantener y fortalecer las políticas de seguridad y cooperación internacional.
      Además de las acciones represivas, es crucial abordar las causas profundas del narcotráfico, como la pobreza, la desigualdad y la falta de oportunidades. Solo con un enfoque integral se podrá lograr una solución duradera a este problema.
      Este decomiso es un recordatorio de la importancia de la colaboración entre las distintas agencias de seguridad y la comunidad. La información y el apoyo ciudadano son clave para desmantelar estas redes y construir un futuro más seguro para todos.
    `,
  },
  {
    slug: "el-fallo-de-la-corte-en-la-causa-vialidad",
    title: "El fallo de la Corte en la causa Vialidad",
    description:
      "Un análisis detallado del fallo de la Corte Suprema en la causa Vialidad y sus implicaciones políticas y judiciales.",
    date: "2023-12-01",
    imageUrl: "/videos/el-fallo-de-la-Corte-en-la-causa-vialidad.mp4",
    content: `
      El fallo de la Corte Suprema en la causa Vialidad ha generado un intenso debate en el ámbito político y judicial. La decisión, que involucra a figuras de alto perfil, ha sido interpretada de diversas maneras por los distintos actores.
      Desde el punto de vista jurídico, el fallo sienta un precedente importante en la lucha contra la corrupción. Sin embargo, también ha sido objeto de críticas por parte de quienes consideran que no se ajusta a derecho o que responde a intereses políticos.
      Las implicaciones políticas del fallo son innegables. La causa Vialidad ha sido un tema central en la agenda pública durante años, y la resolución de la Corte tendrá un impacto en el escenario electoral y en la imagen de los partidos políticos.
      Es fundamental que la sociedad civil se mantenga informada y participe activamente en el debate sobre este tipo de casos. La transparencia y la rendición de cuentas son pilares fundamentales de una democracia sana.
      Este fallo nos invita a reflexionar sobre la importancia de la independencia judicial y la necesidad de fortalecer las instituciones para garantizar la justicia y la equidad en el país.
    `,
  },
  {
    slug: "las-mentiras-de-juliana-santillan-ante-el-reclamo-de-las-medicas",
    title: "Las mentiras de Juliana Santillán ante el reclamo de las médicas",
    description: "Un examen de las declaraciones de Juliana Santillán y la verdad detrás del reclamo de las médicas.",
    date: "2023-11-25",
    imageUrl: "/videos/las-mentiras-de-juliana-santillan-ante-el-reclamo-de-las-medicas.mp4",
    content: `
      El reclamo de las médicas ha puesto en evidencia una serie de problemáticas en el sistema de salud. En este contexto, las declaraciones de Juliana Santillán han generado controversia y han sido objeto de un minucioso escrutinio.
      Es importante analizar la veracidad de sus afirmaciones y contrastarlas con la realidad que viven las profesionales de la salud. La falta de recursos, las condiciones laborales precarias y la sobrecarga de trabajo son solo algunos de los desafíos que enfrentan.
      La voz de las médicas es fundamental para visibilizar estas problemáticas y buscar soluciones efectivas. Es necesario un diálogo abierto y constructivo entre las autoridades, los gremios y los profesionales para mejorar la calidad de la atención médica.
      Este caso nos invita a reflexionar sobre la importancia de la ética en la función pública y la responsabilidad de los funcionarios de brindar información veraz y transparente a la ciudadanía.
      La salud es un derecho fundamental, y es deber del Estado garantizar su acceso y calidad para todos los ciudadanos. El reclamo de las médicas es un llamado de atención que no debe ser ignorado.
    `,
  },
  {
    slug: "el-llanto-de-la-mujer-de-jorge-macri",
    title: "El llanto de la mujer de Jorge Macri",
    description: "Un momento emotivo que revela la tensión en la política argentina.",
    date: "2023-11-18",
    imageUrl: "/videos/el-llanto-de-la-mujer-de-jorge-macri.mp4",
    content: `
      El llanto de la mujer de Jorge Macri durante un evento público ha conmovido a la opinión pública y ha puesto de manifiesto la presión y el desgaste que implica la vida política.
      Este momento emotivo ha generado diversas interpretaciones, desde la empatía con la figura pública hasta el cuestionamiento sobre la exposición de la vida privada en el ámbito político.
      Es importante recordar que detrás de cada figura pública hay seres humanos con emociones y vulnerabilidades. La política, con sus constantes desafíos y críticas, puede ser un entorno muy exigente.
      Este episodio nos invita a reflexionar sobre la humanización de la política y la necesidad de construir un debate público más respetuoso y empático.
      Más allá de las ideologías y las diferencias, es fundamental reconocer la humanidad de quienes participan en la vida política y brindarles el apoyo necesario para que puedan desempeñar su labor de la mejor manera posible.
    `,
  },
]

export async function getAllArticles(): Promise<Article[]> {
  // In a real application, you would fetch this from a database or CMS
  // For now, we'll return the hardcoded data
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  // In a real application, you would fetch this from a database or CMS
  return articles.find((article) => article.slug === slug)
}
