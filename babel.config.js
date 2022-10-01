module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module-resolver", {
        root: ['./'],
        alias: {
          '@': './src',
          '@store': './src/store',
          '@shared-components': './src/shared/components',
          '@shared-config': './src/shared/config',
          '@styles': './src/shared/styles/index',
          '@hooks': './src/hooks',
          '@screens': './src/screens',
          '@assets': './assets',
          '@images': './assets/images',
          '@poke': './src/api/poke/',
          '@navigation': './src/navigation',
          '@shared': './src/shared',
          '@store': './src/redux/index',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }]
    ]
  };
};
