import { Component, createEffect, createSignal, For, Show } from "solid-js";
import { NavLink, useRouteData } from "solid-app-router";
import { globe, code, star } from "solid-heroicons/outline";
import { Icon } from "solid-heroicons";
import { chevronLeft } from "solid-heroicons/outline";
import Dismiss from "solid-dismiss";

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
      class="flex flex-col gap-2 p-1 md:p-3 md:pb-1 items-center justify-center border-2 lg:p-5 border-white bg-white/80 has-backdrop-filter:bg-white/10 lg:bg-white/80 rounded-lg shadow-lg "
    >
      <figure class="rounded-full shrink-0 w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-20 lg:h-20 bg-solid-medium flex p-1 lg:p-2">
        <img alt="Award" src={props.image} />
      </figure>
      <span class="leading-[1.5em] md:text-center text-[14px] lg:text-[16px]">
        {props.title}
      </span>
    </NavLink>
  );
};

const CategoryItem: Component<{
  id: string;
  title: string;
  image: string;
  onClick: () => void;
}> = (props) => {
  return (
    <NavLink
      href={`/submissions/${props.id}`}
      onClick={props.onClick}
      class="flex w-full gap-2 py-4 items-center"
    >
      <figure class="rounded-full shrink-0 w-[40px] h-[40px] bg-solid-medium flex p-1">
        <img alt="Award" src={props.image} />
      </figure>
      <span class="leading-[1.5em] text-left">{props.title}</span>
    </NavLink>
  );
};

const DropdownButton: Component<{
  image: string;
  title: string;
  active: boolean;
  ref: any;
}> = (props) => {
  return (
    <button
      class="flex w-full gap-2 p-1 items-center border-2 lg:p-5 border-white bg-white/80 has-backdrop-filter:bg-white/10 rounded-lg shadow-lg"
      ref={props.ref}
    >
      <figure class="rounded-full shrink-0 w-[40px] h-[40px] bg-solid-medium flex p-1">
        <img alt="Award" src={props.image} />
      </figure>
      <span class="leading-[1.5em] text-left text-xs sm:text-base">
        {props.title}
      </span>
      <div class="flex justify-center items-center ml-auto">
        <Icon
          class="w-5 transition-composite"
          classList={{ "-rotate-90": props.active }}
          path={chevronLeft}
        />
      </div>
    </button>
  );
};

const Submissions: Component = () => {
  const data = useRouteData<{ submissions: Submission[]; category: string }>();
  const [toggle, setToggle] = createSignal(false);
  const [activeCategory, setActiveCategory] = createSignal({
    id: "best_app",
    title: "Best App",
    image: "/img/award-best-app.svg",
  });
  const categories = [
    {
      id: "best_app",
      title: "Best App",
      image: "/img/award-best-app.svg",
    },
    {
      id: "best_ecosystem",
      title: "Best Ecosystem Utility",
      image: "/img/award-ecosystem.svg",
    },
    {
      id: "best_student_project",
      title: "Best Student Project",
      image: "/img/award-student-project.svg",
    },
  ];
  let buttonEl!: HTMLButtonElement;
  let stickyContainerEl!: HTMLDivElement;

  return (
    <div class="w-full lg:py-6 bg-hack bg-no-repeat bg-top bg-contain bg-fixed">
      <div class="container pt-[18px] px-7 grid lg:pt-0 lg:grid-cols-10 relative">
        <div class="fixed top-0 left-0 w-full h-[220px] z-1 lg:hidden bg-cover bg-image-[url(/img/hack/banner.png),linear-gradient(180deg,white_45%,transparent_60%)] md:bg-image-[url(/img/hack/banner.png),linear-gradient(180deg,white_70%,transparent_85%)]"></div>
        <div
          class={`
          sticky top-16 lg:top-20 lg:col-span-2 leading-7 h-max z-1 rounded-lg
          `}
          ref={stickyContainerEl}
        >
          <div
            class={`
            pb-[35px]
            bg-gradient-transparent-40%-white-40% has-backdrop-filter:bg-gradient-white-40_percent-to-white-50_percent 
            mask-image-[linear-gradient(to_bottom,black_calc(100%-30px),transparent)]
            backdrop-blur-[8px] md:backdrop-blur-[5px] lg:backdrop-blur-none 
            lg:mask-image-none
          `}
          >
            <div class="grid gap-2 grid-cols-[1fr,110px] md:grid-cols-[1fr,120px] lg:grid-cols-full lg:px-4">
              <div class="md:hidden relative w-full">
                <DropdownButton
                  title={activeCategory().title}
                  image={activeCategory().image}
                  active={toggle()}
                  ref={buttonEl}
                />
                <Dismiss
                  menuButton={buttonEl}
                  open={toggle}
                  setOpen={setToggle}
                  mount={stickyContainerEl}
                  animation={{
                    enterClass: "opacity-0 translate-x-[-20%]",
                    enterToClass:
                      "opacity-1 translate-x-0 transition-composite duration-200",
                    exitClass: "opacity-1 translate-x-0",
                    exitToClass:
                      "opacity-0 translate-x-[-20%] transition-composite duration",
                    appendToElement: "menuPopup",
                  }}
                >
                  <div class="absolute top-16 left-0 w-full bg-white rounded-lg pl-5 shadow-lg">
                    <For each={categories}>
                      {({ id, image, title }) => {
                        return (
                          <CategoryItem
                            id={id}
                            title={title}
                            image={image}
                            onClick={() => {
                              setActiveCategory(
                                categories.find((item) => item.id === id)!
                              );
                              setToggle(false);
                            }}
                          />
                        );
                      }}
                    </For>
                  </div>
                </Dismiss>
              </div>
              <div class="hidden md:grid gap-2 md:grid-cols-[1fr,1fr,1fr] lg:grid-cols-full">
                <For each={categories}>
                  {({ id, image, title }) => {
                    return (
                      <CategoryButton id={id} title={title} image={image} />
                    );
                  }}
                </For>
              </div>

              <div class="md:pt-3 text-center text-[10px] lg:text-xs rounded-lg md:bg-gradient-white/0.95-15%-to-transparent lg:bg-none">
                Star votes remaining:
                <div class="md:mt-3 flex px-3 justify-between">
                  <Icon class="w-12 text-gray-400" path={star} />
                  <Icon class="w-12 text-gray-400" path={star} />
                  <Icon class="w-12 text-gray-400" path={star} />
                </div>
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
