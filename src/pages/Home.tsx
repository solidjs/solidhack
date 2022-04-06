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
  const startDate = new Date(1649735999000);
  const endDate = new Date(1649390340000);
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
      class="flex flex-row w-min gap-5 px-10 rounded-md"
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

const Home: Component = () => {
  return (
    <div class="w-full flex flex-col items-center gap-6 md:gap-8 lg:gap-12 min-h-screen">
      <div
        class="w-full bg-white items-center flex flex-col pb-8 bg-hack bg-no-repeat bg-top bg-contain px-10"
        style={{}}
      >
        <img class="mx-auto mt-20 w-36" src="/img/hack/icon.png" />
        <img
          class="w-6/6 md:w-5/6 mt-4 mb-0 g:w-4/6 xl:w-5/12 2xl:w-3/12 mx-auto"
          src="/img/hack/title.png"
        />
        <Countdown></Countdown>
        <div class="p-5 md:w-3/6 text-white rounded-b-lg bg-solid-light text-md mb-5">
          <b>The submission date has been extended to April 11th!</b>
          <div class="mt-3">
            The SolidHack Planning Committee has decided to extend the
            competition deadline 4 extra days. Use this extra time wisely. If
            you have any questions, feel free to{" "}
            <a
              class="underline"
              href="https://discord.com/invite/solidjs"
              target="_blank"
            >
              join our Discord #solidhack channel
            </a>
            .
          </div>
        </div>
        <div class="mt-20 flex items-center flex-col md:space-y-0 md:flex-row md:space-x-20 bg-white/20 p-4 px-7 rounded-xl">
          <a
            target="_blank"
            class="hover:opacity-70 transition duration-300 text-center"
            rel="noopener"
            href="https://www.stytch.com"
          >
            <img class="inline-block w-3/6 md:w-52" src={stytch} />
          </a>
        </div>
        <div class="flex items-center space-y-5 flex-col md:space-y-0 md:flex-row mt-3 md:space-x-12 bg-white/20 p-4 px-7 rounded-xl">
          <a
            target="_blank"
            class="hover:opacity-70 transition duration-300 text-center"
            rel="noopener"
            href="https://www.builder.io"
          >
            <img class="inline-block w-3/6 md:w-40" src={builder} />
          </a>
          <a
            target="_blank"
            class="hover:opacity-70 transition duration-300 text-center"
            rel="noopener"
            href="https://www.402.so"
          >
            <img class="inline-block w-3/6 md:w-28" src={FourOhTwo} />
          </a>
          <a
            target="_blank"
            class="hover:opacity-70 transition duration-300 text-center"
            rel="noopener"
            href="https://www.clearspend.com/"
          >
            <img class="inline-block w-3/6 md:w-44" src={clearspend} />
          </a>{" "}
        </div>
      </div>
      <div class="flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5">
        <iframe
          class="rounded-xl shadow-2xl"
          width="500"
          height="280"
          src="https://www.youtube.com/embed/Y67QW9HKrWA"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
        <iframe
          class="rounded-xl shadow-2xl"
          width="500"
          height="280"
          src="https://www.youtube.com/embed/QGNZGZAfvcY"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
      <div class="flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5">
        <iframe
          class="rounded-xl shadow-2xl"
          width="500"
          height="280"
          src="https://www.youtube.com/embed/8VyEHaqstJ4"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
        <iframe
          class="rounded-xl shadow-2xl"
          width="500"
          height="280"
          src="https://www.youtube.com/embed/YWHj8Yw2HoI"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
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
          <div class="mb-5 text-solid-medium">
            UPDATE: SolidHack deadlines has been extended!
          </div>
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
            <div class="md:grid md:grid-cols-12 border-b py-2 text-green-700">
              <div class="col-span-1 text-center">
                <figure class="bg-green-700 rounded-full w-6 h-6 inline-flex justify-center pt-1 items-center text-white">
                  ✓
                </figure>
              </div>
              <div class="col-span-3">February 18th</div>
              <div class="col-span-8">Submissions Portal Opens</div>
            </div>
            <div class="md:grid md:grid-cols-12 border-b py-2 text-green-700">
              <div class="col-span-1 text-center">
                <figure class="bg-green-700 rounded-full w-6 h-6 inline-flex justify-center pt-1 items-center text-white">
                  ✓
                </figure>
              </div>
              <div class="col-span-3">April 11th</div>
              <div class="col-span-8">Submissions Close and Voting Begins</div>
            </div>
            <div class="md:grid md:grid-cols-12 border-b py-2 text-gray-400">
              <div class="col-span-1 text-center">
                <figure class="bg-gray-300 rounded-full w-6 h-6 inline-flex justify-center pt-1 items-center text-white">
                  ~
                </figure>
              </div>
              <div class="col-span-3">May 2nd</div>
              <div class="col-span-8">Voting Ends</div>
            </div>
            <div class="md:grid md:grid-cols-12 border-b py-2 text-gray-400">
              <div class="col-span-1 text-center">&nbsp;</div>
              <div class="col-span-3">May 6th</div>
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
          <small class="mt-3 block">
            To participate as a sponsor, contact{" "}
            <a href="mailto:community@solidjs.com">community@solidjs.com</a>.
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
        <div class="text-center text-sm">
          Last updated March 1 @ 10:00am EST
        </div>
      </div>
    </div>
  );
};

export default Home;
