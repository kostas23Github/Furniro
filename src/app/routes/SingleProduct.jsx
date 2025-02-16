import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ProductsContext } from "../../components/contexts/ProductsContext";
import Loading from "../../components/loadingAnimation/Loading";
import ErrorPage from "./ErrorPage";
import StarRating from "../../components/StarRating";

function SingleProduct() {
  const { productId } = useParams();
  const { products, loading, error } = useContext(ProductsContext);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  if (loading) return <Loading />;
  if (error) return <ErrorPage />; // Add a message here.

  const product = products.find((p) => p.id === Number(productId));

  if (!product) return <ErrorPage />; // Add a message here.

  const images = product.images;
  const hasImages = images.length > 1;

  return (
    <div>
      <ul className="bg-gold-light-3 min-h-24 flex gap-2 justify-center items-center flex-wrap px-5 sm:px-10 lg:px-20 py-6 sm:py-8 lg:py-12">
        <li className="after:content-['>'] after:ps-2">Home</li>
        <li className="after:content-['>'] after:ps-2">Shop</li>
        <li className="font-bold">{product.title}</li>
      </ul>
      <div className="product-hero-container px-5 sm:px-10 lg:px-20 py-6 sm:py-8 lg:py-12 grid grid-cols-1 md:grid-cols-2 gap-11">
        <div className={`images-container grid grid-cols-[76px_1fr] gap-8`}>
          {hasImages && (
            <div className="grid self-start gap-8">
              {images.map(
                (image, index) =>
                  index !== currentImgIndex && (
                    <img
                      key={index}
                      src={image}
                      className="bg-gold-light-2 hover:bg-gold-light-3 rounded-sm w-[76px] h-20 cursor-pointer"
                      onClick={() => setCurrentImgIndex(index)}
                    />
                  )
              )}
            </div>
          )}
          <img
            src={images[currentImgIndex]}
            alt={product.title}
            className="bg-gold-light-2 hover:bg-gold-light-3 rounded-lg shrink w-full max-w-[423px] aspect-[0.846]"
          />
        </div>
        <div className="product-info-container">
          <p className="text-3xl w-max">{product.title}</p>
          <p className="w-max">{product.price}</p>
          <div className="flex items-center">
            <StarRating rating={product.rating}/> 
            <p className="ms-2 ps-4 me-2 text-grey-400 border-l-2 border-grey-200">{product.reviews.length}</p><p className="text-grey-400">Customer Reviews</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
