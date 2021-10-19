import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';

//import { Products, Navbar } from './components';
import Products from './components/Products/Products';
import Navbar from './components/Products/Navbar/Navbar';
import Cart from './components/Cart/Cart';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  // get items from the list created on commerce.com
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  }

  // get the cart and set it to state
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());

    setCart(cart);
  }

  // function to add products to the cart
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    // retreive item from api and set to cart
    setCart(item.cart);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);

  return (
    <div>
        <Navbar totalItems={cart.total_items}/>
        <Products products={products} onAddToCart={handleAddToCart}/>
        <Cart cart={cart} />
    </div>
  );
}

export default App;
