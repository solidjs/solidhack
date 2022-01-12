import { Component, For } from "solid-js";
import builder from "../assets/supporters/builder-colour.png";
import stytch from "../assets/supporters/stytch.png";
import FourOhTwo from "../assets/supporters/402.png";
import clearspend from "../assets/supporters/clearspend.svg";
import Newsletter from "../components/Newsletter";
import createCountdown from "@solid-primitives/countdown";

type BoxProps = {
  title: string;
};

const Box: Component<BoxProps> = (props) => (
  <div class="md:grid md:grid-cols-12 md:space-x-6 bg-white/50 text-gray-700 mx-auto mt-5 p-10 rounded-xl shadow-xl backdrop-blur-md">
    <h2 class="text-3xl col-span-2 font-semibold mb-5">{props.title}</h2>
    <div class="col-span-10">{props.children}</div>
  </div>
);

const Countdown: Component = () => {
  const startDate = new Date(1645205400000);
  const endDate = new Date(1645205400000);
  const countdownValues = createCountdown(
    new Date().getTime() < startDate.getTime() ? startDate : endDate
  );

  const CountdownBox = (props: { label: string; value: number }) => {
    const fixed =
      props.value >= 10 ? props.value.toString() : "0" + props.value.toString();

    return (
      <div class="flex flex-col items-center text-white text-[length:clamp(5px,4vw,18px)] px-[clamp(5px,4vw,16px)] py-4 md:py-5 md:px-7">
        <div class="font-mono text-[length:clamp(5px,6vw,48px)] leading-[1]">
          {fixed}
        </div>
        {props.label}
      </div>
    );
  };

  return (
    <div
      class="flex flex-row w-min gap-2 rounded-md"
      style="background-color: #335d92;"
    >
      <For each={Object.entries(countdownValues).slice(0, -1)}>
        {(entry) => (
          <CountdownBox label={entry[0]} value={entry[1]}></CountdownBox>
        )}
      </For>
    </div>
  );
};

