import {
  Component,
  createResource,
  createContext,
  useContext,
  createMemo,
  createSignal,
  For,
  Show,
  Accessor,
  Setter,
  onMount,
} from "solid-js";
import Loader from "../components/Loader";
import JSConfetti from "js-confetti";
import { NavLink, useParams, useRouteData } from "solid-app-router";
import { globe, code, star } from "solid-heroicons/outline";
import { star as solidStar } from "solid-heroicons/solid";
import { Icon } from "solid-heroicons";
import { chevronLeft } from "solid-heroicons/outline";
import Dismiss from "solid-dismiss";
import { Repeat } from "@solid-primitives/range";
import { useAppContext } from "../AppContext";

type Votes = {
  total: number;
  selections: string[];
};

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
type SubmissionContextType = {
  votes: Accessor<{ [category: string]: Votes }>;
  updateVotes: Setter<any>;
  playConfetti: () => void;
};

const SubmissionContext = createContext<SubmissionContextType>({
  votes: () => {},
  updateVotes: (_data: any) => undefined,
  playConfetti: () => undefined,
} as SubmissionContextType);

const SubmissionRow: Component<Submission & { index: number }> = (props) => {
  const context = useAppContext();
  const params = useParams<{ category: "best_app" }>();
  const [voting, setVoting] = createSignal(false);
  const { updateVotes, votes, playConfetti } = useContext(SubmissionContext);
  const selected = createMemo(() => {
    const list = votes();
    return list[params.category].selections.includes(props.title);
  });
  return (
    <li class="grid grid-cols-12 p-12 pl-2">
      <div class="col-span-1 text-solid-medium font-semibold flex text-lg justify-center">
        {props.index + 1}
      </div>
      <div class="col-span-8">
        <h3 class="text-2xl font-semibold text-solid-medium">{props.title}</h3>
        {props.description}
        <div class="text-xs my-3">{props.info}</div>
        <div class="text-sm mt-3">
          Submitted by&nbsp;
          <For each={props.contributors}>
            {(contributor, index) => (
              <>
                <a href={contributor.email}>{contributor.name}</a>
                <Show when={index() != props.contributors.length - 1}>,</Show>
              </>
            )}
          </For>
        </div>
        <div class="text-sm text-gray-400">{props.license} License</div>
      </div>
      <div class="col-span-1 flex justify-center items-center">
        <NavLink target="_blank" href={props.url}>
          <Icon class="w-12 text-solid-medium" path={globe} />
        </NavLink>
      </div>
      <div class="col-span-1 flex justify-center items-center">
        <NavLink target="_blank" href={props.github}>
          <Icon class="w-12 text-solid-medium" path={code} />
        </NavLink>
      </div>
      <Show when={context.user}>
        <button
          onClick={async () => {
            setVoting(true);
            const result = await fetch(`${context.apiurl}/hack/votes`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${
                  context.user ? context.user.token : ""
                }`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                category: params.category,
                selection: props.title,
              }),
            });
            if (selected() == false) {
              playConfetti();
            }
            updateVotes(await result.json());
            setVoting(false);
          }}
          class="col-span-1 flex justify-center items-center"
        >
          <Show fallback={<Loader />} when={!voting()}>
            <Show
              fallback={<Icon class="w-12 text-solid-medium" path={star} />}
              when={selected()}
            >
              <Icon class="w-12 text-yellow-500" path={solidStar} />
            </Show>
          </Show>
        </button>
      </Show>
    </li>
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
  const context = useAppContext();
  const params = useParams<{ category: "best_app" }>();
  const data = useRouteData<{ submissions: Submission[]; category: string }>();
  const [toggle, setToggle] = createSignal(false);
  const [votes, { mutate }] = createResource(
    () => context.user,
    async () =>
      (
        await fetch(`${context.apiurl}/hack/votes`, {
          headers: {
            Authorization: `Bearer ${context.user ? context.user.token : ""}`,
          },
        })
      ).json(),
    {
      initialValue: {
        best_student_project: {
          total: 3,
          selections: [],
        },
        best_app: {
          total: 3,
          selections: [],
        },
        best_ecosystem: {
          total: 3,
          selections: [],
        },
      },
    }
  );
  const categories = {
    best_app: {
      title: "Best App",
      image: "/img/award-best-app.svg",
    },
    best_ecosystem: {
      title: "Best Ecosystem Utility",
      image: "/img/award-ecosystem.svg",
    },
    best_student_project: {
      title: "Best Student Project",
      image: "/img/award-student-project.svg",
    },
  };
  let canvasRef: HTMLCanvasElement;
  let buttonEl!: HTMLButtonElement;
  let stickyContainerEl!: HTMLDivElement;
  let jsConfetti: JSConfetti;
  let playConfetti: () => void = () => {
    jsConfetti.addConfetti({
      confettiColors: [
        "#ff0a54",
        "#ff477e",
        "#ff7096",
        "#ff85a1",
        "#fbb1bd",
        "#2c4f7c",
        "#335d92",
        "#446b9e",
      ],
    });
  };
  onMount(() => (jsConfetti = new JSConfetti({ canvas: canvasRef })));

  return (
    <SubmissionContext.Provider
      value={{
        votes,
        playConfetti,
        updateVotes: mutate,
      }}
    >
      <canvas ref={(ref) => (canvasRef = ref)} class="h-full w-full absolute" />
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
                    title={categories[params.category].title}
                    image={categories[params.category].image}
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
                      <For each={Object.entries(categories)}>
                        {([id, { title, image }]) => {
                          return (
                            <CategoryItem
                              id={id}
                              title={title}
                              image={image}
                              onClick={() => {
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
                  <For each={Object.entries(categories)}>
                    {([id, { image, title }]) => {
                      return (
                        <CategoryButton id={id} title={title} image={image} />
                      );
                    }}
                  </For>
                </div>
                <Show when={context.user}>
                  <Show
                    fallback={
                      <div class="flex py-8 justify-center">
                        Loading votes...
                      </div>
                    }
                    when={!votes.loading}
                  >
                    <div class="md:pt-5 text-center text-[10px] lg:text-xs rounded-lg md:bg-gradient-white/0.95-15%-to-transparent lg:bg-none">
                      Remaining category votes:
                      <div class="md:mt-3 flex px-3 justify-between">
                        <For each={votes()[params.category].selections}>
                          {() => (
                            <button class="pointer">
                              <Icon
                                class="w-12 text-yellow-500"
                                path={solidStar}
                              />
                            </button>
                          )}
                        </For>
                        <Repeat
                          times={
                            votes()[params.category].total -
                            votes()[params.category].selections.length
                          }
                        >
                          <button class="pointer">
                            <Icon class="w-12 text-gray-400" path={star} />
                          </button>
                        </Repeat>
                      </div>
                    </div>
                  </Show>
                </Show>
              </div>
            </div>
          </div>
          <div class="lg:col-span-8 rounded-lg leading-7 shadow-2xl bg-white/80 min-h-[1500px]">
            <ul class="divide-y divide-gray-200">
              <For each={data.submissions}>
                {(submission, index) => (
                  <SubmissionRow index={index()} {...submission} />
                )}
              </For>
            </ul>
          </div>
        </div>
      </div>
    </SubmissionContext.Provider>
  );
};

export default Submissions;
