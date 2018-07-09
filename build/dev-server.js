const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const chokidar = require('chokidar')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
  } catch (e) {}
}

module.exports = function setupDevServer (server, templatePath, cb) {
  let bundle
  let template
  let clientManifest

  console.log("preparing dev server....")
  let devServerReady
  const readyPromise = new Promise(r => {devServerReady = r})
  const update = () => {
    if (bundle && clientManifest) {
      devServerReady()
      cb(bundle, {
        template,
        clientManifest
      })
    } else {
      console.log("bundle or clientManifest not ready")
    }
  }
  template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    console.log('index template updated.')
    update()
  })

  clientConfig.entry = ['webpack-hot-middleware/client', clientConfig.entry]
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())

  const clientCompiler = webpack(clientConfig)
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true
  })
  server.use(devMiddleware)

  clientCompiler.plugin('done', stats => {
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    if (stats.errors.length) {
      console.log('ERRORS! EXITING EARLY!');
      return
    }
    clientManifest = JSON.parse(readFile(
      devMiddleware.fileSystem,
      'vue-ssr-client-manifest.json'
    ))
    update()
  })

  server.use(require('webpack-hot-middleware')(clientCompiler))

  const serverCompiler = webpack(serverConfig)
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach((err) => console.error(err))
    stats.warnings.forEach((err) => console.warn(err))

    bundle = JSON.parse(readFile(fs, 'vue-ssr-server-bundle.json'))
    update()
  })

  return readyPromise
}