const Hack: Component = () => {
  return (
    <div
      class="w-full flex flex-col items-center gap-6 md:gap-8 lg:gap-12 min-h-screen"
      style={
        {
          // background:
          //   'linear-gradient(-180deg, #BCC5CE 0%, #335d92 90%), radial-gradient(at bottom left, rgba(255,255,255,0.98) 0%, rgba(0,0,0,0.30) 80%)',
          // 'background-blend-mode': 'screen',
        }
      }
    >
      <div
        class="w-full bg-white items-center flex flex-col pb-8 bg-hack bg-no-repeat bg-top bg-contain px-10"
        style={{}}
      >
        <img class="mx-auto mt-20 w-36" src="/img/hack/icon.png" />
        <img
          class="w-6/6 md:w-5/6 mt-4 mb-0 g:w-4/6 xl:w-5/12 2xl:w-3/12 mx-auto"
          src="/img/hack/title.png"
        />
        <p class="text-2xl mb-8 mt-5">
          Start hacking! Early submissions open February 18, 2022
        </p>
        <Countdown></Countdown>
        <div class="mt-20 mb-5 text-solid-medium text-center md:">
          We're pleased to announce our competition categories:
        </div>
        <div class="max-w-3xl border divide-y rounded-xl">
          <div class="md:grid md:gap-8 md:grid-cols-12 p-10">
            <div class="col-span-3 text-3xl flex justify-center mb-5">
              <figure class="bg-solid-medium rounded-full w-32 h-32 flex p-2">
                <img alt="Award" src="/img/award-best-app.svg" />
              </figure>
            </div>
            <div class="col-span-9 text-md">
              <h2 class="text-xl mb-2 font-semibold">Best App Award</h2>
              Build a consumer-grade application that solves a problem,
              entertains or informs. Your project will be judged on technical
              complexity, use of SolidJS and general use or entertainment to the
              users.
              <div class="mt-5">Prize: $5000</div>
            </div>
          </div>
          <div class="md:grid md:gap-8 md:grid-cols-12 p-10">
            <div class="col-span-3 text-3xl flex justify-center mb-5">
              <figure class="bg-solid-medium rounded-full w-32 h-32 flex p-2">
                <img alt="Award" src="/img/award-ecosystem.svg" />
              </figure>
            </div>
            <div class="col-span-9 text-md">
              <h2 class="text-xl mb-2 font-semibold">
                Best Ecosystem Utility Award
              </h2>
              Create a utility or package, or port an existing library. The
              SolidJS community is hungry for ecosystem solutions. This is your
              opportunity to show off your front-end and tooling abilities.
              <div class="mt-5">Prize: $5000</div>
            </div>
          </div>
          <div class="md:grid md:gap-8 md:grid-cols-12 p-10">
            <div class="col-span-3 text-3xl flex justify-center mb-5">
              <figure class="bg-solid-medium rounded-full w-32 h-32 flex p-2">
                <img alt="Award" src="/img/award-student-project.svg" />
              </figure>
            </div>
            <div class="col-span-9 text-md">
              <h2 class="text-xl mb-2 font-semibold">
                Best Student Project Award
              </h2>
              We didn't forget about students! Create an consumer-grade app or
              ecosystem utility. This award is for currently enrolled students
              itching to break into OSS and the corporate world.
              <div class="mt-5">
                Prize: $2000 + Internship Opportunity with{" "}
                <a class="underline" href="http://402.so">
                  402
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-4xl p-5 leading-7">
        <Box title="What">
          <strong>SolidHack</strong> is a public hackathon presented by the
          SolidJS Team, corporate sponsors and individuals. We've got USD$12,000
          to give away to the best projects across three categories. It's free
          to enter, you've got three months to build your project and winners
          will be selected by public vote. Join our{" "}
          <a
            target="_blank"
            href="https://discord.gg/solidjs"
            class="underline"
          >
            SolidJS Discord
          </a>{" "}
          to ask questions and chat with our community.
        </Box>
        <Box title="When">
          <div class="space-y-5 text-center md:text-left">
            <div class="md:grid md:grid-cols-12 border-b py-2 text-green-700">
              <div class="col-span-1 text-center">
                <figure class="bg-green-700 rounded-full w-6 h-6 inline-flex justify-center pt-1 items-center text-white">
                  ✓
                </figure>
              </div>
              <div class="col-span-3">January 7th</div>
              <div class="col-span-8">
                Categories Announced and Contest Begins
              </div>
            </div>
            <div class="md:grid md:grid-cols-12 border-b py-2">
              <div class="col-span-1 text-center">
                <figure class="bg-gray-300 rounded-full w-6 h-6 inline-flex justify-center pt-1 items-center text-white">
                  ~
                </figure>
              </div>
              <div class="col-span-3">February 18th</div>
              <div class="col-span-8">Submissions Portal Opens</div>
            </div>
            <div class="md:grid md:grid-cols-12 border-b py-2 text-gray-400">
              <div class="col-span-1 text-center">&nbsp;</div>
              <div class="col-span-3">April 7th</div>
              <div class="col-span-8">Submissions Close and Voting Begins</div>
            </div>
            <div class="md:grid md:grid-cols-12 border-b py-2 text-gray-400">
              <div class="col-span-1 text-center">&nbsp;</div>
              <div class="col-span-3">April 28th</div>
              <div class="col-span-8">Voting Ends</div>
            </div>
            <div class="md:grid md:grid-cols-12 border-b py-2 text-gray-400">
              <div class="col-span-1 text-center">&nbsp;</div>
              <div class="col-span-3">May 4th</div>
              <div class="col-span-8">Winners Announced</div>
            </div>
            <small class="text-center mt-4 block">
              Exact closing time for above listed dates is 23:59 (GMT-5).
            </small>
          </div>
        </Box>
        <Box title="Who">
          The hackathon is open to anyone: experienced SolidJS users and
          newcomers alike. You'll use your GitHub account to verify your
          identity when you submit your project and when you cast your vote. The
          competition is supported by corporate sponsors of SolidJS and the
          open-source ecosystem.
          <div class="flex items-center space-y-5 flex-col md:space-y-0 md:flex-row mt-3 md:space-x-8 bg-white/20 p-4 px-7 rounded-xl">
            <a
              target="_blank"
              class="hover:opacity-70 transition duration-300 text-center"
              rel="noopener"
              href="https://www.stytch.com"
            >
              <img class="inline-block w-4/6 md:w-24" src={stytch} />
            </a>
            <a
              target="_blank"
              class="hover:opacity-70 transition duration-300 text-center"
              rel="noopener"
              href="https://www.builder.io"
            >
              <img class="inline-block w-4/6 md:w-24" src={builder} />
            </a>
            <a
              target="_blank"
              class="hover:opacity-70 transition duration-300 text-center"
              rel="noopener"
              href="https://www.clearspend.com/"
            >
              <img class="inline-block w-4/6 md:w-40" src={clearspend} />
            </a>{" "}
            <a
              target="_blank"
              class="hover:opacity-70 transition duration-300 text-center"
              rel="noopener"
              href="https://www.402.so"
            >
              <img class="inline-block w-4/6 md:w-24" src={FourOhTwo} />
            </a>
          </div>
          <small class="mt-3 block">
            To participate as a sponsor, contact{" "}
            <a href="mailto:community@solidjs.com">community@solidjs.com</a>.
            <br />
            <br />A special thanks to supporters who have submitted personal
            donations including:{" "}
            <a target="_blank" href="https://github.com/Brendan-csel">
              Brendan-csel
            </a>{" "}
            and{" "}
            <a target="_blank" href="https://github.com/davedbase">
              davedbase
            </a>
            .
          </small>
        </Box>
        <Box title="Why">
          <p class="mb-3">
            SolidJS has made its mark on the JavaScript ecosystem. It's a
            flourishing community and we want you to be a part of it.
          </p>
          <p>
            We know that this kind of initiative is new for the open-source
            world, and we're looking to push the boundaries of what a hackathon
            can be and what open-source projects can do. Ultimately, we want to
            give you an opportunity to give SolidJS a try.
          </p>
        </Box>
        <Box title="Rules">
          <h4 class="mb-3 font-semibold text-xl text-solid-medium">
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
              Submissions must be posted on Github and remain publicly
              accessible and readable until winners are announced.
            </li>
            <li>
              Submissions may be made by an individual or as teams of 2-3
              members. All members must be clearly stated within the project's
              documentation or configuration.
            </li>
          </ul>
          <h4 class="mt-5 mb-3 font-semibold text-xl text-solid-medium">
            Submissions
          </h4>
          <ul class="list-disc ml-3">
            <li>
              All projects must have a working demo or video accessible via a
              URL. The URL must be provided with your submission.
            </li>
            <li>
              Submissions posted after the submission closing date (April 7th
              23:59 GMT-5) will not be accepted.
            </li>
            <li>
              Submissions must have been started on or after January 7th 2022.
              Old projects and projects that include previously posted code are
              not allowed. Projects ported from other ecosystems are allowed.
            </li>
            <li>Submissions must not change after the submission date.</li>
            <li>
              Submissions will be vetted by SolidHack Planning Committee
              members. 3 members or more may vote to disqualify a submission due
              to the submission breaking the Rules &amp; Regulations.
            </li>
            <li>
              Submissions must have their licensing terms clearly stated in
              their repositories. Only open-source licenses
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
              Contestants agree to act fairly and responsibly during the
              contest. The SolidHack Planning Committee may vote to disqualify a
              submission or contestant. One written warning will be supplied.
            </li>
            <li>
              Contestants and competition participants will treat each other
              with respect. This includes public discussions, Twitter and other
              social media, private and personal communication mediums.
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
              or more than one account per user is strictly forbidden. All
              voters Github accounts will be made public on the SolidHack
              submissions page.
            </li>
            <li>Submissions may only be submitted to one category.</li>
            <li>Winners may only win one category.</li>
            <li>
              Only students are eligible to submit to the Best Student Project
              Award. Proof of student enrollment for the duration of the
              competition will be required.
            </li>
            <li>
              Student internship will be awarded at 402's discretion, based on
              an interview. The internship will be for a duration of 3 months.
            </li>
            <li>
              Votes will be tallied from active Github accounts registered
              before the competition start date (January 7th 2022).
            </li>
            <li>
              Winners of the competition categories will be decided by a
              community vote.
            </li>
            <li>
              Prize money will be collected from sponsors and distributed via
              OpenCollective.
            </li>
            <li>
              Prize money will only be awarded to contestants who reside in a
              country to which fund transfers are allowed (any country that
              PayPal and OpenCollective support).
            </li>
            <li>
              Prize money will be distributed to submission author(s)
              individually.
            </li>
            <li>
              Winners may choose to donate funds to a charitable cause approved
              by the SolidHack Planning Committee.
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
              this service as a best-effort. Individuals involved commit to
              acting fairly and responsibly to ensure Rules &amp; Regulations
              are enacted appropriately.
            </li>
            <li>
              Participants of the competition and third-parties cannot hold the
              SolidJS Core Team, SolidHack Planning Committee or sponsors liable
              in any manner. Participating in SolidHack is at your discretion.
            </li>
            <li>
              Rules &amp; Regulations of this competition may change at the
              discretion of the SolidHack Planning Committee. Contestants will
              be notified via SolidHack Newsletter and published via a Rules
              &amp; Regulations changelog.
            </li>
            <li>Submissions may be withdrawn via email to hack@solidjs.com.</li>
            <li>
              The SolidHack Planning Committee commits to making a best effort
              to protect the privacy of contestants. All information will be
              collected and distributed for the exclusive purpose of operating
              the competition.
            </li>
          </ul>
        </Box>
        <div class="bg-white/50 text-gray-700 max-w-3xl mx-auto mt-5 p-10 rounded-xl shadow-xl backdrop-blur-md">
          <div class="mb-5">
            Stay up-to-date on SolidHack, major SolidJS releases, and community
            updates.
          </div>
          <Newsletter title="Sign up for SolidJS News" />
        </div>
        <div class="bg-opacity-50 text-black max-w-3xl mx-auto mt-2 p-10 rounded-xl">
          <small>
            SolidHack is operated by volunteers and funded by corporate
            sponsors. The SolidHack Planning Committee is responsible for
            coordinating Rules and Regulations. Questions and concerns relating
            to the competition may be directed to hack@solidjs.com. The Planning
            Committee maintains the right to enforce, adapt or cancel terms of
            the competition in the spirit of fairness.
          </small>
        </div>
        <div class="bg-opacity-50 text-black max-w-3xl mx-auto mb-20 p-10 rounded-xl">
          <small>
            <ol class="list-style-none">
              <li>
                1. Underage participants require written permission from a
                parent or legal guardian{" "}
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
                the purpose of manipulating votes, or any use of voting
                automation or botting.{" "}
                <a id="fn3" class="font-semibold" href="#fn3-anchor">
                  (back)
                </a>
              </li>
            </ol>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Hack;
