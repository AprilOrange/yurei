var site = {
  owner: 'AprilOrange',
  repo: 'yurei',
  per_page: 20,
  show_excerpt: true,
  access_token: '2dca2ad9b61c3a62674496b85ad6e1af126cdd6d' // generated at https://github.com/settings/tokens
};

var api = function(path) {
  var prefix = 'https://api.github.com/';
  return prefix + path;
};