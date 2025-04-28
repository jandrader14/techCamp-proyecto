export default {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }], // Para Node
    ['@babel/preset-react', { runtime: 'automatic' }],       // 🚀 ¡ACTIVAMOS runtime automático!
    '@babel/preset-typescript'
  ],
};