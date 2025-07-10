export const articles = [
  {
    id: 1,
    slug: "crisis-institucional-reformas-estructurales-argentina",
    title: "Crisis institucional: El momento decisivo para las reformas estructurales en Argentina",
    excerpt:
      "Un análisis exhaustivo sobre la coyuntura política actual y las oportunidades únicas que se presentan para implementar cambios profundos en el sistema institucional argentino.",
    date: "2025-01-16",
    category: "Política",
    content:
      "This is the content of the article. It can be very long and contain a lot of information. This is the content of the article. It can be very long and contain a lot of information. This is the content of the article. It can be very long and contain a lot of information.",
    readTime: "5 minutes",
    views: 1200,
  },
  {
    id: 2,
    slug: "corrupcion-contrataciones-publicas-mecanismos-control",
    title: "La corrupción en las contrataciones públicas: Nuevos mecanismos de control",
    excerpt:
      "Propuestas concretas para fortalecer la transparencia en las compras del Estado basadas en experiencias internacionales exitosas.",
    date: "2025-01-15",
    category: "Derecho Público",
    content:
      "This is the content of the article. It can be very long and contain a lot of information. This is the content of the article. It can be very long and contain a lot of information. This is the content of the article. It can be very long and contain a lot of information.",
    readTime: "7 minutes",
    views: 800,
  },
  {
    id: 3,
    slug: "reformas-judiciales-lecciones-yale-sistema-argentino",
    title: "Reformas judiciales: Lecciones desde Yale para el sistema argentino",
    excerpt:
      "Reflexiones sobre las reformas necesarias en el Poder Judicial, comparando modelos internacionales con la realidad local.",
    date: "2025-01-14",
    category: "Justicia",
    content:
      "This is the content of the article. It can be very long and contain a lot of information. This is the content of the article. It can be very long and contain a lot of information. This is the content of the article. It can be very long and contain a lot of information.",
    readTime: "10 minutes",
    views: 1500,
  },
  {
    id: 4,
    slug: "criminalidad-economica-desafios-procuracion-general",
    title: "Criminalidad económica: Los desafíos de la Procuración General",
    excerpt:
      "Una mirada desde adentro sobre los obstáculos y oportunidades en la persecución de delitos económicos complejos.",
    date: "2025-01-13",
    category: "Derecho Penal",
    content:
      "This is the content of the article. It can be very long and contain a lot of information. This is the content of the article. It can be very long and contain a lot of information. This is the content of the article. It can be very long and contain a lot of information.",
    readTime: "6 minutes",
    views: 950,
  },
]

export const findArticleBySlug = (slug: string) => {
  return articles.find((article) => article.slug === slug)
}
