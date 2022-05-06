import { useParams } from "solid-app-router";
import list from "./submsissions";

type Submission = {
  title: string;
  url: string;
  github: string;
  info?: string;
  license: string;
  winner?: boolean;
  description: string;
  contributors: Array<{
    name: string;
    email: string;
    url?: string;
  }>;
};

const submissions: { [key: string]: Submission[] } = list;

export default function SubmissionData() {
  const params = useParams();
  return {
    get submissions() {
      return (
        submissions[params.category]
          ? submissions[params.category]
          : submissions["best_ecosystem"]
      ).sort(function (a, b) {
        const nameA = a.title.toUpperCase(); // ignore upper and lowercase
        const nameB = b.title.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    },
    get category() {
      return params.category;
    },
  };
}
