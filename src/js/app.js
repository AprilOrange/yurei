var $ = document.getElementById.bind(document);
var $$ = document.querySelectorAll.bind(document);

function render(tpl, data) {
  var html = $(tpl + '-template').innerHTML;
  var template = Handlebars.compile(html);
  var compiled = template(data);
  return compiled;
};

function fetchList(opt, cb) {
  var page = opt.page || 1;
  qwest
    .before(function() {
      loading();
    })
    .get(api('repos/' + site.owner + '/' + site.repo + '/issues'), {
      per_page: site.per_page,
      page: page,
      access_token: site.access_token
    })
    .then(function(data) {
      data.forEach(function(d) {
        var excerpt = trimHTML(marked(d.body), {
          limit: 200
        });
        if (site.show_excerpt) {
          d.excerpt = excerpt.html;
        }
        console.log(excerpt)
      })
      return cb(data);
    })
    .catch(function(e, response) {
      // Process the error
      var error = response.message
      $('output').innerHTML = '<div class="error">' + e +  ' : ' + error + '</div>';
    });
};

function fetchPost(opt, cb) {
  qwest
    .before(function() {
      loading();
    })
    .get(api('repos/' + site.owner + '/' + site.repo + '/issues/' + opt.number))
    .then(function(post) {
      return cb(post);
    });
};

function loading() {
  var html = render('loading');
  $('output').innerHTML = html;
};

/*
function buildParams(obj) {
  var arr = [];
  for (o in obj) {
    arr.push(o + '=' + obj[o]);
  }
  return '?' + arr.join('&');
};
*/

(function() {

  var homeRouter = function(page) {
    //var html = render('home');
    fetchList({}, function(posts) {
      var list = render('home-list', {
        posts: posts
      });
      var html = list;
      $('output').innerHTML = html;
    });

  };

  var postRouter = function(number) {
    fetchPost({number: number}, function(post) {
      post.content = marked(post.body);
      var post = render('post', {post: post});
      var html = post;
      $('output').innerHTML = html;
    });
  };

  Q.reg('home', homeRouter);
  Q.reg('post', postRouter);

  Q.init({
    index: 'home'
  });


})();
