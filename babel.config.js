module.exports = function () {
  return {
    plugins: [
      ['babel-plugin-react-compiler', {}], // must run first!
      // ...
    ],
  };
};
