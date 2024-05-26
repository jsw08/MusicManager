// @refresh reload
import { SessionProvider } from '@solid-mediakit/auth/client';
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>MusicManager</Title>
          <a href="/">index</a>
          <span style="margin: 0px 4px;">|</span>
          <a href="/session">session</a>
          <Suspense>
            <SessionProvider>{props.children} </SessionProvider>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}

