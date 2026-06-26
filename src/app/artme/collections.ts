import manifest from "../artme-manifest.json";

export type Shot = { src: string; w: number; h: number; orig: string };
export type Manifest = Record<string, Shot[]>;
export const MANIFEST = manifest as Manifest;

export type Room = {
  slug: string;
  n: string;
  title: string;
  subtitle: string;
  blurb: string;
  type: "images" | "3d" | "splat" | "facet" | "keyed" | "flip" | "slideshow" | "row" | "columns" | "callista" | "proceso" | "melty";
  model?: string; // /artme/3d/xxx.glb for 3d rooms
  iosModel?: string; // optional usdz for AR
  splat?: string; // /artme/3d/xxx.ply for gaussian-splat point-cloud rooms
  subject?: string; // /artme/3d/xxx.png cutout for the melty dissolve overlay
  exposure?: string; // model-viewer exposure (low = dark/moody)
  cloudBright?: number; // point-cloud brightness multiplier
  cloudAdditive?: boolean; // additive (ethereal white) vs normal (real color) blending
  defaultBrush?: "burbujas" | "pinceladas"; // splat render style default
  brushToggle?: boolean; // show the burbujas/pinceladas render toggle (default true)
  freeformGallery?: boolean; // gallery renders the curated mesa arrangement as-is
  staggerReveal?: boolean; // reveal one row every 2s (77 km/h)
  grid?: boolean; // uniform square grid (aligned, no gaps)
  grouped?: boolean; // group the grid by collection (uses each shot's `coll`)
  hidden?: boolean; // not shown in the entrance; reachable only by URL (easter egg)
};

