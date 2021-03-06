import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import axios from "axios";
import { Col, Row } from "react-bootstrap";
//port products from "../products";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import ProductCarousel from "../components/ProductCarousel";
import Paginate from "../components/Paginate";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  //const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    // const fetchProducts = async () => {
    //   const { data } = await axios.get("/api/products");
    //   setProducts(data);
    // };
    // fetchProducts();
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
