# Proyecto-ihm
Poke Api
# Pokédex

Página web que muestra la información de cualquier Pokémon usando la API pública [PokeAPI](https://pokeapi.co/). Está hecha solo con HTML, CSS y JavaScript, sin librerías ni instalaciones.

Características

- Busca un Pokémon por **nombre** o número (por ejemplo `pikachu` o `25`).
- Muestra la imagen oficial del Pokémon.
- Muestra su número, nombre y tipos (traducidos al español).
- Muestra altura, peso y habilidades.
- Muestra las 6 estadísticas base con barras animadas.
- Muestra su línea evolutiva; al hacer clic en una evolución se carga ese Pokémon.
- Botones Anterior y Siguiente para recorrer la Pokédex.
- Mensaje de error si el Pokémon no existe.
- Diseño responsive: se adapta a celular y computador.

Tecnologías

| Tecnología | Para qué se usa |
| HTML5 | Estructura de la página |
| CSS3 | Estilos y diseño responsive |
| JavaScript | Lógica y conexión con la API (`fetch`, `async/await`) |
| [PokeAPI](https://pokeapi.co/) | Fuente de los datos |
| Google Fonts | Tipografías Inter y Space Grotesk |

Estructura del proyecto

pokedex/
index.html    → estructura de la página
styles.css    → colores, tamaños y diseño
script.js     → lógica y conexión con la API
README.md     → este archivo

Cómo ejecutarlo

1. Descarga la carpeta del proyecto.
2. Asegúrate de que index.html, styles.css y script.js estén en la misma carpeta.
3. Abre index.html en tu navegador (doble clic, o clic derecho -> Abrir con).

Necesitas conexión a internet, porque los datos y las imágenes se piden a PokeAPI.

Si usas Visual Studio Code, también puedes instalar la extensión Live Server y pulsar Go Live.

Cómo funciona

1. Al abrir la página, script.js carga a Pikachu (#25).
2. Cuando buscas un Pokémon, se hace una petición a:
   https://pokeapi.co/api/v2/pokemon/{nombre o número}

3. Con la respuesta se rellenan la imagen, el nombre, los tipos, las medidas y las estadísticas.
4. Para la línea evolutiva se hacen dos peticiones más: primero a la especie del Pokémon y luego a su cadena de evolución.

Datos de la API que se usan

| Dato en la página | Campo de la API |
| Imagen | sprites.other["official-artwork"].front_default |
| Número | `id` |
| Nombre | `name` |
| Tipos | `types` |
| Altura (decímetros → metros) | `height` |
| Peso (hectogramos → kg) | `weight` |
| Habilidades | `abilities` |
| Estadísticas | `stats` |
| Evoluciones | `species.url` → `evolution_chain.url` |

Personalización

- Colores: cambia las variables al inicio de `styles.css` (sección `:root`).
- Pokémon inicial: cambia el valor de `currentId` en `script.js`.
- Idioma: las traducciones de tipos y estadísticas están en los objetos `TYPE_ES` y `STAT_ES` de `script.js`.

Posibles mejoras

- Listado de todos los Pokémon en tarjetas.
- Filtro por tipo.
- Descripción del Pokémon (campo `flavor_text_entries` de la especie).
- Modo oscuro.

Créditos

- Datos e imágenes: [PokeAPI](https://pokeapi.co/).
- Pokémon y sus nombres son marcas de Nintendo, Game Freak y The Pokémon Company. Este proyecto es educativo y sin fines de lucro.

Autores: 
Miguel Antonio Bautista Torres y Juan Esteban Guijo Vargas