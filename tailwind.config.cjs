const { rule } = require("postcss");
const theme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["index.html", "src/**/*.tsx"],
  mode: "jit",
  darkMode: "class",
  theme: {
    extend: {
      transitionProperty: {
        composite: "transform, opacity",
      },
      zIndex: {
        negative: -1,
        1: 1,
      },
      gridTemplateColumns: {
        full: "100%",
      },
      gridTemplateRows: {
        full: "100%",
      },
      boxShadow: {
        "top-2xl": "0 -25px 50px -12px rgba(0, 0, 0, 0.25)",
      },
      transitionDuration: {
        0: "0ms",
        5000: "5000ms",
      },
      fontSize: {
        xxs: ".55rem",
      },
      screens: {
        "pointer-fine": {
          raw: "(pointer: fine)",
        },
      },
      colors: {
        primary: "#4483c1",
        star: "#f3ae07",
        solid: {
          default: "#2c4f7c",
          darkbg: "#222222",
          darkLighterBg: "#444444",
          darkdefault: "#b8d7ff", //'#87b1e6',
          darkgray: "#252525",
          gray: "#414042",
          mediumgray: "#9d9d9d",
          lightgray: "#f3f5f7",
          dark: "#07254A",
          medium: "#446b9e",
          light: "#4f88c6",
          accent: "#0cdc73",
          secondaccent: "#0dfc85",
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "#333",
            "--tw-prose-invert-body": "#fff",
            "--tw-prose-headings": theme("colors.solid.default"),
            "--tw-prose-invert-headings": theme("colors.solid.darkdefault"),
            "--tw-prose-invert-quote-borders": theme("colors.solid.mediumgray"),
            color: "var(--tw-prose-body)",
            fontFamily: "Gordita",
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
            h1: {
              fontWeight: "600",
              fontSize: "1.75rem",
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: "1rem",
              marginTop: "2rem",
              color: "var(--tw-prose-headings)",
            },
            h2: {
              fontWeight: "600",
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: "1rem",
              marginTop: "2rem",
              color: "var(--tw-prose-headings)",
            },
            a: {
              color: "#999",
              textDecoration: "none",
              "&:hover": {
                color: "#2c4f7c",
              },
            },
          },
        },
      }),
      backgroundImage: (theme) => ({
        "gradient-transparent-40%-white-40%":
          "linear-gradient(to bottom,rgba(255,255,255,0) 40%, rgba(255, 255, 255, 1) 40%)",
        "gradient-white/0.95-15%-to-transparent":
          "linear-gradient(180deg,rgba(255,255,255,0.95) 15%,rgba(255,255,255,0))",
        // when passing class to addVariant plugin, "%" or "." characters will break it
        "gradient-white-40_percent-to-white-50_percent":
          "linear-gradient(to bottom,rgba(255,255,255,0) 40%,rgba(255,255,255, 0.5) 50%)",
        hero: "url('/src/assets/shapes/header.svg')",
        "blocks-one": "url('/src/assets/shapes/blocks1.svg')",
        "blocks-one-dark": "url('/src/assets/shapes/blocks1-dark.svg')",
        "blocks-two": "url('/src/assets/shapes/blocks2.svg')",
        hack: "url('/img/hack/banner.png')",
        "blocks-three": "url('/src/assets/shapes/blocks3.svg')",
        doc: "linear-gradient(to left, #fff, #fff 50%, rgba(243, 244, 246) 10%)",
        darkDoc: "linear-gradient(to left, #222222, #222222 50%, #444444 10%)",
      }),
      container: {
        center: true,
      },
      borderRadius: {
        "6xl": "3.5rem",
      },
      fontFamily: {
        display: ["Gordita", ...theme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["group-hover"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-dir"),
    plugin(
      function ({ matchUtilities, theme }) {
        matchUtilities(
          {
            "mask-image": (value) => ({
              webkitMaskImage: value,
              maskImage: value,
            }),
          },
          { values: theme("maskImage") }
        );
      },
      {
        theme: {
          maskImage: {
            none: "none",
          },
        },
      }
    ),
    plugin(
      function ({ matchUtilities, theme }) {
        matchUtilities(
          {
            "bg-image": (value) => ({
              backgroundImage: value,
            }),
          },
          { values: theme("bgImage") }
        );
      },
      {
        theme: {
          bgImage: {
            none: "none",
          },
        },
      }
    ),
    plugin(function ({ addVariant, e, postcss }) {
      addVariant("has-backdrop-filter", ({ container, separator }) => {
        const isRule = postcss.atRule({
          name: "supports",
          params:
            "((-webkit-backdrop-filter: none) or (backdrop-filter: none))",
        });
        isRule.append(container.nodes);
        container.append(isRule);
        isRule.walkRules((rule) => {
          rule.selector = `.${e(
            `has-backdrop-filter${separator}${rule.selector.slice(1)}`
          ).replace(/\\\\/g, "")}`;
        });
      });
    }),
  ],
};
