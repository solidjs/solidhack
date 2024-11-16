import { action, query, createAsync, json, useAction } from "@solidjs/router";
import { useAuth, getSession } from "@solid-mediakit/auth/client";
import { Component, For, Show } from "solid-js";
import { Icon } from "solid-heroicons";
import { link } from "solid-heroicons/outline";
import { star as starOutline } from "solid-heroicons/outline";
import { db } from "~/utils/db";
import { Box } from "~/components/Box";
import { Hero } from "~/components/Hero";

interface Submission {
  guid: string;
  github_url: string;
  email: string;
  name: string;
  category_id: "best-ecosystem" | "best-app";
  demo_url: string;
  project_name: string;
}

const toggleVote = action(async (submission_id: string, enable: boolean) => {
  "use server";
  const session = await getSession();
  console.log(session);
  if (!session.user.id!) {
    throw new Error("you're not logged in");
  }
  let sql: string;
  if (enable) {
    sql = `INSERT INTO votes (user_id, submission_id) VALUES ($1, $2)`;
  } else {
    sql = `DELETE votes WHERE user_id = $1 AND submission_id = $2`;
  }
  await db.execute({
    sql,
    args: [session!.user.id!, submission_id],
  });
  return json({}, { revalidate: ["user-votes"] });
});

const getVotes = query(async () => {
  "use server";
  const auth = useAuth();
  if (!auth.session()!.user.id!) {
    return [];
  }
  const request = await db.execute({
    sql: `SELECT submission_id FROM votes WHERE user_id = ?`,
    args: [auth.session()!.user.id!],
  });
  return request.rows.map((row) => row.submission_id);
}, "user-votes");

const SubmissionRow: Component<Submission> = (props) => {
  const auth = useAuth();
  const sendVote = useAction(toggleVote);
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
        class="flex items-center hover:opacity-80 transition duration-200"
        href={props.github_url}
      >
        <img class="w-11" src="/github.svg" />
      </a>
      <Show when={auth.status() === "authenticated" && auth.session()}>
        <button
          onClick={() => sendVote(props.guid, true)}
          class="hover:opacity-60 transition duration-200"
          title="Click to vote"
        >
          <Icon class="w-12 text-primary" stroke-width={1} path={starOutline} />
        </button>
      </Show>
    </div>
  );
};

export default function Submissions() {
  const getSubmissions = query(async () => {
    "use server";
    const request = await db.execute({
      sql: `SELECT
          guid, github_url, email, name, category_id,
          demo_url, project_name
        FROM
          submissions
        WHERE
          status = 'active' AND
          category_id IN ('best-app', 'best-ecosystem')
        ORDER BY
          project_name ASC`,
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
  const submissions = createAsync(() => getSubmissions());
  const votes = createAsync(() => getVotes());
  return (
    <>
      <Hero small={true} />
      <div class="max-w-4xl text-lg leading-7 mx-auto text-gray-500 mb-20">
        <Box>
          <p>
            The following are submissions for the SolidHack 2024 Award
            Categories. You may vote for as many entries as you'd like. Please
            strive to vote for projects that merit recognition.
          </p>
          <Show when={submissions()}>
            <h2 class="mt-5 text-primary text-xl font-semibold border-b border-neutral-200 mb-5 py-3">
              Best SolidStart App
            </h2>
            <div class="space-y-2">
              <For each={submissions()!.app}>
                {(submission) => <SubmissionRow {...submission} />}
              </For>
            </div>
            <h2 class="mt-5 text-primary text-xl font-semibold border-b border-neutral-200 mb-5 py-3">
              Best Solid/SolidStart Ecosystem Utility
            </h2>
            <div class="space-y-2">
              <For each={submissions()!.ecosystem}>
                {(submission) => <SubmissionRow {...submission} />}
              </For>
            </div>
          </Show>
        </Box>
      </div>
    </>
  );
}
