import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';
import {Injector, provide} from 'angular2/core';
import {BaseRequestOptions, Http} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';

// Load the implementations that should be tested
import {App} from './app';

describe('App', () => {
   var injector: Injector;
        var app: App;
        var backend: MockBackend;
        var baseResponse;
   
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    MockBackend,
    BaseRequestOptions,
    provide(Http, {
      useFactory: (backend, defaultOptions) => new Http(backend, defaultOptions),
      deps: [MockBackend, BaseRequestOptions]
    }),
    App
  ]);
  
  it('should have a url', inject([ App, MockBackend ], (app, mockBackend) => {
    expect(app.title).toEqual('Angular 2');
  }));

});
