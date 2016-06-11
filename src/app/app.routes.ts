// see http://plnkr.co/edit/ER0tf8fpGHZiuVWB7Q07?p=preview

import { provideRouter, RouterConfig } from '@angular/router';
import { LaunchRoutes } from './launch/launch.routes';
import { CompareRoutes }       from './compare/compare.routes';
/*
import { CrisisCenterRoutes } from './crisis-center/crisis-center.routes';
import { CrisisDetailGuard }  from './crisis-center/crisis-detail.guard';
import { HeroesRoutes }       from './heroes/heroes.routes';

const routes: RouterConfig = [
  ...HeroesRoutes,
  ...CrisisCenterRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  CrisisDetailGuard
];
*/

const routes: RouterConfig = [
  ...LaunchRoutes,
  ...CompareRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/