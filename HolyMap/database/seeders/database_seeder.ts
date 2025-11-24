import { BaseSeeder } from '@adonisjs/lucid/seeders'
import data from '../data/data.json' with { type: 'json' }
import Gereja from '#models/gereja'

export default class extends BaseSeeder {
  async run() {
    const initialData = data

    for (const gereja of initialData) {
      await Gereja.create({
        namaGereja: gereja.nama_gereja,
        alamat: gereja.alamat,
        latitude: gereja.lat,
        longitude: gereja.long,
      })
    }
  }
}
