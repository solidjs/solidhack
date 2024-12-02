import { createAsync, useAction } from "@solidjs/router";
import { useAuth } from "@solid-mediakit/auth/client";
import { Component, For, Show } from "solid-js";
import { Icon } from "solid-heroicons";
import { link, star as starOutline } from "solid-heroicons/outline";
import { star } from "solid-heroicons/solid";
import { Box } from "~/components/Box";
import { Hero } from "~/components/Hero";
import {
  getSubmissions,
  getVotes,
  Submission,
  toggleVote,
} from "./submissions.data";
import { Button } from "~/components/ui/button";

const SubmissionRow: Component<Submission> = (props) => {
  // const auth = useAuth();
  // const sendVote = useAction(toggleVote);
  return (
    <div class="flex items-center space-x-4 p-7 bg-neutral-50 rounded-lg">
      <div class="w-full">
        <a
          target="_blank"
          class="flex space-x-1 text-primary text-2xl font-medium hover:text-primary/70"
          href={props.demo_url}
        >
          <div>{props.project_name}</div> <Icon class="w-4" path={link} />
        </a>
        <div class="text-sm">Submitted by {props.name}</div>
      </div>
      <a
        target="_blank"
        class="flex items-center hover:opacity-80 transition duration-200"
        href={props.github_url}
      >
        <img class="w-11" src="/github.svg" />
      </a>
      {/* <Show when={auth.status() === "authenticated" && auth.session()}>
        <button
          onClick={() => sendVote(props.guid)}
          class="hover:opacity-60 transition duration-200"
          title="Click to vote"
        >
          <Icon
            class="w-12 text-primary"
            stroke-width={1}
            path={props.selected ? star : starOutline}
          />
        </button>
      </Show> */}
    </div>
  );
};

export default function Submissions() {
  const auth = useAuth();
  const submissions = createAsync(() => getSubmissions());
  const votes = createAsync(() => getVotes());
  return (
    <>
      <Hero small={true} />
      <div class="max-w-4xl text-lg leading-7 mx-auto text-gray-500 mb-20">
        <Box>
          <p>
            The following are submissions for the SolidHack 2024 Award
            Categories. You may vote for as many entries as you like. Cast your
            vote for projects that you believe merit recognition based on their
            quality and utility.
          </p>
          <Show when={auth.status() !== "authenticated" && !auth.session()}>
            <p class="pt-5 text-center">
              <Button
                onClick={() => auth.signIn("github")}
                class="h-auto rounded-lg font-semibold text-gray-500 px-7 bg-neutral-100 hover:bg-neutral-200"
              >
                <img class="w-8" src="/github.svg" />
                <div class="px-3">Sign in with GitHub to vote</div>
              </Button>
            </p>
          </Show>
          <Show when={submissions() && votes()}>
            <h2 class="mt-5 text-primary text-2xl font-semibold border-b border-neutral-200 mb-5 py-3">
              Best SolidStart App
            </h2>
            <div class="space-y-2">
              <For each={submissions()!.app}>
                {(submission) => (
                  <SubmissionRow
                    selected={votes().includes(submission.guid)}
                    {...submission}
                  />
                )}
              </For>
            </div>
            <h2 class="mt-5 text-primary text-2xl font-semibold border-b border-neutral-200 mb-5 py-3">
              Best Solid/SolidStart Ecosystem Utility
            </h2>
            <div class="space-y-2">
              <For each={submissions()!.ecosystem}>
                {(submission) => (
                  <SubmissionRow
                    selected={votes().includes(submission.guid)}
                    {...submission}
                  />
                )}
              </For>
            </div>
          </Show>
        </Box>
      </div>
    </>
  );
}
