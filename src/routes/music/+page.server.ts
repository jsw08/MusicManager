import { getUser } from '$lib/db';
import { error, redirect } from '@sveltejs/kit';


/** @type {import('./$types').LayoutServerLoad} */
export const load = async (event) => {
  const session = await event.locals.auth()
  console.log(JSON.stringify(session))
  if (!session?.user) throw error(401);
  // if (!session.user.id) throw error(500)

  // return {
  //   songs: await getUser(session.user.id)
  // };
  return {}
};

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		console.log(JSON.stringify(event))
	}
};