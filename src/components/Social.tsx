import { For, Component } from "solid-js";

const socials = [
  {
    href: "https://github.com/solidjs/solid",
    alt: "Navigate to github",
    icon: "M12 .3a12 12 0 00-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 011.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0012 .3",
  },

  {
    href: "https://www.reddit.com/r/solidjs/",
    alt: "Navigate to reddit",
    icon: "M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.74c.69 0 1.25.56 1.25 1.25a1.25 1.25 0 01-2.5.06l-2.6-.55-.8 3.75c1.83.07 3.48.63 4.68 1.49.3-.31.73-.5 1.2-.5.97 0 1.76.8 1.76 1.76 0 .72-.43 1.33-1.01 1.61a3.11 3.11 0 01.04.52c0 2.7-3.13 4.87-7 4.87-3.88 0-7-2.17-7-4.87 0-.18 0-.36.04-.53A1.75 1.75 0 014.03 12a1.75 1.75 0 012.96-1.26 8.52 8.52 0 014.74-1.5l.89-4.17a.34.34 0 01.14-.2.35.35 0 01.24-.04l2.9.62a1.21 1.21 0 011.11-.7zM9.25 12a1.25 1.25 0 101.25 1.25c0-.69-.56-1.25-1.25-1.25zm5.5 0a1.25 1.25 0 000 2.5 1.25 1.25 0 000-2.5zm-5.47 3.99a.33.33 0 00-.23.1.33.33 0 000 .46c.84.84 2.49.91 2.96.91.48 0 2.1-.06 2.96-.91a.36.36 0 00.03-.47.33.33 0 00-.46 0c-.55.54-1.68.73-2.51.73-.83 0-1.98-.2-2.51-.73a.33.33 0 00-.24-.1z",
  },

  {
    href: "https://discord.com/invite/solidjs",
    alt: "Navigate to discord",
    icon: "M20.3483 4.4015a.0612.0612 0 0 0-.0312-.0286 19.7986 19.7986 0 0 0-4.8852-1.5145.0741.0741 0 0 0-.0785.0371 13.774 13.774 0 0 0-.6081 1.249 18.2796 18.2796 0 0 0-5.4868 0 12.6344 12.6344 0 0 0-.6178-1.249.0771.0771 0 0 0-.0785-.0371A19.7425 19.7425 0 0 0 3.6769 4.373a.0699.0699 0 0 0-.0321.0276C.5334 9.047-.319 13.5792.0992 18.0553a.0823.0823 0 0 0 .0312.0562 19.9048 19.9048 0 0 0 5.9929 3.028.0776.0776 0 0 0 .0842-.0275 14.2123 14.2123 0 0 0 1.226-1.9936.076.076 0 0 0-.0416-.1056 13.1091 13.1091 0 0 1-1.8722-.892.077.077 0 0 1-.0075-.1275c.1258-.0943.2517-.1923.3718-.2914a.0742.0742 0 0 1 .0775-.0104c3.9278 1.7925 8.18 1.7925 12.0613 0a.074.074 0 0 1 .0785.0095c.1202.099.246.198.3728.2923a.0769.0769 0 0 1-.0067.1275 12.3024 12.3024 0 0 1-1.873.891.0765.0765 0 0 0-.0408.1066 15.9615 15.9615 0 0 0 1.225 1.9925.076.076 0 0 0 .0842.0286 19.8388 19.8388 0 0 0 6.0026-3.028.0768.0768 0 0 0 .0312-.0552c.5006-5.1749-.838-9.67-3.5483-13.6548ZM8.02 15.3299c-1.1826 0-2.157-1.0852-2.157-2.418 0-1.3327.9555-2.418 2.157-2.418 1.2108 0 2.1757 1.0947 2.1568 2.418 0 1.3328-.9555 2.418-2.1568 2.418Zm7.9747 0c-1.1825 0-2.1569-1.0852-2.1569-2.418 0-1.3327.9555-2.418 2.1569-2.418 1.2109 0 2.1758 1.0947 2.1569 2.418 0 1.3328-.946 2.418-2.157 2.418Z",
  },

  {
    href: "https://twitter.com/solid_js",
    alt: "Navigate to twitter",
    icon: "M12,0.1c-6.7,0-12,5.3-12,12s5.3,12,12,12s12-5.4,12-12S18.6,0.1,12,0.1z M17,9.4v0.4c0,3.8-2.6,8-7.5,8 c-1.5,0-2.9-0.5-4.1-1.3c0.2,0,0.4,0,0.7,0c1.2,0,2.3-0.5,3.3-1.2c-1.1,0-2.1-0.8-2.4-2c0.2,0.1,0.3,0.1,0.5,0.1 c0.2,0,0.5-0.1,0.7-0.1C6.9,13,6,11.9,6,10.5v-0.1c0.3,0.2,0.8,0.4,1.2,0.4c-0.7-0.5-1.2-1.4-1.2-2.3c0-0.5,0.1-1.1,0.3-1.4 c1.3,1.7,3.2,2.8,5.4,2.9c-0.1-0.2-0.1-0.4-0.1-0.6c0-1.6,1.2-2.8,2.7-2.8c0.8,0,1.4,0.3,1.9,0.9C17,7.3,17.6,7,18.1,6.7 c-0.2,0.7-0.6,1.2-1.1,1.6c0.5-0.1,1-0.2,1.5-0.4C18.1,8.4,17.6,8.9,17,9.4z",
  },
];

const SocialIcon: Component<{ href: string; alt: string; icon: string }> = (
  props
) => (
  <li class="mx-2">
    <a href={props.href} rel="noopener" target="_blank">
      <span class="sr-only">{props.alt}</span>
      <svg
        viewBox="0 0 24 24"
        class="h-8 transition hover:opacity-50 opacity-60"
      >
        <path fill="currentColor" d={props.icon} />
      </svg>
    </a>
  </li>
);

const Social: Component = () => {
  return (
    <For each={socials} children={(social) => <SocialIcon {...social} />} />
  );
};

export default Social;
