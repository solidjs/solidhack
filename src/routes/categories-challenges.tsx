import { For, type JSXElement } from "solid-js";
import { A } from "@solidjs/router";
import { Box } from "~/components/Box";
import { Hero } from "~/components/Hero";
import { Challenge } from "~/components/Challenge";

import appAward from "../../public/img/award-best-app.svg";
import ecosystemAward from "../../public/img/award-ecosystem.svg";
import { Button } from "~/components/ui/button";

export default function Home() {
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
          <h3 class="font-semibold my-4 text-2xl py-2 border-b border-b-neutral-100">
            Award Categories
          </h3>
          <div class="bg-neutral-100 my-5 rounded-xl divide-y-2 divide-white">
            <div class="md:flex md:space-x-10 p-10">
              <div class="mb-5 md:mb-0 mx-auto bg-primary shadow-xl min-w-32 h-32 p-2 aspect-square rounded-full">
                <img src={appAward} alt="Best App Award" />
              </div>
              <div>
                <div class="font-semibold text-2xl">Best SolidStart App</div>
                <p>
                  Build an app in SolidStart and stage it for the Solid
                  community. The app could be useful, interesting or fun.
                  Submissions of this category will be judged based on their
                  technical merit, uniqueness and how well they maximize
                  SolidStart's features.
                </p>
                <div class="mt-2">
                  <strong>Prize:</strong> US$5000
                </div>
                <div class="text-right">
                  <Button as={A} href={`/submit?id=best-app`} class="mt-5">
                    Send submission
                  </Button>
                </div>
              </div>
            </div>
            <div class="md:flex md:space-x-10 p-10">
              <div class="mb-5 md:mb-0 mx-auto bg-primary shadow-xl min-w-32 h-32 p-2 aspect-square rounded-full">
                <img src={ecosystemAward} alt="Best Ecosystem Award" />
              </div>
              <div>
                <div class="font-semibold text-2xl">
                  Best Solid/SolidStart Ecosystem Utility
                </div>
                <p>
                  Create a library or tool that supports the overall ecosystem.
                  Submissions in this category will be judged based on how well
                  they solve a need in the Solid or SolidStart ecosystems, their
                  uniqueness, and the technical soundness of their solution.
                </p>
                <div class="mt-2">
                  <strong>Prize:</strong> US$7000
                </div>
                <div class="text-right">
                  <Button
                    as={A}
                    href={`/submit?id=best-ecosystem`}
                    class="mt-5"
                  >
                    Send submission
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Box>
        <Box>
          <h3
            id="challenges"
            class="font-semibold text-2xl mb-4 border-b border-b-neutral-100"
          >
            Challenges
          </h3>
          <p>
            A Challenge is a first-come-first-served bounty. The first
            contributor or team to adequately solve a challenge will instantly
            win the prize. The same <A href="/rules">Rules & Regulations</A>{" "}
            apply for Challenges as they do for Award Categories. Submissions
            will be checked once every Monday and marked as claimed when a
            submission successfully achieves the challenge. All contestants will
            be notified of the results via email. Challenges are vetted by Solid
            Core and Planning Committee Members.
          </p>
          <br></br>
          <p>
            You may send your finished submissions via the{" "}
            <A
              target="_blank"
              class="text-primary"
              href="https://forms.gle/vgMPAcjxJUTxz9Aa9"
            >
              Challenge Submission Form
            </A>
            .
          </p>
          <For
            each={Object.entries(CHALLENGE_DETAILS).sort(([, a], [, b]) => {
              if (a.claimed && !b.claimed) return 1;
              if (!a.claimed && b.claimed) return -1;
              return a.title.localeCompare(b.title);
            })}
          >
            {([id, challenge]) => (
              <Challenge
                id={id}
                image={ecosystemAward}
                amount={challenge.amount}
                claimed={challenge.claimed}
                title={challenge.title}
                winners={challenge.winners}
              >
                {challenge.description}
              </Challenge>
            )}
          </For>
        </Box>
      </div>
    </>
  );
}

interface ChallengeDetails {
  amount: number;
  claimed: boolean;
  title: string;
  description: JSXElement;
  winners?: Array<{
    name: string;
    authors: string[];
    url?: string;
  }>;
}

