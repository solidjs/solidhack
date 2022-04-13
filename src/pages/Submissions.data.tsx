import { useParams } from "solid-app-router";
import list from "./submsissions";

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

const submissions: { [key: string]: Submission[] } = list;

export default function SubmissionData() {
  const params = useParams();
  return {
    get submissions() {
      return (
        submissions[params.category]
          ? submissions[params.category]
          : submissions["best_ecosystem"]
      ).sort(() => Math.random() - 0.5);
    },
    get category() {
      return params.category;
    },
  };
}
