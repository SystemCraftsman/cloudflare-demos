/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
    GAME_OBJECT: DurableObjectNamespace
}

export { GameObject } from "./GameObject"

export default {
    async fetch(
        request: Request,
        env: Env
    ): Promise<Response> {
        if (request.method !== "POST") {
            return new Response("Method Not Allowed", {status: 405})
        }
 
        const url = new URL(request.url)
        const idFromUrl = url.pathname.slice(1)
 
        const doId = idFromUrl ? env.GAME_OBJECT.idFromString(idFromUrl) : env.GAME_OBJECT.newUniqueId()
        const obj = env.GAME_OBJECT.get(doId)
 

        return obj.fetch(request)
    },
}
