import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//import { Products, Navbar, Cart, Checkout } from './components';
import Products from './components/Products/Products';
import Navbar from './components/Products/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import Checkout from './components/CheckoutForm/Checkout/Checkout';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('')

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
    const { cart } = await commerce.cart.add(productId, quantity);

    // retreive item from api and set to cart
    setCart(cart);
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  }

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  }

  const handelEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh ();

    setCart(newCart);
  }

  const handleCaptureCheckout = async (checkOutTikenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkOutTikenId, newOrder);

      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.messaage);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items}/>
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/cart">  
            <Cart 
            cart={cart} 
            handleUpdateCartQty={handleUpdateCartQty}
            handleRemoveFromCart={handleRemoveFromCart} 
            handelEmptyCart={handelEmptyCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout 
              cart={cart} 
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
             />
          </Route>
        </Switch>  
      </div>
    </Router>
  );
}

export default App;
