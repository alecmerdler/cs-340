import 'core-js';
import * as angular from 'angular';
import { platformBrowserDynamic } from 'ng-metadata/platform-browser-dynamic';
import { bundle } from 'ng-metadata/core';
import { AppModule } from './app.module.ts';

// FIXME: Not working
// platformBrowserDynamic().bootstrapModule(AppModule);

const ng1AppModule: string = bundle(AppModule, []).name;
angular.module('app', [ng1AppModule]);
