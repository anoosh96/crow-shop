import Header from './components/Header'
import Footer from './components/Footer'
import {Container} from 'react-bootstrap'

import Home from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'



import {BrowserRouter as Router,Route} from 'react-router-dom' 

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <main className="py-4">
          <Container>
              <Route path="/" component={Home} exact />
              <Route path="/product/:id" component={ProductScreen} exact />
              <Route path = "/cart/:id?" component={CartScreen} />
              <Route path = "/login" component={LoginScreen} />
              <Route path = "/register" component={RegisterScreen} />
              <Route path = "/profile" component={ProfileScreen} />
              <Route path = "/shipping" component={ShippingScreen} />
              <Route path = "/payment" component={PaymentScreen} />
              <Route path = "/place-order" component={PlaceOrderScreen} />
          </Container>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
