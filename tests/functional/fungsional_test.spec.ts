import { test } from '@japa/runner'
import Gereja from '#models/gereja'

test.group('Gereja API', (group) => {
  // rollback DB setiap selesai 1 test agar data bersih

  // GET /api/gereja
  test('mengambil semua gereja', async ({ client, assert }) => {
    // seed contoh data
    await Gereja.create({
      namaGereja: 'GPIB Immanuel',
      alamat: 'Jl. Contoh No 12',
      latitude: '-0.9123',
      longitude: '119.8743',
    })

    const response = await client.get('/api/gereja')

    response.assertStatus(200)
    assert.isTrue(response.body().succsess)
    assert.equal(response.body().messege, 'Berhasil')
    assert.lengthOf(response.body().data, 1)
  })

  // POST /api/gereja
  test('membuat gereja baru', async ({ client, assert }) => {
    const payload = {
      namaGereja: 'HKBP Palu',
      alamat: 'Jl. Sudirman',
      latitude: '-0.8771',
      longitude: '119.8971',
    }

    const response = await client.post('/api/gereja').json(payload)

    response.assertStatus(200)
    assert.isTrue(response.body().success)
    assert.equal(response.body().message, 'Gereja berhasil ditambahkan')
    assert.equal(response.body().data.namaGereja, payload.namaGereja)
  })

  // GET /api/gereja/:id
  test('menampilkan detail gereja', async ({ client }) => {
    const gereja = await Gereja.create({
      namaGereja: 'GMIM Sion',
      alamat: 'Jl. Maju',
      latitude: '-0.899',
      longitude: '119.889',
    })

    const response = await client.get(`/api/gereja/${gereja.id}`)
    response.assertStatus(200)
    response.assertBodyContains({
      succsess: true,
      messege: 'Berhasil',
      data: { id: gereja.id },
    })
  })

  // PUT /api/gereja/:id
  test('mengupdate data gereja', async ({ client, assert }) => {
    const gereja = await Gereja.create({
      namaGereja: 'Gereja Lama',
      alamat: 'Jl. Lama',
      latitude: '1',
      longitude: '1',
    })

    const payload = {
      namaGereja: 'Gereja Baru',
      alamat: 'Jl. Baru',
      latitude: '2',
      longitude: '2',
    }

    const response = await client.put(`/api/gereja/${gereja.id}`).json(payload)

    response.assertStatus(200)
    assert.isTrue(response.body().success)
    assert.equal(response.body().data.namaGereja, 'Gereja Baru')
  })

  // DELETE /api/gereja/:id
  test('menghapus gereja', async ({ client }) => {
    const gereja = await Gereja.create({
      namaGereja: 'Gereja Hapus',
      alamat: 'Jl. Hapus',
      latitude: '0.0',
      longitude: '0.0',
    })

    const response = await client.delete(`/api/gereja/${gereja.id}`)
    response.assertStatus(200)
    response.assertBodyContains({
      success: true,
      message: 'Gereja berhasil dihapus',
    })
  })
})
