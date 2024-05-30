<script lang="ts">
  import {page} from "$app/stores"
  import {signIn, signOut} from "@auth/sveltekit/client"
</script>

{#if !$page.data.session?.user}
  <button on:click={_ => signIn("discord")}>Sign in with discord.</button>
{:else}
  <a href="/music">Go to the app</a>
  <button on:click={_ => signOut()}>Sign off</button>
{/if}


