export interface Artist {
  id: string;
  name: string;
  roleKey: string; // Translation key for role
  imageUrl: string;
  social: {
    spotify?: string;
    youtube?: string;
    bilibili?: string;
    instagram?: string;
    soundcloud?: string;
    twitter?: string;
  };
}

export const artists: Artist[] = [
  {
    id: "haosc",
    name: "HAØSC",
    roleKey: "artists.haosc_role",
    imageUrl: "/haosc.jpg",
    social: {
      spotify: "https://open.spotify.com/artist/0ASsfvcyv6P3TVLEYLurds",
      youtube: "https://www.youtube.com/@HAOSC",
      bilibili: "https://space.bilibili.com/3546828570101837"
    }
  },
  {
    id: "leo",
    name: "Leo",
    roleKey: "artists.leo_role",
    imageUrl: "/leo.jpg",
    social: {
      bilibili: "https://space.bilibili.com/327769785"
    }
  }
];

// Helper function to get all social media links for structured data
export const getAllSocialLinks = (): string[] => {
  const allLinks: string[] = [];

  artists.forEach((artist) => {
    Object.values(artist.social).forEach((link) => {
      if (link) allLinks.push(link);
    });
  });

  return allLinks;
};
