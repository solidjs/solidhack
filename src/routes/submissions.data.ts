import { action, query, json } from "@solidjs/router";
import { authOpts } from "~/auth";
import { getSession } from "@solid-mediakit/auth";
import { db } from "~/utils/db";
import { getRequestEvent } from "solid-js/web";

export interface Submission {
  guid: string;
  github_url: string;
  email: string;
  name: string;
  selected: boolean;
  winner: boolean;
  category_id: "best-ecosystem" | "best-app";
  demo_url: string;
  project_name: string;
}

export const toggleVote = action(async (submission_id: string) => {
  "use server";
  const event = getRequestEvent()!;
  const session = await getSession(event.request, authOpts);
  if (!session!.user.id!) {
    throw new Error("you're not logged in");
  }
  // Check if the submission exists or not
  const submission = await db.execute({
    sql: `SELECT id FROM submissions WHERE guid = ?`,
    args: [submission_id],
  });
  if (submission.rows.length === 0) {
    throw new Error("no such submission");
  }
  // Check if the vote exists
  const vote = await db.execute({
    sql: `SELECT id FROM votes WHERE user_id = ? AND submission_id = ?`,
    args: [session!.user.id!, submission_id],
  });
  // Insert ot delete depending on if it exists in the database
  let sql: string;
  if (vote.rows.length === 0) {
    sql = `INSERT INTO votes (user_id, submission_id) VALUES (?, ?)`;
  } else {
    sql = `DELETE FROM votes WHERE user_id = ? AND submission_id = ?`;
  }
  await db.execute({
    sql,
    args: [session!.user.id!, submission_id],
  });
  return json({}, { revalidate: ["user-votes"] });
});

export const getVotes = query(async () => {
  "use server";
  const event = getRequestEvent()!;
  const session = await getSession(event.request, authOpts);
  if (!session) {
    return [];
  }
  const request = await db.execute({
    sql: `SELECT submission_id FROM votes WHERE user_id = ?`,
    args: [session!.user.id!],
  });
  return request.rows.map((row) => row.submission_id);
}, "user-votes");

export const getSubmissions = query(async () => {
  "use server";
  const request = await db.execute({
    sql: `SELECT
        guid, github_url, email, name, category_id,
        demo_url, project_name, winner
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
