import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handleShopifyCatalog, handleShopifyCart } from '../worker/shopify.ts';

const id = 'gid://shopify/ProductVariant/123';
const env = { SHOPIFY_STORE_DOMAIN: 'tessilo-erkcvxa8.myshopify.com', SHOPIFY_STOREFRONT_PRIVATE_TOKEN: 'mock-private' };
const cart = (lines = [{ merchandiseId: id, quantity: 1 }]) => new Request('https://preview.example/api/shopify/cart', { method: 'POST', body: JSON.stringify({ lines }) });

test('catalog requires valid store and a server-side token', async () => {
  for (const config of [{}, { ...env, SHOPIFY_STORE_DOMAIN: 'attacker.example' }]) {
    const response = await handleShopifyCatalog(new Request('https://preview.example/api/shopify/catalog'), config);
    assert.deepEqual(await response.json(), { configured: false, products: [] });
  }
});

test('quote-first checkout cannot be bypassed with a direct API request', async () => {
  const response = await handleShopifyCart(cart(), env);
  assert.equal(response.status, 409);
  assert.equal((await response.json()).error, 'quote_required');
  assert.equal((await handleShopifyCart(cart([{ merchandiseId: id, quantity: 101 }]), env)).status, 400);
});

test('catalog supports new SKUs, product cursors and explicit approval state', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://tessilo-erkcvxa8.myshopify.com/api/2026-07/graphql.json');
    const body = JSON.parse(options.body);
    assert.equal(body.variables.after, 'cursor-1');
    return Response.json({ data: { products: {
      pageInfo: { hasNextPage: true, endCursor: 'cursor-2' },
      nodes: [{ id: 'product-1', handle: 'new-sofa', title: 'New sofa', description: '', availableForSale: true,
        media: { nodes: [] }, variants: { pageInfo: { hasNextPage: false }, nodes: [{ id, sku: 'NEW-SKU', title: 'Default', availableForSale: true, price: { amount: '900', currencyCode: 'USD' } }] } }],
    } } });
  });
  const response = await handleShopifyCatalog(new Request('https://preview.example/api/shopify/catalog?after=cursor-1'), env);
  const body = await response.json();
  assert.equal(body.products[0].sku, 'NEW-SKU');
  assert.equal(body.products[0].checkoutEnabled, false);
  assert.equal(body.pageInfo.endCursor, 'cursor-2');
  assert.ok(!JSON.stringify(body).includes('mock-private'));
});

test('approved checkout returns Shopify checkout without collecting payment', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.deepEqual(JSON.parse(options.body).variables.input.lines, [{ merchandiseId: id, quantity: 1 }]);
    return Response.json({ data: { cartCreate: { cart: { id: 'cart-1', checkoutUrl: 'https://tessilo-erkcvxa8.myshopify.com/checkouts/test' }, userErrors: [], warnings: [] } } });
  });
  const response = await handleShopifyCart(cart(), { ...env, SHOPIFY_CHECKOUT_VARIANT_IDS: id });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
});

test('invalid catalog filters rejected and provider errors stay private', async (t) => {
  assert.equal((await handleShopifyCatalog(new Request('https://preview.example/api/shopify/catalog?skus=a%22'), env)).status, 400);
  t.mock.method(globalThis, 'fetch', async () => Response.json({ errors: [{ message: 'private upstream details' }] }));
  const response = await handleShopifyCatalog(new Request('https://preview.example/api/shopify/catalog'), env);
  assert.equal(response.status, 502);
  assert.equal((await response.json()).error, 'catalog_unavailable');
});
