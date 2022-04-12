import { Component, Show } from "solid-js";
import github from "../assets/github.svg";
import { arrowSmRight } from "solid-heroicons/solid";
import { Icon } from "solid-heroicons";
import stytch from "../assets/supporters/stytch.png";
import { useAppContext } from "../AppContext";

const SubmissionLanding: Component = () => {
  const context = useAppContext();
  return (
    <div class="w-full lg:py-6 bg-hack bg-no-repeat bg-top bg-contain bg-fixed">
      <div class="container pt-[18px] px-10 relative">
        <div class="p-3 md:w-3/5 mx-auto md:p-10 rounded-xl space-y-5">
          <div class="flex justify-center space-x-5">
            <img
              class="w-20 h-20 md:w-30 md:h-30 p-3 bg-solid-medium rounded-full"
              src="/img/award-best-app.svg"
            />
            <img
              class="w-20 h-20 md:w-30 md:h-30 p-3 bg-solid-medium rounded-full"
              src="/img/award-ecosystem.svg"
            />
            <img
              class="w-20 h-20 md:w-30 md:h-30 p-3 bg-solid-medium rounded-full"
              src="/img/award-student-project.svg"
            />
          </div>
          <div class="text-2xl text-center text-solid-medium pt-5 font-semibold">
            SolidHack 2022 submissions are in!
          </div>
          <div>
            On behalf of the SolidJS Core, Ecosystem and broader community,
            thank you for participating and making this competition a reality.
            After just over 3 months it's time to vote for the winners.
          </div>
          <div class="text-solid-medium">
            <b>To participate in the voting process</b> you must sign into
            GitHub. Voting will end on May 2nd @ 23:49 GMT-5. You will have 3
            Voting Stars per category.
          </div>
          <Show when={!context.user}>
            <div class="my-5 py-10 px-5 border rounded-3xl bg-gray-50 space-y-5">
              <a
                class="flex bg-white mx-auto items-center max-w-lg justify-center space-x-10 rounded-xl border border-black p-5"
                href={`${context.apiurl}/auth/login?redirect=${window.location.href}?auth=success`}
              >
                Sign in with GitHub
                <img class="ml-3 h-7" src={github} />
              </a>
              <div class="flex justify-center text-sm items-center text-center space-x-3">
                <div style={{ color: "#0F4447" }}>
                  Powered by SolidHack sponsor
                </div>
                <img class="h-5" src={stytch} />
              </div>
            </div>
          </Show>
          <a
            href="/submissions/best_app"
            class="text-solid-medium pt-4 text-2xl flex justify-center items-center text-center"
          >
            Continue to submissions
            <Icon class="w-10" path={arrowSmRight} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubmissionLanding;
