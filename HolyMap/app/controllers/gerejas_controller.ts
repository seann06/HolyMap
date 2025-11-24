import Gereja from '#models/gereja'
import type { HttpContext } from '@adonisjs/core/http'

export default class GerejasController {
  async index() {
    const gerejas = await Gereja.query()
    return {
      succsess: true,
      messege: 'Berhasil',
      data: gerejas,
    }
  }

  async show({ params }: HttpContext) {
    const gereja = await Gereja.findOrFail(params.id)
    return {
      succsess: true,
      messege: 'Berhasil',
      data: gereja,
    }
  }

  async store({ request }: HttpContext) {
    const data = request.only(['namaGereja', 'alamat', 'latitude', 'longitude'])
    const gereja = await Gereja.create(data)
    return {
      success: true,
      message: 'Gereja berhasil ditambahkan',
      data: gereja,
    }
  }

  async update({ params, request }: HttpContext) {
    const gereja = await Gereja.findOrFail(params.id)
    const data = request.only(['namaGereja', 'alamat', 'latitude', 'longitude'])
    gereja.merge(data)
    await gereja.save()
    return {
      success: true,
      message: 'Gereja berhasil diperbarui',
      data: gereja,
    }
  }

  async destroy({ params }: HttpContext) {
    const gereja = await Gereja.findOrFail(params.id)
    await gereja.delete()
    return {
      success: true,
      message: 'Gereja berhasil dihapus',
    }
  }
}
