import { Component } from "solid-js";
import { A } from "@solidjs/router";

export const Nav: Component = () => (
  <nav class="bg-white/95 bg-blue-300 shadow-lg fixed top-0 left-10 space-x-4 p-3 rounded-b-xl z-50">
    <A activeClass="text-hackblue font-semibold" href="/" end={true}>
      Home
    </A>
    <A activeClass="text-hackblue font-semibold" href="/categories-challenges">
      Categories & Challenges
    </A>
    <A activeClass="text-hackblue font-semibold" href="/rules">
      Rules
    </A>
  </nav>
);
