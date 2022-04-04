import { useParams } from "solid-app-router";

type Submission = {
  title: string;
  url: string;
  github: string;
  info?: string;
  license: string;
  description: string;
  contributors: Array<{
    name: string;
    email: string;
    url?: string;
  }>;
};

const submissions: { [key: string]: Submission[] } = {
  best_app: [
    {
      title: "studyur",
      github: "https://github.com/jherr/studyur",
      description: "SolidJS web application for learning resources.",
      url: "https://www.youtube.com/watch?v=P_5Yxktq9Rs",
      info: "A SolidJS based web application and chrome extension where users can keep curated lists of YouTube and Medium references in topics.",
      license: "MIT",
      contributors: [
        {
          name: "Jack Herrington",
          email: "jherr@pobox.com",
          url: "https://www.jackherrington.com",
        },
      ],
    },
  ],
  best_ecosystem: [
    {
      title: "solid-command-palette",
      url: "https://github.com/itaditya/solid-command-palette",
      github: "https://github.com/itaditya/solid-command-palette",
      description: "Add a command palette to your Solid.js App",
      info: "Boost your users productivity 10x by integrating our command palette.",
      license: "MIT",
      contributors: [
        {
          name: "Kai Huebner",
          email: "kai.huebner@gmail.com",
        },
      ],
    },
    {
      title: "solid-services",
      url: "https://github.com/Exelord/solid-services",
      github: "https://github.com/Exelord/solid-services",
      description:
        "Solid.js library adding a services layer for global shared state.",
      license: "MIT",
      contributors: [
        {
          name: "Maciej Kwaśniak",
          email: "contact@exelord.com",
          url: "https://exelord.com",
        },
      ],
    },
    {
      title: "solid-proxies",
      url: "https://github.com/Exelord/solid-proxies",
      github: "https://github.com/Exelord/solid-proxies",
      description:
        "Solid.js library adding signaling to built-in non-primitives",
      license: "MIT",
      contributors: [
        {
          name: "Maciej Kwaśniak",
          email: "contact@exelord.com",
          url: "https://exelord.com",
        },
      ],
    },
    {
      title: "studyur",
      github: "https://github.com/jherr/studyur",
      description: "SolidJS web application for learning resources.",
      url: "https://www.youtube.com/watch?v=P_5Yxktq9Rs",
      info: "A SolidJS based web application and chrome extension where users can keep curated lists of YouTube and Medium references in topics.",
      license: "MIT",
      contributors: [
        {
          name: "Jack Herrington",
          email: "jherr@pobox.com",
          url: "https://www.jackherrington.com",
        },
      ],
    },
  ],
  best_student_project: [
    {
      title: "studyur",
      github: "https://github.com/jherr/studyur",
      description: "SolidJS web application for learning resources.",
      url: "https://www.youtube.com/watch?v=P_5Yxktq9Rs",
      info: "A SolidJS based web application and chrome extension where users can keep curated lists of YouTube and Medium references in topics.",
      license: "MIT",
      contributors: [
        {
          name: "Jack Herrington",
          email: "jherr@pobox.com",
          url: "https://www.jackherrington.com",
        },
      ],
    },
  ],
};

export default function SubmissionData() {
  const params = useParams();
  return {
    get submissions() {
      return submissions[params.category]
        ? submissions[params.category]
        : submissions["best_ecosystem"];
    },
    get category() {
      return params.category;
    },
  };
}
