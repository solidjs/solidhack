import { Component, FlowComponent, For } from "solid-js";

interface BoxProps {
  title: string;
}

export const Box: FlowComponent<BoxProps> = (props) => (
  <div class="md:grid md:grid-cols-12 md:space-x-6 bg-white/50 mx-auto mt-5 p-10 rounded-md shadow-lg backdrop-blur-md">
    <h2 class="text-3xl col-span-2 text-gray-500 font-semibold mb-5">
      {props.title}
    </h2>
    <div class="col-span-10">{props.children}</div>
  </div>
);
