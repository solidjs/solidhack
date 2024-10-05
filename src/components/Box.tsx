import { Show, FlowComponent } from "solid-js";

interface BoxProps {
  title?: string;
  class?: string;
}

export const Box: FlowComponent<BoxProps> = (props) => (
  <div
    class="bg-white/50 mx-auto mt-5 p-10 rounded-md shadow backdrop-blur-md"
    classList={{
      "md:grid md:grid-cols-12 md:space-x-6": !!props.title,
      [`${props.class}`]: !!props.class,
    }}
  >
    <Show when={props.title}>
      <h2 class="text-3xl col-span-2 text-gray-500 font-semibold mb-5">
        {props.title}
      </h2>
    </Show>
    <div class="col-span-10">{props.children}</div>
  </div>
);
