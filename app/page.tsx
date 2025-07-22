"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { Card, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, BookOpen, Quote, X } from "lucide-react" // Importar nuevos iconos

interface Country {
  id: string
  name: string
  flag: string
  capital: string
  population: string
  language: string
  currency: string
  founded: string
  countryShape: string // Nueva propiedad para la forma del país
  writer: {
    name: string
    profession: string
    quote: string
    period: string
    photo: string
    masterwork: {
      title: string
      year: string
      genre: string
      summary: string
      image: string
      themes: string[]
      extract: string
    }
  }
}

const countries: Country[] = [
  {
    id: "spain",
    name: "España",
    flag: "🇪🇸",
    capital: "Madrid",
    population: "47.4 millones",
    language: "Español",
    currency: "Euro (€)",
    founded: "1469",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Miguel de Cervantes",
      profession: "Novelista, poeta y dramaturgo",
      quote: "El que lee mucho y anda mucho, ve mucho y sabe mucho.",
      period: "1547-1616",
      photo: "/cervantes-historical.png",
      masterwork: {
        title: "Don Quijote de la Mancha",
        year: "1605-1615",
        genre: "Novela",
        summary:
          "Don Quijote de la Mancha es considerada la primera novela moderna y una de las obras más importantes de la literatura universal. Narra las aventuras de Alonso Quixano, un hidalgo que enloquece leyendo libros de caballerías y decide convertirse en caballero andante bajo el nombre de Don Quijote. Acompañado por su fiel escudero Sancho Panza, emprende aventuras para defender a los desvalidos y luchar contra las injusticias. La obra es una sátira de las novelas de caballerías, pero también una profunda reflexión sobre la realidad y la fantasía, los ideales y la vida práctica. A través del contraste entre el idealista Don Quijote y el pragmático Sancho Panza, Cervantes explora temas universales como la locura y la cordura, la justicia, el amor y la muerte. La novela presenta episodios memorables como la lucha contra los molinos de viento, que Don Quijote confunde con gigantes, simbolizando la lucha eterna entre los ideales y la realidad.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen-5ShWFMRwHr9MV4PpAhjWrxCJ2QUlDb.png",
        themes: ["Idealismo vs Realismo", "Locura y Cordura", "Justicia", "Amistad", "Sátira Social"],
        extract:
          '"En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lentejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda. Finalmente, tanto leyó en aquellos libros, que se le secó el celebro de manera que vino a perder el juicio. Llenósele la fantasía de todo aquello que leía en los libros, así de encantamentos como de pendencias, batallas, desafíos, heridas, requiebros, amores, tormentas y disparates imposibles." (Capítulo 1, página 25)',
      },
    },
  },
  {
    id: "germany",
    name: "Alemania",
    flag: "🇩🇪",
    capital: "Berlín",
    population: "83.2 millones",
    language: "Alemán",
    currency: "Euro (€)",
    founded: "1871",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Johann Wolfgang von Goethe",
      profession: "Poeta y dramaturgo",
      quote: "Lo que no se empieza hoy, nunca se termina mañana.",
      period: "1749-1832",
      photo: "/goethe-sketch.png",
      masterwork: {
        title: "Fausto",
        year: "1808-1832",
        genre: "Drama",
        summary:
          "Fausto, de Goethe, narra la historia de un sabio insatisfecho que, a través de un pacto con el diablo Mefistófeles, busca conocimiento y placeres terrenales, vendiendo su alma a cambio de juventud y experiencias ilimitadas. La obra, dividida en dos partes, explora la búsqueda de sentido en la vida, la lucha entre el bien y el mal, y la naturaleza del alma humana. El doctor Fausto, un erudito consumido por su sed de conocimiento, se siente frustrado por los límites de la ciencia y la filosofía. A través de sus aventuras, Fausto experimenta el amor con Margarita (Gretchen), una joven inocente que se convierte en víctima de su pasión. En la segunda parte, Fausto continúa su búsqueda de conocimiento y poder, participando en eventos históricos y realizando grandes obras para la humanidad. La obra culmina mostrando la posibilidad de redención incluso para aquellos que han caído profundamente. Finalmente, a pesar de sus pecados y errores, Fausto es redimido y salvado por la gracia divina.",
        image: "/fausto-illustration.png",
        themes: ["Pacto Diabólico", "Búsqueda del Conocimiento", "Amor y Tragedia", "Redención", "Naturaleza Humana"],
        extract:
          "\"FAUSTO – ¿Qué es lo que me ofreces? Alimento que no sacia; oro candente que, como el mercurio, se escapa de las manos sin descanso; un juego en el que nunca se gana; una muchacha que, abrazada a mi pecho, ya guiña el ojo y se entiende con el más cercano; el espléndido y divino placer del honor que se desvanece como un meteoro. Muéstrame frutos que se pudran antes de nacer y árboles que verdeen de nuevo cada día.\n\nMEFISTÓFELES – Esos tesoros que dices, yo te los puedo ofrecer. Mas, amigo querido, también se acerca el tiempo en que podamos regaladamente comer en paz alguna cosa buena.\n\nFAUSTO – Si me tiendo ocioso y descansado sobre un lecho, si con halagos puedes engañarme hasta el punto de estar satisfecho de mí mismo, si logras seducirme a fuerza de goces, muera yo inmediatamente. Te propongo la apuesta.\n\nMEFISTÓFELES – ¡Aceptada!\n\nFAUSTO – ¡Choquen nuestras manos! Si un día le digo a un instante fugaz: '¡Detente! ¡Eres tan hermoso!', puedes atarme entonces con cadenas y terminarse el tiempo para mí.\"",
      },
    },
  },
  {
    id: "uk",
    name: "Reino Unido",
    flag: "🇬🇧",
    capital: "Londres",
    population: "67.8 millones",
    language: "Inglés",
    currency: "Libra esterlina (£)",
    founded: "1707",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "William Shakespeare",
      profession: "Dramaturgo y poeta",
      quote: "Ser o no ser, esa es la cuestión.",
      period: "1564-1616",
      photo: "/shakespeare-historical-engraving.png",
      masterwork: {
        title: "Hamlet",
        year: "1600-1601",
        genre: "Tragedia",
        summary:
          "Hamlet es la tragedia más famosa de Shakespeare, que narra la historia del príncipe Hamlet de Dinamarca, quien busca vengar la muerte de su padre tras ser visitado por su fantasma. La obra explora temas profundos como la venganza, la locura, la muerte, la traición y la corrupción moral. Hamlet finge estar loco mientras planea su venganza contra su tío Claudio, quien ha asesinado a su padre y se ha casado con su madre Gertrudis. La obra incluye algunos de los monólogos más famosos de la literatura, incluyendo 'Ser o no ser', donde Hamlet reflexiona sobre la vida y la muerte. La complejidad psicológica del protagonista, sus dudas existenciales y su lucha interna entre la acción y la contemplación han convertido a Hamlet en uno de los personajes más estudiados de la literatura. La tragedia culmina en una serie de muertes que incluyen a Hamlet, Claudio, Gertrudis y Laertes, dejando solo a Horacio para contar la historia.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Venganza", "Locura", "Muerte", "Traición", "Dilema Moral"],
        extract:
          '"Ser o no ser, esa es la cuestión. ¿Cuál es más noble en la mente, sufrir los golpes y dardos de la ultrajante fortuna, o tomar armas contra un mar de calamidades, y, al oponerse a ellas, encontrar el fin?" (Acto III, Escena I)',
      },
    },
  },
  {
    id: "france",
    name: "Francia",
    flag: "🇫🇷",
    capital: "París",
    population: "68.4 millones",
    language: "Francés",
    currency: "Euro (€)",
    founded: "843",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Victor Hugo",
      profession: "Novelista, poeta y dramaturgo",
      quote:
        "El futuro tiene muchos nombres. Para los débiles es lo inalcanzable. Para los temerosos, lo desconocido. Para los valientes, la oportunidad.",
      period: "1802-1885",
      photo: "/victor-hugo-engraving.jpeg",
      masterwork: {
        title: "Los Miserables",
        year: "1862",
        genre: "Novela",
        summary:
          "Los Miserables es una monumental novela que retrata la Francia del siglo XIX a través de la historia de Jean Valjean, un ex-convicto que busca la redención. La obra sigue las vidas entrelazadas de varios personajes, incluyendo a Fantine, una madre soltera; Cosette, su hija; Marius, un joven revolucionario; y Javert, el implacable inspector de policía. Hugo utiliza estas historias personales para explorar temas de justicia social, pobreza, revolución y redención. La novela culmina durante los levantamientos de París de 1832, donde los personajes enfrentan sus destinos. Es una obra que combina el drama personal con la crítica social, mostrando tanto la miseria humana como la capacidad de transformación y esperanza. Hugo presenta un panorama épico de la sociedad francesa, desde los salones aristocráticos hasta las alcantarillas de París, creando un fresco social de extraordinaria amplitud.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Justicia Social", "Redención", "Revolución", "Pobreza", "Amor y Sacrificio"],
        extract: '"¿Amas? ¡Oh, sé amado! No pido más." (Volumen V, Libro I, Capítulo XIX)',
      },
    },
  },
  {
    id: "argentina",
    name: "Argentina",
    flag: "🇦🇷",
    capital: "Buenos Aires",
    population: "45.8 millones",
    language: "Español",
    currency: "Peso argentino ($)",
    founded: "1816",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Jorge Luis Borges",
      profession: "Poeta y ensayista",
      quote: "Siempre imaginé que el Paraíso sería algún tipo de biblioteca.",
      period: "1899-1986",
      photo: "/borges-sketch.png",
      masterwork: {
        title: "Ficciones",
        year: "1944",
        genre: "Cuentos",
        summary:
          "Ficciones es una colección de cuentos que revolucionó la literatura del siglo XX con su exploración de temas como el infinito, los laberintos, los espejos y la naturaleza de la realidad. Borges crea mundos fantásticos que desafían la lógica convencional: bibliotecas infinitas, laberintos temporales, enciclopedias de mundos imaginarios y personajes que existen en múltiples realidades. Cuentos como 'La Biblioteca de Babel', 'El jardín de senderos que se bifurcan' y 'Pierre Menard, autor del Quijote' han influenciado profundamente la literatura contemporánea. La obra combina erudición, filosofía y fantasía para crear una literatura intelectual única que explora los límites del conocimiento humano y la naturaleza de la ficción misma. Borges utiliza la metaficción para cuestionar las fronteras entre realidad y literatura, creando textos que son tanto cuentos como ensayos filosóficos.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen-bntZ1FOjt6XCzsbwQvcymdPRQlPyID.png",
        themes: ["Infinito", "Laberintos", "Realidad y Ficción", "Tiempo", "Conocimiento"],
        extract:
          '"Bajo los árboles ingleses medité en ese laberinto perdido: lo imaginé inviolado y perfecto en la cumbre secreta de una montaña, lo imaginé borrado por arrozales o debajo del agua, lo imaginé infinito, no ya de quioscos y de sendas que vuelven, sino de ríos y provincias y reinos… Pensé en un laberinto de laberintos, en un sinuoso laberinto creciente que abarcara el pasado y el porvenir y que implicara de algún modo los astros. Absorto en esas ilusorias imágenes, olvidé mi destino de perseguido. Me sentí, por un tiempo indeterminado, percibidor abstracto del mundo. El vago y vivo campo, la luna, los restos de la tarde, obraron en mí; asimismo el declive que eliminaba cualquier posibilidad de cansancio. La tarde era íntima, infinita. El camino bajaba y se bifurcaba, entre las ya confusas praderas. Una música aguda y como silábica se aproximaba y se alejaba en el vaivén del viento, empañada de hojas y de distancia. Pensé que un hombre puede ser enemigo de otros hombres, de otros momentos de otros hombres, pero no de un país; no de luciérnagas, palabras, jardines, cursos de agua, ponientes." (El jardín de senderos que se bifurcan)',
      },
    },
  },
  {
    id: "russia",
    name: "Rusia",
    flag: "🇷🇺",
    capital: "Moscú",
    population: "146.2 millones",
    language: "Ruso",
    currency: "Rublo ruso (₽)",
    founded: "1547",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "León Tolstói",
      profession: "Novelista y filósofo",
      quote: "Todos piensan en cambiar el mundo, pero nadie piensa en cambiarse a sí mismo.",
      period: "1828-1910",
      photo: "/tolstoi-sketch.png",
      masterwork: {
        title: "Guerra y Paz",
        year: "1865-1869",
        genre: "Novela épica",
        summary:
          "Guerra y Paz es una monumental novela épica que retrata la sociedad rusa durante las guerras napoleónicas. A través de las vidas de familias aristocráticas como los Rostov, los Bolkonsky y los Bezukhov, Tolstói explora temas universales como el amor, la guerra, la muerte, la fe y el destino. La obra combina magistralmente la historia personal con los grandes eventos históricos, mostrando cómo las vidas individuales se entrelazan con el curso de la historia. Pierre Bezukhov, Natasha Rostova y el príncipe Andrei Bolkonsky son personajes inolvidables que encarnan diferentes aspectos de la experiencia humana. La novela es tanto un retrato íntimo de la vida familiar como una meditación filosófica sobre la naturaleza de la historia y el libre albedrío. Tolstói presenta la guerra no como gloria heroica, sino como caos y sufrimiento humano, mientras celebra la capacidad de resistencia y renovación del espíritu humano.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Guerra y Paz", "Destino", "Amor", "Historia", "Filosofía de la vida"],
        extract: '"Todos piensan en cambiar el mundo, pero nadie piensa en cambiarse a sí mismo." (Epílogo, Parte II)',
      },
    },
  },
  {
    id: "japan",
    name: "Japón",
    flag: "🇯🇵",
    capital: "Tokio",
    population: "125.8 millones",
    language: "Japonés",
    currency: "Yen japonés (¥)",
    founded: "660 a.C.",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Yukio Mishima",
      profession: "Novelista y dramaturgo",
      quote: "La belleza es algo terrible y espantoso.",
      period: "1925-1970",
      photo: "/mishima-sketch.png",
      masterwork: {
        title: "El Mar de la Fertilidad",
        year: "1965-1970",
        genre: "Tetralogía novelística",
        summary:
          "El Mar de la Fertilidad es la obra cumbre de Mishima, una tetralogía que explora temas de reencarnación, belleza, decadencia y la tensión entre tradición y modernidad en el Japón del siglo XX. La saga sigue las supuestas reencarnaciones de un joven a través de cuatro novelas: 'Nieve de primavera', 'Caballos desbocados', 'El templo del alba' y 'La corrupción de un ángel'. Cada volumen está ambientado en una época diferente, desde la era Taisho hasta la posguerra, mostrando la transformación de Japón. Mishima combina elementos del budismo, el shintoísmo y la filosofía occidental para crear una meditación profunda sobre la naturaleza del tiempo, la identidad y la muerte. La obra refleja la obsesión del autor con la belleza efímera y su crítica a la occidentalización de Japón, culminando en una reflexión sobre el vacío existencial de la modernidad.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Reencarnación", "Tradición vs Modernidad", "Belleza", "Muerte", "Identidad japonesa"],
        extract: '"La vida humana es como una vela en el viento." (Nieve de Primavera)',
      },
    },
  },
  {
    id: "colombia",
    name: "Colombia",
    flag: "🇨🇴",
    capital: "Bogotá",
    population: "51.3 millones",
    language: "Español",
    currency: "Peso colombiano ($)",
    founded: "1810",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Gabriel García Márquez",
      profession: "Novelista y periodista",
      quote: "La vida no es la que uno vivió, sino la que uno recuerda y cómo la recuerda para contarla.",
      period: "1927-2014",
      photo: "/garcia-marquez-portrait.png",
      masterwork: {
        title: "Cien años de soledad",
        year: "1967",
        genre: "Realismo mágico",
        summary:
          "Cien años de soledad es la obra maestra del realismo mágico que narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo. García Márquez teje una narrativa donde lo fantástico y lo real se entrelazan naturalmente, creando un universo donde llueve flores, los personajes ascienden al cielo y los muertos conviven con los vivos. La novela es una alegoría de la historia latinoamericana, explorando temas como la soledad, el destino cíclico, el poder, la violencia y el amor. Cada generación de los Buendía repite patrones familiares, sugiriendo que la historia se repite inexorablemente. La obra combina elementos míticos con crítica social, presentando una visión poética y trágica de América Latina. El estilo narrativo de García Márquez, que mezcla lo cotidiano con lo extraordinario, revolucionó la literatura mundial y estableció el realismo mágico como un género literario reconocido.",
        image: "/cien-anos-soledad-illustration.png",
        themes: ["Realismo Mágico", "Soledad", "Destino Cíclico", "Historia Latinoamericana", "Familia"],
        extract:
          '"Según él mismo (Melquíades) le contó a José Arcadio Buendía mientras lo ayudaba a montar el laboratorio, la muerte lo seguía a todas partes, husmeándole los pantalones, pero sin decidirse a darle el zarpazo final"',
      },
    },
  },
  {
    id: "czech",
    name: "República Checa",
    flag: "🇨🇿",
    capital: "Praga",
    population: "10.7 millones",
    language: "Checo",
    currency: "Corona checa (Kč)",
    founded: "1993",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Franz Kafka",
      profession: "Escritor y abogado",
      quote: "Un libro debe ser el hacha que rompa el mar helado que llevamos dentro.",
      period: "1883-1924",
      photo: "/kafka-sketch.png",
      masterwork: {
        title: "La Metamorfosis",
        year: "1915",
        genre: "Novela corta",
        summary:
          "La Metamorfosis es una de las obras más influyentes de la literatura moderna, que narra la transformación de Gregor Samsa en un insecto gigantesco. Esta transformación física sirve como metáfora de la alienación del individuo en la sociedad moderna. Kafka explora temas como la incomunicación familiar, la deshumanización del trabajo, la culpa y la responsabilidad. La obra presenta un mundo absurdo donde lo imposible se acepta como normal, anticipando el existencialismo y el teatro del absurdo. A través de la experiencia de Gregor, Kafka examina cómo la sociedad trata a aquellos que son diferentes o improductivos. La familia de Gregor, inicialmente dependiente de él económicamente, gradualmente lo rechaza y lo trata como una carga. La novela es una crítica mordaz de la sociedad burguesa y una exploración profunda de la condición humana en la era industrial.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Alienación", "Metamorfosis", "Familia", "Absurdo", "Condición humana"],
        extract:
          '"Cuando Gregorio Samsa se despertó una mañana después de un sueño intranquilo, se encontró sobre su cama convertido en un monstruoso insecto." (Capítulo 1)',
      },
    },
  },
  {
    id: "chile",
    name: "Chile",
    flag: "🇨🇱",
    capital: "Santiago",
    population: "19.5 millones",
    language: "Español",
    currency: "Peso chileno ($)",
    founded: "1810",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Pablo Neruda",
      profession: "Poeta y diplomático",
      quote: "Podrán cortar todas las flores, pero no podrán detener la primavera.",
      period: "1904-1973",
      photo: "/neruda-sketch.png",
      masterwork: {
        title: "Veinte poemas de amor y una canción desesperada",
        year: "1924",
        genre: "Poesía",
        summary:
          "Esta colección poética, escrita cuando Neruda tenía apenas 19 años, se convirtió en una de las obras más leídas de la poesía en español. Los poemas exploran el amor juvenil con una intensidad y sensualidad que revolucionó la poesía amorosa en lengua española. Neruda combina elementos del modernismo con un lenguaje más directo y emocional, creando versos que van desde la exaltación del amor hasta la melancolía de la pérdida. La obra refleja la influencia del paisaje chileno, especialmente del sur del país, donde Neruda pasó su juventud. Los poemas alternan entre la celebración del cuerpo femenino y la naturaleza, y la exploración de la soledad y el desamor. La 'canción desesperada' que cierra el libro es considerada una de las elegías amorosas más hermosas de la literatura hispanoamericana. La obra estableció a Neruda como una voz poética única y marcó el inicio de una carrera que lo llevaría al Premio Nobel de Literatura.",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2010%20jul%202025%2C%2011_21_41-ic7huu7wNIgMJASgECM0lTqT0Euqmx.png",
        themes: ["Amor juvenil", "Naturaleza", "Sensualidad", "Melancolía", "Paisaje chileno"],
        extract:
          '"Cuerpo de mujer, blancas colinas, muslos blancos, te pareces al mundo en tu actitud de entrega. Mi cuerpo de labriego salvaje te socava y hace saltar el hijo del fondo de la tierra." (Poema 1)',
      },
    },
  },
  {
    id: "ireland",
    name: "Irlanda",
    flag: "🇮🇪",
    capital: "Dublín",
    population: "5.0 millones",
    language: "Inglés",
    currency: "Euro (€)",
    founded: "1922",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Oscar Wilde",
      profession: "Escritor y dramaturgo",
      quote: "Podemos perdonar a un hombre por hacer algo útil mientras no lo admire.",
      period: "1854-1900",
      photo: "/oscar-wilde-sketch.png",
      masterwork: {
        title: "El retrato de Dorian Gray",
        year: "1890",
        genre: "Novela gótica",
        summary:
          "El retrato de Dorian Gray es la única novela de Oscar Wilde y una obra maestra del decadentismo victoriano. La historia narra cómo Dorian Gray, un joven de extraordinaria belleza, hace un pacto para que su retrato envejezca en su lugar mientras él permanece eternamente joven. Influenciado por el hedonista Lord Henry Wotton, Dorian se sumerge en una vida de placeres y excesos, mientras su alma se corrompe y su retrato refleja la degradación moral que su rostro no muestra. Wilde utiliza esta premisa fantástica para explorar temas como la vanidad, la corrupción moral, el arte por el arte, y la hipocresía de la sociedad victoriana. La novela es tanto una crítica social como una reflexión sobre la naturaleza del arte y la belleza. El personaje de Dorian encarna los peligros del narcisismo y la búsqueda obsesiva de la juventud eterna, mientras que el retrato funciona como símbolo de la conciencia moral.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Vanidad", "Corrupción moral", "Arte y belleza", "Decadentismo", "Hipocresía social"],
        extract:
          '"La única manera de librarse de una tentación es ceder ante ella. Resístela, y tu alma enfermará de anhelo por las cosas que se ha prohibido a sí misma." (Capítulo 2)',
      },
    },
  },
  {
    id: "peru",
    name: "Perú",
    flag: "🇵🇪",
    capital: "Lima",
    population: "33.4 millones",
    language: "Español",
    currency: "Sol peruano (S/)",
    founded: "1821",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Mario Vargas Llosa",
      profession: "Novelista y ensayista",
      quote: "La literatura es una representación falaz de la vida, pero nos ayuda a entenderla mejor.",
      period: "1936-presente",
      photo: "/vargas-llosa-portrait.png",
      masterwork: {
        title: "La ciudad y los perros",
        year: "1963",
        genre: "Novela",
        summary:
          "La ciudad y los perros es la primera novela de Vargas Llosa y una de las obras fundacionales del boom latinoamericano. Ambientada en el Colegio Militar Leoncio Prado de Lima, la novela retrata la violencia, la corrupción y los códigos de honor en una institución que funciona como microcosmos de la sociedad peruana. A través de técnicas narrativas innovadoras como el monólogo interior y los saltos temporales, Vargas Llosa presenta la historia de un grupo de cadetes y cómo un robo y un asesinato revelan las tensiones sociales, raciales y de clase que dividen al país. Los personajes principales - el Jaguar, Alberto, Ricardo Arana y el Boa - representan diferentes estratos sociales y formas de enfrentar la adversidad. La novela es una crítica feroz del militarismo y del machismo, así como una exploración de cómo las instituciones pueden corromper a los individuos. El estilo narrativo complejo y la estructura fragmentada de la obra influyeron profundamente en la narrativa latinoamericana posterior.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Violencia institucional", "Clases sociales", "Machismo", "Corrupción", "Adolescencia"],
        extract:
          '"¿Por qué las cosas serían distintas si uno se llamara Jaguar o Boa? ¿Por qué la vida sería distinta en otro sitio, con otra gente?" (Capítulo 8)',
      },
    },
  },
  {
    id: "india",
    name: "India",
    flag: "🇮🇳",
    capital: "Nueva Delhi",
    population: "1.4 mil millones",
    language: "Hindi",
    currency: "Rupia india (₹)",
    founded: "1947",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Rabindranath Tagore",
      profession: "Poeta, filósofo y educador",
      quote: "No llores porque ya se terminó, sonríe porque sucedió.",
      period: "1861-1941",
      photo: "/tagore-sketch.png",
      masterwork: {
        title: "Gitanjali",
        year: "1910",
        genre: "Poesía espiritual",
        summary:
          "Gitanjali (Ofrenda lírica) es una colección de poemas espirituales que le valió a Tagore el Premio Nobel de Literatura en 1913, convirtiéndolo en el primer no europeo en recibir este honor. Los poemas, originalmente escritos en bengalí y luego traducidos al inglés por el propio autor, expresan una profunda devoción espiritual y una búsqueda mística de lo divino. Tagore combina elementos de la tradición hindú con una sensibilidad moderna, creando versos que trascienden las barreras culturales y religiosas. Los poemas abordan temas como la relación entre el alma individual y el cosmos, la naturaleza de Dios, la muerte, el amor y la búsqueda de la verdad. El estilo de Tagore es simple pero profundo, utilizando imágenes de la naturaleza y la vida cotidiana para expresar verdades espirituales universales. La obra refleja la filosofía del autor sobre la unidad de todas las religiones y su visión de un mundo sin fronteras culturales o nacionales.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Espiritualidad", "Misticismo", "Unidad divina", "Naturaleza", "Universalismo"],
        extract:
          '"Donde la mente está sin miedo y la cabeza se mantiene alta; donde el conocimiento es libre; donde el mundo no ha sido roto en fragmentos por estrechas paredes domésticas..." (Poema 35)',
      },
    },
  },
  {
    id: "norway",
    name: "Noruega",
    flag: "🇳🇴",
    capital: "Oslo",
    population: "5.4 millones",
    language: "Noruego",
    currency: "Corona noruega (kr)",
    founded: "1905",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Henrik Ibsen",
      profession: "Dramaturgo",
      quote: "El espíritu más fuerte y más libre es el que nunca se conforma.",
      period: "1828-1906",
      photo: "/ibsen-photo.png",
      masterwork: {
        title: "Casa de muñecas",
        year: "1879",
        genre: "Drama",
        summary:
          "Casa de muñecas es una obra revolucionaria que desafió las convenciones sociales de la época victoriana y se convirtió en un manifiesto feminista avant la lettre. La obra narra la historia de Nora Helmer, una mujer que aparentemente vive una vida perfecta como esposa y madre, pero que gradualmente descubre que ha sido tratada como una muñeca tanto por su padre como por su esposo Torvald. Cuando un secreto del pasado amenaza con destruir su matrimonio, Nora debe enfrentar la realidad de su situación y tomar una decisión que escandalizó a las audiencias de la época: abandonar a su familia para encontrar su propia identidad. Ibsen utiliza el realismo psicológico para explorar temas como la emancipación femenina, la hipocresía de la moral burguesa, el matrimonio como institución opresiva y la búsqueda de la autenticidad personal. La obra termina con el famoso portazo de Nora, un sonido que simbolizó el despertar de la conciencia femenina y que resonó en teatros de todo el mundo.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Emancipación femenina", "Matrimonio", "Identidad", "Hipocresía social", "Autenticidad"],
        extract: '"Debo intentar educarme a mí misma. Debo decidir por mí misma qué es lo correcto." (Acto III)',
      },
    },
  },
  {
    id: "sweden",
    name: "Suecia",
    flag: "🇸🇪",
    capital: "Estocolmo",
    population: "10.4 millones",
    language: "Sueco",
    currency: "Corona sueca (kr)",
    founded: "1523",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Selma Lagerlöf",
      profession: "Novelista",
      quote: "Hay algo en el trabajo que nos ennoblece y nos hace mejores.",
      period: "1858-1940",
      photo: "/lagerlof-sketch.png",
      masterwork: {
        title: "El maravilloso viaje de Nils Holgersson",
        year: "1906-1907",
        genre: "Literatura infantil/Fantasía",
        summary:
          "El maravilloso viaje de Nils Holgersson es una obra única que combina la literatura infantil con la geografía, la historia y el folclore sueco. La historia narra las aventuras de Nils, un niño travieso que es transformado en un duende por un gnomo como castigo por su mal comportamiento. Reducido a un tamaño diminuto, Nils viaja por toda Suecia montado en el ganso doméstico Morten, quien se ha unido a una bandada de gansos salvajes. Durante su viaje, Nils aprende sobre la geografía, la historia, las tradiciones y la naturaleza de su país, mientras gradualmente desarrolla empatía, responsabilidad y respeto por los demás seres vivos. Lagerlöf, quien fue la primera mujer en ganar el Premio Nobel de Literatura, creó esta obra como un libro de texto para enseñar geografía sueca a los niños, pero logró mucho más: una obra maestra que combina educación con entretenimiento, realismo con fantasía, y que transmite valores universales sobre el crecimiento personal y el respeto por la naturaleza.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Crecimiento personal", "Naturaleza", "Geografía", "Folclore", "Responsabilidad"],
        extract: '"El mundo es grande y hermoso, y vale la pena explorarlo." (Capítulo 24)',
      },
    },
  },
  {
    id: "italy",
    name: "Italia",
    flag: "🇮🇹",
    capital: "Roma",
    population: "59.1 millones",
    language: "Italiano",
    currency: "Euro (€)",
    founded: "1861",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Dante Alighieri",
      profession: "Poeta y filósofo",
      quote: "El amor que mueve el sol y las otras estrellas.",
      period: "1265-1321",
      photo: "/dante-sketch.png",
      masterwork: {
        title: "La Divina Comedia",
        year: "1308-1320",
        genre: "Poema épico",
        summary:
          "La Divina Comedia es la obra cumbre de la literatura italiana y una de las más importantes de la literatura universal. Este poema épico narra el viaje de Dante a través del Infierno, el Purgatorio y el Paraíso, guiado primero por el poeta romano Virgilio y después por Beatriz, su amor platónico. La obra es una alegoría del viaje del alma hacia Dios, pero también una crítica política y social de la Italia medieval. Dante estructura su obra en tres cánticas de 33 cantos cada una (más un canto introductorio), utilizando la terza rima, una forma poética que él mismo inventó. A través de su viaje, Dante encuentra a personajes históricos y contemporáneos, desde emperadores hasta papas, desde poetas hasta traidores, cada uno ubicado según sus virtudes o pecados. La obra combina teología cristiana, filosofía aristotélica y mitología clásica, creando una síntesis extraordinaria del conocimiento medieval. Más allá de su valor religioso y filosófico, La Divina Comedia estableció el italiano como lengua literaria y influyó profundamente en toda la literatura occidental posterior.",
        image: "/divina-comedia-illustration.png",
        themes: ["Viaje espiritual", "Justicia divina", "Amor cortés", "Política medieval", "Redención"],
        extract:
          '"Nel mezzo del cammin di nostra vita / mi ritrovai per una selva oscura, / ché la diritta via era smarrita. / Ahi quanto a dir qual era è cosa dura / esta selva selvaggia e aspra e forte / che nel pensier rinova la paura!" (En medio del camino de nuestra vida / me encontré en una selva oscura, / porque la senda recta estaba perdida. / ¡Ah, cuán difícil es decir lo que era / esta selva salvaje, áspera y espesa / que renueva el temor en el pensamiento!) (Infierno, Canto I)',
      },
    },
  },
  {
    id: "finland",
    name: "Finlandia",
    flag: "🇫🇮",
    capital: "Helsinki",
    population: "5.5 millones",
    language: "Finés",
    currency: "Euro (€)",
    founded: "1917",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Elias Lönnrot",
      profession: "Médico y filólogo",
      quote: "En la palabra vive el alma del pueblo.",
      period: "1802-1884",
      photo: "/lonnrot-sketch.png",
      masterwork: {
        title: "Kalevala",
        year: "1835-1849",
        genre: "Epopeya nacional",
        summary:
          "El Kalevala es la epopeya nacional de Finlandia, compilada por Elias Lönnrot a partir de la tradición oral finlandesa. Esta obra monumental reúne cantos populares, mitos y leyendas que habían sido transmitidos oralmente durante siglos en Finlandia y Carelia. La epopeya narra las aventuras de héroes como Väinämöinen, el sabio cantante; Ilmarinen, el herrero eterno; y Lemminkäinen, el aventurero temerario. El Kalevala no solo preservó la rica tradición oral finlandesa, sino que también desempeñó un papel crucial en el despertar de la conciencia nacional finlandesa durante el período de dominación rusa. La obra influyó profundamente en el arte, la música y la literatura finlandesa, inspirando a compositores como Jean Sibelius. Lönnrot utilizó el metro tradicional finlandés, el tetrámetro trocaico, creando un ritmo hipnótico que refleja la naturaleza oral de estos cantos. El Kalevala presenta una cosmogonía única, donde la creación del mundo surge del canto y la palabra, y donde la naturaleza finlandesa - bosques, lagos y auroras boreales - juega un papel fundamental. La obra se convirtió en símbolo de la identidad cultural finlandesa y contribuyó significativamente al proceso de independencia del país.",
        image: "/placeholder.svg?height=400&width=600",
        themes: [
          "Mitología finlandesa",
          "Tradición oral",
          "Identidad nacional",
          "Naturaleza nórdica",
          "Poder de la palabra",
        ],
        extract:
          '"Mieleni minun tekevi, / aivoni ajattelevi / lähteäni laulamahan, / saa\'ani sanelemahan, / sukuvirttä suoltamahan, / lajivirttä laulamahan." (Mi mente me impulsa, / mi cerebro me incita / a comenzar a cantar, / a recitar mi canto, / a entonar el canto del linaje, / a cantar el canto de la estirpe.) (Canto I)',
      },
    },
  },
  {
    id: "denmark",
    name: "Dinamarca",
    flag: "🇩🇰",
    capital: "Copenhague",
    population: "5.8 millones",
    language: "Danés",
    currency: "Corona danesa (kr)",
    founded: "965",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Hans Christian Andersen",
      profession: "Escritor de cuentos",
      quote: "La vida misma es el cuento de hadas más maravilloso.",
      period: "1805-1875",
      photo: "/hans-christian-andersen-portrait.png",
      masterwork: {
        title: "Cuentos de Hadas",
        year: "1835-1872",
        genre: "Cuentos infantiles",
        summary:
          "Los Cuentos de Hadas de Hans Christian Andersen revolucionaron la literatura infantil mundial, creando historias que trascienden la edad y hablan tanto a niños como a adultos. A diferencia de los hermanos Grimm, que recopilaban cuentos populares, Andersen creó historias completamente originales que combinan elementos fantásticos con profundas reflexiones sobre la condición humana. Cuentos como 'La Sirenita', 'El Patito Feo', 'La Reina de las Nieves', 'El Soldadito de Plomo' y 'La Cerillera' se han convertido en clásicos universales. Andersen tenía la habilidad única de dar vida a objetos inanimados y animales, creando personajes entrañables que enfrentan dilemas morales complejos. Sus historias abordan temas como la diferencia, el sacrificio, el amor no correspondido, la muerte y la búsqueda de la identidad, siempre con una sensibilidad poética extraordinaria. El autor danés no temía mostrar el lado oscuro de la vida, incluso en cuentos para niños, lo que dio a sus obras una profundidad emocional única. Su influencia en la literatura infantil es inmensurable, y sus cuentos han sido adaptados innumerables veces en teatro, cine, ballet y ópera, convirtiéndose en parte del patrimonio cultural mundial.",
        image: "/andersen-tales-illustration.png",
        themes: ["Fantasía", "Crecimiento personal", "Diferencia", "Sacrificio", "Magia cotidiana"],
        extract:
          "\"Pero el emperador no llevaba nada puesto, y todos los súbditos lo sabían. Sin embargo, nadie se atrevía a decirlo, hasta que un niño pequeño gritó: '¡Pero si va desnudo!' Y entonces todos comenzaron a murmurar: 'El niño tiene razón, ¡el emperador va desnudo!'\" (El Traje Nuevo del Emperador)",
      },
    },
  },
  {
    id: "israel",
    name: "Israel",
    flag: "🇮🇱",
    capital: "Jerusalén",
    population: "9.5 millones",
    language: "Hebreo",
    currency: "Nuevo shéquel (₪)",
    founded: "1948",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Amos Oz",
      profession: "Novelista y ensayista",
      quote: "La literatura puede enseñarnos a entender el dolor de otras personas.",
      period: "1939-2018",
      photo: "/amos-oz-photo.png",
      masterwork: {
        title: "Una historia de amor y oscuridad",
        year: "2002",
        genre: "Autobiografía novelada",
        summary:
          "Una historia de amor y oscuridad es una obra autobiográfica que narra la infancia y juventud de Amos Oz en el Jerusalén de los años 40 y 50, durante los primeros años del Estado de Israel. La obra combina memoria personal con historia colectiva, explorando la compleja relación entre el individuo y la nación en formación. Oz retrata con sensibilidad y honestidad la figura de su madre, Fania, una mujer culta y melancólica que se suicidó cuando él tenía 12 años, y la de su padre, un erudito que trabajaba como bibliotecario. A través de episodios familiares y sociales, el autor examina temas como la inmigración, la identidad judía, el sionismo, la pérdida de la inocencia y la construcción de una nueva sociedad. La prosa de Oz es lírica y reflexiva, combinando la intimidad de la memoria personal con la amplitud de la experiencia histórica. La obra es tanto un retrato de una familia como un fresco de una época crucial en la historia de Israel y del pueblo judío.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Memoria", "Identidad judía", "Sionismo", "Familia", "Historia de Israel"],
        extract: '"El pasado no está muerto. Ni siquiera es pasado." (Capítulo 1)',
      },
    },
  },
  {
    id: "netherlands",
    name: "Países Bajos",
    flag: "🇳🇱",
    capital: "Ámsterdam",
    population: "17.4 millones",
    language: "Neerlandés",
    currency: "Euro (€)",
    founded: "1581",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Anne Frank",
      profession: "Diarista",
      quote: "A pesar de todo, creo que la gente es realmente buena de corazón.",
      period: "1929-1945",
      photo: "/anne-frank-sketch.png",
      masterwork: {
        title: "El Diario de Ana Frank",
        year: "1947",
        genre: "Diario/Autobiografía",
        summary:
          "El Diario de Ana Frank es uno de los testimonios más conmovedores y universales sobre el Holocausto y la experiencia humana durante la Segunda Guerra Mundial. Escrito por una adolescente judía mientras se escondía con su familia en Ámsterdam durante la ocupación nazi, el diario abarca desde junio de 1942 hasta agosto de 1944. Ana Frank documenta no solo los horrores de la guerra y la persecución, sino también las experiencias típicas de la adolescencia: sus sueños, miedos, conflictos familiares, despertar sexual y reflexiones sobre la naturaleza humana. A través de sus cartas dirigidas a 'Kitty', Ana muestra una madurez extraordinaria y una capacidad notable para mantener la esperanza y la fe en la humanidad a pesar de las circunstancias terribles. El diario se ha convertido en un símbolo universal de la resistencia del espíritu humano frente a la opresión y ha educado a millones de personas sobre los horrores del Holocausto. La voz de Ana, interrumpida trágicamente cuando fue deportada a Bergen-Belsen donde murió, sigue resonando como un llamado a la tolerancia y los derechos humanos.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Holocausto", "Adolescencia", "Esperanza", "Derechos humanos", "Resistencia"],
        extract:
          '"Veo el mundo transformándose lentamente en un desierto, oigo el trueno que se acerca cada vez más y que nos destruirá también a nosotros, siento el sufrimiento de millones y, sin embargo, cuando miro al cielo, pienso que todo cambiará para bien, que esta crueldad también cesará, que la paz y la tranquilidad volverán a reinar en el cielo." (15 de julio de 1944)',
      },
    },
  },
  {
    id: "south_korea",
    name: "Corea del Sur",
    flag: "🇰🇷",
    capital: "Seúl",
    population: "51.8 millones",
    language: "Coreano",
    currency: "Won surcoreano (₩)",
    founded: "1948",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Han Kang",
      profession: "Novelista",
      quote: "La escritura es una forma de resistencia contra el olvido.",
      period: "1970-presente",
      photo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen-iUS3jiCbEmbv7wiAZIsoOldtiqBVsE.png",
      masterwork: {
        title: "La vegetariana",
        year: "2007",
        genre: "Novela",
        summary:
          "La vegetariana es una novela perturbadora y poética que explora la opresión femenina en la sociedad patriarcal coreana a través de la historia de Yeong-hye, una mujer que decide dejar de comer carne. Esta decisión aparentemente simple desencadena una serie de eventos violentos que revelan la brutalidad subyacente en las relaciones familiares y sociales. La novela está dividida en tres partes, cada una narrada desde una perspectiva diferente: el esposo abusivo, el cuñado obsesionado y la hermana. Han Kang utiliza un estilo onírico y simbólico para explorar temas como la autonomía corporal, la violencia doméstica, la enfermedad mental y la resistencia femenina. La transformación de Yeong-hye de mujer sumisa a ser que rechaza las normas sociales es tanto liberadora como trágica. La obra, que le valió a Han Kang el Premio Man Booker Internacional, es una crítica feroz del machismo y una meditación sobre los límites entre la cordura y la locura, la civilización y la naturaleza.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen-iUS3jiCbEmbv7wiAZIsoOldtiqBVsE.png",
        themes: ["Opresión femenina", "Patriarcado", "Autonomía corporal", "Violencia doméstica", "Resistencia"],
        extract:
          '"Soñaba con árboles. Árboles que se extendían desde su cuerpo, brotando de sus manos y pies." (Parte 1)',
      },
    },
  },
  {
    id: "turkey",
    name: "Turquía",
    flag: "🇹🇷",
    capital: "Ankara",
    population: "84.3 millones",
    language: "Turco",
    currency: "Lira turca (₺)",
    founded: "1923",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Orhan Pamuk",
      profession: "Novelista",
      quote: "El verdadero arte surge de la tensión entre tradición y modernidad.",
      period: "1952-presente",
      photo: "/orhan-pamuk-photo.png",
      masterwork: {
        title: "Mi nombre es Rojo",
        year: "1998",
        genre: "Novela histórica",
        summary:
          "Mi nombre es Rojo es una novela compleja ambientada en el Estambul del siglo XVI que combina misterio, historia del arte y reflexión filosófica. La historia gira en torno al asesinato de un miniaturista que trabajaba en un libro secreto encargado por el sultán, un proyecto que mezcla el arte islámico tradicional con técnicas occidentales. Pamuk utiliza múltiples narradores, incluyendo personajes humanos, colores, objetos e incluso la muerte misma, para explorar el choque entre Oriente y Occidente, tradición y modernidad, arte religioso y secular. La novela examina cómo el arte refleja y moldea la identidad cultural, y cómo los cambios artísticos pueden amenazar las estructuras sociales establecidas. A través de la investigación del crimen, Pamuk presenta un retrato vívido del Imperio Otomano en un momento de transición, explorando temas como la fe, el amor, la creatividad y el poder. La obra es tanto una novela policíaca como una meditación profunda sobre la naturaleza del arte y la cultura.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Arte islámico", "Oriente vs Occidente", "Tradición", "Imperio Otomano", "Identidad cultural"],
        extract: '"Soy un muerto. He estado muerto durante mucho tiempo." (Capítulo 1)',
      },
    },
  },
  {
    id: "south_africa",
    name: "Sudáfrica",
    flag: "🇿🇦",
    capital: "Ciudad del Cabo",
    population: "60.4 millones",
    language: "Inglés",
    currency: "Rand sudafricano (R)",
    founded: "1910",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "J.R.R. Tolkien",
      profession: "Filólogo y escritor",
      quote: "No todo lo que es oro reluce, ni toda la gente errante anda perdida.",
      period: "1892-1973",
      photo: "/tolkien-sketch.png",
      masterwork: {
        title: "El Señor de los Anillos",
        year: "1954-1955",
        genre: "Fantasía épica",
        summary:
          "El Señor de los Anillos es una obra épica de fantasía que narra la lucha entre el bien y el mal en la Tierra Media, un mundo secundario creado por Tolkien con extraordinario detalle. La historia sigue a Frodo Bolsón, un hobbit que debe destruir el Anillo Único para derrotar al Señor Oscuro Sauron. Acompañado por la Comunidad del Anillo, Frodo emprende un viaje peligroso que lo llevará a través de paisajes diversos y enfrentamientos épicos. Tolkien, profesor de filología en Oxford, creó no solo una narrativa compleja sino también idiomas completos, genealogías, mapas y una historia milenaria para su mundo ficticio. La obra explora temas universales como la amistad, el sacrificio, la corrupción del poder, la pérdida de la inocencia y la lucha entre la esperanza y la desesperación. Los personajes, desde el sabio Gandalf hasta el atormentado Gollum, representan diferentes aspectos de la naturaleza humana. La trilogía estableció las bases de la fantasía moderna como género literario y ha influenciado a generaciones de escritores. La obra combina elementos de la mitología nórdica, celta y germánica con temas cristianos, creando una mitología moderna que resuena con lectores de todas las culturas.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Bien vs mal", "Amistad", "Sacrificio", "Poder", "Mitología moderna"],
        extract:
          '"Un Anillo para gobernarlos a todos. Un Anillo para encontrarlos, Un Anillo para atraerlos a todos y atarlos en las tinieblas." (La inscripción del Anillo)',
      },
    },
  },
  {
    id: "switzerland",
    name: "Suiza",
    flag: "🇨🇭",
    capital: "Berna",
    population: "8.7 millones",
    language: "Alemán",
    currency: "Franco suizo (CHF)",
    founded: "1291",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Hermann Hesse",
      profession: "Novelista y poeta",
      quote: "Algunos nacemos para vivir solos, otros para vivir con otros, pero todos nacemos para vivir.",
      period: "1877-1962",
      photo: "/herman-hesse-sketch.png",
      masterwork: {
        title: "Siddhartha",
        year: "1922",
        genre: "Novela filosófica",
        summary:
          "Siddhartha es una novela que narra el viaje espiritual de un joven brahmán en la India antigua en busca de la iluminación. Inspirado en la vida de Buda pero no siendo una biografía, Hesse crea una parábola universal sobre la búsqueda del sentido de la vida y la sabiduría. Siddhartha abandona su vida privilegiada para convertirse en asceta, luego en comerciante y amante, y finalmente en barquero, aprendiendo que la sabiduría no puede ser enseñada sino que debe ser experimentada personalmente. La novela refleja el interés de Hesse por la filosofía oriental, particularmente el budismo y el hinduismo, pero también incorpora elementos del pensamiento occidental. A través del personaje de Siddhartha, Hesse explora temas como la dualidad entre espíritu y materia, la naturaleza cíclica del tiempo, la importancia de la experiencia directa sobre el conocimiento libresco, y la unidad fundamental de toda existencia. La prosa de Hesse es lírica y contemplativa, creando una atmósfera de serenidad y profundidad espiritual. La obra se convirtió en un texto fundamental para la contracultura de los años 60 y sigue siendo relevante para quienes buscan significado espiritual en un mundo materialista.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Búsqueda espiritual", "Iluminación", "Sabiduría", "Filosofía oriental", "Autoconocimiento"],
        extract:
          '"La sabiduría no es comunicable. La sabiduría que un sabio intenta comunicar siempre suena a locura." (Capítulo 4)',
      },
    },
  },
  {
    id: "uk_caitlin",
    name: "Reino Unido",
    flag: "🇬🇧",
    capital: "Londres",
    population: "67.8 millones",
    language: "Inglés",
    currency: "Libra esterlina (£)",
    founded: "1707",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Caitlin Moran",
      profession: "Periodista y escritora",
      quote: "Las bibliotecas son catedrales de la mente; hospitales del alma; parques temáticos de la imaginación.",
      period: "1975-presente",
      photo:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2010%20jul%202025%2C%2012_16_12-M6PtmCs1VAhUgfXvOaG1JYcV5RGyXk.png",
      masterwork: {
        title: "Cómo ser mujer",
        year: "2011",
        genre: "Ensayo autobiográfico",
        summary:
          "Cómo ser mujer es un ensayo autobiográfico que combina humor, honestidad brutal y análisis social para explorar la experiencia femenina en el siglo XXI. Moran utiliza episodios de su propia vida para examinar temas como la pubertad, la sexualidad, el trabajo, la maternidad y el feminismo con un estilo irreverente y accesible. La obra desmitifica muchos aspectos de la experiencia femenina, desde los primeros sujetadores hasta las presiones sociales sobre el cuerpo y la carrera profesional. Moran argumenta que el feminismo no es una ideología compleja sino simplemente la creencia de que las mujeres son seres humanos completos que merecen igualdad de oportunidades. A través de anécdotas divertidas y observaciones perspicaces, la autora aborda la hipocresía de la sociedad respecto a las mujeres y propone una visión más auténtica y liberadora de la feminidad. El libro se convirtió en un fenómeno editorial y ayudó a revitalizar el discurso feminista para una nueva generación, demostrando que el feminismo puede ser divertido, inclusivo y profundamente personal.",
        image: "/caitlin-moran-quote.png",
        themes: ["Feminismo", "Experiencia femenina", "Humor", "Autobiografía", "Crítica social"],
        extract: '"El feminismo es simplemente esto: una persona cree que las mujeres son personas." (Capítulo 1)',
      },
    },
  },
  {
    id: "belgium",
    name: "Bélgica",
    flag: "🇧🇪",
    capital: "Bruselas",
    population: "11.5 millones",
    language: "Neerlandés",
    currency: "Euro (€)",
    founded: "1830",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Julio Cortázar",
      profession: "Novelista y cuentista",
      quote: "Nada está perdido si se tiene el valor de proclamar que todo está perdido y hay que empezar de nuevo.",
      period: "1914-1984",
      photo: "/cortazar-sketch.png",
      masterwork: {
        title: "Rayuela",
        year: "1963",
        genre: "Novela experimental",
        summary:
          "Rayuela es una novela revolucionaria que desafía las convenciones narrativas tradicionales y se convirtió en una de las obras más influyentes del boom latinoamericano. La historia sigue a Horacio Oliveira, un intelectual argentino que vive en París y luego regresa a Buenos Aires, en su búsqueda existencial del amor, el conocimiento y el sentido de la vida. La novela está estructurada de manera innovadora: puede leerse de forma lineal (capítulos 1 al 56) o siguiendo un orden alternativo propuesto por Cortázar (saltando entre capítulos como en el juego de la rayuela). La obra explora la relación entre Horacio y la Maga, una mujer misteriosa y espontánea que representa todo lo que él no es. A través de conversaciones filosóficas, reflexiones sobre el arte, la literatura y la vida, Cortázar crea una narrativa que cuestiona la realidad, el lenguaje y las formas tradicionales de contar historias. La novela incluye capítulos 'prescindibles' que amplían y comentan la historia principal, creando múltiples niveles de lectura. Rayuela no solo cuenta una historia, sino que reflexiona sobre el acto mismo de escribir y leer, convirtiendo al lector en co-creador de la obra.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen-8QMyTbUpl2PgKujOlIRRGU1azl5Wr5.png",
        themes: ["Búsqueda existencial", "Amor", "Experimentación narrativa", "Filosofía", "Arte y literatura"],
        extract:
          "«Y era tan natural cruzar la calle, subir los peldaños del puente, entrar en su delgada cintura y acercarme a la Maga que sonreía sin sorpresa, convencida como yo de que un encuentro casual era lo menos casual en nuestras vidas, y que la gente que se da citas precisas es la misma que necesita papel rayado para escribirse o que aprieta desde abajo el tubo del dentífrico» (Capítulo 1)",
      },
    },
  },
  {
    id: "portugal",
    name: "Portugal",
    flag: "🇵🇹",
    capital: "Lisboa",
    population: "10.3 millones",
    language: "Portugués",
    currency: "Euro (€)",
    founded: "1143",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "José Saramago",
      profession: "Novelista y ensayista",
      quote: "El viaje no acaba nunca. Solo los viajeros acaban.",
      period: "1922-2010",
      photo: "/saramago-sketch.png",
      masterwork: {
        title: "Ensayo sobre la ceguera",
        year: "1995",
        genre: "Novela alegórica",
        summary:
          "Ensayo sobre la ceguera es una novela alegórica que narra la historia de una epidemia de ceguera blanca que se extiende por una ciudad sin nombre. La obra explora la desintegración de la sociedad cuando las personas pierden la vista, revelando tanto la crueldad como la bondad humana en situaciones extremas. Saramago utiliza esta premisa fantástica para examinar temas como la civilización, la barbarie, la solidaridad y la supervivencia. La única persona que mantiene la vista es la esposa de un médico, quien se convierte en guía y protectora de un grupo de ciegos. A través de su prosa característica, sin puntuación convencional y con largos párrafos, Saramago crea una narrativa que funciona como metáfora de la ceguera moral y social. La novela es una reflexión profunda sobre la condición humana, mostrando cómo las crisis pueden revelar tanto lo mejor como lo peor de las personas. La obra ganó reconocimiento internacional y contribuyó a que Saramago recibiera el Premio Nobel de Literatura en 1998.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Ceguera moral", "Condición humana", "Supervivencia", "Solidaridad", "Crítica social"],
        extract: '"Si puedes ver, mira. Si puedes mirar, observa." (Epígrafe)',
      },
    },
  },
  {
    id: "uruguay",
    name: "Uruguay",
    flag: "🇺🇾",
    capital: "Montevideo",
    population: "3.5 millones",
    language: "Español",
    currency: "Peso uruguayo ($)",
    founded: "1825",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Mario Benedetti",
      profession: "Poeta y novelista",
      quote: "No te rindas, por favor no cedas, aunque el frío queme, aunque el miedo muerda.",
      period: "1920-2009",
      photo: "/benedetti-sketch.png",
      masterwork: {
        title: "La tregua",
        year: "1960",
        genre: "Novela",
        summary:
          "La tregua es una novela que narra la historia de Martín Santomé, un viudo de mediana edad que trabaja como contador en Montevideo y está próximo a jubilarse. Su vida rutinaria cambia cuando conoce a Laura Avellaneda, una joven empleada de su oficina, con quien inicia una relación amorosa que le devuelve la ilusión de vivir. Benedetti retrata con maestría la vida de la clase media montevideana, explorando temas como la soledad, el amor tardío, la rutina laboral y el paso del tiempo. La novela está estructurada como un diario íntimo donde Santomé reflexiona sobre su vida, sus relaciones familiares y su inesperado romance. A través de una prosa sencilla pero profunda, Benedetti examina las pequeñas alegrías y tristezas de la vida cotidiana, mostrando cómo el amor puede transformar la existencia incluso en la madurez. La obra se convirtió en un clásico de la literatura uruguaya y latinoamericana, siendo adaptada al cine y al teatro en múltiples ocasiones.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Amor tardío", "Clase media", "Soledad", "Rutina", "Transformación personal"],
        extract:
          '"Sólo ahora me doy cuenta de que durante todos estos años he estado viviendo sin vivir." (Entrada del diario)',
      },
    },
  },
  {
    id: "paraguay",
    name: "Paraguay",
    flag: "🇵🇾",
    capital: "Asunción",
    population: "7.1 millones",
    language: "Español",
    currency: "Guaraní (₲)",
    founded: "1811",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Augusto Roa Bastos",
      profession: "Novelista y cuentista",
      quote: "Escribir es una forma de resistencia contra el olvido y la muerte.",
      period: "1917-2005",
      photo: "/roa-bastos-sketch.png",
      masterwork: {
        title: "Yo el Supremo",
        year: "1974",
        genre: "Novela histórica",
        summary:
          "Yo el Supremo es una novela monumental que recrea la figura del dictador paraguayo José Gaspar Rodríguez de Francia, quien gobernó Paraguay desde 1814 hasta 1840. Roa Bastos construye un monólogo interior del dictador en sus últimos días, explorando los mecanismos del poder absoluto y la soledad del tirano. La novela combina historia y ficción, utilizando técnicas narrativas innovadoras como la polifonía de voces, documentos apócrifos y reflexiones filosóficas sobre el poder. A través de la figura del Supremo, el autor examina temas universales como la dictadura, el aislamiento, la paranoia del poder y la construcción de la identidad nacional paraguaya. La obra es también una reflexión sobre el lenguaje y la escritura como instrumentos de poder y resistencia. Roa Bastos utiliza elementos del guaraní y la cultura paraguaya para crear una narrativa que es tanto local como universal, estableciendo un diálogo entre la tradición oral y la literatura escrita.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Dictadura", "Poder absoluto", "Identidad paraguaya", "Soledad", "Historia"],
        extract:
          '"Yo el Supremo Dictador de la República, ordeno que al acaecer mi muerte mi cadáver sea decapitado." (Inicio)',
      },
    },
  },
  {
    id: "taiwan",
    name: "China Taipei",
    flag: "🇹🇼",
    capital: "Taipéi",
    population: "23.6 millones",
    language: "Chino mandarín",
    currency: "Dólar taiwanés (NT$)",
    founded: "1949",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Pai Hsien-yung",
      profession: "Novelista y cuentista",
      quote: "La literatura es el espejo del alma de una nación.",
      period: "1937-presente",
      photo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen-5Y6tK94HBMzrPgk8DwW4bZxhvjipX2.png",
      masterwork: {
        title: "Gente de Taipéi",
        year: "1971",
        genre: "Colección de cuentos",
        summary:
          "Gente de Taipéi es una colección de cuentos que retrata la vida de los refugiados chinos continentales en Taiwán durante los años 60. Pai Hsien-yung, hijo de un general del Kuomintang, explora con sensibilidad las experiencias de desplazamiento, nostalgia y adaptación de quienes huyeron de China continental tras la victoria comunista. Los cuentos presentan personajes diversos: desde antiguos aristócratas empobrecidos hasta jóvenes que luchan por encontrar su identidad entre dos culturas. El autor utiliza un estilo realista y melancólico para examinar temas como el exilio, la pérdida de estatus social, la nostalgia por el pasado y la dificultad de construir una nueva vida en tierra extraña. La obra es considerada fundamental en la literatura taiwanesa moderna, capturando un momento histórico crucial y las complejidades de la identidad china en el exilio. Pai Hsien-yung logra crear un retrato conmovedor de una generación atrapada entre el pasado y el presente, entre la memoria y la realidad.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen-N6TnV5nqjpvjMcmnCd3VPGrTA57xDC.png",
        themes: ["Exilio", "Identidad", "Nostalgia", "Desplazamiento", "Cultura china"],
        extract:
          '"En Taipéi, todos somos forasteros buscando un hogar que ya no existe." (Cuento: La eterna sonrisa de la señora Chin)',
      },
    },
  },
  {
    id: "austria",
    name: "Austria",
    flag: "🇦🇹",
    capital: "Viena",
    population: "9.0 millones",
    language: "Alemán",
    currency: "Euro (€)",
    founded: "1156",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Stefan Zweig",
      profession: "Novelista y biógrafo",
      quote:
        "Solo quien ha experimentado la luz y la oscuridad, la guerra y la paz, el ascenso y la caída, solo ese ha vivido realmente.",
      period: "1881-1942",
      photo: "/stefan-zweig-photo.png",
      masterwork: {
        title: "El mundo de ayer",
        year: "1942",
        genre: "Autobiografía",
        summary:
          "El mundo de ayer es la autobiografía póstuma de Stefan Zweig, escrita poco antes de su suicidio en el exilio brasileño. La obra es un testimonio excepcional de la Europa de principios del siglo XX, desde la Belle Époque hasta la Segunda Guerra Mundial. Zweig retrata con nostalgia y melancolía el mundo cosmopolita y culto de la Viena imperial, describiendo su juventud en una época de optimismo y progreso cultural. El autor narra su experiencia como testigo de dos guerras mundiales, el ascenso del nazismo y la destrucción del mundo humanista europeo que él representaba. A través de retratos de figuras como Freud, Rilke, Romain Rolland y otros intelectuales de su tiempo, Zweig documenta la riqueza cultural de una época perdida. La obra es tanto una elegía personal como un documento histórico sobre la crisis de la civilización europea. El estilo elegante y melancólico de Zweig convierte esta autobiografía en una reflexión profunda sobre la pérdida, el exilio y la destrucción de un mundo de valores humanistas.",
        image: "/el-mundo-de-ayer-cover.png",
        themes: ["Nostalgia", "Exilio", "Cultura europea", "Guerra", "Pérdida"],
        extract:
          '"Nunca una generación ha experimentado en su existencia consciente una transformación tan radical como la nuestra." (Prólogo)',
      },
    },
  },
  {
    id: "bolivia",
    name: "Bolivia",
    flag: "🇧🇴",
    capital: "Sucre",
    population: "11.8 millones",
    language: "Español",
    currency: "Boliviano (Bs)",
    founded: "1825",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Alcides Arguedas",
      profession: "Novelista y ensayista",
      quote: "El pueblo que no conoce su historia está condenado a repetirla.",
      period: "1879-1946",
      photo: "/alcides-arguedas-sketch.png",
      masterwork: {
        title: "Raza de bronce",
        year: "1919",
        genre: "Novela indigenista",
        summary:
          "Raza de bronce es una novela fundamental del indigenismo boliviano que denuncia la explotación de los pueblos indígenas en el altiplano. La obra narra la historia de Wata-Wara, una joven indígena, y su comunidad, que sufren bajo el sistema de hacienda y la opresión de los patrones criollos. Arguedas retrata con realismo crudo las condiciones de vida de los aymaras y quechuas, mostrando su resistencia cultural frente a la dominación. La novela explora temas como la injusticia social, la preservación de las tradiciones ancestrales, y la lucha por la tierra. A través de personajes como el indígena Choquehuanca, el autor presenta la dignidad y sabiduría de los pueblos originarios frente a la brutalidad del sistema colonial que persistía en la república. La obra se convirtió en un testimonio fundamental sobre la realidad indígena boliviana y contribuyó al desarrollo de la conciencia nacional sobre la diversidad cultural del país.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Indigenismo", "Injusticia social", "Cultura aymara", "Resistencia", "Identidad boliviana"],
        extract:
          '"En el altiplano, donde el viento susurra las penas de siglos, Wata-Wara camina con la dignidad de su raza, llevando en sus ojos el dolor y la esperanza de su pueblo." (Capítulo 3)',
      },
    },
  },
  {
    id: "panama",
    name: "Panamá",
    flag: "🇵🇦",
    capital: "Ciudad de Panamá",
    population: "4.4 millones",
    language: "Español",
    currency: "Balboa (B/.)",
    founded: "1903",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Ricardo Miró",
      profession: "Poeta y dramaturgo",
      quote: "Patria es algo más que tierra; es el alma de los pueblos.",
      period: "1883-1940",
      photo: "/ricardo-miro-sketch.png",
      masterwork: {
        title: "Patria",
        year: "1909",
        genre: "Poesía patriótica",
        summary:
          "Patria es el poema más emblemático de la literatura panameña, escrito poco después de la independencia del país. Ricardo Miró, considerado el poeta nacional de Panamá, creó una obra que se convirtió en símbolo de la identidad nacional panameña. El poema expresa el amor profundo por la tierra natal, describiendo la belleza del istmo, sus montañas, sus mares y su gente. Miró utiliza imágenes poéticas que evocan el paisaje tropical panameño, desde las costas del Pacífico hasta las del Atlántico, pasando por la exuberante selva y las montañas. La obra refleja el sentimiento de orgullo nacional de un país joven que buscaba consolidar su identidad después de separarse de Colombia. El poema se ha convertido en un himno no oficial de Panamá, recitado en escuelas y ceremonias patrióticas. Miró logra capturar la esencia de lo panameño: la posición geográfica única del país como puente entre continentes y océanos, y su papel histórico como lugar de encuentro de culturas.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Patriotismo", "Identidad nacional", "Paisaje istmeño", "Independencia", "Orgullo nacional"],
        extract:
          '"¡Oh Patria! ¡Oh madre! ¡Oh tierra de mis amores! / En ti pienso al nacer la aurora, / en ti pienso al morir el día, / y en las horas de mi agonía / pienso en ti, patria mía." (Estrofa inicial)',
      },
    },
  },
  {
    id: "thailand",
    name: "Tailandia",
    flag: "🇹🇭",
    capital: "Bangkok",
    population: "70.0 millones",
    language: "Tailandés",
    currency: "Baht tailandés (฿)",
    founded: "1238",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Sunthorn Phu",
      profession: "Poeta épico",
      quote: "La poesía es el lenguaje del corazón que trasciende todas las barreras.",
      period: "1786-1855",
      photo: "/sunthorn-phu-sketch.png",
      masterwork: {
        title: "Phra Aphai Mani",
        year: "1821-1845",
        genre: "Poema épico",
        summary:
          "Phra Aphai Mani es el poema épico más importante de la literatura tailandesa, considerado una obra maestra de la poesía mundial. Sunthorn Phu, reconocido como el poeta nacional de Tailandia, creó esta narrativa épica que combina aventura, romance, magia y filosofía budista. La historia sigue las aventuras del príncipe Phra Aphai Mani, quien posee una flauta mágica cuya música puede hechizar a cualquiera que la escuche. El poema narra sus viajes por tierras fantásticas, sus encuentros con demonios, sirenas y otros seres sobrenaturales, y sus historias de amor. La obra refleja la cosmología budista y las tradiciones culturales tailandesas, incorporando elementos del folclore local y las creencias animistas. Sunthorn Phu utiliza un lenguaje poético refinado y un ritmo musical que hace que la obra sea tanto literaria como performativa. El poema ha influenciado profundamente la cultura tailandesa, siendo adaptado en teatro, danza, pintura y literatura posterior. La obra representa la síntesis perfecta entre la tradición oral tailandesa y la literatura escrita.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Épica tailandesa", "Budismo", "Magia", "Aventura", "Tradición oral"],
        extract:
          '"El sonido de la flauta mágica se eleva como el canto del ave fénix, llevando en sus notas el poder de encantar corazones y despertar almas." (Canto III)',
      },
    },
  },
  {
    id: "new_zealand",
    name: "Nueva Zelanda",
    flag: "🇳🇿",
    capital: "Wellington",
    population: "5.2 millones",
    language: "Inglés",
    currency: "Dólar neozelandés ($)",
    founded: "1840",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Katherine Mansfield",
      profession: "Cuentista y escritora",
      quote: "Quiero escribir sobre la vida tal como la veo, sin adornos ni falsedades.",
      period: "1888-1923",
      photo: "/katherine-mansfield-sketch.png",
      masterwork: {
        title: "El jardín de la fiesta",
        year: "1922",
        genre: "Cuento",
        summary:
          "El jardín de la fiesta es uno de los cuentos más celebrados de Katherine Mansfield y una obra maestra del cuento moderno. La historia narra un día en la vida de Laura Sheridan, una joven de clase alta que vive en una familia acomodada de Nueva Zelanda. Mientras la familia prepara una elegante fiesta en el jardín, Laura descubre que un trabajador ha muerto en un accidente en el barrio pobre cercano. Este evento la lleva a cuestionar las diferencias de clase y la insensibilidad de su entorno privilegiado. Mansfield utiliza la técnica del flujo de conciencia y una prosa lírica para explorar temas como la inocencia perdida, las diferencias sociales, la muerte y el despertar de la conciencia social. El cuento es notable por su estructura sutil, donde los pequeños detalles cotidianos revelan verdades profundas sobre la naturaleza humana. La autora logra capturar la psicología femenina con una sensibilidad extraordinaria, mostrando el proceso de maduración de una joven que comienza a ver el mundo con nuevos ojos. La obra influyó significativamente en el desarrollo del cuento moderno y estableció a Mansfield como una de las maestras del género.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Clase social", "Inocencia perdida", "Muerte", "Conciencia social", "Psicología femenina"],
        extract:
          '"Y parecía que de alguna manera ella y él estaban juntos. Ella puso su mano en su manga; él no se movió. ¡Qué feliz era! ¡Qué feliz era!" (Final del cuento)',
      },
    },
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    capital: "Canberra",
    population: "25.7 millones",
    language: "Inglés",
    currency: "Dólar australiano ($)",
    founded: "1901",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Patrick White",
      profession: "Novelista",
      quote: "La literatura debe iluminar los rincones más oscuros del alma humana.",
      period: "1912-1990",
      photo:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/47d26b6c-ae7f-49c8-a3f3-75ae264d90f3-ikh52A4Zav6PpN3qaA2qEc5s51XKO3.png",
      masterwork: {
        title: "Voss",
        year: "1957",
        genre: "Novela épica",
        summary:
          "Voss es una novela épica inspirada en la figura histórica del explorador alemán Ludwig Leichhardt, quien desapareció en el interior de Australia en el siglo XIX. White crea el personaje de Johann Ulrich Voss, un explorador obsesionado con conquistar el continente australiano y alcanzar la costa oeste. La novela alterna entre la expedición de Voss por el desierto australiano y la vida de Laura Trevelyan en Sydney, con quien Voss desarrolla una conexión espiritual a distancia. A través de esta narrativa dual, White explora temas como la obsesión, la espiritualidad, la relación entre el hombre y la naturaleza, y la búsqueda de trascendencia. La obra presenta el paisaje australiano como un personaje más, vasto e implacable, que pone a prueba los límites humanos. White utiliza un estilo denso y simbólico para crear una meditación sobre el heroísmo, la locura y la búsqueda de lo absoluto. La novela es considerada una de las grandes obras de la literatura australiana y contribuyó a que White recibiera el Premio Nobel de Literatura en 1973.",
        image: "/voss-cover.png",
        themes: ["Exploración", "Obsesión", "Espiritualidad", "Naturaleza australiana", "Trascendencia"],
        extract: '"El hombre debe explorar hasta que no quede nada por explorar." (Capítulo 3)',
      },
    },
  },
  {
    id: "egypt",
    name: "Egipto",
    flag: "🇪🇬",
    capital: "El Cairo",
    population: "104.3 millones",
    language: "Árabe",
    currency: "Libra egipcia (£)",
    founded: "1922",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Naguib Mahfouz",
      profession: "Novelista",
      quote: "La literatura es el espejo de la sociedad y el alma de la nación.",
      period: "1911-2006",
      photo: "/naguib-mahfouz-sketch.png",
      masterwork: {
        title: "Trilogía de El Cairo",
        year: "1956-1957",
        genre: "Saga familiar",
        summary:
          "La Trilogía de El Cairo, compuesta por 'Entre dos palacios', 'El palacio del deseo' y 'El jardín del pasado', es la obra maestra de Naguib Mahfouz que narra la historia de la familia Abd al-Jawad a lo largo de tres generaciones en El Cairo, desde 1917 hasta 1944. La saga explora la transformación de Egipto durante el período de entreguerras, mostrando los cambios sociales, políticos y culturales a través de las experiencias de una familia de clase media. Mahfouz retrata magistralmente la tensión entre tradición y modernidad, religión y secularismo, autoridad patriarcal y aspiraciones de libertad individual. Los personajes principales, especialmente Ahmad Abd al-Jawad y sus hijos, encarnan las contradicciones de una sociedad en transición. La obra combina realismo social con profundidad psicológica, creando un fresco épico de la vida cairota. A través de descripciones detalladas de calles, cafés y hogares, Mahfouz convierte El Cairo en un personaje más de la narrativa. La trilogía es considerada el equivalente árabe de las grandes sagas familiares de la literatura mundial y contribuyó decisivamente a que Mahfouz recibiera el Premio Nobel de Literatura en 1988.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Familia", "Tradición vs modernidad", "El Cairo", "Cambio social", "Identidad árabe"],
        extract: '"El tiempo es como el Nilo: fluye sin cesar, llevándose todo a su paso." (Entre dos palacios)',
      },
    },
  },
  {
    id: "guatemala",
    name: "Guatemala",
    flag: "🇬🇹",
    capital: "Ciudad de Guatemala",
    population: "17.9 millones",
    language: "Español",
    currency: "Quetzal (Q)",
    founded: "1821",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Miguel Ángel Asturias",
      profession: "Novelista y poeta",
      quote: "Los pueblos que olvidan su historia están condenados a repetirla.",
      period: "1899-1974",
      photo: "/miguel-angel-asturias-sketch.png",
      masterwork: {
        title: "El Señor Presidente",
        year: "1946",
        genre: "Novela política",
        summary:
          "El Señor Presidente es una novela que retrata la dictadura en un país latinoamericano innominado, inspirada en el régimen de Manuel Estrada Cabrera en Guatemala. Asturias crea un retrato devastador del poder absoluto y sus efectos corruptores en la sociedad. La obra presenta un mundo kafkiano donde la paranoia, la violencia y el miedo dominan la vida cotidiana. A través de técnicas narrativas innovadoras que combinan realismo y elementos oníricos, Asturias explora la psicología del terror político y la deshumanización que produce la dictadura. Los personajes, desde el dictador hasta sus víctimas, están atrapados en un sistema que corrompe tanto a opresores como a oprimidos. La novela incorpora elementos de la cultura maya y el folclore guatemalteco, creando una síntesis única entre tradición indígena y modernidad literaria. El estilo de Asturias, que mezcla prosa poética con denuncia social, influyó profundamente en la literatura latinoamericana posterior. La obra es tanto una crítica específica a las dictaduras latinoamericanas como una reflexión universal sobre los mecanismos del poder totalitario.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Dictadura", "Terror político", "Poder absoluto", "Cultura maya", "Corrupción"],
        extract: '"¡Alumbra, lumbre de alumbre, Luzbel de piedralumbre!" (Capítulo 1)',
      },
    },
  },
  {
    id: "ecuador",
    name: "Ecuador",
    flag: "🇪🇨",
    capital: "Quito",
    population: "17.8 millones",
    language: "Español",
    currency: "Dólar estadounidense ($)",
    founded: "1830",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Jorge Icaza",
      profession: "Novelista y dramaturgo",
      quote: "El arte debe ser el grito de los oprimidos y la voz de los sin voz.",
      period: "1906-1978",
      photo: "/jorge-icaza-sketch.png",
      masterwork: {
        title: "Huasipungo",
        year: "1934",
        genre: "Novela indigenista",
        summary:
          "Huasipungo es una novela fundamental del indigenismo latinoamericano que denuncia la explotación de los pueblos indígenas en Ecuador. La obra narra la historia de Andrés Chiliquinga y otros indígenas que son despojados de sus tierras (huasipungos) por terratenientes y empresarios extranjeros que buscan construir una carretera. Icaza retrata con crudeza las condiciones de vida de los indígenas, sometidos a un sistema feudal que los mantiene en la pobreza y la ignorancia. La novela expone la complicidad entre la oligarquía criolla, el clero y el capital extranjero en la opresión de los pueblos originarios. A través de un realismo descarnado, el autor muestra la violencia, el hambre y la desesperación que sufren los indígenas, culminando en una rebelión desesperada que es brutalmente reprimida. La obra utiliza elementos del habla quechua y retrata las tradiciones indígenas con respeto y autenticidad. Huasipungo se convirtió en un símbolo de la literatura de protesta social en América Latina y contribuyó a crear conciencia sobre la situación de los pueblos indígenas. La novela sigue siendo relevante como denuncia de la injusticia social y la explotación.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Indigenismo", "Explotación", "Injusticia social", "Tierra", "Resistencia"],
        extract: '"¡Ñucanchic huasipungo! ¡Nuestra tierra!" (Grito final de los indígenas)',
      },
    },
  },
  {
    id: "mexico",
    name: "México",
    flag: "🇲🇽",
    capital: "Ciudad de México",
    population: "128.9 millones",
    language: "Español",
    currency: "Peso mexicano ($)",
    founded: "1821",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Octavio Paz",
      profession: "Poeta y ensayista",
      quote: "La soledad es el fondo último de la condición humana.",
      period: "1914-1998",
      photo: "/octavio-paz-sketch.png",
      masterwork: {
        title: "El laberinto de la soledad",
        year: "1950",
        genre: "Ensayo",
        summary:
          "El laberinto de la soledad es una obra fundamental del pensamiento mexicano y latinoamericano que explora la identidad nacional mexicana a través de un análisis profundo de la psicología, la historia y la cultura del pueblo mexicano. Paz examina el carácter mexicano desde sus raíces prehispánicas hasta la modernidad, explorando temas como la soledad existencial, el machismo, la muerte, las fiestas populares y la relación conflictiva con el pasado indígena y la herencia colonial española. El autor analiza figuras arquetípicas como el 'pelado', la Malinche y el pachuco, mostrando cómo estos personajes reflejan aspectos profundos de la identidad mexicana. La obra combina antropología, psicología, historia y literatura para crear un retrato complejo de México como nación y de los mexicanos como pueblo. Paz sostiene que la soledad es una característica universal del ser humano, pero que en México adquiere formas particulares debido a la historia traumática de conquista, mestizaje y búsqueda de identidad. El ensayo se ha convertido en un texto clásico para entender no solo a México, sino también los procesos de formación de identidad nacional en América Latina.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Identidad mexicana", "Soledad existencial", "Mestizaje", "Cultura popular", "Psicología nacional"],
        extract:
          '"El mexicano y la mexicanidad se definen como ruptura y negación. Y asimismo como búsqueda, como voluntad por trascender ese estado de exilio. En suma, como viva conciencia de la soledad, histórica y personal. La historia de México es la del hombre que busca su filiación, su origen." (Capítulo 1)',
      },
    },
  },
  {
    id: "syria",
    name: "Siria",
    flag: "🇸🇾",
    capital: "Damasco",
    population: "17.5 millones",
    language: "Árabe",
    currency: "Libra siria (SYP)",
    founded: "1946",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Nizar Qabbani",
      profession: "Poeta",
      quote: "El amor no es una jaula, sino un ala.",
      period: "1923-1998",
      photo: "/placeholder.svg?height=400&width=400",
      masterwork: {
        title: "Dibujo con palabras",
        year: "1966",
        genre: "Poesía",
        summary:
          "Dibujo con palabras es una de las colecciones más célebres de Nizar Qabbani, donde el poeta sirio explora el amor, la feminidad, la política y la identidad árabe con un lenguaje directo y apasionado. Qabbani es conocido por su estilo lírico y su capacidad para fusionar lo personal con lo político, convirtiéndose en una voz influyente en la poesía árabe moderna. Sus poemas a menudo celebran la belleza de la mujer y la libertad del amor, al mismo tiempo que critican la opresión y la hipocresía social. Esta colección en particular destaca por su frescura y su capacidad para resonar con un público amplio, abordando temas universales con una sensibilidad única. La obra de Qabbani ha sido fundamental para modernizar la poesía árabe y hacerla accesible a las masas, utilizando un lenguaje que es a la vez sencillo y profundamente emotivo. Sus versos son a menudo musicalmente ricos y se han convertido en letras de canciones populares en todo el mundo árabe.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Amor", "Feminidad", "Política", "Identidad árabe", "Libertad"],
        extract:
          '"Te amo, y sé que el amor es una conspiración. Te amo, y sé que el amor es un suicidio. Te amo, y sé que el amor es una locura. Te amo, y sé que el amor es una liberación." (Fragmento)',
      },
    },
  },
  {
    id: "iraq",
    name: "Irak",
    flag: "🇮🇶",
    capital: "Bagdad",
    population: "43.5 millones",
    language: "Árabe",
    currency: "Dinar iraquí (IQD)",
    founded: "1932",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Badr Shakir al-Sayyab",
      profession: "Poeta",
      quote: "La lluvia es el susurro de Dios en la tierra.",
      period: "1926-1964",
      photo: "/placeholder.svg?height=400&width=400",
      masterwork: {
        title: "Canción de la lluvia",
        year: "1960",
        genre: "Poesía",
        summary:
          "Canción de la lluvia es una colección seminal de poemas que marcó un punto de inflexión en la poesía árabe moderna, introduciendo el verso libre y una nueva sensibilidad. Badr Shakir al-Sayyab es considerado uno de los pioneros de la poesía árabe contemporánea, y su obra se caracteriza por su lirismo, su profunda conexión con la tierra y el folclore iraquí, y su exploración de temas existenciales y políticos. Los poemas de esta colección a menudo utilizan la lluvia como una metáfora central para la vida, la muerte, la fertilidad y la renovación, reflejando tanto la esperanza como la desesperación. Al-Sayyab fusiona elementos de la mitología mesopotámica con la realidad social y política de su tiempo, creando una poesía rica en imágenes y simbolismo. Su influencia se extendió por todo el mundo árabe, inspirando a generaciones de poetas a romper con las formas tradicionales y a explorar nuevas vías de expresión. La obra es un testimonio de la capacidad de la poesía para capturar la esencia de una cultura y las complejidades de la experiencia humana.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Naturaleza", "Renovación", "Existencialismo", "Identidad iraquí", "Modernidad poética"],
        extract:
          '"Lluvia, lluvia, lluvia. / El mar es tu hogar, / y el cielo es tu amante. / Lluvia, lluvia, lluvia. / El hambre es tu canción, / y la muerte es tu danza." (Fragmento)',
      },
    },
  },
  {
    id: "iran",
    name: "Irán",
    flag: "🇮🇷",
    capital: "Teherán",
    population: "88.0 millones",
    language: "Persa",
    currency: "Rial iraní (IRR)",
    founded: "1979", // Modern Iran after Islamic Revolution, or ancient Persia? Let's use modern.
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Ferdowsi",
      profession: "Poeta épico",
      quote: "El conocimiento es poder, y el poder es la espada de la justicia.",
      period: "c. 935-1020",
      photo: "/placeholder.svg?height=400&width=400",
      masterwork: {
        title: "Shahnameh (El Libro de los Reyes)",
        year: "1010",
        genre: "Poema épico",
        summary:
          "El Shahnameh, o Libro de los Reyes, es la epopeya nacional de Irán y una de las obras literarias más largas del mundo, compuesta por más de 60,000 coplas. Ferdowsi dedicó más de 30 años a esta monumental obra, que narra la historia mítica y legendaria de Persia desde la creación del mundo hasta la conquista árabe del siglo VII. La epopeya es una crónica de reyes, héroes, villanos y criaturas míticas, explorando temas como la justicia, el destino, el honor, el amor y la traición. Ferdowsi no solo preservó la lengua persa en un momento en que el árabe era dominante, sino que también consolidó la identidad cultural iraní. La obra es una fuente inagotable de folclore, ética y sabiduría, y ha influido profundamente en la literatura, el arte y la cultura persa a lo largo de los siglos. El Shahnameh es más que un libro; es un pilar de la identidad iraní, un tesoro literario que sigue siendo leído y celebrado por su belleza poética y su profundidad narrativa.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Mitología persa", "Historia", "Justicia", "Honor", "Identidad cultural"],
        extract:
          '"He sufrido mucho en estos treinta años, / con la esperanza de revivir a Persia con este persa." (Fragmento del prólogo)',
      },
    },
  },
  {
    id: "saudi_arabia",
    name: "Arabia Saudita",
    flag: "🇸🇦",
    capital: "Riad",
    population: "36.4 millones",
    language: "Árabe",
    currency: "Riyal saudí (SAR)",
    founded: "1932",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Abdul Rahman Munif",
      profession: "Novelista",
      quote: "El desierto es un maestro que enseña paciencia y humildad.",
      period: "1933-2004",
      photo: "/placeholder.svg?height=400&width=400",
      masterwork: {
        title: "Ciudades de sal",
        year: "1984-1989",
        genre: "Saga novelística",
        summary:
          "Ciudades de sal es una monumental quintología de novelas que narra la transformación de una sociedad beduina tradicional en una nación petrolera moderna en el Golfo Pérsico. Abdul Rahman Munif, uno de los novelistas árabes más importantes del siglo XX, explora el impacto del descubrimiento del petróleo en la vida, la cultura y la política de la región. La saga sigue a varias generaciones de personajes, desde los nómadas del desierto hasta los nuevos ricos de las ciudades petroleras, mostrando la desintegración de los valores ancestrales y la emergencia de una nueva realidad marcada por la riqueza y la corrupción. Munif utiliza un estilo épico y detallado para retratar la vida en el desierto, la llegada de las compañías petroleras occidentales y la construcción de las 'ciudades de sal' que crecen rápidamente pero carecen de alma. La obra es una crítica profunda al autoritarismo, la dependencia económica y la pérdida de identidad cultural en la era del petróleo. Es un fresco social y político que ofrece una visión única de la modernización del mundo árabe y sus consecuencias.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Petróleo", "Modernización", "Identidad árabe", "Corrupción", "Desierto"],
        extract:
          '"El desierto no es un lugar, es un estado del alma. Y el petróleo no es una bendición, sino una maldición que nos ha robado el alma." (Fragmento)',
      },
    },
  },
  {
    id: "china",
    name: "China",
    flag: "🇨🇳",
    capital: "Pekín",
    population: "1.4 mil millones",
    language: "Chino mandarín",
    currency: "Yuan (¥)",
    founded: "221 a.C. (unificación imperial)",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Lu Xun",
      profession: "Escritor, ensayista y crítico literario",
      quote:
        "La esperanza es como un camino en el desierto. Al principio no hay camino, pero cuando mucha gente camina, se forma un camino.",
      period: "1881-1936",
      photo: "/placeholder.svg?height=400&width=400",
      masterwork: {
        title: "Diario de un loco",
        year: "1918",
        genre: "Cuento",
        summary:
          "Diario de un loco es un cuento seminal de la literatura china moderna, considerado la primera obra escrita en chino vernáculo. Narra la historia de un hombre que cree que todos a su alrededor son caníbales, una metáfora de la sociedad tradicional china y sus prácticas opresivas. Lu Xun utiliza la perspectiva del 'loco' para criticar la hipocresía, la crueldad y la 'canibalismo' moral de la sociedad feudal china. La obra es una denuncia de la tradición confuciana y sus efectos deshumanizadores. A través de un estilo incisivo y simbólico, Lu Xun expone la necesidad de una revolución cultural y social en China. El cuento es un grito de alarma contra la inercia y la opresión, y un llamado a la juventud para despertar y transformar el país. 'Diario de un loco' marcó el inicio de la literatura moderna china y estableció a Lu Xun como una figura central del Movimiento del Cuatro de Mayo, influyendo profundamente en generaciones de escritores y pensadores chinos.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Crítica social", "Tradición vs Modernidad", "Locura", "Revolución cultural", "Deshumanización"],
        extract: '"Quizás todavía hay niños que no han sido comidos. ¡Salvad a los niños!" (Fragmento final)',
      },
    },
  },
  {
    id: "cuba",
    name: "Cuba",
    flag: "🇨🇺",
    capital: "La Habana",
    population: "11.2 millones",
    language: "Español",
    currency: "Peso cubano (CUP)",
    founded: "1902",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "José Martí",
      profession: "Poeta, ensayista y político",
      quote: "La libertad es el derecho de todo hombre a ser honrado, y a pensar y a hablar sin hipocresía.",
      period: "1853-1895",
      photo: "/jose-marti-historical.png",
      masterwork: {
        title: "Versos Sencillos",
        year: "1891",
        genre: "Poesía",
        summary:
          "Versos Sencillos es una colección de poemas que encapsula la esencia del pensamiento y el sentir de José Martí, héroe nacional de Cuba. Escritos durante su exilio en Nueva York, estos poemas reflejan su amor por la patria, su compromiso con la libertad y la justicia, y su profunda humanidad. Martí utiliza un lenguaje claro y directo, con una musicalidad que los hace accesibles y memorables. Los temas varían desde la naturaleza y la amistad hasta la denuncia de la injusticia y la exaltación de los valores humanos. La obra es un testamento de su ideario político y ético, y una expresión de su alma. 'Versos Sencillos' se ha convertido en un pilar de la literatura cubana y latinoamericana, y muchos de sus poemas han sido musicalizados, como 'La Guantanamera', convirtiéndose en símbolos de la cultura cubana. La obra demuestra la capacidad de Martí para combinar la belleza poética con un mensaje de profunda relevancia social y política.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Patriotismo", "Libertad", "Justicia", "Naturaleza", "Humanidad"],
        extract:
          '"Cultivo una rosa blanca, / en julio como en enero, / para el amigo sincero / que me da su mano franca." (Yo soy un hombre sincero)',
      },
    },
  },
  {
    id: "ukraine",
    name: "Ucrania",
    flag: "🇺🇦",
    capital: "Kiev",
    population: "41.1 millones",
    language: "Ucraniano",
    currency: "Hryvnia (₴)",
    founded: "1991",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Tarás Shevchenko",
      profession: "Poeta, artista y humanista",
      quote: "Lucha y vencerás. Dios te ayudará.",
      period: "1814-1861",
      photo: "/placeholder.svg?height=400&width=400",
      masterwork: {
        title: "Kobzar",
        year: "1840",
        genre: "Poesía",
        summary:
          "Kobzar es la colección de poesía más importante de Tarás Shevchenko, considerada la base de la literatura ucraniana moderna y un símbolo de la identidad nacional. Shevchenko, un siervo liberado, se convirtió en la voz de su pueblo oprimido, utilizando su poesía para denunciar la injusticia social, la servidumbre y la dominación rusa. La obra combina elementos del folclore ucraniano, la historia cosaca y la crítica social, creando un poderoso llamado a la libertad y la dignidad. Los poemas de 'Kobzar' están llenos de imágenes vívidas de la vida rural ucraniana, la belleza de su paisaje y el sufrimiento de su gente. Shevchenko no solo fue un poeta, sino también un artista visual, y sus obras a menudo se complementan con sus ilustraciones. 'Kobzar' se convirtió en un libro prohibido por el régimen zarista, pero circuló clandestinamente y alimentó el espíritu de resistencia ucraniano. La obra es un testimonio de la resiliencia del espíritu humano y la capacidad de la literatura para inspirar la lucha por la libertad y la autodeterminación.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Identidad nacional", "Libertad", "Justicia social", "Folclore ucraniano", "Resistencia"],
        extract:
          '"Entierraos, levantaos, / romped vuestras cadenas, / y regad con la sangre de los tiranos / la libertad que habéis ganado." (El Testamento)',
      },
    },
  },
  {
    id: "vietnam",
    name: "Vietnam",
    flag: "🇻🇳",
    capital: "Hanói",
    population: "97.5 millones",
    language: "Vietnamita",
    currency: "Dong vietnamita (₫)",
    founded: "1945",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Nguyễn Du",
      profession: "Poeta",
      quote: "El destino es un hilo invisible que une a todos los seres.",
      period: "1765-1820",
      photo: "/placeholder.svg?height=400&width=400",
      masterwork: {
        title: "El cuento de Kiều",
        year: "c. 1813",
        genre: "Poema épico",
        summary:
          "El cuento de Kiều es la obra más célebre de la literatura vietnamita, un poema épico de 3.254 versos que narra la vida de Thúy Kiều, una joven hermosa y talentosa que se sacrifica para salvar a su familia. La obra explora temas como el destino, el amor, la lealtad, la injusticia social y la resiliencia del espíritu humano. Kiều se ve obligada a venderse como concubina y luego a vivir una vida de sufrimiento y tribulaciones, pero siempre mantiene su dignidad y su esperanza de reunirse con su verdadero amor. Nguyễn Du utiliza un lenguaje poético exquisito y una estructura narrativa compleja para crear un fresco de la sociedad vietnamita de su tiempo, con sus costumbres, creencias y conflictos. La obra es una meditación profunda sobre la moralidad, la fortuna y la capacidad del individuo para superar la adversidad. 'El cuento de Kiều' es un pilar de la identidad cultural vietnamita y ha sido estudiado, recitado y adaptado innumerables veces, convirtiéndose en un símbolo de la belleza y la profundidad de la literatura del país.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Destino", "Sacrificio", "Amor", "Injusticia social", "Resiliencia"],
        extract:
          '"Las palabras del destino están escritas en el cielo, / y el corazón humano no puede cambiarlas." (Fragmento)',
      },
    },
  },
  {
    id: "costa_rica",
    name: "Costa Rica",
    flag: "🇨🇷",
    capital: "San José",
    population: "5.1 millones",
    language: "Español",
    currency: "Colón costarricense (₡)",
    founded: "1821",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Joaquín García Monge",
      profession: "Escritor y educador",
      quote: "La educación es la base de la libertad y el progreso.",
      period: "1881-1958",
      photo: "/placeholder.svg?height=400&width=400",
      masterwork: {
        title: "El Moto",
        year: "1900",
        genre: "Novela costumbrista",
        summary:
          "El Moto es una novela fundamental de la literatura costarricense, considerada la primera novela moderna del país. Narra la historia de José Manuel, un joven campesino conocido como 'El Moto', y su amor por Cundila, en el contexto de la vida rural costarricense de finales del siglo XIX. La obra es un retrato vívido de las costumbres, tradiciones y el habla de los campesinos de la Meseta Central, explorando temas como el amor, la injusticia social, la pobreza y la lucha por la tierra. García Monge utiliza un estilo realista y costumbrista para capturar la esencia de la vida rural, mostrando las dificultades y las alegrías de los personajes. La novela es también una crítica sutil a las desigualdades sociales y a la explotación de los campesinos por parte de los terratenientes. 'El Moto' se convirtió en un clásico de la literatura nacional y es una lectura obligatoria en las escuelas de Costa Rica, contribuyendo a la formación de la identidad literaria del país y a la valoración de sus raíces campesinas.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Costumbrismo", "Vida rural", "Amor", "Injusticia social", "Identidad costarricense"],
        extract:
          '"El sol caía a plomo sobre los cafetales, y el aire vibraba con el canto de los pájaros y el murmullo del río." (Fragmento)',
      },
    },
  },
  {
    id: "nigeria",
    name: "Nigeria",
    flag: "🇳🇬",
    capital: "Abuya",
    population: "211 millones",
    language: "Inglés",
    currency: "Naira nigeriana (₦)",
    founded: "1960",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Chinua Achebe",
      profession: "Novelista, poeta y crítico",
      quote:
        "Hasta que los leones tengan sus propios historiadores, las historias de caza siempre glorificarán al cazador.",
      period: "1930-2013",
      photo: "/placeholder.svg?height=400&width=400",
      masterwork: {
        title: "Todo se desmorona",
        year: "1958",
        genre: "Novela",
        summary:
          "Todo se desmorona es una novela seminal de la literatura africana que narra la vida de Okonkwo, un guerrero y líder de la comunidad igbo en Nigeria, y el impacto de la colonización británica y la llegada del cristianismo en su sociedad tradicional. Achebe ofrece una perspectiva africana sobre el colonialismo, mostrando la complejidad y la riqueza de las culturas precoloniales y cómo fueron desmanteladas por la imposición de valores y sistemas extranjeros. La obra explora temas como el choque cultural, la identidad, la tradición, el cambio y la tragedia de la desintegración social. Okonkwo, un hombre orgulloso y tradicional, lucha por mantener las costumbres de su pueblo frente a la invasión cultural y religiosa. La novela es una crítica poderosa a la narrativa colonial que presentaba a África como un continente sin historia ni civilización. 'Todo se desmorona' es una obra maestra que ha sido traducida a más de 50 idiomas y es considerada una de las novelas más importantes del siglo XX, fundamental para entender la experiencia africana y el legado del colonialismo.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Colonialismo", "Choque cultural", "Identidad", "Tradición", "Tragedia"],
        extract:
          '"Las cosas se desmoronan; el centro no puede sostenerse; la mera anarquía se desata sobre el mundo." (Fragmento, citando a Yeats)',
      },
    },
  },
  {
    id: "iceland",
    name: "Islandia",
    flag: "🇮🇸",
    capital: "Reikiavik",
    population: "0.37 millones",
    language: "Islandés",
    currency: "Corona islandesa (kr)",
    founded: "1944",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Halldór Laxness",
      profession: "Novelista",
      quote: "La vida es una lucha constante contra la estupidez.",
      period: "1902-1998",
      photo: "/placeholder.svg?height=400&width=400",
      masterwork: {
        title: "Gente independiente",
        year: "1934-1935",
        genre: "Novela",
        summary:
          "Gente independiente es una novela épica que retrata la vida de Bjartur de Summerhouses, un granjero islandés obstinado y orgulloso que lucha por su independencia en un paisaje desolado y hostil. La obra es una profunda exploración de la identidad islandesa, la relación del hombre con la naturaleza, la pobreza, la fe y la búsqueda de la libertad individual. Laxness, ganador del Premio Nobel de Literatura, utiliza un estilo que combina el realismo social con elementos de la saga islandesa y el humor negro. Bjartur, un personaje inolvidable, encarna la tenacidad y la resistencia del pueblo islandés, pero también su ceguera ante las necesidades emocionales de su familia. La novela es una crítica a la idealización de la independencia a ultranza y una reflexión sobre el verdadero significado de la libertad. 'Gente independiente' es un fresco social de la Islandia rural de principios del siglo XX, mostrando las duras condiciones de vida y la lucha por la supervivencia en un entorno implacable. La obra es un testimonio de la capacidad de Laxness para crear personajes complejos y explorar temas universales con una prosa poderosa y evocadora.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Independencia", "Pobreza", "Naturaleza", "Identidad islandesa", "Libertad"],
        extract:
          '"La vida es una lucha, y la lucha es la vida. Y la vida es una lucha contra la muerte, y la muerte es la vida." (Fragmento)',
      },
    },
  },
  {
    id: "cameroon",
    name: "Camerún",
    flag: "🇨🇲",
    capital: "Yaundé",
    population: "27.2 millones",
    language: "Francés",
    currency: "Franco CFA de África Central (XAF)",
    founded: "1960",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Ferdinand Oyono",
      profession: "Novelista y diplomático",
      quote: "La verdad es como el sol, no se puede ocultar para siempre.",
      period: "1929-2010",
      photo: "/placeholder.svg?height=400&width=400",
      masterwork: {
        title: "Una vida de chico",
        year: "1956",
        genre: "Novela satírica",
        summary:
          "Una vida de chico (Une vie de boy) es una novela satírica que narra la historia de Toundi Ondoua, un joven camerunés que huye de su pueblo para trabajar como 'boy' (sirviente) para un comandante colonial francés. A través de los ojos ingenuos y observadores de Toundi, Oyono expone la hipocresía, la crueldad y el absurdo del sistema colonial. La novela es una crítica mordaz a la deshumanización de los africanos bajo el dominio europeo y a la falsa benevolencia de los colonizadores. Toundi experimenta la discriminación, la violencia y la traición, mientras su visión idealizada de los europeos se desmorona. Oyono utiliza el humor negro y la ironía para denunciar la opresión y la alienación cultural. La obra es un testimonio poderoso de la experiencia colonial y una de las novelas más importantes de la literatura africana francófona. 'Una vida de chico' es un llamado a la conciencia sobre las injusticias del colonialismo y la necesidad de la autodeterminación africana.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Colonialismo", "Injusticia", "Alienación", "Sátira social", "Identidad africana"],
        extract: '"Soy un boy. Un boy es un hombre que no es un hombre. Es una cosa. Una cosa que habla." (Fragmento)',
      },
    },
  },
  {
    id: "singapore",
    name: "Singapur",
    flag: "🇸🇬",
    capital: "Singapur",
    population: "5.7 millones",
    language: "Inglés",
    currency: "Dólar de Singapur (S$)",
    founded: "1965",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Catherine Lim",
      profession: "Cuentista y novelista",
      quote: "La vida es una serie de pequeñas ironías.",
      period: "1942-presente",
      photo: "/placeholder.svg?height=400&width=400",
      masterwork: {
        title: "Pequeñas ironías: Historias de Singapur",
        year: "1978",
        genre: "Cuentos",
        summary:
          "Pequeñas ironías: Historias de Singapur es una colección de cuentos que ofrece una mirada perspicaz y a menudo satírica a la vida cotidiana en Singapur. Catherine Lim, una de las escritoras más destacadas de Singapur, explora las complejidades de la sociedad singapurense, sus costumbres, sus aspiraciones y sus contradicciones. Los cuentos abordan temas como la modernización, la tradición, las relaciones familiares, la educación, la clase social y la búsqueda de la identidad en una ciudad-estado en rápida transformación. Lim utiliza un estilo conciso y observador, con un toque de humor y melancolía, para retratar a personajes comunes que enfrentan dilemas universales. La obra es un espejo de la sociedad singapurense, mostrando tanto sus éxitos como sus tensiones subyacentes. 'Pequeñas ironías' fue un éxito de ventas y ayudó a establecer la literatura singapurense en el mapa mundial, ofreciendo una voz auténtica y crítica sobre la experiencia de vivir en una sociedad en constante evolución.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Vida cotidiana", "Modernización", "Tradición", "Identidad singapurense", "Ironía"],
        extract: '"En Singapur, la vida es una carrera constante, pero ¿hacia dónde corremos?" (Fragmento)',
      },
    },
  },
  {
    id: "uae",
    name: "Emiratos Árabes Unidos",
    flag: "🇦🇪",
    capital: "Abu Dabi",
    population: "9.9 millones",
    language: "Árabe",
    currency: "Dirham de los Emiratos Árabes Unidos (AED)",
    founded: "1971",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Mohammed Al-Murr",
      profession: "Cuentista y novelista",
      quote: "El desierto es un maestro que enseña paciencia y humildad.",
      period: "1955-presente",
      photo: "/placeholder.svg?height=400&width=400",
      masterwork: {
        title: "Cuentos de Dubái",
        year: "1991",
        genre: "Cuentos",
        summary:
          "Cuentos de Dubái es una colección de relatos que ofrece una visión íntima y a menudo humorística de la vida en los Emiratos Árabes Unidos, especialmente en Dubái, durante su rápida transformación. Mohammed Al-Murr, uno de los escritores emiratíes más reconocidos, explora los cambios sociales y culturales que acompañaron el auge del petróleo y la modernización. Los cuentos abordan temas como la tradición y la modernidad, la vida familiar, las relaciones entre emiratíes y expatriados, y la búsqueda de la identidad en una sociedad en constante cambio. Al-Murr utiliza un estilo sencillo y directo, con un toque de ironía y observación aguda, para retratar a personajes que navegan entre el pasado beduino y el futuro cosmopolita. La obra es un testimonio de la evolución de la sociedad emiratí, mostrando tanto sus desafíos como sus oportunidades. 'Cuentos de Dubái' es una ventana a la cultura y la vida en los Emiratos, ofreciendo una perspectiva auténtica y a menudo conmovedora sobre la experiencia de vivir en una de las ciudades más dinámicas del mundo.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Modernización", "Tradición", "Identidad emiratí", "Vida urbana", "Cambio social"],
        extract: '"Dubái crecía como un sueño, pero ¿qué sueños se construyen sobre la arena?" (Fragmento)',
      },
    },
  },
  {
    id: "estonia",
    name: "Estonia",
    flag: "🇪🇪",
    capital: "Tallin",
    population: "1.3 millones",
    language: "Estonio",
    currency: "Euro (€)",
    founded: "1918",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Anton Hansen Tammsaare",
      profession: "Novelista",
      quote: "El trabajo es la única verdad en la vida.",
      period: "1878-1940",
      photo: "/placeholder.svg?height=400&width=400",
      masterwork: {
        title: "Verdad y Justicia",
        year: "1926-1933",
        genre: "Saga novelística",
        summary:
          "Verdad y Justicia (Tõde ja õigus) es una pentalogía de novelas que es considerada la obra cumbre de la literatura estonia y un pilar de la identidad nacional. La saga narra la vida de dos granjeros, Andres y Pearu, y sus familias, en el contexto de la Estonia rural de finales del siglo XIX y principios del XX, explorando la lucha por la tierra, la justicia y la supervivencia. Tammsaare ofrece un retrato profundo de la sociedad estonia, sus valores, sus conflictos y su evolución desde la servidumbre hasta la independencia. La obra aborda temas universales como el trabajo duro, la moralidad, la religión, el amor, la traición y la búsqueda de la verdad en un mundo cambiante. La relación entre Andres y Pearu, marcada por la rivalidad y la cooperación, simboliza las tensiones inherentes a la condición humana. 'Verdad y Justicia' es un fresco épico que combina el realismo social con la profundidad filosófica, mostrando la resiliencia del espíritu estonio frente a la adversidad. La obra es fundamental para entender la historia y la cultura de Estonia, y sigue siendo una de las novelas más leídas y veneradas en el país.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Trabajo", "Justicia", "Identidad estonia", "Vida rural", "Moralidad"],
        extract: '"El hombre debe luchar por la verdad, incluso si la verdad lo destruye." (Fragmento)',
      },
    },
  },
  {
    id: "poland",
    name: "Polonia",
    flag: "🇵🇱",
    capital: "Varsovia",
    population: "37.8 millones",
    language: "Polaco",
    currency: "Złoty polaco (zł)",
    founded: "1918",
    countryShape: `M 100 10 C 130 0, 170 0, 190 30 C 200 60, 180 90, 150 100 C 120 110, 100 130, 80 150 C 60 170, 40 190, 10 180 C 0 150, 0 120, 20 90 C 40 60, 70 40, 100 10 Z`,
    writer: {
      name: "Adam Mickiewicz",
      profession: "Poeta y dramaturgo",
      quote: "La patria es donde el corazón encuentra su hogar.",
      period: "1798-1855",
      photo: "/placeholder.svg?height=400&width=400",
      masterwork: {
        title: "Pan Tadeusz",
        year: "1834",
        genre: "Poema épico",
        summary:
          "Pan Tadeusz es un poema épico nacional que es considerado la obra cumbre de la literatura polaca y un símbolo de la identidad nacional. La obra narra la vida de la nobleza polaca en Lituania en 1811-1812, justo antes de la invasión napoleónica de Rusia, explorando temas como el patriotismo, el amor, la tradición, la naturaleza y la lucha por la independencia. Mickiewicz, uno de los 'Tres Bardos' de la literatura polaca, utiliza un lenguaje poético rico y evocador para crear un fresco de la vida rural y aristocrática, con sus costumbres, sus conflictos y sus pasiones. La obra es una celebración de la cultura polaca y una expresión de la nostalgia por una patria perdida bajo la ocupación extranjera. 'Pan Tadeusz' es un testimonio de la resiliencia del espíritu polaco y la capacidad de la literatura para mantener viva la esperanza de la libertad. El poema es fundamental para entender la historia y la cultura de Polonia, y sigue siendo una de las obras más queridas y estudiadas en el país, recitada y memorizada por generaciones de polacos.",
        image: "/placeholder.svg?height=400&width=600",
        themes: ["Patriotismo", "Tradición", "Naturaleza", "Independencia", "Nostalgia"],
        extract:
          '"Lituania, mi patria, ¡tú eres como la salud! / Cuánto te valoro, solo lo sabe quien te ha perdido." (Inicio)',
      },
    },
  },
]

