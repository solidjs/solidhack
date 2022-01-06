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
  const startDate = new Date(1646155800000);
  const endDate = new Date(1646155800000);
  const countdownValues = createCountdown(
    new Date().getTime() < startDate.getTime() ? startDate : endDate
  );

  const CountdownBox = (props: { label: string; value: number }) => {
    const fixed =
      props.value >= 10 ? props.value.toString() : "0" + props.value.toString();

    return (
      <div class="flex flex-col items-center text-white py-4 px-4 md:py-5 md:px-7">
        <div class="font-mono text-5xl">{fixed}</div>
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
        class="w-full bg-white items-center flex flex-col pb-8 bg-hack bg-no-repeat bg-top bg-contain"
        style={{}}
      >
        <img class="mx-auto mt-20 w-36" src="/img/hack/icon.png" />
        <img
          class="w-6/6 md:w-5/6 mt-4 mb-0 g:w-4/6 xl:w-5/12 2xl:w-3/12 mx-auto"
          src="/img/hack/title.png"
        />
        <p class="text-2xl mb-8 mt-5">
          Start hacking! Submissions open March 1, 2022
        </p>
        <Countdown></Countdown>
        <div class="mt-20 mb-5 text-solid-medium">
          We're pleased to anounce our competition categories:
        </div>
        <div class="max-w-3xl border divide-y rounded-xl">
          <div class="grid gap-8 grid-cols-12 p-10">
            <div class="col-span-3 text-3xl text-center mb-5">
              <img alt="Award" src="/img/award-best-app.png" />
            </div>
            <div class="col-span-9 text-md">
              <h2 class="text-xl mb-2 font-semibold">Best App Award</h2>
              Build a consumer-grade application that solves a problem,
              entertains or informs. Your project should be judged on technical
              complexity, use of Solid and general use or entertainment to the
              users.
              <div class="mt-5">Prize: $5000</div>
            </div>
          </div>
          <div class="grid gap-8 grid-cols-12 p-10">
            <div class="col-span-3 text-3xl text-center mb-5">
              <img alt="Award" src="/img/award-ecosystem.png" />
            </div>
            <div class="col-span-9 text-md">
              <h2 class="text-xl mb-2 font-semibold">
                Best Ecosystem Utility Award
              </h2>
              Create a utility, package or port an existing library. The Solid
              community is hungry for ecosystem solutions. This is your
              opportunity to show off you front-end and tooling abilities.
              <div class="mt-5">Prize: $5000</div>
            </div>
          </div>
          <div class="grid gap-8 grid-cols-12 p-10">
            <div class="col-span-3 text-3xl text-center mb-5">
              <img alt="Award" src="/img/award-student-project.png" />
            </div>
            <div class="col-span-9 text-md">
              <h2 class="text-xl mb-2 font-semibold">
                Best Student Project Award
              </h2>
              We didn't forget about students! Create an consumer-grade app or
              ecosystem utility. This award is for currently enrolled students
              itching to break into OSS and the corporate world.
              <div class="mt-5">Prize: $2000 + Internship Opportunity</div>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-4xl">
        <Box title="What">
          <b>SolidHack</b> is a public hackathon presented by the Solid Team and
          corporate sponsors. We've got USD$12,000 to give away to the best
          projects across three categories. It's free to enter, you've got three
          months to build your project, and winners will be selected by public
          vote.
        </Box>
        <Box title="When">
          The event begins <strong>January 7th</strong> and you can start
          building then. The submissions portal will open in mid February, but
          you'll have until April 7th to submit. More details on categories and
          official rules and regulations will be announced via Solid News before
          the start date. Sign up below or join the{" "}
          <a
            target="_blank"
            href="https://discord.gg/solidjs"
            class="underline"
          >
            Solid Discord
          </a>{" "}
          to make sure you're up-to-date!
        </Box>
        <Box title="Who">
          The hackathon is open to anyone: experienced Solid users and newcomers
          alike. You'll use your GitHub account to verify your identity when you
          submit your project and when you cast your vote. The competition is
          supported by corporate supporters of Solid and the open-source
          ecosystem.
          <div class="flex items-center space-y-5 flex-col md:space-y-0 md:flex-row mt-3 md:space-x-8 bg-white/20 p-4 px-7 rounded-xl">
            <a
              target="_blank"
              class="hover:opacity-70 transition duration-300"
              rel="noopener"
              href="https://www.stytch.com"
            >
              <img class="inline-block w-24" src={stytch} />
            </a>
            <a
              target="_blank"
              class="hover:opacity-70 transition duration-300"
              rel="noopener"
              href="https://www.builder.io"
            >
              <img class="inline-block w-24" src={builder} />
            </a>
            <a
              target="_blank"
              class="hover:opacity-70 transition duration-300"
              rel="noopener"
              href="https://www.clearspend.com/"
            >
              <img class="inline-block w-40" src={clearspend} />
            </a>{" "}
            <a
              target="_blank"
              class="hover:opacity-70 transition duration-300"
              rel="noopener"
              href="#"
            >
              <img class="inline-block w-24" src={FourOhTwo} />
            </a>
          </div>
          <small class="mt-3 block">
            To participate as a sponsor contact{" "}
            <a href="mailto:community@solidjs.com">community@solidjs.com</a>.
            <br />
            <br />A special thanks to others who have submitted personal
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
            Solid has made its mark on the JavaScript ecosystem. It's a
            flourishing community and we want you to be a part of it.
          </p>
          <p>
            We know that this kind of initiative is new for the open-source
            world, and we're looking to push the boundaries of what a hackathon
            can be and what open-source projects can do. Ultimately, we want to
            give you an opportunity to give Solid a try.
          </p>
        </Box>
        <Box title="Rules">
          <h4 class="mb-3 font-semibold text-xl text-solid-medium">
            Eligibility
          </h4>
          <ul class="list-disc ml-3">
            <li>
              Contestants of all age and skill levels are welcomed to contribute
              except SolidJS core and SolidHack Planning Committee members.
            </li>
            <li>Projects must be written and based off SolidJS.</li>
            <li>
              All contestants must be Github registered users as of the start
              date of the competition.
            </li>
            <li>Teams of 2-3 members will be allowed to compete together.</li>
            <li>
              Submissions must be posted on Github and remain publicly
              accessible and readable upon submission to the end of the
              competition. Those that do not comply will be disqualified.
            </li>
          </ul>
          <h4 class="mt-5 mb-3 font-semibold text-xl text-solid-medium">
            Submissions
          </h4>
          <ul class="list-disc ml-3">
            <li>All projects must have a working demo.</li>
            <li>
              Submissions posted after the submission closing date will be
              disqualified.
            </li>
            <li>
              Entries must be original ideas started written after January 7th,
              2022. Old projects and previously posted concepts are not allowed.
            </li>
            <li>
              Re-writes, refactors or anything mostly written prior to the
              competition date are not allowed. You are however allowed to use
              previously written support tools to enhance your project.
            </li>
            <li>Submissions must not change after the submission date.</li>
            <li>
              Re-writes, refactors or anything mostly written prior to the
              competition date are not allowed. You are however allowed to use
              previously written support tools to enhance your project.
            </li>
            <li>
              Submissions will be vetted by SolidHack Planning Committee
              members. 3 members or more may vote to disqualify a submission due
              to a project breaking the Rules & Regulations.
            </li>
            <li>
              All projects must have their licenseing document clearly state in
              their repositories. Only open-source licenses will be allowed.
            </li>
            <li>
              All submisisons will be treated as publicly contributed
              intellectual property bound by the selected open-source friendly
              license model of the user.
            </li>
            <li>
              All source code for a submission must be visible and accessible.
            </li>
          </ul>
          <h4 class="mt-5 mb-3 font-semibold text-xl text-solid-medium">
            Disqualification
          </h4>
          <ul class="list-disc ml-3">
            <li>
              Contestants agree to act fairly and responsibly during the
              contest. SolidHack Planning Committe may vote to disqualify
              submissions. One warning will be supplied.
            </li>
            <li>
              Contestants will treat others with respect. This includes public
              discussions, Twitter and other private and personal communication
              mediums.
            </li>
            <li>
              In most cases contestants that fail to meet the submission
              requirements will be notified of issues. This will be done via PRs
              to a project and require adjustment within 24h of notice.
            </li>
            <li>
              Voting with fake accounts or more than one account per user is
              strictly forbidden. All voters Github accounts will be made public
              on the SolidHack submissions page.
            </li>
          </ul>
          <h4 class="mt-5 mb-3 font-semibold text-xl text-solid-medium">
            Winners
          </h4>
          <ul class="list-disc ml-3">
            <li>
              Winners of the three competition categories will be decided by a
              community vote.
            </li>
            <li>
              Votes will be tallied from active Github accounts registered
              before the competitiond date.
            </li>
            <li>
              Prize money will only be awarded to contesants that reside in a
              country from which fund transfers are allowed (any country that
              PayPal and OpenCollective support).
            </li>
            <li>
              Prize money will be distributed to submission author(s)
              individually. All authors need to be clearly stated within a
              projects README.
            </li>
            <li>
              Prizes money will be collected from sponsors and distributed via
              OpenCollective.
            </li>
            <li>
              Winners may choose to donate funds to a charitable cause that's
              approved by the SolidHack Planning Committee.
            </li>
          </ul>
          <h4 class="mt-5 mb-3 font-semibold text-xl text-solid-medium">
            General Details
          </h4>
          <ul class="list-disc ml-3">
            <li>
              SolidHack is run by an organizing committe on behalf of corporate
              and individual sponsors. Similar to software licensing, the
              Planning Committee is providing this service as a best-effort.
              Individuals involved commit to acting fairly and responsibly to
              ensure rules and regulations are enacted fairly.
            </li>
            <li>
              Participants of the competition cannot not hold SolidJS Core,
              SolidHack Planning Committee or sponsors liable in any manner.
              Participating in SolidHack is at your discretion.
            </li>
            <li>
              Terms and conditions of this competition may change at the
              discretion of the SolidHack Planning Committee. Contestants will
              be notified via email on publication of such changes.
            </li>
            <li>
              Submissions may be withdrawn via written email to
              hack@solidjs.com.
            </li>
          </ul>
        </Box>
        <div class="bg-white/50 text-gray-700 max-w-3xl mx-auto mt-5 p-10 rounded-xl shadow-xl backdrop-blur-md">
          <div class="mb-5">
            Stay up-to-date on SolidHack, major Solid releases, and community
            updates.
          </div>
          <Newsletter title="Sign up for Solid News" />
        </div>
        <div class="bg-opacity-50 text-black max-w-3xl mx-auto mt-2 mb-20 p-10 rounded-xl">
          <small>
            SolidHack is operated by volunteers and funded by corporate
            sponsors. The SolidHack Planning Committee is responsible for
            coordinating Rules and Regulations. Questions and concerns relating
            to the competition may be directed to hack@solidjs.com. The Planning
            Committee maintains the right to enforce, adapt or cancel terms of
            the competition in the spirit of fairness.
          </small>
        </div>
      </div>
    </div>
  );
};

export default Hack;
