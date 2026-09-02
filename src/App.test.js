import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'

const appSource = readFileSync(new URL('./App.jsx', import.meta.url), 'utf8')
const cssSource = readFileSync(new URL('./App.css', import.meta.url), 'utf8')
const indexCssSource = readFileSync(
  new URL('./index.css', import.meta.url),
  'utf8',
)
const packageSource = readFileSync(new URL('../package.json', import.meta.url), 'utf8')
const viteConfigSource = readFileSync(
  new URL('../vite.config.js', import.meta.url),
  'utf8',
)

test('shows the guitar inventory manager page content', () => {
  assert.match(appSource, /Guitar Store Inventory Manager/)
  assert.match(appSource, /Fender Stratocaster/)
  assert.match(appSource, /Gibson Les Paul Standard/)
  assert.match(appSource, /Fender Telecaster/)
  assert.match(appSource, /Martin D-28/)
  assert.match(appSource, /Taylor 814ce/)
  assert.match(appSource, /Yamaha C40/)
  assert.match(appSource, /Stock Left/)
  assert.match(appSource, /User Role/)
})

test('includes image paths for every guitar card', () => {
  assert.match(appSource, /Fender Stratocaster\.jpg/)
  assert.match(appSource, /Gibson Les Paul Standard\.jpg/)
  assert.match(appSource, /Fender Telecaster\.jpg/)
  assert.match(appSource, /Martin D-28\.jpg/)
  assert.match(appSource, /Taylor 814ce\.jpg/)
  assert.match(appSource, /Yamaha C40\.jpg/)
  assert.match(appSource, /Fender Precision Bass\.jpg/)
  assert.match(appSource, /Gibson SG Standard\.jpg/)
})

test('uses hooks and conditional role views', () => {
  assert.match(appSource, /useState/)
  assert.match(appSource, /useEffect/)
  assert.match(appSource, /Merchant Inventory View/)
  assert.match(appSource, /Browse inventory/)
  assert.match(appSource, /Consumer Shopping View/)
  assert.doesNotMatch(appSource, /Costumer/)
})

test('includes form validation for adding inventory items', () => {
  assert.match(appSource, /Add Guitar/)
  assert.match(appSource, /Guitar Model/)
  assert.match(appSource, /Body Type/)
  assert.match(appSource, /Brand Name/)
  assert.match(appSource, /Stock Quantity/)
  assert.match(appSource, /Manufacturer Name/)
  assert.match(appSource, /type="radio"/)
  assert.match(appSource, /userRole === 'Merchant' &&/)
  assert.match(appSource, /Please enter a guitar model/)
  assert.match(appSource, /Guitar model must be at least 3 characters/)
  assert.match(appSource, /Please enter a manufacturer name/)
  assert.match(appSource, /Stock quantity must be between 1 and 100/)
  assert.match(appSource, /validateField/)
  assert.match(appSource, /setErrors/)
})

test('implements registry table pagination and active item selection', () => {
  assert.match(packageSource, /@tanstack\/react-table/)
  assert.match(appSource, /@tanstack\/react-table/)
  assert.match(appSource, /useReactTable/)
  assert.match(appSource, /getPaginationRowModel/)
  assert.match(appSource, /Stocks/)
  assert.match(appSource, /Previous/)
  assert.match(appSource, /Next/)
  assert.match(appSource, /activeItem/)
  assert.match(appSource, /selectedItem/)
  assert.match(appSource, /setSelectedItem/)
  assert.match(appSource, /activeItem\.userRole/)
  assert.match(appSource, /Body Type Filter/)
})

test('lays out the merchant form as a padded two-column card', () => {
  assert.match(cssSource, /\.form-section/)
  assert.match(cssSource, /padding: 28px/)
  assert.match(cssSource, /grid-template-columns: repeat\(2, 1fr\)/)
  assert.match(cssSource, /\.full-width-field/)
  assert.match(cssSource, /grid-column: 1 \/ -1/)
  assert.doesNotMatch(appSource, /className="form-field full-width-field"/)
  assert.match(appSource, /className="role-radio-group"/)
  assert.match(appSource, /className="form-actions full-width-field"/)
  assert.match(cssSource, /\.role-radio-group/)
  assert.match(cssSource, /flex-direction: row/)
  assert.match(cssSource, /justify-content: center/)
})

test('uses Tailwind CSS as the styling framework', () => {
  assert.match(packageSource, /tailwindcss/)
  assert.match(packageSource, /@tailwindcss\/vite/)
  assert.match(viteConfigSource, /@tailwindcss\/vite/)
  assert.match(indexCssSource, /@import "tailwindcss"/)
  assert.match(appSource, /mx-auto/)
  assert.match(appSource, /grid/)
  assert.match(appSource, /rounded-\[8px\]/)
})
