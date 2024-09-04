import { Box } from "~/components/Box";
import { TimelineItem } from "~/components/TimelineItem";
import { Countdown } from "~/components/Countdown";

export default function Home() {
  return (
    <>
      <div class="flex flex-col min-[895px]:flex-row min-[895px]:mx-auto max-w-6xl w-full font-bold items-center my-10 min-[895px]:my-0 min-[895px]:h-[50vh] justify-between p-4">
        <h1 class="text-[min(11vw,48px)] md:text-[5rem] leading-[1.2em] md:leading-[0.7em] text-hackblue border-l-8 md:py-7 pl-7 border-hackblue">
          <div>
            Solid<span class="text-gray-500">Hack</span>
            <span class="text-gray-400 font-medium">2024</span>
          </div>
        </h1>
        <img
          class="w-20 md:w-40"
          src="/img/logo-mark.svg"
          alt="SolidHack logo"
        />
      </div>
      <Countdown
        class="mx-auto shadow-xl"
        start={1727755200000}
        end={1731560400000}
      />
      <div class="flex flex-col text-center w-full py-14">
        <span class="font-semibold text-gray-600">Sponsored by:</span>
        <div class="flex justify-center w-full items-center space-x-4 py-3">
          <a href="https://sentry.io/" target="_blank" rel="noopener">
            <img
              class="max-w-40"
              src="/img/supporters/sentry.svg"
              alt="Sentry logo"
            />
          </a>
          <a href="https://www.netlify.com/" target="_blank" rel="noopener">
            <img
              class="max-w-40"
              src="/img/supporters/netlify.svg"
              alt="Netlify logo"
            />
          </a>
        </div>
      </div>
      <div class="max-w-4xl text-lg leading-7 mx-auto text-gray-500">
        <Box title="What">
          <strong class="text-hackblue">SolidHack</strong> is a public hackathon
          presented by the Solid Team and our amazing corporate sponsors. This
          years prize pool is US$15,000 thanks to two of our generous sponsors!
          The competition is free to enter. You have 6 weeks to build your
          project and stage it for our community to review. Winners will be
          selected by public vote. Join the{" "}
          <a
            target="_blank"
            href="https://discord.gg/solidjs"
            class="underline"
          >
            Solid Discord
          </a>{" "}
          #solidhack-2024 channel to ask questions and learn more.
        </Box>
        <Box title="When">
          <div class="space-y-3 text-center md:text-left">
            <TimelineItem
              status="next"
              date="October 1"
              description="Categories and rules are announced (contest begins)"
            />
            <TimelineItem
              status="pending"
              date="October 31st"
              description="Submissions portal opens"
            />
            <TimelineItem
              status="pending"
              date="November 14"
              description="Submissions close and voting begins in 24h"
            />
            <TimelineItem
              status="pending"
              date="December 1"
              description="Voting ends"
            />
            <TimelineItem
              status="pending"
              date="December 3"
              description="Winners announced"
            />
            <small class="text-center mt-4 block">
              Exact closing time for above listed dates is 23:59 (GMT-5).
            </small>
          </div>
        </Box>
        <Box title="Who">
          The hackathon is open to anyone including experienced Solid users and
          newcomers alike. You'll use your GitHub account to verify your
          identity when you submit your project and when you cast your vote. The
          competition is supported by corporate sponsors of Solid and the
          open-source ecosystem.
          <small class="mt-3 block">
            To participate as a sponsor, contact{" "}
            <a href="mailto:community@solidjs.com" class="text-hackblue">
              community@solidjs.com
            </a>
            .
          </small>
        </Box>
        <Box title="Why">
          <p class="mb-3">
            Solid has made its mark on the JavaScript ecosystem. It's a
            flourishing community and we want you to be a part of it. Hackathons
            aren't new to the open-source world, but we're looking to push the
            boundaries of what a hackathon can be and what open-source projects
            can do. More importantly, we want to give you an opportunity to give
            Solid a try. What better reason than to learn something new and
            possibly win prize money!
          </p>
        </Box>
        <div class="bg-opacity-50 text-black max-w-3xl mx-auto mt-2 p-10 rounded-xl">
          <small>
            SolidHack is operated by volunteers and funded by corporate
            sponsors. The SolidHack Planning Committee is responsible for
            coordinating Rules and Regulations. Questions and concerns relating
            to the competition may be directed to{" "}
            <a href="mailto:hack@solidjs.com" class="text-hackblue">
              hack@solidjs.com
            </a>
            . The Planning Committee maintains the right to enforce, adapt or
            cancel terms of the competition in the spirit of fairness.
          </small>
        </div>
        <div class="text-center text-sm p-10">
          Last updated September 3rd @ 5:00pm EST
        </div>
      </div>
    </>
  );
}
