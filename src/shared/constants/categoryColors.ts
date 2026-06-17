export interface OrgPalette {
  primaryColor: string;
  primaryDark: string;
  primaryLight: string;
}

const TYPE_PALETTES: Record<string, OrgPalette> = {
  CHARITY: { primaryColor: "#d6746a", primaryDark: "#a54d44", primaryLight: "#ebc2be" },
  NGO: { primaryColor: "#88a47c", primaryDark: "#6b8362", primaryLight: "#b5c9a8" },
  COLLABORATOR: { primaryColor: "#7c9bc8", primaryDark: "#5a7aa3", primaryLight: "#b8cce0" },
};

const CATEGORY_PALETTES: Record<string, OrgPalette> = {
  "Infancia y Familia": { primaryColor: "#e8796f", primaryDark: "#c75b50", primaryLight: "#f5c8c4" },
  Educación: { primaryColor: "#6b9bd4", primaryDark: "#4d7bb8", primaryLight: "#c1daf0" },
  Salud: { primaryColor: "#6ab0a2", primaryDark: "#4d8a7c", primaryLight: "#b5dbd2" },
  "Salud y Nutrición": { primaryColor: "#c0845c", primaryDark: "#9a6542", primaryLight: "#e8d5c4" },
  Vivienda: { primaryColor: "#d4a24e", primaryDark: "#b8862e", primaryLight: "#f0dbb5" },
  "Medio Ambiente": { primaryColor: "#5a8f6a", primaryDark: "#3d6b4d", primaryLight: "#b2d4b8" },
};

const FALLBACK: OrgPalette = {
  primaryColor: "#d6746a",
  primaryDark: "#a54d44",
  primaryLight: "#ebc2be",
};

const CATEGORY_IMAGES: Record<string, { image: string; coverImage: string }> = {
  "Infancia y Familia": {
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80",
  },
  Educación: {
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80",
  },
  Salud: {
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
  },
  "Salud y Nutrición": {
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200&q=80",
  },
  Vivienda: {
    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=1200&q=80",
  },
  "Medio Ambiente": {
    image: "https://images.unsplash.com/photo-1560419015-7c427e801ae1?w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1560419015-7c427e801ae1?w=1200&q=80",
  },
};

const FALLBACK_IMAGE = {
  image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
  coverImage: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80",
};

export function getOrgColors(type?: string, category?: string): OrgPalette {
  if (category && CATEGORY_PALETTES[category]) return CATEGORY_PALETTES[category];
  if (type && TYPE_PALETTES[type]) return TYPE_PALETTES[type];
  return FALLBACK;
}

export function getOrgImages(category?: string): { image: string; coverImage: string } {
  if (category && CATEGORY_IMAGES[category]) return CATEGORY_IMAGES[category];
  return FALLBACK_IMAGE;
}
