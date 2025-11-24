/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import GerejasController from '#controllers/gerejas_controller'
import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('adminPage')

router.resource('/api/gereja', GerejasController).apiOnly()
