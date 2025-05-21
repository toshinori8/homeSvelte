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
