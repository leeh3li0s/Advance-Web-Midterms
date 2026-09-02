import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'

const appSource = readFileSync(new URL('./App.jsx', import.meta.url), 'utf8')

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
  assert.match(appSource, /Consumer Shopping View/)
  assert.match(appSource, /Manufacturer Name/)
})
