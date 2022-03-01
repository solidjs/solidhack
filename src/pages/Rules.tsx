import { Component } from "solid-js";

const Rules: Component = () => {
  return (
    <div class="w-full flex flex-col items-center py-10 gap-6 md:gap-8 lg:gap-12 min-h-screen bg-hack bg-no-repeat bg-top bg-contain">
      <div class="max-w-4xl p-16 rounded-xl leading-7 shadow-2xl">
        <h4 class="mt-5 mb-3 font-semibold text-xl text-solid-medium">
          Eligibility
        </h4>
        <ul class="list-disc ml-3">
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
            Projects must include SolidJS as a dependency and use it in a
            meaningful way.
          </li>
          <li>
            Submissions must be posted on Github and remain publicly accessible
            and readable until winners are announced.
          </li>
          <li>
            Submissions may be made by an individual or as teams of 2-3 members.
            All members must be clearly stated within the project's
            documentation or configuration.
          </li>
        </ul>
        <h4 class="mt-5 mb-3 font-semibold text-xl text-solid-medium">
          Submissions
        </h4>
        <ul class="list-disc ml-3">
          <li>
            All projects must have a working demo or video accessible via a URL.
            The URL must be provided with your submission.
          </li>
          <li>
            Submissions posted after the submission closing date (April 7th
            23:59 GMT-5) will not be accepted.
          </li>
          <li>
            Submissions must have been started on or after January 7th 2022. Old
            projects and projects that include previously posted code are not
            allowed. Projects ported from other ecosystems are allowed.
          </li>
          <li>
            Submissions must not change after the submission closing date (April
            7th). This includes but is not limited to bug fixes, demo updates,
            documentation changes etc. You may continue making changes locally
            or on a separate branch, however main/master must remain untouched
            until the voting period is over.
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
        <ul class="list-disc ml-3">
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
        <ul class="list-disc ml-3">
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
            Only students are eligible to submit to the Best Student Project
            Award. Proof of student enrollment for the duration of the
            competition will be required.
          </li>
          <li>
            Student internship will be awarded at 402's discretion, based on an
            interview. The internship will be for a duration of 3 months.
          </li>
          <li>
            Votes will be tallied from active Github accounts registered before
            the competition start date (January 7th 2022).
          </li>
          <li>
            Winners of the competition categories will be decided by a community
            vote.
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
          General Details
        </h4>
        <ul class="list-disc ml-3">
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
            Rules &amp; Regulations of this competition may change at the
            discretion of the SolidHack Planning Committee. Contestants will be
            notified via SolidHack Newsletter and published via a Rules &amp;
            Regulations changelog.
          </li>
          <li>Submissions may be withdrawn via email to hack@solidjs.com.</li>
          <li>
            The SolidHack Planning Committee commits to making a best effort to
            protect the privacy of contestants. All information will be
            collected and distributed for the exclusive purpose of operating the
            competition.
          </li>
        </ul>
      </div>
      <div class="bg-opacity-50 text-black max-w-3xl mx-auto mb-5 rounded-xl">
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
    </div>
  );
};

export default Rules;
