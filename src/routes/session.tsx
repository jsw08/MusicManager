import { createSession, signIn, signOut } from "@solid-mediakit/auth/client"
import { Show, VoidComponent } from "solid-js"

const LoginManager: VoidComponent = () => {
    const session = createSession()
    return (
      <div class='flex flex-col items-center justify-center gap-4'>
        <Show
          when={session()}
          fallback={
            <button
              onClick={() => signIn('discord', { redirectTo: '/' })}
            >
              Sign in
            </button>
          }
        >
          <button
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </Show>
      </div>
    )
  }
  
  export default LoginManager
