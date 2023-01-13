/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export { Avatar } from "./avatar"

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		const idFromUrl = url.pathname.slice(1);
		if(idFromUrl != "" || request.method != "GET"){
			console.log(idFromUrl);
			let id = idFromUrl ? env.AVATAR.idFromString(idFromUrl) : env.AVATAR.newUniqueId();
			let obj = env.AVATAR.get(id);
			let resp = await obj.fetch(request);
			let jsonStr = await resp.json();

			return new Response(JSON.stringify(jsonStr, null, 2));
		} else {
			return new Response("Please enter an avatar ID as a path param");
		}
		
	},
};
