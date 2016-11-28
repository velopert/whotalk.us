module.exports = {
  // Don't try to find .babelrc because we want to force this configuration.
  babelrc: false,
  // This is a feature of `babel-loader` for webpack (not Babel itself). It
  // enables caching results in OS temporary directory for faster rebuilds.
  cacheDirectory: true,
  presets: [
    // Latest stable ECMAScript features
    require.resolve('babel-preset-latest'),
    // JSX, Flow
    require.resolve('babel-preset-react')
  ],
  plugins: [
    // [
    //   require.resolve('babel-plugin-react-intl'), {
    //     // Async functions are converted to generators by babel-preset-latest
    //     "messagesDir": "./build/messages/"
    //   }
    // ],

    // @autobind
    require.resolve('babel-plugin-transform-decorators-legacy'),
    // class { handleClick = () => { } }
    require.resolve('babel-plugin-transform-class-properties'),
    // { ...todo, completed: true }
    require.resolve('babel-plugin-transform-object-rest-spread'),
    // function* () { yield 42; yield 43; }
    [
      require.resolve('babel-plugin-transform-regenerator'), {
        // Async functions are converted to generators by babel-preset-latest
        async: false
      }
    ],
    // Polyfills the runtime needed for async/await and generators
    [
      require.resolve('babel-plugin-transform-runtime'), {
        helpers: false,
        polyfill: false,
        regenerator: true
      }
    ]
  ]
};
