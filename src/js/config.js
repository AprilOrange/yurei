var site = {
  owner: 'AprilOrange',
  repo: 'yurei',
  per_page: 20,
  show_excerpt: true,
  access_token: '112a520194092c174027b731a09225fa94513f3c' // yurei.avosapps.com/auth
};

var api = function(path) {
  var prefix = 'https://api.github.com/';
  return prefix + path;
};