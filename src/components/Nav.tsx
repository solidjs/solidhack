import { A, createAsync } from "@solidjs/router";
import { Component } from "solid-js";
import { cache } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";
import { useAuth } from "@solid-mediakit/auth/client";
import { getSession } from "@solid-mediakit/auth";
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
import { authOpts } from "~/auth";

const getUser = cache(async () => {
  "use server";
  const event = getRequestEvent()!;
  const session = await getSession(event, authOpts);
  if (!session) {
    return null;
  }
  return session;
}, "user");

export const Nav: Component = () => {
  const auth = useAuth();
  const user = createAsync(() => getUser(), { deferStream: true });
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
          href="/categories-challenges"
        >
          Categories & Challenges
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
              href="/submit"
            >
              <NavigationMenuLabel>Send A Submission</NavigationMenuLabel>
              <NavigationMenuDescription>
                Submit for a SolidHack Challenge and Award Category.
              </NavigationMenuDescription>
            </NavigationMenuLink>
            <NavigationMenuLink
              as={A}
              end={true}
              activeClass="text-primary"
              href="/rules"
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
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuTrigger
          href="#"
          onClick={(evt) => {
            evt.preventDefault();
            auth.signIn("github");
          }}
        >
          {JSON.stringify(user())}
          Sign In
        </NavigationMenuTrigger>
      </NavigationMenu>
    </div>
  );
};
