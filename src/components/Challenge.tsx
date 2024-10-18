import { type FlowComponent, Show } from "solid-js";
import { Button } from "./ui/button";
import { A } from "@solidjs/router";

interface ChallengeProps {
  id: string;
  image: string;
  title: string;
  amount: number;
  claimed: boolean;
}

export const Challenge: FlowComponent<ChallengeProps> = (props) => (
  <div class="bg-neutral-100 my-5 rounded-2xl divide-y-2 divide-white relative">
    <div
      class="text-center md:absolute bg-neutral-300 text-sm px-5 py-2 rounded-t-lg bottom-0 md:left-10"
      classList={{
        "!bg-green-500 text-white": !!props.claimed,
      }}
    >
      <Show fallback="Unclaimed" when={props.claimed}>
        Claimed
      </Show>
    </div>
    <div class="md:flex space-x-10 p-3 md:p-10">
      <div class="mx-auto m-5 md:m-0 bg-neutral-400/60 shadow-xl min-w-28 h-28 p-2 aspect-square rounded-full">
        <img src={props.image} alt={props.title} />
      </div>
      <div>
        <div class="font-semibold text-2xl">{props.title}</div>
        {props.children}
        <div class="mt-4">
          <strong>Prize:</strong> US${props.amount}
        </div>
        <Show when={!props.claimed}>
          <div class="text-center mt-2 md:text-right p-5 md:p-0">
            <Button
              as={A}
              href={`/submit?challenge_id=${props.id}`}
              class="mt-5"
            >
              Send submission
            </Button>
          </div>
        </Show>
      </div>
    </div>
  </div>
);
