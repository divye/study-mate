import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export function getReq (action, params) {
  const headers = prepareAuthorizationHeaders();
  return Observable.ajax.getJSON(prepareUrl(action, params), headers)
    .catch(parseAjaxError);
}

export function postReq (action, body) {
  const headers = prepareJSONHeaders(
    prepareAuthorizationHeaders()
  );
  return Observable.ajax.post(prepareUrl(action), body, headers)
    .map(parseAjaxResponse)
    .catch(parseAjaxError);
}

function prepareUrl(action, params) {
  var url = 'http://localhost:3001/api/'
  url+= action;
  if(params) {
    const newParams = params?JSON.parse(JSON.stringify(params).replace('+', '%2B')):JSON.parse(JSON.stringify({}));
    url += '?';
    for (var key in newParams) {
      url += `${key}=${newParams[key]}&`;
    }
  }
  return url;
}

function prepareAuthorizationHeaders () {
  const headers = {};
  return headers;
}

function prepareJSONHeaders (headers) {
  return Object.assign({}, headers, {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });
}

function parseAjaxResponse (response) {
  return response.response;
}

function parseAjaxError (response) {
  throw response.xhr;
}
