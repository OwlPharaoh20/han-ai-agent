import { viewCart, addToCart, removeFromCart, clearCart } from './tools/cart.js';
import { searchProducts } from './tools/product_search.js';

async function testCart() {
  console.log('--- Testing Cart Functions ---');

  const addResult = await addToCart('Add iPhone 15 Pro');
  console.log('addToCart:', addResult);

  const viewResult1 = await viewCart('');
  console.log('viewCart (after add):', viewResult1);

  const removeResult = await removeFromCart('Remove iPhone 15 Pro');
  console.log('removeFromCart:', removeResult);

  const viewResult2 = await viewCart('');
  console.log('viewCart (after remove):', viewResult2);

  const clearResult = await clearCart('');
  console.log('clearCart:', clearResult);

  const viewResult3 = await viewCart('');
  console.log('viewCart (after clear):', viewResult3);
}

async function testProductSearch() {
  console.log('\n--- Testing Product Search Function ---');

  const searchResult = await searchProducts('Apple Airpods');
  console.log('searchProducts:', searchResult);
}

async function runTests() {
  await testCart();
  await testProductSearch();
}

runTests(); 