import { Component } from "solid-js";

import { cn } from "~/lib/utils";

interface HeroProps {
  small?: boolean;
}

export const Hero: Component<HeroProps> = (props) => (
  <div
    class={cn(
      "flex flex-col min-[895px]:flex-row min-[895px]:mx-auto max-w-6xl w-full font-bold items-center mt-10 min-[895px]:my-0 min-[895px]:h-[50vh] justify-between p-4",
      {
        "min-[895px]:h-[50vh]": !props.small,
        "min-[895px]:h-[400px] pt-40": props.small,
      },
    )}
  >
    <h1 class="text-[min(11vw,48px)] md:text-[5rem] leading-[1.2em] md:leading-[0.7em] text-primary border-l-8 md:py-7 pl-7 border-primary">
      <div>
        Solid<span class="text-gray-500">Hack</span>
        <span class="text-gray-400 font-medium">2024</span>
      </div>
    </h1>
    <img class="w-20 md:w-40" src="/img/logo-mark.svg" alt="SolidHack logo" />
  </div>
);
