import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const endpoints = {
  login: "/o/token/",
  "send-otp": "users/send-otp/",
  "change-password": "users/change-password/",
  "load-product-home": "products/load-product-home/",
  "search-products-by-keyword": "products/search/",
  "load-category": "categories/",
  "load-tag": "tags/",
  "load-new-blogs": "blogs/load-new-blogs/",
  "load-blog-info-detail": (blog_id) => `blogs/${blog_id}/info-details`,
  "load-list-product": (category_id) =>
    `categories/${category_id}/list-product`,
  "current-user": "/users/current-user/",
  "product-info-details": (product_id) => `products/${product_id}/info-details`,
  "load-all-origins": "origins/",
  register: "/users/",
  "user-payment": "users/cart/payment/",
  "validate-promotion-ticket": "promotiontickets/validate-promotion-ticket/",
  "show-orders": (user_id) => `users/${user_id}/orders/`,
  "list-order-details": (order_id) => `orders/${order_id}/list-order-details`,
  "add-comment": (product_id) => `products/${product_id}/add-comment/`,
  "del-comment": (comment_id) => `comments/${comment_id}/del-comment/`,
};

export const authApi = (accessToken) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
  },
  timeout: 0,
  withCredentials: false,
});
