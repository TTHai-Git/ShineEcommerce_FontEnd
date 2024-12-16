import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import "../Template/shine/dist/css/StarRate.css";
import "../Template/shine/dist/css/Filter.css";
import APIs, { endpoints } from "../Config/APIs";
import { useEffect, useState } from "react";
import { useCart } from "../Config/CartContext";
import {
  FaShoppingBasket,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import { formatCurrency } from "../Convert/formatcurrency";

const ListMoreProduct = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword"); // Get the keyword from the URL
  const [moreProducts, setMoreProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Bán chạy nhất");
  const { addToCart } = useCart();
  const [endPage, setEndPage] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  // Reset the product list when the keyword changes
  useEffect(() => {
    loadMoreProducts();
  }, [keyword, page]);

  // Fetch products
  const loadMoreProducts = async () => {
    try {
      setIsLoading(true); // Start loading
      let url = `${endpoints["search-products-by-keyword"]}?keyword=${keyword}&page=${page}`;
      const res = await APIs.get(url);
      const products = res.data.results || [];

      // Update states
      setEndPage(res.data.next === null);
      setMoreProducts((prev) =>
        page === 1 ? products : [...prev, ...products]
      );
      setFilteredProducts((prev) =>
        page === 1 ? products : [...prev, ...products]
      );
      navigate(`/products/search/?keyword=${keyword}&page=${page}`);
    } catch (ex) {
      console.error("Error loading products:", ex);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // Sort products based on filter
  const sortProducts = (filter) => {
    let sortedProducts = [...moreProducts];

    if (filter === "Giá: Tăng dần") {
      sortedProducts.sort(
        (a, b) => a.present_price_product - b.present_price_product
      );
    } else if (filter === "Giá: Giảm dần") {
      sortedProducts.sort(
        (a, b) => b.present_price_product - a.present_price_product
      );
    } else if (filter === "Tên: A-Z") {
      sortedProducts.sort((a, b) =>
        a.name_product.localeCompare(b.name_product)
      );
    } else if (filter === "Tên: Z-A") {
      sortedProducts.sort((a, b) =>
        b.name_product.localeCompare(a.name_product)
      );
    }

    setFilteredProducts(sortedProducts);
  };

  // Handle filter change
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    sortProducts(filter);
  };

  // Load products on page or keyword change
  useEffect(() => {
    loadMoreProducts();
  }, [page, keyword]);

  // Add product to cart
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="san-pham-ds-page">
      <main>
        <section className="product-list">
          <div className="container">
            <div className="main-wrapper py-4">
              <div className="row">
                <div className="col-lg-9">
                  <div className="product-list-wrapper">
                    <div className="heading-wrapper">
                      <h1 className="shine-title">
                        Tìm thấy {filteredProducts.length} kết quả với từ khóa "
                        {keyword}"
                      </h1>
                      <div className="sort-by">
                        <Filter
                          selectedFilter={selectedFilter}
                          onFilterChange={handleFilterChange}
                        />
                      </div>
                    </div>
                    <div className="list-item-wrapper">
                      <div className="row">
                        {filteredProducts.map((product) => (
                          <ProductItem
                            key={product.id_product}
                            product={product}
                            page={page}
                            keyword={keyword}
                            handleAddToCart={() => handleAddToCart(product)}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="button">
                      {endPage ? (
                        <Link
                          className="view-more-button"
                          to={`/products/search/?keyword=${keyword}&page=${page}`}
                          onClick={() => setPage(1)}
                        >
                          Thu gọn
                        </Link>
                      ) : (
                        <Link
                          className="view-more-button"
                          to={`/products/search/?keyword=${keyword}&page=${page}`}
                          onClick={() => setPage((prevPage) => prevPage + 1)}
                          disabled={isLoading} // Disable button if loading
                        >
                          {isLoading ? "Đang tải..." : "Xem thêm"}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// Filter Component
const Filter = ({ selectedFilter, onFilterChange }) => {
  const filterOptions = [
    "Giá: Tăng dần",
    "Giá: Giảm dần",
    "Tên: A-Z",
    "Tên: Z-A",
  ];

  return (
    <div className="filter-container">
      <label className="filter-label">Sắp xếp theo:</label>
      <select
        value={selectedFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="filter-select"
      >
        {filterOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

// Product Card Component
const ProductItem = ({ product, handleAddToCart, keyword, page }) => (
  <div className="col-md-4 col-6 col-xl-3">
    <div className="product-item">
      <div className="top-item">
        <div className="image">
          <Link to={`/products/${product.id_product}/info-details`}>
            <img src={product.image_product} alt={product.name_product} />
          </Link>
        </div>
        {product.discount_product && (
          <div className="sale">{product.discount_product} %</div>
        )}
        <div className="hidden-wrap">
          <Link
            className="add-cart"
            aria-label="Add to cart"
            to={`/products/search/?keyword=${keyword}&page=${page}`}
            onClick={handleAddToCart}
          >
            <FaShoppingBasket />
            <span>Thêm vào giỏ hàng</span>
          </Link>
          <Link
            className="view-detail"
            to={`/products/${product.id_product}/info-details`}
          >
            <FaStar />
            <span>Xem chi tiết</span>
          </Link>
        </div>
      </div>
      <div className="bottom-item">
        <h5 className="title">
          <Link to={`/products/${product.id_product}/info-details`}>
            {product.name_product}
          </Link>
        </h5>
        <div className="price">
          <span className="new black">
            {formatCurrency(product.present_price_product)}
          </span>
          {product.unit_price_product && (
            <span className="old">
              {formatCurrency(product.unit_price_product)}
            </span>
          )}
        </div>
        <div className="flex">
          <div className="rate" data-rate="5">
            <div className="stars">
              {[...Array(5)].map((_, i) => {
                const rating = product.star_comment_rate;
                if (i < Math.floor(rating)) {
                  // Full star
                  return <FaStar key={i} className="star active" />;
                } else if (i < rating) {
                  // Half star
                  return <FaStarHalfAlt key={i} className="star half-active" />;
                } else {
                  // Empty star
                  return <FaRegStar key={i} className="star" />;
                }
              })}
            </div>
          </div>
          <div className="cart-button">
            <Link
              className="add-cart"
              aria-label="Add to cart"
              to={`/products/search/?keyword=${keyword}&page=${page}`}
              onClick={() => handleAddToCart(product)}
            >
              <FaShoppingBasket />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ListMoreProduct;
