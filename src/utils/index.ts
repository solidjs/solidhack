export const reflow = () => document.body.clientWidth;

export const preventSmoothScrollOnTabbing = () => {
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    document.documentElement.style.scrollBehavior = "";
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = "smooth";
    });
  });
};

export const CATEGORIES = {
  "best-app": "Best SolidStart App",
  "best-ecosystem": "Best Solid/SolidStart Ecosystem Utility",
};

export const CHALLENGES = {
  "ui-library": "Contribute to a UI library",
  "animation-lib": "Create an animation library for Solid",
  // "local-first-lib": "SolidStart Local-first Library/SDK",
  // "data-api-guide": "Write a SolidStart Data API Guide",
};
