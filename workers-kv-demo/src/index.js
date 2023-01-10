/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		const { searchParams } = new URL(request.url)
		console.log(searchParams)
		if(searchParams != ""){
			let url = await env.AB_TEST_URL.get(searchParams.get('test'));
			return Response.redirect(url);
		} else {
			return new Response("Enter a 'test' parameter as either A or B");
		}
	},
};
