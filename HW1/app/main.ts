import 'core-js';
import * as angular from 'angular';
import * as ngAnimate from 'angular-animate';
import * as ngAria from 'angular-aria';
import * as ngMessages from 'angular-messages';
import * as ngMaterial from 'angular-material'
import { platformBrowserDynamic } from 'ng-metadata/platform-browser-dynamic';
import { bundle } from 'ng-metadata/core';
import { AppModule } from './app.module.ts';

// FIXME: Not working
// platformBrowserDynamic().bootstrapModule(AppModule);

const ng1AppModule: string = bundle(AppModule, [ngAnimate, ngAria, ngMessages, ngMaterial]).name;
angular.module('app', [ng1AppModule]);
