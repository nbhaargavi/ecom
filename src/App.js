import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import data from'./data';
import { useState } from 'react';

function App() {
  const { products } = data;
  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems( cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x  //if the current element of the id matches with the selected product id then it creates a copy of the existing items in the array and updates the quantity property by incrementing 1
        )
      )
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  }


  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <div >
      <Header></Header>
      <div className="row">
        <Main products={products}
        onAdd={onAdd} ></Main>
        <Basket cartItems={cartItems} 
        onAdd={onAdd}
         onRemove={onRemove} ></Basket>
      </div>
    </div>   
  );
}
export default App;