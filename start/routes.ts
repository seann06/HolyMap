/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('adminPage')

router.resource('/api/gereja', () => import('#controllers/gerejas_controller')).apiOnly()