type ViewState = "flag" | "info" | "writer" // Eliminado "shape"

// Función cn simplificada para evitar problemas con tailwind-merge
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}

export default function CountriesApp() {
  const [mounted, setMounted] = useState(false)
  const [countryStates, setCountryStates] = useState<Record<string, ViewState>>({}) // Corregido el error de sintaxis aquí
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all")
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null)

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true)
    // Inicializar estados de países después del montaje
    const initialStates = countries.reduce((acc, country) => ({ ...acc, [country.id]: "flag" as ViewState }), {})
    setCountryStates(initialStates)
  }, [])

  // Obtener idiomas únicos y crear mapeo de banderas
  const languageOptions = useMemo(() => {
    const languages = Array.from(new Set(countries.map((country) => country.language))).sort()

    // Mapeo de idiomas a banderas representativas
    const languageFlags: Record<string, string> = {
      Español: "🇪🇸",
      Francés: "🇫🇷",
      Alemán: "🇩🇪",
      Inglés: "🇬🇧",
      Chino: "🇨🇳",
      Ucraniano: "🇺🇦",
      Portugués: "🇵🇹",
      Neerlandés: "🇳🇱",
      Checo: "🇨🇿",
      Japonés: "🇯🇵",
      Hindi: "🇮🇳",
      Noruego: "🇳🇴",
      Hebreo: "🇮🇱",
      Coreano: "🇰🇷",
      Turco: "🇹🇷",
      Persa: "🇮🇷",
      Árabe: "🇸🇦",
      Tailandés: "🇹🇭",
      Vietnamita: "🇻🇳",
      Islandés: "🇮🇸",
      Estonio: "🇪🇪",
      Polaco: "🇵🇱",
    }

    return languages.map((language) => ({
      value: language,
      label: language,
      flag: languageFlags[language] || "🌐",
    }))
  }, [])

  // Filtrar y ordenar países
  const filteredAndSortedCountries = useMemo(() => {
    let filtered = countries

    if (selectedLanguage !== "all") {
      filtered = countries.filter((country) => country.language === selectedLanguage)
    }

    // Ordenar alfabéticamente por nombre
    return filtered.sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }))
  }, [selectedLanguage])

  const handleCardClick = (countryId: string) => {
    const currentState = countryStates[countryId] || "flag"

    if (expandedCountry) {
      // If the masterwork overlay is open, clicking the card should not do anything
      return
    }

    setCountryStates((prev) => {
      let nextState: ViewState

      if (currentState === "flag") {
        nextState = "info"
      } else if (currentState === "info") {
        nextState = "writer" // Transición directa de info a writer
      } else if (currentState === "writer") {
        // Si está en la cara del escritor, abre el overlay de la obra maestra
        setExpandedCountry(countryId)
        return { ...prev, [countryId]: "writer" } // Mantener en 'writer' mientras el overlay está abierto
      } else {
        nextState = "flag" // Fallback, debería volver a la bandera
      }

      return { ...prev, [countryId]: nextState }
    })
  }

  const resetCard = (countryId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setCountryStates((prev) => ({ ...prev, [countryId]: "flag" }))
    setExpandedCountry(null)
  }

  const closeExpanded = () => {
    if (expandedCountry) {
      setCountryStates((prev) => ({ ...prev, [expandedCountry]: "flag" })) // Resetear la tarjeta a la bandera al cerrar el overlay
      setExpandedCountry(null)
    }
  }

  // No renderizar hasta que el componente esté montado
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando países del mundo...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen library-background">
      <style jsx>
        {`
          /* IMPORTAR FUENTES LITERARIAS */
          @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

          /* FONDO DE BIBLIOTECA MÁS NÍTIDO */
          .library-background {
            background-image: url('/modern-library-background.jpg');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            background-repeat: no-repeat;
            position: relative;
            font-family: 'Crimson Text', 'Times New Roman', serif;
          }

          .library-background::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.65);
            backdrop-filter: blur(0.3px);
            z-index: 0;
          }

          .library-background > * {
            position: relative;
            z-index: 1;
          }

          /* FONDO MÁGICO PARA EL HERO */
          .hero-section {
            background-image: url('/magical-book-background.jpg');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            position: relative;
          }

          .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(139, 69, 19, 0.75);
            backdrop-filter: blur(1px);
            z-index: 0;
          }

          .hero-section > * {
            position: relative;
            z-index: 1;
          }

          /* TIPOGRAFÍAS LITERARIAS */
          .literary-title {
            font-family: 'Playfair Display', 'Georgia', serif;
            font-weight: 700;
            letter-spacing: -0.02em;
          }

          .literary-quote {
            font-family: 'Libre Baskerville', 'Times New Roman', serif;
            font-style: italic;
            line-height: 1.4;
          }

          .literary-body {
            font-family: 'Crimson Text', 'Times New Roman', serif;
            line-height: 1.6;
          }

          .flip-card {
            perspective: 1200px;
          }

          .flip-card-inner {
            width: 100%;
            height: 100%;
            position: relative;
            transition: transform 0.6s cubic-bezier(0.5, 0.2, 0.2, 1.0);
            transform-style: preserve-3d;
          }

          .flag-face {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            backface-visibility: hidden;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            box-sizing: border-box;
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          }

          .flag-front { transform: rotateY(0deg); z-index: 5; }
          .flag-back { transform: rotateY(90deg); z-index: 4; }
          .flag-writer { transform: rotateY(180deg); z-index: 3; } /* Ajustada la rotación */
          .flag-masterwork { transform: rotateY(270deg); z-index: 2; } /* Ajustada la rotación */

          .flip-card[data-state="info"] .flip-card-inner {
            transform: rotateY(-90deg);
          }

          .flip-card[data-state="writer"] .flip-card-inner { /* Ajustada la rotación */
            transform: rotateY(-180deg);
          }

          /* EFECTO BOCETO A LÁPIZ MEJORADO Y VISIBLE */
          .author-photo {
            position: relative;
            filter:
              grayscale(100%)
              contrast(200%)
              brightness(130%)
              invert(0.1)
              sepia(25%)
              hue-rotate(15deg);
            background: #f8f8f8;
            mix-blend-mode: darken;
          }

          .author-photo::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 1px,
                rgba(0,0,0,0.08) 1px,
                rgba(0,0,0,0.08) 2px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 1px,
                rgba(0,0,0,0.06) 1px,
                rgba(0,0,0,0.06) 2px
              );
            border-radius: inherit;
            pointer-events: none;
            z-index: 1;
          }

          .masterwork-image {
            position: relative;
            filter:
              grayscale(100%)
              contrast(150%)
              brightness(110%)
              sepia(20%)
              hue-rotate(10deg);
            background: #f5f5f5;
          }

          .masterwork-image::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
              repeating-linear-gradient(
                30deg,
                transparent,
                transparent 1px,
                rgba(0,0,0,0.06) 1px,
                rgba(0,0,0,0.06) 2px
              ),
              repeating-linear-gradient(
                -30deg,
                transparent,
                transparent 1px,
                rgba(0,0,0,0.04) 1px,
                rgba(0,0,0,0.04) 2px
              );
            border-radius: inherit;
            pointer-events: none;
            z-index: 1;
          }

          /* OVERLAY EXPANDIDO CON PROPORCIÓN ÁUREA */
          .masterwork-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }

          .masterwork-content {
            background: rgba(255, 255, 255, 0.98);
            border-radius: 20px;
            width: 90vw;
            height: 90vh; /* Altura fija basada en viewport */
            max-width: 1400px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: column;
          }

          .masterwork-header {
            height: 38.2vh; /* Proporción áurea: parte menor (38.2%) */
            min-height: 200px;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 20px 20px 0 0;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }

          .masterwork-body {
            height: 61.8vh; /* Proporción áurea: parte mayor (61.8%) */
            min-height: 300px;
            overflow-y: auto;
            padding: 2rem;
            background: white;
            border-radius: 0 0 20px 20px;
          }

          .force-scroll {
            height: 384px !important;
            overflow-y: scroll !important;
            overflow-x: hidden !important;
            padding: 0 !important;
            margin: 0 !important;
            position: relative !important;
          }

          .force-scroll::-webkit-scrollbar {
            width: 8px !important;
            display: block !important;
          }

          .force-scroll::-webkit-scrollbar-track {
            background: rgba(241, 245, 249, 0.8) !important;
            border-radius: 4px !important;
          }

          .force-scroll::-webkit-scrollbar-thumb {
            background: rgba(203, 213, 225, 0.8) !important;
            border-radius: 4px !important;
            min-height: 30px !important;
          }

          .force-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(148, 163, 184, 0.8) !important;
          }

          .force-content {
            min-height: 800px !important;
            height: auto !important;
            padding: 20px !important;
            box-sizing: border-box !important;
          }

          .scroll-spacer {
            height: 200px !important;
            width: 100% !important;
            display: block !important;
            visibility: hidden !important;
          }

          .content-overlay {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(5px);
            border-radius: 20px;
            padding: 2rem;
            margin: 1rem;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
          }

          .hero-overlay {
            background: transparent;
            backdrop-filter: none;
            border-radius: 30px;
            padding: 3rem;
            margin: 2rem;
            box-shadow: none;
            border: none;
          }

          .footer-overlay {
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(10px);
          }

          @media (max-width: 768px) {
            .content-overlay, .hero-overlay {
              margin: 0.5rem;
              padding: 1.5rem;
            }

            .masterwork-overlay {
              padding: 1rem;
            }

            .masterwork-content {
              max-width: 95vw;
              max-height: 95vh;
            }
          }
        `}
      </style>

      {/* OVERLAY EXPANDIDO PARA OBRA MAESTRA */}
      {expandedCountry && (
        <div className="masterwork-overlay" onClick={closeExpanded}>
          <div className="masterwork-content" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 h-10 w-10 p-0 z-20 bg-white/80 hover:bg-white text-black hover:text-black"
              onClick={closeExpanded}
            >
              <X className="h-6 w-6 text-black" />
            </Button>

            {(() => {
              const country = countries.find((c) => c.id === expandedCountry)
              if (!country) return null

              return (
                <>
                  {/* HEADER CON PROPORCIÓN ÁUREA - PARTE MENOR */}
                  <div className="masterwork-header">
                    <div className="text-center z-10">
                      <div className="mb-4">
                        <Badge variant="secondary" className="text-lg px-4 py-2 bg-amber-100 text-amber-800 font-bold">
                          ✨ OBRA MAESTRA ✨
                        </Badge>
                      </div>
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="text-5xl">{country.flag}</span>
                        <div className="text-left">
                          <h1 className="literary-title text-4xl font-bold text-gray-800 mb-2">
                            {country.writer.masterwork.title}
                          </h1>
                          <p className="text-xl text-gray-800">por {country.writer.name}</p>
                          <div className="flex gap-3 mt-3">
                            <Badge variant="outline" className="text-sm text-gray-800">
                              {country.writer.masterwork.genre}
                            </Badge>
                            <Badge variant="outline" className="text-sm text-gray-800">
                              {country.writer.masterwork.year}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Patrón decorativo de fondo */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-10 left-10 text-6xl">📚</div>
                      <div className="absolute top-20 right-20 text-4xl">✍️</div>
                      <div className="absolute bottom-10 left-20 text-5xl">🎭</div>
                      <div className="absolute bottom-20 right-10 text-3xl">📖</div>
                    </div>
                  </div>

                  {/* BODY CON PROPORCIÓN ÁUREA - PARTE MAYOR */}
                  <div className="masterwork-body">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                      {/* IMAGEN DE LA OBRA */}
                      <div className="flex flex-col justify-center">
                        <div className="relative">
                          <img
                            src={country.writer.masterwork.image || "/placeholder.svg"}
                            alt={country.writer.masterwork.title}
                            className="masterwork-image w-full h-80 object-cover rounded-lg shadow-lg"
                            crossOrigin="anonymous"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg?height=400&width=600"
                            }}
                          />
                        </div>

                        <div className="mt-6">
                          <h4 className="literary-title font-semibold text-lg text-gray-800 mb-3">Temas Principales</h4>
                          <div className="flex flex-wrap gap-2">
                            {country.writer.masterwork.themes.map((theme, index) => (
                              <Badge key={index} variant="outline" className="text-sm text-gray-800">
                                {theme}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* CONTENIDO TEXTUAL */}
                      <div className="space-y-6 flex flex-col justify-center">
                        <div className="literary-body text-gray-700 leading-relaxed text-justify">
                          <p>{country.writer.masterwork.summary}</p>
                        </div>

                        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-lg border-l-4 border-amber-500 shadow-sm mt-6">
                          <h4 className="literary-title font-semibold text-lg text-amber-800 mb-3 flex items-center gap-2">
                            <Quote className="h-5 w-5" />
                            Extracto de la Obra
                          </h4>
                          <div className="text-amber-700">
                            <blockquote className="literary-quote italic leading-relaxed">
                              {country.writer.masterwork.extract}
                            </blockquote>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-500 shadow-sm">
                          <h4 className="literary-title font-semibold text-lg text-blue-800 mb-3 flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Sobre el Autor
                          </h4>
                          <div className="text-blue-700">
                            <p className="font-semibold mb-2">
                              {country.writer.name} ({country.writer.period})
                            </p>
                            <p className="mb-3">{country.writer.profession}</p>
                            <blockquote className="literary-quote italic border-l-2 border-blue-300 pl-4">
                              "{country.writer.quote}"
                            </blockquote>
                          </div>
                        </div>

                        <div className="text-center bg-amber-50 p-4 rounded-lg">
                          <p className="text-sm text-amber-800 font-medium">
                            📍 Obra representativa de la literatura de {country.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      )}

      {/* ENCABEZADO HERO CON FONDO MÁGICO */}
      <div className="hero-section relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="hero-overlay text-center">
            <div className="mb-8">
              <span className="text-6xl mb-4 block">😍📚</span>
              <Quote className="h-12 w-12 text-amber-800 mx-auto mb-6" />
            </div>

            <blockquote className="literary-quote text-2xl lg:text-4xl font-bold leading-tight mb-8 max-w-4xl mx-auto text-white">
              «Las bibliotecas son catedrales de la mente; hospitales del alma; parques temáticos de la imaginación»
            </blockquote>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-1 w-16 bg-white"></div>
              <cite className="literary-body text-lg lg:text-xl font-medium text-white not-italic">Caitlin Moran</cite>
              <div className="h-1 w-16 bg-white"></div>
            </div>

            <p className="literary-body text-gray-200 text-lg mb-8">Autora y periodista británica</p>

            <div className="flex items-center justify-center gap-2 text-gray-200">
              <BookOpen className="h-5 w-5" />
              <span className="literary-body text-sm">Explorando la literatura mundial</span>
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL CON OVERLAY */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="content-overlay">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedCountries.map((country) => {
              const currentState = countryStates[country.id] || "flag"

              return (
                <div key={country.id} className="flip-card" data-state={currentState}>
                  <Card
                    className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white/95 backdrop-blur-sm border-2 hover:border-blue-300 h-96 relative overflow-hidden"
                    onClick={() => handleCardClick(country.id)}
                  >
                    <div className="flip-card-inner h-full">
                      {/* CARA 1: BANDERA */}
                      <div className="flag-face flag-front flex flex-col items-center justify-center p-4">
                        <div className="w-[95%] h-[85%] flex items-center justify-center">
                          <div className="w-full h-full flex items-center justify-center text-[12rem] leading-none drop-shadow-lg">
                            {country.flag}
                          </div>
                        </div>
                        <CardTitle className="literary-title text-xl font-bold text-gray-800 text-center absolute bottom-4">
                          {country.name}
                        </CardTitle>
                      </div>

                      {/* CARA 2: INFORMACIÓN DEL PAÍS */}
                      <div className="flag-face flag-back">
                        <div className="force-scroll">
                          <div className="force-content">
                            <div className="relative mb-6">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-0 left-0 h-8 w-8 p-0 z-10"
                                onClick={(e) => resetCard(country.id, e)}
                              >
                                <ArrowLeft className="h-4 w-4" />
                              </Button>
                              <div className="text-center pt-8">
                                <div className="text-4xl mb-3">{country.flag}</div>
                                <CardTitle className="literary-title text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
                                  <MapPin className="h-5 w-5" />
                                  {country.name}
                                </CardTitle>
                              </div>
                            </div>

                            <div className="space-y-4 literary-body text-gray-800">
                              <div className="flex items-center gap-3 text-sm">
                                <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                <span className="font-medium">Capital:</span>
                                <span>{country.capital}</span>
                              </div>

                              <div className="flex items-center gap-3 text-sm">
                                <span className="text-xl">👥</span>
                                <span className="font-medium">Población:</span>
                                <span>{country.population}</span>
                              </div>

                              <div className="flex items-center gap-3 text-sm">
                                <span className="text-xl">🗣️</span>
                                <span className="font-medium">Idioma:</span>
                                <span>{country.language}</span>
                              </div>

                              <div className="flex items-center gap-3 text-sm">
                                <span className="text-xl">💰</span>
                                <span className="font-medium">Moneda:</span>
                                <span>{country.currency}</span>
                              </div>

                              <div className="flex items-center gap-3 text-sm">
                                <span className="text-xl">🗓️</span>
                                <span className="font-medium">Fundación:</span>
                                <span>{country.founded}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CARA 3: ESCRITOR (anteriormente CARA 4) */}
                      <div className="flag-face flag-writer">
                        <div className="force-scroll">
                          <div className="force-content">
                            <div className="relative mb-6">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-0 left-0 h-8 w-8 p-0 z-10"
                                onClick={(e) => resetCard(country.id, e)}
                              >
                                <ArrowLeft className="h-4 w-4" />
                              </Button>
                              <div className="text-center pt-8">
                                <div className="text-4xl mb-3">{country.flag}</div>
                                <CardTitle className="literary-title text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
                                  <BookOpen className="h-5 w-5" />
                                  Literatura de {country.name}
                                </CardTitle>
                              </div>
                            </div>

                            <div className="flex flex-col items-center text-center mb-6">
                              <img
                                src={country.writer.photo || "/placeholder.svg"}
                                alt={country.writer.name}
                                className="author-photo w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-200 shadow-md"
                                crossOrigin="anonymous"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = "/placeholder.svg?height=400&width=400"
                                }}
                              />
                              <h3 className="literary-title text-2xl font-bold text-gray-800">{country.writer.name}</h3>
                              <p className="text-gray-600 text-sm">{country.writer.profession}</p>
                              <p className="text-gray-500 text-xs">{country.writer.period}</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-200 shadow-sm mb-6">
                              <blockquote className="literary-quote text-lg text-gray-700 italic leading-relaxed">
                                "{country.writer.quote}"
                              </blockquote>
                            </div>

                            <div className="text-center">
                              <Button
                                variant="outline"
                                className="text-blue-600 hover:text-blue-800 bg-transparent"
                                onClick={() => setExpandedCountry(country.id)}
                              >
                                Ver Obra Maestra
                                <BookOpen className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* PIE DE PÁGINA */}
      <footer className="footer-overlay text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <span className="text-lg font-semibold">Filtrar por idioma:</span>
            <Button
              variant={selectedLanguage === "all" ? "secondary" : "ghost"}
              onClick={() => setSelectedLanguage("all")}
              className="text-white hover:bg-gray-700"
            >
              🌐 Todos
            </Button>
            {languageOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedLanguage === option.value ? "secondary" : "ghost"}
                onClick={() => setSelectedLanguage(option.value)}
                className="text-white hover:bg-gray-700"
              >
                {option.flag} {option.label}
              </Button>
            ))}
          </div>
          <p className="literary-body text-gray-400 text-sm">
            © {new Date().getFullYear()} Explorador de Países y Literatura. Todos los derechos reservados.
          </p>
          <p className="literary-body text-gray-500 text-xs mt-2">Hecho con pasión por la geografía y las letras.</p>
        </div>
      </footer>
    </div>
  )
}
