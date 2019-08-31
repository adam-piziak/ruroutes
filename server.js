const fs = require('fs')
const path = require('path')
const express = require('express')
const compression = require('compression')
const Vue = require('vue')
const { createBundleRenderer } = require('vue-server-renderer')
const resolve = file => path.resolve(__dirname, file)
const MobileDetect = require('mobile-detect')

const isProd = process.env.NODE_ENV === 'production'
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`


const server = express()

function createRenderer (bundle, options) {
  return createBundleRenderer (bundle, Object.assign(options, {
    basedir: resolve('./dist'),
    runInNewContext: false
  }))
}

let renderer
let readyPromise
const templatePath = resolve('./src/index.template.html')
if (isProd) {
  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require('./dist/vue-ssr-server-bundle.json')

  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })
} else {
  readyPromise = require('./build/dev-server.js')(
    server,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

server.use(compression({ threshold: 0 }))
server.use('/dist', serve('./dist', true))
server.use('/public', serve('./public', true))
server.use('/manifest.json', serve('./manifest.json', true))
function render (req, res) {
  const s = Date.now()

  const md = new MobileDetect(req.headers['user-agent'], 800)
  const mobileState = md.mobile() ? true : false;
  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.status(404).send(
        `
        404 | Page not found
        <a href="https://www.ruroutes.com">Go Home</a>
        `
      )
    } else {
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    url: req.url,
    title: "Scarlet Maps",
    lang: "en",
    mobile: mobileState,
    mapboxStyles: ''
  }

  if (!mobileState) {
    context.mapboxStyles = "<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.52.0/mapbox-gl.css' rel='stylesheet' />"
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.send(html)
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}

server.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

const PORT = process.env.PORT || 8080

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})
