import { createSession, signIn, signOut } from "@solid-mediakit/auth/client"
import { Navigate } from "@solidjs/router"
import { Show, VoidComponent } from "solid-js"

const SignIn: VoidComponent = () => {
    const session = createSession()
    return (
      <div>
        <Show
          when={!session()}
          fallback={
            <Navigate href="/"/>
          }
        >
          <button
            onClick={() => signIn("discord")}
          >
            Sign in
          </button>
        </Show>
      </div>
    )
  }
  
  export default SignIn
