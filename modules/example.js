export default function ExampleModule(moduleOptions) {
    console.log(moduleOptions) // '123'

    this.nuxt.hook('modules:done', moduleContainer => {
        // This will be called when all modules finished loading
    })
}

// REQUIRED if publishing the module as npm package
module.exports.meta = require('../package.json')
