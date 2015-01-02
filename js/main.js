$(document).ready(function() {
  // Initialize Parse with App ID and JS key.
  Parse.initialize("dhDmyFh6P8AmfdHP3ObFWmkeIVFsmP5344v9O9R5", "gTC8HUAwe0fRKkbeagbHoC5JE9Ofs3HsaCVG6B10");

  // Create templates
  var blogEntryTemplateSource = $('#blogEntryTemplate').text();
  console.log(blogEntryTemplateSource);
  
  var blogEntryTemplate = Parse._.template(blogEntryTemplateSource);

  // Define the models.
  var Blog = Parse.Object.extend('Blog');
  var BlogCollection = Parse.Collection.extend({
    model: Blog
  });
  
  var blogs = new BlogCollection();
  
  blogs.fetch({
    success: function(blogs) {
      console.log('Blogs retrieved: ' + blogs.length);
      
      var blogEntryContainer = $('#blogEntries');
      
      blogs.each(function(blog) {
        console.log('-- Adding blog entry [id: ' + blog.id + ', title: ' + blog.get('title') + ']');
        
        var blogEntryHtml = blogEntryTemplate(blog);
        console.log('Template generated HTML: ' + blogEntryHtml);
        
        blogEntryContainer.append(blogEntryHtml);
      });
    }, 
    error: function(blogs, error) {
      console.log(error);
    }
  });
});