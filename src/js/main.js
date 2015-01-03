$(document).ready(function() {
  // Initialize Parse with App ID and JS key.
  Parse.initialize("dhDmyFh6P8AmfdHP3ObFWmkeIVFsmP5344v9O9R5", "gTC8HUAwe0fRKkbeagbHoC5JE9Ofs3HsaCVG6B10");

  // Create templates
  var blogEntryTemplateSource = $('#blogEntryTemplate').text();
  
  var blogEntryTemplate = Parse._.template(blogEntryTemplateSource);

  // Define the models.
  var Blog = Parse.Object.extend('Blog');
  var BlogCollection = Parse.Collection.extend({
    model: Blog
  });
  
  var blogs = new BlogCollection();
  
    var query = new Parse.Query(Blog);
    
    // Sort by date (descending; most recent post at top)
    query.descending('updatedAt');
    
    query.find({
    success: function(blogs) {
      console.log('Blogs retrieved: ' + blogs.length);
      
      var blogEntryContainer = $('#blogEntries');
      
      for (var i = 0; i < blogs.length; i++) {
          var blog = blogs[i];
        
          var blogEntryHtml = blogEntryTemplate(blog);
          
          blogEntryContainer.append(blogEntryHtml);
      };
    }, 
    error: function(blogs, error) {
      console.log(error);
    }
  });
});