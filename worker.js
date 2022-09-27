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
  fetch: async (req, env) => {
    const { user, origin, requestId, method, body, time, pathSegments, query, pathOptions, url } = await env.CTX.fetch(req).then(res => res.json())
    if (!user.profile) return Response.redirect('https://codex.do/login')
    const options = {
      model: 'code-davinci-002',
      prompt: '// ES6 arrow function called ' + pathSegments[0],
      temperature: 0,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }
    const completion = await fetch('https://api.openai.com/v1/completions', { method: 'post', body: JSON.stringify(options), headers:{ 'content-type': 'application/json', 'authorization': 'Bearer ' + env.OPENAI_API_KEY }}).then(res => res.json())
    const code = completion.choices[0].prompt + completion.choices[0].text
    const codeLines = code.split('\n')
    if (query.file) return new Response(code, { headers: { 'content-type': 'application/javascript; charset=utf-8' }})
    return new Response(JSON.stringify({ api, options, completion, codeLines, code, user }, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' }})
  },
}
