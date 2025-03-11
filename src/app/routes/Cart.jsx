import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import Hero from "../../components/hero";
import shopHeroBg from "../../assets/images/hero-bg/Shop-hero-bg.png";
import { FaTrash } from "react-icons/fa";
import Button from "../../components/button/button";
import CharacteristicsList from "../../components/CharacteristicsList";
import { ProductsContext } from "../../components/contexts/ProductsContext";
import Loading from "../../components/loadingAnimation/Loading";
// import ErrorPage from "./ErrorPage";

function Cart() {
  const { products, loading, error } = useContext(ProductsContext);
  const navigate = useNavigate();
  const product = products[30];
  console.log(product);

  useEffect(() => {
    if (error) navigate("/error", { state: { message: error } });
  }, [error, navigate]);

  if (loading) return <Loading />;
  if (error) return null;

  return (
    <div>
      <Hero ancestors={["Home"]} currentPage="Cart" hasImage={shopHeroBg} />
      <div className="px-5 sm:px-10 md:px-10 md:py-12 lg:px-20 py-8 flex flex-wrap gap-10 justify-center">
        <table className="grow max-w-[800px] table-auto border-separate border-spacing-0">
          <thead className="bg-gold-light-2 h-14">
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="">
            <tr className="w-full hover:bg-slate-200">
              <td className="w-24 h-24"><img src={product.images[0]} /></td>
              <td className="px-6 py-4">{product.title}</td>
              <td className="px-6 py-4">{product.price}€</td>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">{product.price*1}€</td>
              <td className="px-6 py-4"><FaTrash className="text-gold"/></td>
            </tr>
            <tr className="w-full hover:bg-slate-200">
              <td className="w-24 h-24"><img src={product.images[0]} /></td>
              <td className="px-6 py-4">{product.title}</td>
              <td className="px-6 py-4">name</td>
              <td className="px-6 py-4">name</td>
              <td className="px-6 py-4">name</td>
              <td className="px-6 py-4">bin</td>
            </tr>
            <tr className="w-full hover:bg-slate-200">
              <td className="w-24 h-24"><img src={product.images[0]} /></td>
              <td className="px-6 py-4">{product.title}</td>
              <td className="px-6 py-4">name</td>
              <td className="px-6 py-4">name</td>
              <td className="px-6 py-4">name</td>
              <td className="px-6 py-4">bin</td>
            </tr>
            <tr className="w-full hover:bg-slate-200">
              <td className="w-24 h-24"><img src={product.images[0]} /></td>
              <td className="px-6 py-4">{product.title}</td>
              <td className="px-6 py-4">name</td>
              <td className="px-6 py-4">name</td>
              <td className="px-6 py-4">name</td>
              <td className="px-6 py-4">bin</td>
            </tr>
            <tr className="w-full hover:bg-slate-200">
              <td className="w-24 h-24"><img src={product.images[0]} /></td>
              <td className="px-6 py-4">{product.title}</td>
              <td className="px-6 py-4">name</td>
              <td className="px-6 py-4">name</td>
              <td className="px-6 py-4">name</td>
              <td className="px-6 py-4">bin</td>
            </tr>
            <tr className="w-full hover:bg-slate-200">
              <td className="w-24 h-24"><img src={product.images[0]} /></td>
              <td className="px-6 py-4">{product.title}</td>
              <td className="px-6 py-4">name</td>
              <td className="px-6 py-4">name</td>
              <td className="px-6 py-4">name</td>
              <td className="px-6 py-4">bin</td>
            </tr>
          </tbody>
        </table>
        <div className="xl:w-96 max-h-max bg-gold-light-2 hover:bg-gold-light-3 px-16 py-5 lg:py-10">
          <p className="text-4xl text-center mb-5">Cart Total</p>
          <div className="flex flex-col">
            <div className="flex space-x-16 justify-between py-5">
              <span className="font-bold">Subtotal</span>
              <span className="text-grey-500">400000</span>
            </div>
            <div className="flex space-x-16 justify-between py-5">
              <span className="font-bold">Total</span>
              <span className="text-gold">1000000</span>
            </div>
          </div>
          <div className="justify-self-center">
            <Button
              variant="secondary-reversed"
              extraStyles="px-10 py-2 mt-3 lg:mt-6 mb-[2px] justify-self-center align-self-center"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
      <CharacteristicsList />
    </div>
  );
}

export default Cart;
