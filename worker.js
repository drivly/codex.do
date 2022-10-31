export const api = {
  icon: '🤖',
  name: 'codex.do',
  description: 'GPT-3 Codex Templates and Completions',
  url: 'https://codex.do/api',
  type: 'https://apis.do/ai',
  endpoints: {
    list: 'https://codex.do/list',
    get: 'https://codex.do/:id',
  },
  site: 'https://codex.do',
  login: 'https://codex.do/login',
  signup: 'https://codex.do/signup',
  subscribe: 'https://codex.do/subscribe',
  repo: 'https://github.com/drivly/codex.do',
}

export default {
  fetch: async (req, env, ctx) => {
    const ctx, { user, origin, requestId, method, body, time, pathname, pathSegments, query, headers, pathOptions, url } = await env.CTX.fetch(req).then(res => res.json())
    if (!user.authenticated && !headers['cf-worker'].includes('.do')) return Response.redirect('https://codex.do/login')
    if (pathname == '/api') return new Response(JSON.stringify({ api, user }, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' }})
    const [functionName] = pathSegments
    let code = await env.CODEX.get(functionName)
    if (!code) {
      const options = {
        model: 'code-davinci-002',
        prompt: '// Generated at http://codex.do/fizzBuzz\n// ES6 arrow function called ' + functionName,
        temperature: 0,
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }
      const completion = await fetch('https://api.openai.com/v1/completions', { method: 'post', body: JSON.stringify(options), headers:{ 'content-type': 'application/json', 'authorization': 'Bearer ' + env.OPENAI_API_KEY }}).then(res => res.json())
      code = options.prompt + completion.choices[0].text
      ctx.waitUntil(env.CODEX.put(functionName,code, {metadata: {user}}))
    }
    const codeLines = code.split('\n')
    if (query.json) return new Response(JSON.stringify({ api, options, completion, codeLines, code, user }, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' }})
    return new Response(code, { headers: { 'content-type': 'application/javascript; charset=utf-8' }})
  },
}
