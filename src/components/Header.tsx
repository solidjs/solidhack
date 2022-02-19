import { Component, on, createEffect, createSignal } from "solid-js";
import { useLocation } from "solid-app-router";
import Nav from "./Nav";
import { routeReadyState } from "../utils/routeReadyState";

const Header: Component<{ title?: string }> = () => {
  const location = useLocation();
  const [showLogo, setShowLogo] = createSignal(true);
  createEffect(() => {});
  createEffect(
    on(
      routeReadyState,
      (readyState) => {
        if (readyState.loading) return;
        const result = location.pathname !== "/";
        setShowLogo(result);
      },
      { defer: true }
    )
  );
  return <Nav showLogo={showLogo()} />;
};

export default Header;
