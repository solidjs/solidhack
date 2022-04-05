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
      class="flex flex-col text-center text-[14px] lg:text-[16px] md:pb-1 md:p-2 items-center justify-center border-2 p-3 lg:p-5 border-white bg-white/80 rounded-lg shadow-lg "
    >
      <figure class="rounded-full w-[60px] h-[60px] lg:w-20 lg:h-20 bg-solid-medium flex p-1 lg:p-2 mb-2">
        <img alt="Award" src={props.image} />
      </figure>
      {props.title}
    </NavLink>
  );
};

const Submissions: Component = () => {
  const data = useRouteData<{ submissions: Submission[]; category: string }>();

  return (
    <div class="w-full lg:py-6 bg-hack bg-no-repeat bg-top bg-contain bg-fixed">
      <div class="container pt-[18px] px-7 grid lg:pt-0 lg:grid-cols-10 relative gap-4 lg:gap-0">
        <div
          class="fixed top-0 left-0 w-full h-[220px] z-1 lg:hidden"
          style="background-size: cover;background-position: top;background-repeat: no-repeat;z-index: 1;background-image: url(/img/hack/banner.png), linear-gradient(180deg, white 60%, transparent 75%);"
        ></div>
        <div class="sticky top-16 lg:top-20 lg:col-span-2 leading-7 h-max z-1 pb-[35px] backdrop-blur-[5px] lg:backdrop-blur-none firefox:bg-gradient-transparent-40%-white-40% bg-gradient-white-40%-to-white/0.5-50% mask-image-[linear-gradient(to_bottom,black_calc(100%-30px),transparent)] lg:mask-image-none">
          <div class="grid gap-2 grid-cols-[1fr,120px] md:grid-cols-[1fr,1fr,1fr,120px] lg:grid-cols-full lg:px-4">
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
            <div class="pt-3 text-center text-[10px] lg:text-xs rounded-lg bg-gradient-white/0.95-15%-to-transparent lg:bg-none">
              Star votes remaining:
              <div class="mt-3 flex px-3 justify-between">
                <Icon class="w-12 text-gray-400" path={star} />
                <Icon class="w-12 text-gray-400" path={star} />
                <Icon class="w-12 text-gray-400" path={star} />
              </div>
            </div>
          </div>
        </div>
        <div class="lg:col-span-8 rounded-lg leading-7 shadow-2xl bg-white/80 min-h-[1500px]">
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
