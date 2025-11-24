import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Gereja extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare namaGereja: string

  @column()
  declare alamat: string

  @column()
  declare latitude: string

  @column()
  declare longitude: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
