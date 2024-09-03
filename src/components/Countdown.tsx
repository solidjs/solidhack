import { Component, createMemo, For } from "solid-js";
import { createCountdownFromNow } from "@solid-primitives/date";

interface CountdownProps {
  class?: string;
  start: number;
  end: number;
}

export const Countdown: Component<CountdownProps> = (props) => {
  const startDate = new Date(props.start);
  const endDate = new Date(props.end);
  const [count] = createCountdownFromNow(
    new Date().getTime() < startDate.getTime() ? startDate : endDate
  );
  const counts = createMemo(() => Object.entries(count).slice(0, -1));
  return (
    <div
      class="flex flex-row w-min rounded-xl bg-hackblue px-5"
      classList={{
        [`${props.class}`]: !!props.class,
      }}
    >
      <For each={counts()}>
        {([label, value]) => {
          const fixed = value >= 10 ? value.toString() : "0" + value.toString();
          return (
            <div class="flex flex-col items-center text-white text-[length:clamp(5px,4vw,18px)] px-[clamp(5px,4vw,16px)] py-5 md:py-5 md:px-5">
              <div class="font-mono text-[length:clamp(5px,4vw,18px)] sm:text-[length:clamp(5px,6vw,48px)] leading-[1]">
                {fixed}
              </div>
              {label}
            </div>
          );
        }}
      </For>
    </div>
  );
};
