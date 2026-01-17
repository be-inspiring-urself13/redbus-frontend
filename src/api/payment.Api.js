//frontend/src/api/payment.Api.js
import api from "./axios";

// Create Razorpay order
export const createOrder = async (amount) => {
  return api.post("/payment/create-order", { amount });
};

// Verify Razorpay payment
export const verifyPayment = async (paymentData) => {
  return api.post("/payment/verify", paymentData);
};

