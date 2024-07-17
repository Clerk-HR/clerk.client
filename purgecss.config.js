module.exports = {
  content: ["dist/**/index.html", "dist/**/*.js"],
  css: ["dist/**/*.css"],
  output: ".", 
  safelist: {
    standard: [
      /(^|\s)sm:(\s|$)/,
      /(^|\s)md:(\s|$)/,
      /(^|\s)lg:(\s|$)/,
      /(^|\s)xl:(\s|$)/,
      /-success$/,
      /-info$/,
      /-error$/,
      /-danger$/,
      /-warn$/,
      /-warning$/,
      /-secondary$/,
      /-contrast$/,
    ],
  },
  extractors: [
    {
      extractor: (content) => content.match(/[\w-/:.]+(?<!:)/g) || [],
      extensions: ["html", "js"],
    },
  ],
};
