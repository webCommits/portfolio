module.exports = function(eleventyConfig){

    eleventyConfig.addPassthroughCopy("src/static/style.css")
    eleventyConfig.addPassthroughCopy("src/static/script.js")
    eleventyConfig.addPassthroughCopy("src/static/images")
    eleventyConfig.addPassthroughCopy("src/static/svg")
    eleventyConfig.addPassthroughCopy("src/assets")
    eleventyConfig.addPassthroughCopy("src/sitemap.xml")
    eleventyConfig.addPassthroughCopy("src/robots.txt")
    eleventyConfig.addPassthroughCopy("_data")
    return {
        dir: {
          input: "src",
          output: "docs"
        }
      };
}
