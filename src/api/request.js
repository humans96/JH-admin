const API_VERSION = 'JH-api';

export const GET = 'GET';
export const POST = 'POST';
export const UPDATE = 'UPDATE';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

export const formatParams = data => {
  // remove keys point to undefined value
  const keys = Object.keys(data).filter(key => undefined !== data[key]);
  if(keys.length) {
    return '?' + keys.map(key => `${key}=${data[key]}`).join('&');
  }else {
    return '';
  }
};

const headers = {
  'Content-Type': 'application/json; charset=UTF-8'
};

export default (url, method = GET) => (data, ...appendToUrl) => {
  if((method === GET || method === DELETE) && data) { // convert object to url parameters & append to extra urls
    appendToUrl.push(formatParams(data));
  }

  if(window.token) {
    headers.token = window.token;
  }
  return new Promise(f => {
    fetch(`/${API_VERSION}${url}${appendToUrl.join('')}`, {
      method,
      body: (method === GET || method === DELETE) ? undefined : JSON.stringify(data),
      headers
    }).then(res => {
      if(res.ok) {
        return res.json();
      }else {
        throw res;
      }
    }).then(res => {
      f(res);
    }).catch(res => {
      const { status } = res;
      if(status === 401) {
        
      }
    });
  });
};