const CHALLENGE_DETAILS: { [key: string]: ChallengeDetails } = {
  "solidstart-tutorial": {
    amount: 500,
    claimed: true,
    title: "Write a SolidStart tutorial",
    winners: [
      {
        name: "Protected Routes With Clerk and SolidStart",
        authors: ["Brenley Dueck"],
        url: "https://www.brenelz.com/posts/protected-routes-with-clerk-solidstart/",
      },
    ],
    description: (
      <>
        <p>
          Write a new guide that describes how to solve a problem in SolidStart
          according to best practices. The guide can cover any topic, such as
          authentication, styling, implementation, WebSockets, or how to use
          data APIs.
        </p>
        <div class="my-5 font-semibold">Winning Criteria:</div>
        <ul>
          <li>
            Uniqueness: the guide is new and the topic is not covered by Solid
            Docs or ecosystem contributors.
          </li>
          <li>
            Technical Accuracy: does the guide cover the topic well and are
            examples clearly explained and well written.
          </li>
          <li>
            Writing Quality: is the guide well written and does it use proper
            English? Is it clear and concise.
          </li>
          <li>
            Edge-Cases and UX goodies: it goes the extra mile in providing a
            consistent and ergonomic User Experience.
          </li>
        </ul>
      </>
    ),
  },
  "ui-library": {
    amount: 1000,
    claimed: false,
    title: "Contribute to a UI library (continued)",
    winners: [
      {
        name: "Contributed Meter, CheckboxGroup and Badge",
        authors: ["Shubhdeep Chhabra"],
      },
      {
        name: "Contributed ColorArea, ColorSlider, ColorChannelField",
        authors: ["H. Salim"],
      },
    ],
    description: (
      <>
        <p>
          Collect this challenge by creating a new component for a participating
          UI library from the Solid Ecosystem. Participating UI libraries:{" "}
          <a target="_blank" class="text-primary" href="https://kobalte.dev/">
            Kobalte
          </a>{" "}
          or{" "}
          <a target="_blank" class="text-primary" href="https://corvu.dev/">
            corvu
          </a>
          . Some ideas for components include: Meter, Rating, CheckboxGroup,
          Status Badge, Color Picker, Date Picker etc. This Challenge has been
          claimed but is renewed and still active for additional submissions.
        </p>
        <div class="my-5 font-semibold">Winning Criteria:</div>
        <ul>
          <li>
            Uniqueness: the component contributed does not exist in the
            ecosystem yet.
          </li>
          <li>
            Usage of the Web Platform: how it leverages the Web to create
            interop with Solid.
          </li>
          <li>Accessibility: it is fully accessible.</li>
          <li>
            Edge-Cases and UX goodies: it goes the extra mile in providing a
            consistent and ergonomic User Experience.
          </li>
        </ul>
      </>
    ),
  },
  "solid-primitive": {
    amount: 750,
    claimed: true,
    title: "Contribute a new Solid Primitive",
    winners: [
      {
        name: "solid-events",
        authors: ["Dev Agrawal"],
        url: "https://github.com/devagrawal09/solid-events",
      },
    ],
    description: (
      <>
        <p>
          Create a new primitive and contribute it to the{" "}
          <a
            class="text-primary"
            target="_blank"
            href="https://github.com/solidjs-community/solid-primitives"
          >
            Solid Primitive
          </a>{" "}
          project. The primitive should be complex in nature and solve a
          difficult challenge that improves the DX of Solid developers.
        </p>
        <div class="my-5 font-semibold">Winning Criteria:</div>
        <ul>
          <li>
            Technical Innovation: it uses a newly available platform API,
            it&#39;s more efficient than existing alternatives.
          </li>
          <li>Accessibility: it is fully accessible.</li>
          <li>
            Edge-Cases and UX goodies: it goes the extra mile in providing a
            consistent and ergonomic User Experience.
          </li>
        </ul>
      </>
    ),
  },
  "animation-lib": {
    amount: 2000,
    claimed: false,
    title: "Create an animation library for Solid",
    description: (
      <>
        <p>
          Create an animation library that leverages the Solid ecosystem and
          supports ergonomic ways to define performant and whimsical
          component/element animations. Strive to create a high-quality
          developer experience (DX) and maximize performance.
        </p>
        <div class="my-5 font-semibold">Winning Criteria:</div>
        <ul>
          <li>
            Uniqueness: the component contributed does not exist in the
            ecosystem yet.
          </li>
          <li>
            Usage of the Web Platform: how it leverages the Web to create
            interop with Solid.
          </li>
          <li>
            DX & Performance: does it perform well and is it easy to write?
          </li>
          <li>Accessibility: is it fully accessible.</li>
          <li>
            Edge-Cases and UX goodies: it goes the extra mile in providing a
            consistent and ergonomic User Experience.
          </li>
        </ul>
      </>
    ),
  },
  "data-api-guide": {
    amount: 1000,
    claimed: true,
    title: "Write a SolidStart Data API Guide",
    winners: [
      {
        name: "Data Loading in SolidJS",
        authors: ["ORJDev"],
        url: "https://github.com/OrJDev/solidstart-data",
      },
    ],
    description: (
      <>
        <p>
          Contribute to Solid Docs by writing a guide that describes how to use
          SolidStart's data management API. This guide should include
          descriptions, best practices, examples and edge cases for the core
          primitives. Bonus if you can include information on optimistic UI and
          Single Flight Mutations.
        </p>
        <div class="my-5 font-semibold">Winning Criteria:</div>
        <ul>
          <li>
            Writing quality: follows the recommendations of{" "}
            <a
              target="_blank"
              class="text-primary"
              href="https://diataxis.fr/how-to-guides/"
            >
              Diataxis' How-To
            </a>
            . Must be in well-written, grammatically correct English. Also
            abides by{" "}
            <a
              target="_blank"
              class="text-primary"
              href="https://github.com/solidjs/solid-docs/blob/main/WRITING.md"
            >
              Solid Docs Writing Guide
            </a>
            .
          </li>
          <li>
            Technical accuracy: provides the relevant and correct information
            about createAsync, cache, action, useAction, useSubmission,
            useSubmissions. Should also include Suspense, ErrorBoundary and
            other API's as required. Note SolidStart is renaming cache to query
            soon.
          </li>
          <li>
            Uniqueness: the guide is new and has not been covered by SolidDocs
            or ecosystem contributors
          </li>
          <li>
            Edge-cases and UX goodies: provides a coherent and consistent user
            experience.
          </li>
        </ul>
      </>
    ),
  },
};
