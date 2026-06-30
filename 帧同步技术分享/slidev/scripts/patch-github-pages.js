const fs = require('node:fs')
const path = require('node:path')

const distDir = path.resolve(__dirname, '..', 'dist')
const redirectScript = `<script>
  ;(() => {
    const repo = 'knowledge-share'
    const prefix = '#/' + repo + '/'
    if (window.location.hash.startsWith(prefix)) {
      window.location.replace('#/' + window.location.hash.slice(prefix.length))
      return
    }

    const pathPrefix = '/' + repo + '/'
    const { pathname, search, hash } = window.location
    if (!hash && pathname.startsWith(pathPrefix) && pathname !== pathPrefix) {
      window.location.replace(pathPrefix + '#/' + pathname.slice(pathPrefix.length) + search)
    }
  })()
</script>`

for (const file of ['index.html', '404.html']) {
  const filePath = path.join(distDir, file)
  let html = fs.readFileSync(filePath, 'utf8')
  if (!html.includes("const repo = 'knowledge-share'")) {
    html = html.replace('<head>', `<head>\n${redirectScript}`)
    fs.writeFileSync(filePath, html)
  }
}
