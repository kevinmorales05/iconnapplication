module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {        
          navigation: './src/navigation',
          screens: './src/screens',
        }
      }
    ]
  ]
};
