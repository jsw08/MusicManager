import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export const load = async (event) => {
  const session = await event.locals.auth();
  if (!session?.user) throw error(401);
  return {};
};