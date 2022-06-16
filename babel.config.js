module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          assets: './src/assets',
          navigation: './src/navigation',
          screens: './src/screens',
          utils: './src/utils',
          theme: './src/theme',
          components: './src/components'
        }
      }
    ]
  ]
};
