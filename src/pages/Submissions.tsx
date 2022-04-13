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
import {
  link,
  code,
  star,
  x,
  questionMarkCircle,
} from "solid-heroicons/outline";
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
  const maxVotes = createMemo(() => {
    const list = votes();
    return (
      list[params.category].selections.length >= list[params.category].total
    );
  });
  return (
    <li class="p-4 py-6 md:p-12 relative">
      <div class="col-span-9">
        {/* used for wrapping text around top right triangle banner */}
        <div
          class="float-right w-[45px] h-[45px] md:w-[25px] md:h-[25px] xl:w-[85px] xl:h-[85px]"
          style="shape-outside: polygon(0 0, 100% 0, 100% 100%, 90% 100%, 0 10%); clip-path: polygon(100% 0, 0 0, 100% 100%);"
        ></div>
        <h3 class="text-xl sm:text-2xl font-semibold text-solid-medium">
          <NavLink href={props.github} target="_blank">
            {props.title}
          </NavLink>
        </h3>
        {props.description}
        <div class="text-xs sm:text-[13px] sm:leading-[1.2rem]  my-3">
          {props.info}
        </div>
        <div class="text-xs mt-3">
          Submitted by&nbsp;
          <For each={props.contributors}>
            {(contributor, index) => (
              <>
                <Show fallback={contributor.name} when={contributor.url !== ""}>
                  <a
                    target="_blank"
                    class="hover:text-solid-medium"
                    href={contributor.url}
                  >
                    {contributor.name}
                  </a>
                </Show>
                <Show when={index() != props.contributors.length - 1}>, </Show>
              </>
            )}
          </For>
        </div>
        <div class="text-xs text-gray-400">{props.license} License</div>
      </div>

      <div class="flex space-x-2 mt-3 -ml-3 mb-[-20px]">
        <Show when={props.url !== "" && props.url !== props.github}>
          <NavLink
            target="_blank"
            href={props.url}
            title="Link to demo/homepage"
            class="hover:opacity-50 transition"
          >
            <div class="p-3">
              <Icon
                class="w-8 text-solid-medium"
                stroke-width={2}
                path={link}
              />
            </div>
          </NavLink>
        </Show>
        <NavLink
          target="_blank"
          href={props.github}
          title="Link to source code"
          class="hover:opacity-50 transition"
        >
          <div class="p-3">
            <Icon class="w-8 text-solid-medium" stroke-width={2} path={code} />
          </div>
        </NavLink>
      </div>
      <Show when={context.user}>
        <button
          class="absolute top-0 right-0 bg-[#f8f9fcff] pointer-fine:hover:bg-[#eef0f6] w-[75px] h-[75px] md:w-[115px] md:h-[115px] xl:w-[180px] xl:h-[180px] flex justify-end cursor-pointer"
          style="clip-path: polygon(100% 0, 0 0, 100% 100%);"
          disabled={maxVotes() && !selected()}
          title="Toggle your vote"
          onClick={async () => {
            setVoting(true);
            try {
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
            } catch (err) {
              setVoting(false);
            }
          }}
        >
          <div class="flex w-[40px] h-[40px] m-1 md:w-[50px] md:h-[50px] md:m-2 xl:w-[70px] xl:h-[70px] xl:m-3 justify-center items-center">
            <Show fallback={<Loader />} when={!voting()}>
              <Show
                fallback={
                  <Icon
                    class="w-full h-full text-solid-medium"
                    stroke-width={1.2}
                    path={star}
                  />
                }
                when={selected()}
              >
                <div class="relative">
                  <Icon class="w-full h-full text-star" path={solidStar} />
                </div>
              </Show>
            </Show>
          </div>
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
      <span class="leading-[1.5em] md:text-center text-[13px] lg:text-[16px] md:whitespace-nowrap lg:whitespace-normal">
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
      class="flex w-full h-full gap-2 p-1 items-center border-2 lg:p-5 border-white bg-white/80 has-backdrop-filter:bg-white/10 rounded-lg shadow-lg"
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

const QuestionModal: Component = () => {
  const context = useAppContext();
  const lsKey = "submission-dialog-rules";
  const getLS = () => {
    try {
      if (!context.user) {
        return true;
      }
      const resultStr = localStorage.getItem(lsKey)!;
      if (!resultStr) return true;
      const result = JSON.parse(resultStr);
      return result.open === "true";
    } catch {
      return true;
    }
  };
  const [toggle, setToggle] = createSignal(getLS());
  let btnEl!: HTMLButtonElement;

  onMount(() => {
    localStorage.setItem(lsKey, JSON.stringify({ open: true }));
  });

  return (
    <>
      <button
        class="fixed bottom-0 left-0 text-solid-medium p-1 m-2 w-11 h-11 z-50 bg-white rounded-full shadow-lg"
        aria-label="open questions about submissions dialog"
        ref={btnEl}
      >
        <Icon stroke-width={1.5} path={questionMarkCircle} />
      </button>
      <Dismiss
        menuButton={btnEl}
        open={toggle}
        setOpen={setToggle}
        modal
        // this should be done by default with modal prop but fails to focus on modal container, without it the focus is on body not modal container
        focusElementOnOpen="menuPopup"
      >
        <div class="fixed top-0 left-0 bg-slate-900/20 h-screen w-screen flex justify-center items-center">
          <div
            class="relative bg-white rounded-lg shadow-lg p-6 py-12 mx-3"
            role="dialog"
          >
            <p class="text-lg max-w-lg">
              <Show
                fallback={"Voting is now open! All eligible voters have"}
                when={context.user}
              >
                You have
              </Show>{" "}
              <strong class="font-semibold">three votes</strong>{" "}
              <span class="inline-flex space-x-1 text-solid-medium relative top-[3px]">
                <For each={[0, 0, 0]}>
                  {() => <Icon class="w-5 h-5" path={star} />}
                </For>
              </span>{" "}
              per category.
            </p>
            <br />
            <p>There are three categories in total:</p>
            <ul class="ml-3 my-3 flex flex-col space-y-3">
              <li class="flex space-x-3 items-center">
                <img
                  class="inline-block rounded-full w-12 h-12 bg-solid-medium p-1"
                  src="/img/award-best-app.svg"
                  alt="award"
                />
                <span>Best App</span>
              </li>
              <li class="flex space-x-3 items-center">
                <img
                  class="inline-block rounded-full w-12 h-12 bg-solid-medium p-1"
                  src="/img/award-ecosystem.svg"
                  alt="award"
                />
                <span>Best Ecosystem Utility</span>
              </li>
              <li class="flex space-x-3 items-center">
                <img
                  class="inline-block rounded-full w-12 h-12 bg-solid-medium p-1"
                  src="/img/award-student-project.svg"
                  alt="award"
                />
                <span>Best Student Project</span>
              </li>
            </ul>
            <br />
            <p>
              So in total you have 9 votes. You can only cast 3 votes per
              category. <br /> Your casted vote show as a filled{" "}
              <span class="whitespace-nowrap">
                star{" "}
                <span class="inline-block relative top-[3px]">
                  <Icon class="w-5 h-5 text-star" path={solidStar} />
                </span>
              </span>
            </p>
            <Show when={!context.user}>
              <p class="mt-5 max-w-lg">
                In order to cast your vote you must sign into GitHub to ensure
                voting is limited and fair for contestants.
              </p>
            </Show>
            <div class="flex justify-center mt-6 -mb-6 space-x-2">
              <Show when={!context.user}>
                <a
                  class="bg-solid-default hover:opacity-90 transition rounded-md text-white px-5 py-2"
                  href={`${context.apiurl}/auth/login?redirect=${window.location.href}?auth=success`}
                >
                  Sign into GitHub
                </a>
                <button
                  class="bg-solid-default hover:opacity-90 transition rounded-md text-white px-5 py-2"
                  onClick={() => setToggle(false)}
                >
                  Just browsing
                </button>
              </Show>
              <Show when={context.user}>
                <button
                  class="bg-solid-default hover:opacity-90 transition rounded-md text-white px-5 py-2"
                  onClick={() => setToggle(false)}
                >
                  Let's vote!
                </button>
              </Show>
            </div>
            <button
              class="absolute top-0 right-0 p-2 text-gray-400 hover:text-black transition"
              onClick={() => setToggle(false)}
            >
              <Icon class="w-8 h-8" path={x} />
            </button>
          </div>
        </div>
      </Dismiss>
    </>
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
    <>
      <QuestionModal />
      <SubmissionContext.Provider
        value={{
          votes,
          playConfetti,
          updateVotes: mutate,
        }}
      >
        <canvas
          ref={(ref) => (canvasRef = ref)}
          class="h-full w-full fixed top-0 left-0"
        />
        <div class="w-full lg:py-6 bg-hack bg-no-repeat bg-top bg-contain bg-fixed">
          <div class="container pt-[18px] px-7 grid lg:pt-0 lg:grid-cols-10 relative">
            <div class="fixed top-0 left-0 w-full h-[220px] z-1 lg:hidden bg-cover bg-image-[url(/img/hack/banner.png),linear-gradient(180deg,white_45%,transparent_60%)] md:bg-image-[url(/img/hack/banner.png),linear-gradient(180deg,white_70%,transparent_85%)] pointer-events-none"></div>
            <div
              class={`
          sticky top-16 lg:top-20 lg:col-span-2 leading-7 h-max z-1 rounded-lg pointer-events-none
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
            lg:bg-none
          `}
              >
                <div class="grid gap-2 grid-cols-[1fr,110px] md:grid-cols-[1fr,160px] lg:grid-cols-full lg:px-4 pointer-events-auto">
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
                      <div class="absolute top-16 left-0 w-full bg-white rounded-lg pl-5 shadow-lg pointer-events-auto">
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
                      <div class="md:pt-5 text-center text-[11px] lg:text-xs rounded-lg md:bg-gradient-white/0.95-15%-to-transparent lg:bg-none">
                        <span class="hidden md:block">
                          Remaining category votes
                        </span>
                        <span class="md:hidden">Remaining votes</span>
                        <div class="md:mt-3 flex px-3 justify-between">
                          <For each={votes()[params.category].selections}>
                            {() => (
                              <button class="pointer">
                                <Icon
                                  class="w-full h-full lg:w-12 text-star"
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
                              <Icon
                                class="w-full h-full lg:w-12 text-gray-400"
                                path={star}
                              />
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
    </>
  );
};

export default Submissions;
