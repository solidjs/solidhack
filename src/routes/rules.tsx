import { Icon } from "solid-heroicons";
import { chevronLeft } from "solid-heroicons/solid";
import { Component } from "solid-js";
import { Box } from "~/components/Box";

const Rules: Component = () => {
  return (
    <div class="max-w-4xl text-lg leading-7 mx-auto text-gray-500">
      <div class="py-3 pt-10">
        <div class="text-5xl md:text-[3rem] -leading-1 text-hackblue border-l-8 md:py-4 md:my-6 pl-7 border-hackblue">
          <div class="font-bold">
            Solid<span class="text-gray-500">Hack</span>
            <span class="text-gray-400 font-medium">2024</span>
          </div>
          <div class="text-2xl font-medium">
            Competition Rules & Regulations
          </div>
        </div>
        <div class="flex justify-end">
          <a href="/" class="flex space-x-5">
            <Icon path={chevronLeft} class="w-4" /> Back home
          </a>
        </div>
      </div>
      <Box class="mx-auto">
        <h4 class="mt-5 mb-3 font-semibold text-xl text-solid-medium">
          Eligibility
        </h4>
        <ul class="list-disc ml-8">
          <li>
            Contestants of legal age
            <a href="#fn1" id="fn1-anchor">
              <sup>1</sup>
            </a>{" "}
            and all skill levels are welcomed to contribute. SolidJS Core Team
            and SolidHack Planning Committee members are excluded from
            participation.
          </li>
          <li>
            Projects must include SolidJS or SolidStart as a dependency and use
            them in a meaningful way.
          </li>
          <li>
            Submissions must be posted on Github and remain publicly accessible
            and readable until winners are announced.
          </li>
          <li>
            Submissions may be made by an individual or as teams of 2-3 members.
            All members must be clearly stated within the project's
            documentation or configuration (package.json or README.md).
          </li>
        </ul>
        <h4 class="mt-5 mb-3 font-semibold text-xl text-solid-medium">
          Submissions
        </h4>
        <ul class="list-disc ml-8">
          <li>
            All projects must have a working demo or video accessible via a URL.
            The URL must be provided with your submission.
          </li>
          <li>
            Submissions posted after the submission closing date will not be
            accepted.
          </li>
          <li>
            Submissions must have been started on or after October 1, 2024. Old
            projects and projects that include previously posted code are not
            allowed. Projects ported from other ecosystems are allowed.
          </li>
          <li>
            Contestants may utilize libraries developed by themselves or members
            of their team. The use of a library will be scrutinized to ensure it
            isn't simply a repackaging and hence providing the contestant an
            unfair advantage. The library must be significantly different from
            the submission to warrant it being used fairly. This is at the
            descretion of the Planning Committee.
          </li>
          <li>
            Submissions must not change after the submission closing date. This
            includes but is not limited to bug fixes, demo updates,
            documentation changes etc. You may continue making changes locally
            or on a separate branch, however main/master must remain untouched
            until the voting period is over. Updating any production deployments
            after the date also constitutes a disqualification.
          </li>
          <li>
            Submissions will be vetted by SolidHack Planning Committee members.
            3 members or more may vote to disqualify a submission due to the
            submission breaking the Rules &amp; Regulations.
          </li>
          <li>
            Submissions must have their licensing terms clearly stated in their
            repositories. Only open-source licenses
            <a href="#fn2" id="fn2-anchor">
              <sup>2</sup>
            </a>{" "}
            will be allowed.
          </li>
          <li>
            Submissions will be treated as open-source/publicly contributed
            Intellectual Property bound by the selected open-source license
            model provided by the participant(s).
          </li>
          <li>
            All source code for a submission must be visible and accessible.
            Closed-source dependencies are not permitted. Any dependencies or
            APIs used must be open-source or publicly accessible for free.
          </li>
        </ul>
        <h4 class="mt-5 mb-3 font-semibold text-xl text-solid-medium">
          Disqualification
        </h4>
        <ul class="list-disc ml-8">
          <li>
            Contestants agree to act fairly and responsibly during the contest.
            The SolidHack Planning Committee may vote to disqualify a submission
            or contestant. One written warning will be supplied.
          </li>
          <li>
            Contestants and competition participants will treat each other with
            respect. This includes public discussions, Twitter and other social
            media, private and personal communication mediums.
          </li>
          <li>
            Contestants who fail to meet the submission requirements will be
            notified of issues. This will be done via a Pull Request or Github
            Issue to a project and require corrections by the end of the next
            work day.
          </li>
        </ul>
        <h4 class="mt-5 mb-3 font-semibold text-xl text-solid-medium">
          Voting & Winners
        </h4>
        <ul class="list-disc ml-8">
          <li>
            Voting with fake accounts
            <a href="#fn3" id="fn3-anchor">
              <sup>3</sup>
            </a>{" "}
            or more than one account per user is strictly forbidden. All voters
            Github accounts will be made public on the SolidHack submissions
            page.
          </li>
          <li>Submissions may only be submitted to one category.</li>
          <li>Winners may only win one category.</li>
          <li>
            Votes will be tallied from active Github accounts registered before
            the competition start date.
          </li>
          <li>
            Winners of the competition categories will be decided by a community
            vote. Upon ties in votes the Planning Committe and SolidJS Core team
            will decide the winner.
          </li>
          <li>
            Prize money will be collected from sponsors and distributed via
            OpenCollective.
          </li>
          <li>
            Prize money will only be awarded to contestants who reside in a
            country to which fund transfers are allowed (any country that PayPal
            and OpenCollective support).
          </li>
          <li>
            Prize money will be distributed to submission author(s)
            individually.
          </li>
          <li>
            Winners may choose to donate funds to a charitable cause approved by
            the SolidHack Planning Committee.
          </li>
        </ul>
        <h4 class="mt-5 mb-3 font-semibold text-xl text-solid-medium">
          Challenge Rules
        </h4>
        <ul class="list-disc ml-8">
          <li>
            Contestants may participate in multiple challenges as often as
            they'd like.
          </li>
          <li>
            A challenge cannot be used to directly win an Award Category.
            However, it can be used within an Award Category.
          </li>
          <li>
            Challenge submissions will be reviewed once a week (every Monday) as
            they come in and selected by the Planning Committee. The selected
            winner will have met the winning criteria.
          </li>
          <li>
            If no winner meets the challenge criteria, feedback will be provided
            and contestants can choose to resubmit their submissions for the
            following week.
          </li>
          <li>
            The Planning Committe has the final say and payouts are made at
            their sole discretion.
          </li>
        </ul>
        <h4 class="mt-5 mb-3 font-semibold text-xl text-solid-medium">
          General Details
        </h4>
        <ul class="list-disc ml-8">
          <li>
            SolidHack is run by an organizing committee made up of SolidJS
            community members on behalf of corporate and individual sponsors.
            Similar to software licensing, the Planning Committee is providing
            this service as a best-effort. Individuals involved commit to acting
            fairly and responsibly to ensure Rules &amp; Regulations are enacted
            appropriately.
          </li>
          <li>
            Participants of the competition and third-parties cannot hold the
            SolidJS Core Team, SolidHack Planning Committee or sponsors liable
            in any manner. Participating in SolidHack is at your discretion.
          </li>
          <li>
            SolidHack competition is not owned or operated by it's corporate
            sponsors (Netlify and Sentry). Contests hold harmless all corporates
            sponsors and organizers.
          </li>
          <li>
            The Planning Commitee reserves the right to adapt or change the
            rules as they see fit. Rules will be clearly displayed at
            hack.solidjs.com/rules.
          </li>
          <li>
            Rules &amp; Regulations of this competition may change at the
            discretion of the SolidHack Planning Committee. Contestants will be
            notified via Discord Channel and website of changes to Rules &amp;
            Regulations.
          </li>
          <li>Submissions may be withdrawn via email to hack@solidjs.com.</li>
          <li>
            The SolidHack Planning Committee commits to making a best effort to
            protect the privacy of contestants. All information will be
            collected and distributed for the exclusive purpose of operating the
            competition.
          </li>
        </ul>
      </Box>
      <div class="bg-opacity-50 text-black max-w-3xl mx-auto mb-5 rounded-xl p-10">
        <small>
          <ol class="list-style-none">
            <li>
              1. Underage participants require written permission from a parent
              or legal guardian{" "}
              <a id="fn1" class="font-semibold" href="#fn1-anchor">
                (back)
              </a>
            </li>
            <li>
              2. According to{" "}
              <a href="https://opensource.org/licenses">
                https://opensource.org/licenses
              </a>{" "}
              <a id="fn2" class="font-semibold" href="#fn2-anchor">
                (back)
              </a>
            </li>
            <li>
              3. Fake account includes: previously inactive, newly created for
              the purpose of manipulating votes, or any use of voting automation
              or botting.{" "}
              <a id="fn3" class="font-semibold" href="#fn3-anchor">
                (back)
              </a>
            </li>
          </ol>
        </small>
      </div>
      <div class="text-center text-sm pb-10">
        Rules changed last changed September 4, 2024 @ 5:00pm EST
      </div>
    </div>
  );
};

export default Rules;
