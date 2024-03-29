import React from 'react';
import { Button } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';
import {useDispatch, useSelector} from 'react-redux';
import {placeOrder} from '../actions/orderAction'
import Loader from './Loader';
import Error from './Error';
import Success from './Success';

function Checkout({subTotal}) {
    const orderState = useSelector((state) => state.placeOrderReducer)
    const {loading,error,success} = orderState
    const dispatch = useDispatch();
    const tokenHandler = (token) => {
      dispatch(placeOrder(token,subTotal));
      console.log(token);
    }
  return (
    <>
    {loading && (<Loader/>)}
    {error && (<Error error = "Something went wrong"/>)}
    {success && (<Success success = "Order Placed successfully"/>)}
    <StripeCheckout
    amount={subTotal * 100}
    shippingAddress
    token={tokenHandler}
    stripeKey="pk_test_51MhZiESBDlmZsMX0XMvySG7nEhx95x1TUzY1yfXTGisfNHAjrQr6myvlIJhAyFcztTmC2hbN5A3IDLFSS9tJ3ZnQ00r7pvlYc7"
    currency = "INR">
        <Button>Pay Now</Button>
        </StripeCheckout>
    </>
  )
}

export default Checkout
