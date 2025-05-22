import { SvelteKitAuth } from "@auth/sveltekit"
import { PUBLIC_GOOGLE_CLIENT_ID, PUBLIC_GOOGLE_CLIENT_SECRET } from '$env/static/public';
import Google from "@auth/core/providers/google";



export const handle = SvelteKitAuth({
    providers: [Google({
        clientId: PUBLIC_GOOGLE_CLIENT_ID,
        clientSecret: PUBLIC_GOOGLE_CLIENT_SECRET,
        
    })],
    trustHost: true
});


import type { Handle } from '@sveltejs/kit';

export const handles: Handle = async ({ event, resolve }) => {

	if (
		event.url.pathname.startsWith(
			'/.well-known/appspecific/com.chrome.devtools'
		)
	) {
		return new Response(null, { status: 204 }); // Return empty response with 204 No Content
	}

return await resolve(event);

};