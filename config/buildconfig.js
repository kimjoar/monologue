({
    // all modules are located relative to this path
    baseUrl: '../public',

    // name of file which kickstarts the application, aka the main file
    name: 'monologue',

    // use the main JS file configuration so we don't need to duplicate the values
    mainConfigFile: '../public/monologue.js',

    // additionally include Require.js itself as a dependency
    include: ['vendor/require-2.1.2.js'],

    // name the optimized file
    out: '../build/monologue.js',

    // inlines the text for any text! dependencies
    inlineText: true,

    // we don't need the text plugin in production, as it is inlined
    stubModules: ['text'],

    // keep 'em comments
    preserveLicenseComments: true
})

