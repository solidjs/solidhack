import {
  Component,
  Switch,
  Match,
  Show,
  on,
  createEffect,
  createSignal,
  createMemo,
} from "solid-js";
import { Transition } from "solid-transition-group";
import { useI18n } from "@solid-primitives/i18n";
import { useData, useLocation } from "solid-app-router";
import Nav from "./Nav";
import { reflow } from "../utils";
import { routeReadyState, page } from "../utils/routeReadyState";
import { ResourceMetadata } from "@solid.js/docs";

const Header: Component<{ title?: string }> = () => {
  const [t] = useI18n();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const noSmallHeader = !isHome && !location.pathname.includes("tutorial");
  const [showLogo, setShowLogo] = createSignal(true);
  const [showHeaderSmall, setShowHeaderSmall] = createSignal(noSmallHeader);

  const data = useData<{ guides: ResourceMetadata[] | undefined }>();

  const guideName = createMemo(() => {
    if (data?.guides) {
      const resource = location.pathname.slice(1);
      return data?.guides.find((metadata) => metadata.resource == resource)
        ?.title;
    }
  });

  createEffect(() => {});
  createEffect(
    on(
      routeReadyState,
      (readyState) => {
        if (readyState.loading) return;
        const result = location.pathname !== "/";
        const noHeaderSmall = result && !location.pathname.includes("tutorial");

        setShowHeaderSmall(noHeaderSmall);
        setShowLogo(result);
      },
      { defer: true }
    )
  );
  const Title: Component = (props) => (
    <span class="inline-block transition-all duration-200">
      {props.children}
    </span>
  );
  return (
    <>
      <Nav showLogo={showLogo()} />
      <div>
        <Transition onEnter={onEnterSmallHeader} onExit={onExitSmallHeader}>
          <Show
            when={showHeaderSmall() && !location.pathname.includes("/hack")}
          >
            <header class="overflow-hidden">
              <div class="bg-gradient-to-r from-solid-light via-solid-medium to-solid-default text-white text-center md:text-left rtl:text-right">
                <div class="px-3 lg:px-12 container">
                  <h1 class="py-8 text-3xl">
                    <Transition
                      enterClass="translate-x-5 opacity-0"
                      enterToClass="translate-x-0 opacity-100"
                      exitClass="translate-x-0 opacity-100"
                      exitToClass="translate-x-5 opacity-0"
                      mode="inout"
                    >
                      <Switch>
                        <Match when={location.pathname.includes("/blog")}>
                          <Title>{t("global.blog.title", {}, "Blog")}</Title>
                        </Match>
                        <Match when={location.pathname.includes("/guide")}>
                          <Title>
                            {t("guides.title", {}, "Guides")}
                            {guideName() && ":"}
                            <span class="pl-2">{guideName()}</span>
                          </Title>
                        </Match>
                        <Match when={location.pathname.includes("/docs")}>
                          <Title>{t("docs.title", {}, "Guides")}</Title>
                        </Match>
                        <Match when={location.pathname.includes("/resources")}>
                          <Title>{t("resources.title", {}, "Guides")}</Title>
                        </Match>
                        <Match when={location.pathname.includes("/examples")}>
                          <Title>{t("examples.title", {}, "Guides")}</Title>
                        </Match>
                        <Match when={location.pathname.includes("/media")}>
                          <Title>{t("media.title", {}, "Guides")}</Title>
                        </Match>
                        <Match when={location.pathname.includes("/blog")}>
                          <Title>{t("blog.title", {}, "Blog")}</Title>
                        </Match>
                        <Match
                          when={location.pathname.includes("/contributors")}
                        >
                          <Title>
                            {t(
                              "contributors.title",
                              {},
                              "Team & Contributions"
                            )}
                          </Title>
                        </Match>
                      </Switch>
                    </Transition>
                  </h1>
                </div>
              </div>
            </header>
          </Show>
        </Transition>
      </div>
    </>
  );
};

const pageTransitionDuration = 500;

const onEnterSmallHeader = (el: Element, done: () => void) => {
  const headerEl = el as HTMLElement;
  const bgContainerEl = el.firstElementChild as HTMLElement;

  const contentEl = bgContainerEl.firstElementChild as HTMLElement;
  const mainContentChild = document.getElementById("main-content")
    ?.firstElementChild as HTMLElement;
  const headerHeight = bgContainerEl.clientHeight + "px";
  const elements = [bgContainerEl, headerEl, contentEl, mainContentChild];

  bgContainerEl.style.transform = `translateY(-100%)`;
  contentEl.style.transform = `translateY(100%)`;
  mainContentChild.style.transform = `translateY(-${headerHeight})`;

  reflow();
  elements.forEach((el) => {
    el.style.transform = "translateY(0)";
    el.style.transition = `transform ${pageTransitionDuration}ms`;
  });

  bgContainerEl.addEventListener(
    "transitionend",
    (e) => {
      if (e.target !== e.currentTarget) return;

      elements.forEach((el) => {
        el.style.transition = "";
        el.style.transform = "";
      });

      done();
    },
    { once: true }
  );
};

const onExitSmallHeader = (el: Element, done: () => void) => {
  const headerEl = el as HTMLElement;
  const bgContainerEl = headerEl.firstElementChild as HTMLElement;
  const contentEl = bgContainerEl.firstElementChild as HTMLElement;
  const mainContentChild = document.getElementById("main-content")
    ?.firstElementChild as HTMLElement;
  const headerHeight = headerEl.clientHeight;
  const navHeight = 64;
  const elements = [bgContainerEl, contentEl, mainContentChild];

  if (page.scrollY >= headerHeight + navHeight) {
    headerEl.style.height = "0px";
    // @ts-ignore
    window.scrollTo({ top: 0, behavior: "instant" });
    return done();
  }

  bgContainerEl.style.transform = `translateY(-100%)`;
  contentEl.style.transform = `translateY(100%)`;
  mainContentChild.style.transform = `translateY(-${headerHeight}px)`;
  elements.forEach((el) => {
    el.style.transition = `transform ${pageTransitionDuration}ms`;
  });

  bgContainerEl.addEventListener(
    "transitionend",
    (e) => {
      if (e.target !== e.currentTarget) return;

      elements.forEach((el) => {
        el.style.transition = "";
        el.style.transform = "";
      });

      done();
    },
    { once: true }
  );
};
export default Header;
