import { useEffect, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import './App.css'

const bodyTypes = ['Electric', 'Acoustic', 'Bass', 'Classical']
const userRoles = ['Merchant', 'Consumer']

const initialGuitars = [
  {
    id: 1,
    model: 'Fender Stratocaster',
    bodyType: 'Electric',
    brand: 'Fender',
    stock: 24,
    manufacturer: 'Fender Musical Instruments',
    userRole: 'Merchant',
    image: '/Fender Stratocaster.jpg',
  },
  {
    id: 2,
    model: 'Gibson Les Paul Standard',
    bodyType: 'Electric',
    brand: 'Gibson',
    stock: 18,
    manufacturer: 'Gibson Brands',
    userRole: 'Merchant',
    image: '/Gibson Les Paul Standard.jpg',
  },
  {
    id: 3,
    model: 'Fender Telecaster',
    bodyType: 'Electric',
    brand: 'Fender',
    stock: 21,
    manufacturer: 'Fender Musical Instruments',
    userRole: 'Consumer',
    image: '/Fender Telecaster.jpg',
  },
  {
    id: 4,
    model: 'Martin D-28',
    bodyType: 'Acoustic',
    brand: 'Martin',
    stock: 12,
    manufacturer: 'C. F. Martin & Company',
    userRole: 'Merchant',
    image: '/Martin D-28.jpg',
  },
  {
    id: 5,
    model: 'Taylor 814ce',
    bodyType: 'Acoustic',
    brand: 'Taylor',
    stock: 15,
    manufacturer: 'Taylor Guitars',
    userRole: 'Consumer',
    image: '/Taylor 814ce.jpg',
  },
  {
    id: 6,
    model: 'Yamaha C40',
    bodyType: 'Classical',
    brand: 'Yamaha',
    stock: 30,
    manufacturer: 'Yamaha Corporation',
    userRole: 'Merchant',
    image: '/Yamaha C40.jpg',
  },
  {
    id: 7,
    model: 'Fender Precision Bass',
    bodyType: 'Bass',
    brand: 'Fender',
    stock: 16,
    manufacturer: 'Fender Musical Instruments',
    userRole: 'Consumer',
    image: '/Fender Precision Bass.jpg',
  },
  {
    id: 8,
    model: 'Gibson SG Standard',
    bodyType: 'Electric',
    brand: 'Gibson',
    stock: 14,
    manufacturer: 'Gibson Brands',
    userRole: 'Merchant',
    image: '/Gibson SG Standard.jpg',
  },
]

const columns = [
  {
    accessorKey: 'model',
    header: 'Item Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'bodyType',
    header: 'Sub-category',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'manufacturer',
    header: 'Company',
    cell: (info) => info.getValue(),
  },
]

function App() {
  const [userRole, setUserRole] = useState('Merchant')
  const [guitars, setGuitars] = useState(initialGuitars)
  const [selectedItem, setSelectedItem] = useState(initialGuitars[0])
  const [activeItem, setActiveItem] = useState(initialGuitars[0])
  const [bodyTypeFilter, setBodyTypeFilter] = useState('All')
  const [formData, setFormData] = useState({
    model: '',
    bodyType: 'Electric',
    brand: '',
    stock: '',
    manufacturer: '',
    userRole: 'Merchant',
  })
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const filteredGuitars =
    bodyTypeFilter === 'All'
      ? guitars
      : guitars.filter((guitar) => guitar.bodyType === bodyTypeFilter)

  const totalStock = guitars.reduce((total, guitar) => total + guitar.stock, 0)
  const bodyTypeCount = new Set(guitars.map((guitar) => guitar.bodyType)).size

  useEffect(() => {
    document.title = `${userRole} | Guitar Store Inventory Manager`
  }, [userRole])

  useEffect(() => {
    setActiveItem(selectedItem)
  }, [selectedItem])

  // TanStack Table returns helper functions that React Compiler intentionally skips.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredGuitars,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 4,
      },
    },
  })

  const validateField = (name, value) => {
    if (name === 'model' && !value.trim()) {
      return 'Please enter a guitar model.'
    }

    if (name === 'model' && value.trim().length < 3) {
      return 'Guitar model must be at least 3 characters.'
    }

    if (name === 'brand' && !value.trim()) {
      return 'Please enter a brand name.'
    }

    if (name === 'manufacturer' && !value.trim()) {
      return 'Please enter a manufacturer name.'
    }

    if (name === 'stock' && !value) {
      return 'Please enter stock quantity.'
    }

    if (name === 'stock') {
      const stockNumber = Number(value)

      if (Number.isNaN(stockNumber) || stockNumber < 1 || stockNumber > 100) {
        return 'Stock quantity must be between 1 and 100.'
      }
    }

    return ''
  }

  const validateForm = () => {
    const newErrors = {
      model: validateField('model', formData.model),
      brand: validateField('brand', formData.brand),
      stock: validateField('stock', formData.stock),
      manufacturer: validateField('manufacturer', formData.manufacturer),
    }

    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) {
        delete newErrors[key]
      }
    })

    return newErrors
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    const nextFormData = {
      ...formData,
      [name]: value,
    }

    setFormData(nextFormData)

    setErrors({
      ...errors,
      [name]: validateField(name, value),
    })
    setSuccessMessage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSuccessMessage('')
      return
    }

    const newGuitar = {
      id: Date.now(),
      model: formData.model.trim(),
      bodyType: formData.bodyType,
      brand: formData.brand.trim(),
      stock: Number(formData.stock),
      manufacturer: formData.manufacturer.trim(),
      userRole: formData.userRole,
      image: '',
    }

    setGuitars([...guitars, newGuitar])
    setSelectedItem(newGuitar)

    setFormData({
      model: '',
      bodyType: 'Electric',
      brand: '',
      stock: '',
      manufacturer: '',
      userRole: 'Merchant',
    })
    setErrors({})
    setSuccessMessage('Guitar added to inventory.')
  }

  return (
    <main className="app mx-auto min-h-screen">
      <div className="role-control pb-2">
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
      <section className="hero-section rounded-[8px]">
        <div>
          <p className="eyebrow">ANA MARIE LIM MIDTERM EXAM</p>
          <h1>Guitar Store Inventory Manager</h1>
        </div>
      </section>

      <section
        className="role-panel rounded-[8px] bg-white"
        aria-label="Store settings"
      >
        <div>
         
          {userRole === 'Merchant' ? (
            <section
              className="role-view rounded-[8px]"
              aria-label="Merchant Inventory View"
            >
              <h2>Merchant Inventory View</h2>
              <p>Browse inventory and check current stock.</p>
            </section>
          ) : (
            <section
              className="role-view rounded-[8px]"
              aria-label="Consumer Shopping View"
            >
              <h2>Consumer Shopping View</h2>
              <p>
                Browse available guitars and compare body types before choosing
                a model to ask about in-store.
              </p>
            </section>
          )}
        </div>
      </section>

      {userRole === 'Merchant' && (
        <section
          className="form-section rounded-[8px] bg-white"
          aria-labelledby="form-title"
        >
          <div className="section-heading">
            <div>
              <h2 id="form-title">Add Guitar</h2>
              <p>Add a model and keep the stock count between 1 and 100.</p>
            </div>
          </div>

          <form
            className="inventory-form grid"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="form-field">
              <label htmlFor="model">Guitar Model</label>
              <input
                id="model"
                name="model"
                type="text"
                value={formData.model}
                onChange={handleInputChange}
              />
              {errors.model && <p className="error-message">{errors.model}</p>}
            </div>

            <div className="form-field">
              <label htmlFor="brand">Brand Name</label>
              <input
                id="brand"
                name="brand"
                type="text"
                value={formData.brand}
                onChange={handleInputChange}
              />
              {errors.brand && <p className="error-message">{errors.brand}</p>}
            </div>

            <div className="form-field">
              <label htmlFor="bodyType">Type</label>
              <select
                id="bodyType"
                name="bodyType"
                value={formData.bodyType}
                onChange={handleInputChange}
              >
                {bodyTypes.map((bodyType) => (
                  <option key={bodyType} value={bodyType}>
                    {bodyType}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="manufacturer">Manufacturer Name</label>
              <input
                id="manufacturer"
                name="manufacturer"
                type="text"
                value={formData.manufacturer}
                onChange={handleInputChange}
              />
              {errors.manufacturer && (
                <p className="error-message">{errors.manufacturer}</p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="stock">Stock Quantity</label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="1"
                max="100"
                value={formData.stock}
                onChange={handleInputChange}
              />
              {errors.stock && <p className="error-message">{errors.stock}</p>}
            </div>

            <fieldset className="role-radio-group">
              <legend>User Role</legend>
              {userRoles.map((role) => (
                <label key={role}>
                  <input
                    type="radio"
                    name="userRole"
                    value={role}
                    checked={formData.userRole === role}
                    onChange={handleInputChange}
                  />
                  {role}
                </label>
              ))}
            </fieldset>

            <div className="form-actions full-width-field">
              <button type="submit">Add to Inventory</button>
              {successMessage && (
                <p className="success-message">{successMessage}</p>
              )}
            </div>
          </form>
        </section>
      )}

      <section className="stats-grid grid" aria-label="Inventory overview">
        <article className="stat-card rounded-[8px] bg-white">
          <span>Total Models</span>
          <strong>{guitars.length}</strong>
        </article>
        <article className="stat-card rounded-[8px] bg-white">
          <span>Total Stock</span>
          <strong>{totalStock}</strong>
        </article>
        <article className="stat-card rounded-[8px] bg-white">
          <span>Body Types</span>
          <strong>{bodyTypeCount}</strong>
        </article>
      </section>

      <section className="section-block mt-[30px]" aria-labelledby="inventory-title">
        <div className="section-heading">
          <div>
            <h2 id="inventory-title">Stocks</h2>
            <p>Click a row to view the full item profile.</p>
          </div>
          <label className="filter-control">
            <span>Body Type Filter</span>
            <select
              value={bodyTypeFilter}
              onChange={(event) => setBodyTypeFilter(event.target.value)}
            >
              <option value="All">All</option>
              {bodyTypes.map((bodyType) => (
                <option key={bodyType} value={bodyType}>
                  {bodyType}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="registry-layout grid">
          <div className="table-card rounded-[8px] bg-white">
            <table>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    <th>Image</th>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    className={
                      activeItem?.id === row.original.id ? 'selected-row' : ''
                    }
                    key={row.id}
                    onClick={() => setSelectedItem(row.original)}
                  >
                    <td>
                      {row.original.image ? (
                        <img
                          className="table-image"
                          src={row.original.image}
                          alt={`${row.original.model} guitar`}
                        />
                      ) : (
                        <span className="table-image placeholder-image">
                          No image
                        </span>
                      )}
                    </td>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination-controls">
              <button
                type="button"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </button>
              <span>
                Page {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </span>
              <button
                type="button"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </button>
            </div>
          </div>

          {activeItem && (
            <article className="active-card rounded-[8px] bg-white">
              {activeItem.image ? (
                <img
                  className="guitar-image"
                  src={activeItem.image}
                  alt={`${activeItem.model} guitar`}
                />
              ) : (
                <div className="guitar-image placeholder-image">No image</div>
              )}
              <div className="card-top">
                <h3>{activeItem.model}</h3>
                <span>{activeItem.userRole}</span>
              </div>
              <p>{activeItem.brand}</p>
              <div className="profile-details">
                <span>Body Type: {activeItem.bodyType}</span>
                <span>Stock Left: {activeItem.stock}/100</span>
                <span>Manufacturer: {activeItem.manufacturer}</span>
              </div>
            </article>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
