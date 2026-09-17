export type ServiceCategory = "sobrancelhas" | "cilios" | "combo";

export type Service = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  price: number;
  category: ServiceCategory;
  badge?: string;
};

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type BeforeAfterPair = {
  id: string;
  before: ImageAsset;
  after: ImageAsset;
  category: ServiceCategory;
  title: string;
};

export type BeforeAfterResult = ImageAsset & {
  id: string;
  category: ServiceCategory;
  title: string;
  label: "Depois";
};

export const business = {
  ownerName: "Jeniffer Souza",
  brandName: "Arte no Olhar",
  specialty: "Cílios & Sobrancelhas",
  positioning: "Especialista em olhar impactante",
  location: "Rio Branco - AC",
  instagramUrl: "https://www.instagram.com/jeniffer_arte_no_olhar/",
  whatsappNumber: "5568999626821",
  whatsappUrl: "https://wa.me/5568999626821",
  ownerPhoto: {
    src: "/images/perfil/jeniffer-souza.png",
    alt: "Jeniffer Souza, especialista em cílios e sobrancelhas",
    width: 1254,
    height: 1254,
    available: true
  }
} as const;

export const services: Service[] = [
  {
    id: "design-sobrancelhas",
    name: "Design de sobrancelhas",
    shortName: "Design",
    description: "Para valorizar o formato natural das sobrancelhas com acabamento delicado.",
    price: 20,
    category: "sobrancelhas"
  },
  {
    id: "design-sobrancelhas-henna",
    name: "Design de sobrancelhas com henna",
    shortName: "Design com henna",
    description: "Design de sobrancelhas com aplicação de henna para destacar o olhar.",
    price: 45,
    category: "sobrancelhas"
  },
  {
    id: "cilios-look-frances",
    name: "Cílios Look Francês",
    shortName: "Look Francês",
    description: "Realce dos cílios com um resultado pensado para deixar o olhar em evidência.",
    price: 45,
    category: "cilios"
  },
  {
    id: "combo-henna-cilios",
    name: "Combo: Design de sobrancelhas com henna + Cílios Look Francês",
    shortName: "Combo henna + cílios",
    description: "Uma opção completa para combinar sobrancelhas com henna e Cílios Look Francês.",
    price: 80,
    category: "combo",
    badge: "Combo"
  }
];

export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "cacheada-combo",
    before: {
      src: "/images/antes-depois/cacheada-antes.jpg",
      alt: "Antes do atendimento de sobrancelhas e cílios em cliente de cabelo cacheado",
      width: 1080,
      height: 1440
    },
    after: {
      src: "/images/antes-depois/cacheada-depois.jpg",
      alt: "Depois do atendimento de sobrancelhas e cílios em cliente de cabelo cacheado",
      width: 1080,
      height: 1440
    },
    category: "combo",
    title: "Combo de cílios e sobrancelhas"
  },
  {
    id: "henna-close",
    before: {
      src: "/images/antes-depois/henna-antes.jpg",
      alt: "Antes do design de sobrancelhas com henna em close do olhar",
      width: 1080,
      height: 1440
    },
    after: {
      src: "/images/antes-depois/henna-depois.jpg",
      alt: "Depois do design de sobrancelhas com henna em close do olhar",
      width: 1080,
      height: 1440
    },
    category: "sobrancelhas",
    title: "Design com henna"
  },
  {
    id: "sobrancelhas-close",
    before: {
      src: "/images/antes-depois/sobrancelhas-antes.jpg",
      alt: "Antes do design de sobrancelhas em close do olhar",
      width: 1080,
      height: 1080
    },
    after: {
      src: "/images/antes-depois/sobrancelhas-depois.jpg",
      alt: "Depois do design de sobrancelhas em close do olhar",
      width: 540,
      height: 540
    },
    category: "sobrancelhas",
    title: "Design de sobrancelhas"
  }
];

export const beforeAfterResults: BeforeAfterResult[] = [
  {
    id: "sobrancelhas-resultado-01",
    src: "/images/antes-depois/sobrancelhas-resultado-01.jpg",
    alt: "Resultado de design de sobrancelhas feito por Jeniffer Souza",
    width: 540,
    height: 960,
    category: "sobrancelhas",
    title: "Design de sobrancelhas",
    label: "Depois"
  },
  {
    id: "cilios-sobrancelhas-resultado-01",
    src: "/images/antes-depois/cilios-sobrancelhas-resultado-01.jpg",
    alt: "Resultado de cílios e sobrancelhas feito por Jeniffer Souza",
    width: 540,
    height: 960,
    category: "combo",
    title: "Cílios e sobrancelhas",
    label: "Depois"
  },
  {
    id: "combo-cilios-sobrancelhas-depois",
    src: "/images/antes-depois/combo-cilios-sobrancelhas-depois.jpg",
    alt: "Depois de atendimento de cílios e sobrancelhas em close do olhar",
    width: 1080,
    height: 1440,
    category: "combo",
    title: "Combo de cílios e sobrancelhas",
    label: "Depois"
  }
];
