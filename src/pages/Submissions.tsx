import { Component, For, Show } from "solid-js";
import { NavLink, useRouteData } from "solid-app-router";
import { globe, code, star } from "solid-heroicons/outline";
import { Icon } from "solid-heroicons";

type Submission = {
  title: string;
  url: string;
  github: string;
  info?: string;
  license: string;
  description: string;
  contributors: Array<{
    name: string;
    email: string;
    url?: string;
  }>;
};

const submissions: { [key: string]: Submission[] } = {
  best_app: [],
  best_ecosystem: [
    {
      title: "solid-command-palette",
      url: "https://github.com/itaditya/solid-command-palette",
      github: "https://github.com/itaditya/solid-command-palette",
      description: "Add a command palette to your Solid.js App",
      info: "Boost your users productivity 10x by integrating our command palette.",
      license: "MIT",
      contributors: [
        {
          name: "Kai Huebner",
          email: "kai.huebner@gmail.com",
        },
      ],
    },
    {
      title: "solid-services",
      url: "https://github.com/Exelord/solid-services",
      github: "https://github.com/Exelord/solid-services",
      description:
        "Solid.js library adding a services layer for global shared state.",
      license: "MIT",
      contributors: [
        {
          name: "Maciej Kwaśniak",
          email: "contact@exelord.com",
          url: "https://exelord.com",
        },
      ],
    },
    {
      title: "solid-proxies",
      url: "https://github.com/Exelord/solid-proxies",
      github: "https://github.com/Exelord/solid-proxies",
      description:
        "Solid.js library adding signaling to built-in non-primitives",
      license: "MIT",
      contributors: [
        {
          name: "Maciej Kwaśniak",
          email: "contact@exelord.com",
          url: "https://exelord.com",
        },
      ],
    },
    {
      title: "studyur",
      github: "https://github.com/jherr/studyur",
      description: "SolidJS web application for learning resources.",
      url: "https://www.youtube.com/watch?v=P_5Yxktq9Rs",
      info: "A SolidJS based web application and chrome extension where users can keep curated lists of YouTube and Medium references in topics.",
      license: "MIT",
      contributors: [
        {
          name: "Jack Herrington",
          email: "jherr@pobox.com",
          url: "https://www.jackherrington.com",
        },
      ],
    },
  ],
  best_student_project: [],
};

const CategoryList: Component<{
  title: string;
  submissions: Submission[];
}> = (props) => {
  return (
    <ul class="divide-y divide-gray-200">
      <For each={props.submissions}>
        {(submission, index) => {
          return (
            <li class="grid grid-cols-12 p-12 pl-2">
              <div class="col-span-1 text-solid-medium font-semibold flex text-lg justify-center">
                {index() + 1}
              </div>
              <div class="col-span-8">
                <h3 class="text-2xl font-semibold text-solid-medium">
                  {submission.title}
                </h3>
                {submission.description}
                <div class="text-xs my-3">{submission.info}</div>
                <div class="text-sm mt-3">
                  Submitted by&nbsp;
                  <For each={submission.contributors}>
                    {(contributor, index) => (
                      <>
                        <a href={contributor.email}>{contributor.name}</a>
                        <Show
                          when={index() != submission.contributors.length - 1}
                        >
                          ,
                        </Show>
                      </>
                    )}
                  </For>
                </div>
                <div class="text-sm text-gray-400">
                  {submission.license} License
                </div>
              </div>
              <div class="col-span-1 flex justify-center items-center">
                <NavLink target="_blank" href={submission.url}>
                  <Icon class="w-12 text-solid-medium" path={globe} />
                </NavLink>
              </div>
              <div class="col-span-1 flex justify-center items-center">
                <NavLink target="_blank" href={submission.github}>
                  <Icon class="w-12 text-solid-medium" path={code} />
                </NavLink>
              </div>
              <div class="col-span-1 flex justify-center items-center">
                <Icon class="w-12 text-solid-medium" path={star} />
              </div>
            </li>
          );
        }}
      </For>
    </ul>
  );
};

const CategoryButton: Component<{
  id: string;
  title: string;
  image: string;
}> = (props) => {
  return (
    <NavLink
      href={`/submissions/${props.id}`}
      activeClass="bg-solid-medium border-solid-medium"
      class="flex flex-col text-center items-center justify-center border-2 p-5 border-white bg-white/80 rounded-lg shadow-lg "
    >
      <figure class="rounded-full w-20 h-20 bg-solid-medium flex p-2 mb-2">
        <img alt="Award" src={props.image} />
      </figure>
      {props.title}
    </NavLink>
  );
};

const Submissions: Component = () => {
  const data = useRouteData<{ submissions: Submission[]; category: string }>();
  return (
    <div class="w-full py-6 bg-hack bg-no-repeat bg-top bg-contain bg-fixed">
      <div class="container px-7 grid grid-cols-10 relative gap-0">
        <div class="col-span-2 leading-7">
          <div class="sticky top-20 px-4 space-y-2">
            <CategoryButton
              id="best_app"
              title="Best App"
              image="/img/award-best-app.svg"
            />
            <CategoryButton
              id="best_ecosystem"
              title="Best Ecosystem Utility"
              image="/img/award-ecosystem.svg"
            />
            <CategoryButton
              id="best_student_project"
              title="Best Student Project"
              image="/img/award-student-project.svg"
            />
            <div class="pt-3 text-center text-xs">
              Star votes remaining:
              <div class="mt-3 flex px-3 justify-between">
                <Icon class="w-12 text-gray-400" path={star} />
                <Icon class="w-12 text-gray-400" path={star} />
                <Icon class="w-12 text-gray-400" path={star} />
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-8 rounded-lg leading-7 shadow-2xl bg-white/80">
          <CategoryList
            submissions={data.submissions}
            title="Best Student Project Award"
          />
        </div>
      </div>
    </div>
  );
};

export default Submissions;
