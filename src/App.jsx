import { useEffect, useState } from 'react'
import './App.css'

const guitars = [
  {
    model: 'Fender Stratocaster',
    bodyType: 'Electric',
    brand: 'Fender',
    stock: 24,
    image: '/Fender Stratocaster.jpg',
  },
  {
    model: 'Gibson Les Paul Standard',
    bodyType: 'Electric',
    brand: 'Gibson',
    stock: 18,
    image: '/Gibson Les Paul Standard.jpg',
  },
  {
    model: 'Fender Telecaster',
    bodyType: 'Electric',
    brand: 'Fender',
    stock: 21,
    image: '/Fender Telecaster.jpg',
  },
  {
    model: 'Martin D-28',
    bodyType: 'Acoustic',
    brand: 'Martin',
    stock: 12,
    image: '/Martin D-28.jpg',
  },
  {
    model: 'Taylor 814ce',
    bodyType: 'Acoustic',
    brand: 'Taylor',
    stock: 15,
    image: '/Taylor 814ce.jpg',
  },
  {
    model: 'Yamaha C40',
    bodyType: 'Classical',
    brand: 'Yamaha',
    stock: 30,
    image: '/Yamaha C40.jpg',
  },
  {
    model: 'Fender Precision Bass',
    bodyType: 'Bass',
    brand: 'Fender',
    stock: 16,
    image: '/Fender Precision Bass.jpg',
  },
  {
    model: 'Gibson SG Standard',
    bodyType: 'Electric',
    brand: 'Gibson',
    stock: 14,
    image: '/Gibson SG Standard.jpg',
  },
]

function App() {
  const [userRole, setUserRole] = useState('Merchant')
  const totalStock = guitars.reduce((total, guitar) => total + guitar.stock, 0)
  const bodyTypeCount = new Set(guitars.map((guitar) => guitar.bodyType)).size

  useEffect(() => {
    document.title = `${userRole} | Guitar Store Inventory Manager`
  }, [userRole])

  return (
    <main className="app">
      <div className="role-control">
        <span>User Role</span>
        <div className="role-buttons">
          <button
            className={userRole === 'Merchant' ? 'active' : ''}
            type="button"
            onClick={() => setUserRole('Merchant')}
          >
            Merchant
          </button>
          <button
            className={userRole === 'Consumer' ? 'active' : ''}
            type="button"
            onClick={() => setUserRole('Consumer')}
          >
            Consumer
          </button>
        </div>
      </div>
      <section className="hero-section">
        <div>
          <p className="eyebrow">ANA MARIE LIM MIDTERM EXAM</p>
          <h1>Guitar Store Inventory Manager</h1>
        </div>
      </section>

      <section className="role-panel" aria-label="Store settings">
        <div>
         
          {userRole === 'Merchant' ? (
            <section className="role-view" aria-label="Merchant Inventory View">
              <h2>Merchant Inventory View</h2>
              <p>Browse inventory and check current stock.</p>
            </section>
          ) : (
            <section className="role-view" aria-label="Consumer Shopping View">
              <h2>Consumer Shopping View</h2>
              <p>
                Browse available guitars and compare body types before choosing
                a model to ask about in-store.
              </p>
            </section>
          )}
        </div>
      </section>

      <section className="stats-grid" aria-label="Inventory overview">
        <article className="stat-card">
          <span>Total Models</span>
          <strong>{guitars.length}</strong>
        </article>
        <article className="stat-card">
          <span>Total Stock</span>
          <strong>{totalStock}</strong>
        </article>
        <article className="stat-card">
          <span>Body Types</span>
          <strong>{bodyTypeCount}</strong>
        </article>
      </section>

      <section className="section-block" aria-labelledby="inventory-title">
        <div className="section-heading">
          <div>
            <h2 id="inventory-title">Guitar Inventory</h2>
            <p>Well-known guitar models ready for the next feature commits.</p>
          </div>
        </div>

        <div className="inventory-grid">
          {guitars.map((guitar) => (
            <article className="guitar-card" key={guitar.model}>
              <img
                className="guitar-image"
                src={guitar.image}
                alt={`${guitar.model} guitar`}
              />
              <div className="card-top">
                <h3>{guitar.model}</h3>
              </div>
              <p>{guitar.brand}</p>
              <div className="card-details">
                <span>{guitar.bodyType}</span>
                <span>Stock Left: {guitar.stock}/100</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
