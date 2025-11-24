import { useEffect, useState } from 'react'
import axios from 'axios'
import { Head } from '@inertiajs/react'

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#F3F4F6',
    minHeight: '100vh',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: '#1F2937',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827',
    margin: 0,
  },
  controls: {
    display: 'flex',
    gap: '12px',
  },
  searchInput: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
    outline: 'none',
    width: '250px',
    backgroundColor: '#FFFFFF',
    fontSize: '14px',
  },
  buttonSecondary: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
    fontWeight: '500',
    color: '#374151',
    fontSize: '14px',
  },
  buttonPrimary: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#111827',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  tableCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  thead: {
    backgroundColor: '#F9FAFB',
    borderBottom: '1px solid #E5E7EB',
  },
  th: {
    padding: '16px 24px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#6B7280',
    letterSpacing: '0.05em',
  },
  tr: {
    borderBottom: '1px solid #F3F4F6',
    transition: 'background-color 0.2s',
  },
  td: {
    padding: '16px 24px',
    fontSize: '14px',
    color: '#374151',
  },
  actionButton: {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontWeight: '600',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '13px',
  },
  editBtn: {
    color: '#4F46E5',
    backgroundColor: '#EEF2FF',
    marginRight: '8px',
  },
  deleteBtn: {
    color: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(2px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  inputGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #D1D5DB',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '24px',
  },
}

export default function AdminPage() {
  const [gerejas, setGerejas] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentData, setCurrentData] = useState({
    id: null,
    namaGereja: '',
    alamat: '',
    latitude: '',
    longitude: '',
  })

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/gereja')
      setGerejas(res.data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const openModal = (data = null) => {
    if (data) {
      setCurrentData(data)
    } else {
      setCurrentData({
        id: null,
        namaGereja: '',
        alamat: '',
        latitude: '',
        longitude: '',
      })
    }
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (currentData.id) {
        await axios.put(`/api/gereja/${currentData.id}`, currentData)
      } else {
        await axios.post('/api/gereja', currentData)
      }
      fetchData()
      closeModal()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus data ini?')) return
    try {
      await axios.delete(`/api/gereja/${id}`)
      fetchData()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div style={styles.container}>
    <Head  title={"Admin Panel"}/>
      <div style={styles.headerContainer}>
        <div>
          <h2 style={styles.title}>Gereja Management</h2>
          <p style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0 0 0' }}>
            Manage locations and details
          </p>
        </div>

        <div style={styles.controls}>
          <button onClick={() => openModal()} style={styles.buttonPrimary}>
            <span>+</span> Add Gereja
          </button>
        </div>
      </div>

      <div style={styles.tableCard}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
            Loading data...
          </div>
        ) : (
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Nama Gereja</th>
                <th style={styles.th}>Alamat</th>
                <th style={styles.th}>Coordinates</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {gerejas.map((g) => (
                <tr
                  key={g.id}
                  style={styles.tr}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                >
                  <td style={{ ...styles.td, fontWeight: 'bold' }}>{g.id}</td>
                  <td style={{ ...styles.td, fontWeight: '500' }}>{g.namaGereja}</td>
                  <td style={{ ...styles.td, color: '#6B7280' }}>{g.alamat}</td>
                  <td style={styles.td}>
                    <div
                      style={{
                        fontSize: '12px',
                        backgroundColor: '#F3F4F6',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        display: 'inline-block',
                      }}
                    >
                      {g.latitude}, {g.longitude}
                    </div>
                  </td>
                  <td style={{ ...styles.td, textAlign: 'right' }}>
                    <button
                      onClick={() => openModal(g)}
                      style={{ ...styles.actionButton, ...styles.editBtn }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(g.id)}
                      style={{ ...styles.actionButton, ...styles.deleteBtn }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {gerejas.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}
                  >
                    Tidak ada data gereja ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={{ margin: '0 0 24px 0', fontSize: '20px', fontWeight: 'bold' }}>
              {currentData.id ? 'Edit Gereja' : 'Add New Gereja'}
            </h3>

            <form onSubmit={handleSubmit}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Nama Gereja</label>
                <input
                  type="text"
                  value={currentData.namaGereja}
                  onChange={(e) => setCurrentData({ ...currentData, namaGereja: e.target.value })}
                  required
                  placeholder="Masukkan nama gereja"
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Alamat</label>
                <input
                  type="text"
                  value={currentData.alamat}
                  onChange={(e) => setCurrentData({ ...currentData, alamat: e.target.value })}
                  required
                  placeholder="Masukkan alamat lengkap"
                  style={styles.input}
                />
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ ...styles.inputGroup, flex: 1 }}>
                  <label style={styles.label}>Latitude</label>
                  <input
                    type="text"
                    value={currentData.latitude}
                    onChange={(e) => setCurrentData({ ...currentData, latitude: e.target.value })}
                    required
                    placeholder="-7.1234"
                    style={styles.input}
                  />
                </div>
                <div style={{ ...styles.inputGroup, flex: 1 }}>
                  <label style={styles.label}>Longitude</label>
                  <input
                    type="text"
                    value={currentData.longitude}
                    onChange={(e) => setCurrentData({ ...currentData, longitude: e.target.value })}
                    required
                    placeholder="110.1234"
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.modalActions}>
                <button type="button" onClick={closeModal} style={styles.buttonSecondary}>
                  Cancel
                </button>
                <button type="submit" style={styles.buttonPrimary}>
                  {currentData.id ? 'Update Changes' : 'Save Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
