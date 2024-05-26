import { protected$ } from "@solid-mediakit/auth";
import { createSession, signIn } from "@solid-mediakit/auth/client";
import { Navigate, useNavigate } from "@solidjs/router";
import { Show, createSignal, onCleanup } from "solid-js";


export default protected$((session$) => {

  return (
    <main>
      <h1>MusicManager</h1>
      <h3>Welcome {session$.user?.name}.</h3>
    </main>
  )
}, "/login")