// Curatorial sequence. Rooms map 1:1 to Dante's own albums + one room per 3D work.
export const ROOMS: Room[] = [
  {
    slug: "ceramica", n: "01", title: "Cerámica", subtitle: "Torno · proceso",
    blurb: "Formas plegadas levantadas a mano en el torno. El origen físico de las piezas que después llevé al 3D.",
    type: "images", hidden: true,
  },
  {
    slug: "ceramica-3d-01", n: "3D·1", title: "Coof", subtitle: "Escaneo 3D · rotable",
    blurb: "La misma materia, vuelta malla. Una pieza de cerámica escaneada y reconstruida en 3D — girala con el dedo o el mouse.",
    type: "3d", model: "/artme/3d/ceramica-01.glb",
  },
  {
    slug: "blue-waves", n: "3D·2", title: "Blue Waves", subtitle: "Escaneo 3D · rotable",
    blurb: "Cerámica vidriada azul, plegada en lazos. Escaneada de tus fotos y limpiada del fondo — la pieza real, navegable.",
    type: "3d", model: "/artme/3d/blue-waves.glb",
  },
  {
    slug: "spatial-melty", n: "3D·3", title: "Nubes (from Creamy Spatial)", subtitle: "Nube de puntos · hallazgo",
    blurb: "Un accidente feliz: al digitalizar la pieza apareció esta nube blanca que se materializa desde el polvo y respira. Materia vuelta atmósfera.",
    type: "splat", splat: "/artme/3d/spatial-melty-slim.ply", cloudBright: 1.7, cloudAdditive: true, defaultBrush: "burbujas", brushToggle: false,
  },
  {
    slug: "spatial-real", n: "3D·4", title: "Spatial Cream Melty Object", subtitle: "De la pieza real a la nube",
    blurb: "La cerámica real, suspendida entre los puntos que son sus propios colores. Pasá el mouse: la pieza se deshace en partículas que vuelan, y al disolverse a la mitad se abre la nube para explorarla en 3D.",
    type: "melty", splat: "/artme/3d/spatial-melty-slim.ply", subject: "/artme/3d/melty-subject.png", cloudBright: 1.0, cloudAdditive: false, defaultBrush: "burbujas",
  },
  {
    slug: "natural-coof", n: "3D·5", title: "Natural Coof — Apariciones", subtitle: "Malla en la oscuridad",
    blurb: "Otro hallazgo del proceso: la pieza casi invisible en la penumbra, sus caras apareciendo y desapareciendo mientras gira. Lo que se revela al moverse.",
    type: "facet", model: "/artme/3d/ceramica-01.glb",
  },
  {
    slug: "mesa", n: "02", title: "Cemento, Metal y Madera", subtitle: "Mesa · proceso con mi viejo",
    blurb: "Una muestra de los materiales —cemento, madera, metal—. Pasá el mouse por cada uno: gira y revela el momento del proceso que le dio forma. Las últimas, la mesa terminada.",
    type: "flip",
  },
  {
    slug: "pinturas", n: "03", title: "Pinturas", subtitle: "Cuadros con historias",
    blurb: "Pintura: cada cuadro carga una historia.",
    type: "images", hidden: true,
  },
  {
    slug: "overexposed", n: "03·II", title: "overexposed", subtitle: "Un cuadro, día a día",
    blurb: "",
    type: "proceso",
  },
  {
    slug: "banos", n: "04", title: "Baños", subtitle: "Interiores nocturnos",
    blurb: "Baños públicos de noche: espejos, penumbra, graffiti, luz roja. Lo público y lo íntimo en el mismo encuadre.",
    type: "images",
  },
  {
    slug: "momento-obscuro", n: "05", title: "Momento Obscuro", subtitle: "Rojo · sombra · deseo",
    blurb: "Oscuridad, rojos, sensualidad, sombras.",
    type: "images",
  },
  {
    slug: "faceid", n: "06", title: "Face ID", subtitle: "Verificación facial",
    blurb: "El rostro sometido al reconocimiento de la máquina. El yo convertido en credencial. «Your face is too close.»",
    type: "images",
  },
  {
    slug: "ruinas", n: "07", title: "Ruinas / Construcciones", subtitle: "Lo que cae y lo que sube",
    blurb: "Estructuras a medio caer y a medio levantar.",
    type: "images",
  },
  {
    slug: "abstracta", n: "08", title: "Fotografía abstracta", subtitle: "Forma sin referente",
    blurb: "Imágenes donde la forma se suelta de lo que la originó.",
    type: "images",
  },
  {
    slug: "geometrias", n: "09", title: "Geometrías", subtitle: "Arquitectura",
    blurb: "Geometrías arquitectónicas, ordenadas por color.",
    type: "images", grid: true,
  },
  {
    slug: "bwc", n: "10", title: "B & W & C", subtitle: "Black & White & Color",
    blurb: "La cámara guarda un solo color del cuadro y manda todo el resto a blanco y negro.",
    type: "images",
  },
  {
    slug: "viento", n: "11", title: "77 km/h", subtitle: "El viento",
    blurb: "Un intento de fotografiar el viento en la naturaleza.",
    type: "images", freeformGallery: true, staggerReveal: true,
  },
  {
    slug: "gris", n: "12", title: "Gris", subtitle: "Soledad acompañada",
    blurb: "Una playa gris, con gente, emitiendo soledad.",
    type: "slideshow",
  },
  {
    slug: "faro", n: "13", title: "Faro", subtitle: "Cinco fotos · una caminata",
    blurb: "La vez que caminamos hasta lo más lejos que se veía en el horizonte —un faro como una cabeza de alfiler— a través de playa, médanos, la nada y el todo, el miedo y la inmensidad.",
    type: "row",
  },
  {
    slug: "callista", n: "14", title: "Callista", subtitle: "Joyería · plata 925",
    blurb: "Mi marca de joyas: un ascenso cósmico en plata 925. Tres colecciones que suben de la tierra al universo — Earth, Exosphere, Kosma.",
    type: "callista",
  },
];

export function getRoom(slug: string) {
  return ROOMS.find((r) => r.slug === slug);
}

export function isReady(r: Room): boolean {
  if (r.type === "3d" || r.type === "facet" || r.type === "keyed") return Boolean(r.model);
  if (r.type === "splat" || r.type === "melty") return Boolean(r.splat);
  if (r.type === "flip" || r.type === "slideshow" || r.type === "row" || r.type === "columns") return true;
  return (MANIFEST[r.slug]?.length ?? 0) > 0;
}
