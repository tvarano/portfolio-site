export interface Social {
  label: string;
  href: string;
  brandColor: string;
  icon: string; // react-icons key
}

export const socials: Social[] = [
  {
    label: "GitHub",
    href: "https://github.com/tvarano",
    brandColor: "#24292e",
    icon: "FaGithub",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/thomas-varano",
    brandColor: "#0A66C2",
    icon: "FaLinkedin",
  },
  {
    label: "Email",
    href: "mailto:thvarano@gmail.com",
    brandColor: "#FF6B6B",
    icon: "FaEnvelope",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/tom.varano",
    brandColor: "#E1306C",
    icon: "FaInstagram",
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/user/tvarano54",
    brandColor: "#1DB954",
    icon: "FaSpotify",
  },
  {
    label: "Last.fm",
    href: "https://last.fm/user/tvarano54",
    brandColor: "#D51007",
    icon: "FaLastfm",
  },
  // {
  //   label: "Snapchat",
  //   href: "https://www.snapchat.com/add/tom.varano",
  //   brandColor: "#FFFC00",
  //   icon: "FaSnapchat",
  // },
];
