<script lang="ts">
    import { page } from "$app/stores"

  
</script>

<h1>Protected page</h1>
<p>
  This is a protected content. You can access this content because you are
  signed in.
</p>

<form method="POST">
  <label>Song URL: </label>
  <input name="song">

  <button>Submit song</button>
  
  {$page.data.session?.user?.id}
</form>