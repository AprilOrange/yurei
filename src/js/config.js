var site = {
  owner: 'AprilOrange',
  repo: 'yurei',
  per_page: 20,
  show_excerpt: true,
  access_token: '8b96b917bfaace41da731f4e2dcb4531b833ad01' // generated at https://github.com/settings/tokens
};

var api = function(path) {
  var prefix = 'https://api.github.com/';
  return prefix + path;
};