const {DateTime} = require("luxon");

module.exports = function(eleventyConfig) {

    //Tell 11ty to grab and passthrough files to the public folder
    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/assets');


    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    })
    return {
        dir: {
            //Where 11ty is working out of
            input: "src",
            //Where the built files are stored
            output: "public"
        }
    }
}

