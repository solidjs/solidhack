import { cache, createAsync } from "@solidjs/router";
import { db } from "~/utils/db";
import { Box } from "~/components/Box";
import { Hero } from "~/components/Hero";
import { Component, For, Show, Suspense } from "solid-js";

interface Submission {
  guid: string;
  github_url: string;
  email: string;
  name: string;
  category_id: "best-ecosystem" | "best-app";
  demo_url: string;
}

const getSubmissions = cache(async () => {
  const request = await db.execute({
    sql: `SELECT
        guid, github_url, email, name, category_id, demo_url
      FROM
        submissions
      WHERE
        status = 'active' AND
        category_id IN ('best-app', 'best-ecosystem')
      ORDER BY
        name ASC`,
    args: [],
  });
  return (request.rows as unknown as Submission[]).reduce(
    (memo, row) => {
      if (row.category_id === "best-ecosystem") {
        memo.ecosystem.push(row);
      } else {
        memo.app.push(row);
      }
      return memo;
    },
    {
      app: [],
      ecosystem: [],
    } as { [key: string]: Submission[] },
  );
}, "submissions");

const SubmissionRow: Component<Submission> = (props) => {
  return <div class="py-2">{props.github_url}</div>;
};

export default function Submissions() {
  const submissions = createAsync(() => getSubmissions());
  return (
    <>
      <Hero small={true} />
      <div class="max-w-4xl text-lg leading-7 mx-auto text-gray-500 mb-20">
        <Box>
          <p>
            This year's competition is designed to rally our community around
            SolidStart, our new meta-framework released earlier in the year.
            There's a spin on the competition. With two Categories, we're also
            launching a new set of mini-bounties that we call Challenges.
          </p>
          <Show when={submissions()}>
            <h2 class="text-primary text-xl font-semibold border-b border-neutral-200 mb-5 py-3">
              Best App
            </h2>
            <For each={submissions()!.app}>
              {(submission) => <SubmissionRow {...submission} />}
            </For>
            <h2 class="text-primary text-xl font-semibold border-b border-neutral-200 mb-5 py-3">
              Best Ecosystem
            </h2>
            <For each={submissions()!.ecosystem}>
              {(submission) => <SubmissionRow {...submission} />}
            </For>
          </Show>
        </Box>
      </div>
    </>
  );
}
