import { createSession, signIn } from "@solid-mediakit/auth/client";
import { Navigate, useNavigate } from "@solidjs/router";
import { Show, createSignal, onCleanup } from "solid-js";


export default function Home() {
  const session = createSession();

  return <Show keyed when={session()} fallback={<Navigate href="/session"/>}>{us => <>
    <h1>Welcome {us.user?.name}</h1>
  </>}</Show>
}
