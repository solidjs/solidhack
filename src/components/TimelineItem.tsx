import { Icon } from "solid-heroicons";
import { check, ellipsisHorizontal } from "solid-heroicons/solid";
import { clock } from "solid-heroicons/outline";
import { Component, Match, Switch } from "solid-js";

interface TimelineItemProps {
  date: string;
  status: "pending" | "done" | "next";
  description: string;
}

export const TimelineItem: Component<TimelineItemProps> = (props) => {
  return (
    <div
      class="md:grid md:grid-cols-12 border-b py-2"
      classList={{
        "text-primary": props.status === "next",
        "text-gray-500": props.status === "pending",
        "text-green-700": props.status === "done",
      }}
    >
      <div class="col-span-1 text-center">
        <figure
          class="rounded-full w-8 h-8 inline-flex justify-center items-center text-white"
          classList={{
            "bg-primary": props.status === "next",
            "bg-gray-500": props.status === "pending",
            "bg-green-700": props.status === "done",
          }}
        >
          <Switch>
            <Match when={props.status === "done"}>
              <Icon path={check} class="w-6 text-white" />
            </Match>
            <Match when={props.status === "next"}>
              <Icon path={clock} class="w-6 text-white" />
            </Match>
            <Match when={props.status === "pending"}>
              <Icon path={ellipsisHorizontal} class="w-5 text-white" />
            </Match>
          </Switch>
        </figure>
      </div>
      <div class="flex col-span-3 items-center">{props.date}</div>
      <div class="flex col-span-8 items-center">{props.description}</div>
    </div>
  );
};
