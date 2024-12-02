import { useSearchParams } from "react-router-dom";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
const MoreProduct = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  return (
    <main>
      <section className="main-section about-1">
        <div className="container">
          <h1>Đây là trang xem thêm sản phẩm theo từ khoá "{keyword}"</h1>
        </div>
      </section>
    </main>
  );
};
export default MoreProduct;
