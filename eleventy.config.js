module.exports = function (eleventyConfig) {

  // Copy static assets and the Decap CMS admin panel as-is
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("admin");

  // All published posts, newest first
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/posts/*.md")
      .filter((post) => !post.data.draft)
      .sort((a, b) => b.date - a.date);
  });

  // Posts grouped by category slug -> { tech: [...], finance: [...] }
  eleventyConfig.addCollection("postsByCategory", function (collectionApi) {
    const posts = collectionApi
      .getFilteredByGlob("src/posts/*.md")
      .filter((post) => !post.data.draft);

    const grouped = {};
    posts.forEach((post) => {
      const cat = post.data.category;
      if (!cat) return;
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(post);
    });

    Object.keys(grouped).forEach((cat) => {
      grouped[cat].sort((a, b) => b.date - a.date);
    });

    return grouped;
  });

  eleventyConfig.addFilter("limit", function (arr, n) {
    return (arr || []).slice(0, n);
  });

  eleventyConfig.addFilter("readableDate", function (dateObj) {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("catName", function (slug, cats) {
    const c = (cats || []).find((c) => c.slug === slug);
    return c ? c.name : slug;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
