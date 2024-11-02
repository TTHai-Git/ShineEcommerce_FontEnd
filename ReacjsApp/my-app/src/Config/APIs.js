import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const endpoints = {
  login: "/o/token/",
  "load-product-home": "products/load-product-home/",
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
