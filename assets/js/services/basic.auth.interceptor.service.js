app.factory('BasicAuthInterceptorService', function () {
  var basicAuthInterceptorService = {
      request: request
  };

  return basicAuthInterceptorService;

  function request(config) {
    if (!config.url.includes('docdial-api.herokuapp.com')) {
        return config;
    }

    config.headers['x-api-key'] = 'Basic ';

    return config;
  }
});