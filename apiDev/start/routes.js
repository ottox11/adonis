'use strict'

const { route, RouteGroup } = require('@adonisjs/framework/src/Route/Manager')
const UserController = require('../app/Controllers/Http/UserController')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('welcome')
Route.on('/').render('login')

Route.group(() => {
Route.post('users/register', 'UserController.store')
Route.get('users/reg', 'UserController.store')
}).prefix('api/v1/');
