import "./index-checkout.scss";
import { Header } from './checkout/Header/index';
import { Footer } from './checkout/Footer/index';

import { Cart } from './checkout/Cart/index';
import { OrderForm } from './checkout/OrderForm/index';
import { Profile } from './checkout/Profile/index';
import { Shipping } from './checkout/Shipping/index';
import { Payment } from './checkout/Payment/index';
import { Login } from './checkout/Login/index'

Header();
Footer();
Login();
Cart();
OrderForm();
Profile();
Shipping();
Payment();
