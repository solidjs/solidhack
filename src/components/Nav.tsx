import { Component, For, createMemo, createSignal, Show, on } from "solid-js";
import { Link, NavLink } from "solid-app-router";
import { useI18n } from "@solid-primitives/i18n";
import ScrollShadow from "./ScrollShadow/ScrollShadow";
import { useAppContext } from "../AppContext";

type MenuLinkProps = {
  title: string;
  description: string;
  path: string;
  external?: boolean;
  end?: boolean;
  setSubnav: (children: MenuLinkProps[]) => void;
  setSubnavPosition: (position: number) => void;
  closeSubnav: () => void;
  clearSubnavClose: () => void;
  links: MenuLinkProps[];
  direction: "ltr" | "rtl";
};

const LanguageSelector: Component<{
  ref: HTMLButtonElement;
  class?: string;
}> = (props) => (
  <li class={props.class || ""}>
    <button
      aria-label="Select Language"
      ref={props.ref}
      class="dark:brightness-150 focus:color-red-500 bg-no-repeat bg-center hover:border-gray-500 cursor-pointer dark:border-gray-600 dark:hover:border-gray-500 px-6 pl-4 ml-2 rounded-md  border border-solid-100 pt-4 text-sm my-3 w-full"
      style={{
        "background-image": "url(/img/icons/translate2.svg)",
        "background-size": "24px",
      }}
    />
  </li>
);

const Nav: Component<{ showLogo?: boolean; filled?: boolean }> = (props) => {
  const [subnav, setSubnav] = createSignal<MenuLinkProps[]>([]);
  const [subnavPosition] = createSignal<number>(0);
  const [locked] = createSignal<boolean>(props.showLogo || true);
  const [t, { locale }] = useI18n();
  const context = useAppContext();

  let langBtnTablet!: HTMLButtonElement;
  let langBtnDesktop!: HTMLButtonElement;
  let logoEl!: HTMLDivElement;
  let subnavEl!: HTMLDivElement;

  const logoPosition = () =>
    t("global.dir", {}, "ltr") === "rtl"
      ? "right-3 lg:right-12 pl-[10px] lg:pl-5"
      : "left-3 lg:left-12 pr-[10px] lg:pr-5";

  const navListPosition = () => {
    const isRTL = t("global.dir", {}, "ltr") === "rtl";
    if (isRTL) {
      return showLogo() && "";
    }
    return showLogo() && "";
  };

  const showLogo = createMemo(() => props.showLogo || !locked());
  const navList = createMemo<MenuLinkProps[]>(
    on(
      () => [locale, t("global.nav"), context.guides],
      () => {
        return (t("global.nav") || []).reduce((memo: any, item: any) => {
          let itm = { ...item };
          // Inject guides if available
          if (item.path == "/guides") {
            if (context.guides?.length) {
              const direction = context.guidesSupported
                ? t("global.dir", {}, "ltr")
                : "ltr";
              itm.links = context.guides.map(
                ({ title, description, resource }) => ({
                  title,
                  description,
                  direction,
                  path: `/${resource}`,
                })
              );
              itm.direction = direction;
            }
          }
          memo.push(itm);
          return memo;
        }, []);
      }
    )
  );

  return (
    <div
      class="sticky top-0 z-50 bg-white"
      classList={{ "shadow-md": showLogo() }}
    >
      <div class="flex justify-center w-full overflow-hidden">
        <nav class="relative px-3 lg:px-12 container flex h-[46px] sm:h-[56px] justify-between items-center max-h-18 z-20">
          <div
            // In Chrome this flex intrinsic sizing works but in Firefox/Safari it doesn't. This is why width is declared
            class={`flex w-[193px] sm:w-[272px] ${logoPosition()} h-full nav-logo-bg`}
            ref={logoEl}
          >
            <Link href="/" noScroll class={`py-3 inline-flex w-50 space-x-4`}>
              <span class="sr-only">Navigate to the home page</span>
              <img
                class="w-auto h-full"
                src="/img/hack/icon.png"
                alt="Solid logo"
              />
              <img
                class="w-auto h-full"
                src="/img/hack/title.png"
                alt="Solid logo"
              />
            </Link>
          </div>
          <ScrollShadow
            class={`group relative nav-items-container ${navListPosition()}`}
            direction="horizontal"
            rtl={t("global.dir", {}, "ltr") === "rtl"}
            shadowSize="25%"
            initShadowSize={true}
            locked={showLogo()}
          >
            <ul class="flex items-center">
              <For each={navList()}>
                {(item) => (
                  <NavLink
                    href={item.path}
                    end={item.end}
                    target={item.external ? "_blank" : ""}
                    class="inline-flex items-center transition text-[15px] sm:text-base m-0 sm:m-1 px-3 sm:px-4 py-3 rounded pointer-fine:hover:text-solid-medium whitespace-nowrap"
                    activeClass="text-solid-medium font-semibold"
                  >
                    {item.title}
                  </NavLink>
                )}
              </For>
              <LanguageSelector ref={langBtnTablet} class="hidden" />
            </ul>
          </ScrollShadow>
          <ul class="hidden lg:flex items-center">
            <LanguageSelector ref={langBtnDesktop} class="hidden" />
          </ul>
        </nav>
      </div>
      <Show when={subnav().length !== 0}>
        <div
          ref={subnavEl}
          class="absolute left-50 bg-gray-200 dark:bg-solid-darkLighterBg shadow-2xl max-w-sm transition duration-750"
          style={{ left: `${subnavPosition()}px` }}
        >
          <ul class="divide-x divide-transparent flex flex-col">
            <For each={subnav()}>
              {(link) => (
                <li
                  class="px-5 hover:bg-solid-default hover:text-white transition duration-300"
                  style={
                    link.direction && {
                      direction: link.direction,
                      "text-align": link.direction === "ltr" ? "left" : "right",
                    }
                  }
                >
                  <NavLink
                    onClick={() => setSubnav([])}
                    class="px-6 py-5 w-full block"
                    href={link.path}
                  >
                    {link.title}
                    <Show when={link.description}>
                      <span class="block text-sm text-gray-400">
                        {link.description}
                      </span>
                    </Show>
                  </NavLink>
                </li>
              )}
            </For>
          </ul>
        </div>
      </Show>
    </div>
  );
};

export default Nav;
