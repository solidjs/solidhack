import { A } from "@solidjs/router";
import { Component, Show } from "solid-js";
import { useAuth } from "@solid-mediakit/auth/client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuDescription,
  NavigationMenuIcon,
  NavigationMenuItem,
  NavigationMenuLabel,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";

export const Nav: Component = () => {
  const auth = useAuth();
  return (
    <div class="flex justify-center fixed top-0 left-0 w-full z-50">
      <NavigationMenu class="shadow-md p-1 bg-white rounded-b-md">
        <NavigationMenuTrigger
          as={A}
          end={true}
          activeClass="text-primary font-medium"
          href="/"
        >
          Home
        </NavigationMenuTrigger>
        <NavigationMenuTrigger
          as={A}
          end={true}
          activeClass="text-primary"
          href="/submissions"
        >
          Submissions List
        </NavigationMenuTrigger>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Overview
            <NavigationMenuIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            <NavigationMenuLink
              as={A}
              end={true}
              activeClass="text-primary"
              href="/categories-challenges"
            >
              <NavigationMenuLabel>Categories & Challenges</NavigationMenuLabel>
              <NavigationMenuDescription>
                Read about the 2024 competition details.
              </NavigationMenuDescription>
            </NavigationMenuLink>
            <NavigationMenuLink
              as={A}
              end={true}
              activeClass="text-primary"
              href="/submissions"
            >
              <NavigationMenuLabel>Rules & Regulations</NavigationMenuLabel>
              <NavigationMenuDescription>
                Be sure to read all the competition rules.
              </NavigationMenuDescription>
            </NavigationMenuLink>
            <NavigationMenuLink
              target="_blank"
              href="https://discord.com/invite/solidjs"
            >
              <NavigationMenuLabel>Solid Discord</NavigationMenuLabel>
              <NavigationMenuDescription>
                Join the #solidhack-2024 channel on our Discord.
              </NavigationMenuDescription>
            </NavigationMenuLink>
            <NavigationMenuLink
              target="_blank"
              href="https://opencollective.com/solid"
            >
              <NavigationMenuLabel>OpenCollective</NavigationMenuLabel>
              <NavigationMenuDescription>
                Consider donating to Solid and supporting the project.
              </NavigationMenuDescription>
            </NavigationMenuLink>
            <NavigationMenuLink target="_blank" href="/submit">
              <NavigationMenuLabel>Send A Submission</NavigationMenuLabel>
              <NavigationMenuDescription>
                Submit to a SolidHack Challenge.
              </NavigationMenuDescription>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuTrigger
          as="a"
          href="#"
          onClick={(evt) => {
            evt.preventDefault();
            if (auth.status() === "authenticated") {
              auth.signOut();
            } else {
              auth.signIn("github");
            }
          }}
        >
          <Show
            fallback="Sign in"
            when={auth.status() === "authenticated" && auth.session()}
          >
            <div class="ml-3">Logout</div>
            <img
              class="rounded-full mx-2 w-8"
              src={auth.session()!.user.image!}
              alt={auth.session()!.user.username}
            />
          </Show>
        </NavigationMenuTrigger>
      </NavigationMenu>
    </div>
  );
};
