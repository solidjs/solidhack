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

export const CHALLENGES = {
  "solidstart-tutorial": "Write a SolidStart tutorial",
  "ui-library": "Contribute to a UI library",
  "solid-primitive": "Contribute a new Solid Primitive",
  "animation-lib": "Create an animation library for Solid",
};
