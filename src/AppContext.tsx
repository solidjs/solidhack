import {
  Component,
  createContext,
  createEffect,
  createResource,
  useContext,
} from "solid-js";
import { Meta, Title } from "solid-meta";
import { useLocation, useNavigate } from "solid-app-router";
import createCookieStore from "@solid-primitives/cookies-store";
import { createI18nContext, I18nContext } from "@solid-primitives/i18n";
import { getGuides, getSupported, ResourceMetadata } from "@solid.js/docs";

const API = "http://localhost:8787";
// const API = "https://api.solidjs.com";

interface AppContextInterface {
  apiurl: string;
  isDark: boolean;
  loading: boolean;
  user:
    | {
        display: string;
        avatar: string;
        token: string;
      }
    | false;
  guidesSupported: boolean;
  guides: ResourceMetadata[] | undefined;
}

const AppContext = createContext<AppContextInterface>({
  apiurl: "",
  isDark: false,
  loading: true,
  user: false,
  guidesSupported: false,
  guides: undefined,
});

const langs: { [lang: string]: any } = {
  en: async () => (await import("../lang/en/en")).default(),
};

// Some browsers does not map correctly to some locale code
// due to offering multiple locale code for similar language (e.g. tl and fil)
// This object maps it to correct `langs` key
const langAliases: Record<string, string> = {
  fil: "tl",
};

type DataParams = {
  locale: string;
  page: string;
};

export const AppContextProvider: Component<{}> = (props) => {
  const now = new Date();
  const navigate = useNavigate();
  const [settings, set] = createCookieStore<{
    dark: string;
    locale: string;
    avatar: string;
    token: string;
    display: string;
  }>(undefined, {
    expires: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()),
  });
  const browserLang = navigator.language.slice(0, 2);
  const location = useLocation();

  // Validate the user token and exchange for JWT
  if (location.query.token) {
    fetch(`${API}/profile`, {
      headers: {
        authorization: `Bearer ${location.query.token}`,
      },
    }).then(async (result) => {
      const body = await result.json();
      if (result.status !== 200) {
        set("avatar", "");
        set("token", "");
        set("allowed", "");
        set("dispaly", "");
        return;
      }
      set("token", location.query.token);
      set("avatar", body.avatar);
      set("display", body.display);
      set("allowed", body.allowed);
      navigate("/submissions/best_app", { replace: true });
    });
  }
  if (location.query.locale) {
    set("locale", location.query.locale);
  } else if (!settings.locale && langs.hasOwnProperty(browserLang)) {
    set("locale", browserLang);
  }
  const i18n = createI18nContext({}, settings.locale || "en");
  const [t, { add, locale }] = i18n;
  const params = (): DataParams => {
    const locale = i18n[1].locale();
    let page = location.pathname.slice(1);
    if (page == "") {
      page = "home";
    }
    if (locale in langAliases) {
      return { locale: langAliases[locale], page };
    }
    return { locale, page };
  };

  const [lang] = createResource(params, ({ locale }) => langs[locale]());
  const [guidesList] = createResource(params, ({ locale }) =>
    getGuides(locale, true)
  );
  const isDark = () =>
    settings.dark === "true"
      ? true
      : settings.dark === "false"
      ? false
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

  createEffect(() => set("locale", i18n[1].locale()));
  createEffect(() => {
    if (!lang.loading) add(i18n[1].locale(), lang() as Record<string, any>);
  });
  createEffect(() => {
    if (isDark()) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  });

  const store = {
    apiurl: API,
    set isDark(value) {
      set("dark", value === true ? "true" : "false");
    },
    get isDark() {
      return false;
    },
    get user() {
      if (settings.display && settings.display !== "") {
        return {
          display: settings.display,
          avatar: settings.avatar,
          token: settings.token,
        };
      }
      return false;
    },
    get loading() {
      return lang.loading;
    },
    /*
      Returns true if there are any guides in the current locale's translation.
      Note that guides() will return the english guides metadata in this case.
     */
    get guidesSupported() {
      const supported = getSupported("guides", params().locale);
      return Array.isArray(supported) && supported.length > 0;
    },
    get guides() {
      return guidesList();
    },
  };

  return (
    <AppContext.Provider value={store}>
      <I18nContext.Provider value={i18n}>
        <Title>SolidHack 2022</Title>
        <Meta name="lang" content={locale()} />
        <div dir={t("global.dir", {}, "ltr")}>{props.children}</div>
      </I18nContext.Provider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
