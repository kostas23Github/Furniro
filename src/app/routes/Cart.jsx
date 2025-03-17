import { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router";
import Hero from "../../components/Hero";
import shopHeroBg from "../../assets/images/hero-bg/Shop-hero-bg.png";
import { FaTrash } from "react-icons/fa";
import Button from "../../components/button/Button";
import CharacteristicsList from "../../components/CharacteristicsList";
import { ProductsContext } from "../../components/contexts/ProductsContext";
import Loading from "../../components/loadingAnimation/Loading";
import CartContext from "../../components/contexts/CartContext";

function Cart() {
  const { loading, error } = useContext(ProductsContext);
  const { cart, updateCart, removeItem } = useContext(CartContext);
  const navigate = useNavigate();
  const [vat, setVat] = useState(true);
  const [discount, setDiscount] = useState(false);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  
  useEffect(() => {
    if (error) navigate("/error", { state: { message: error } });
  }, [error, navigate]);

  const subTotalPrice = useCallback(() => {
    if (!cart) return 0;
    return Number(
      cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
    );
  }, [cart]);

  const totalPrice = useCallback(
    (vat, discount) => {
      let tempPrice = subTotalPrice();
      if (vat) tempPrice *= 1.23;
      if (discount) tempPrice *= 0.8;

      return Number(tempPrice.toFixed(2));
    },
    [subTotalPrice]
  );

  useEffect(() => {
    totalPrice(vat, discount);

    localStorage.setItem("totalPrice", totalPrice);
  }, [vat, discount, cart, totalPrice]);

  if (loading) return <Loading />;

  return (
    <div>
      <Hero ancestors={["Home"]} currentPage="Cart" hasImage={shopHeroBg} />
      <div className="px-5 sm:px-10 md:px-10 md:py-12 lg:px-20 py-8 flex flex-wrap gap-10 justify-center relative">
        <div className="max-w-[700px] grid grid-cols-3 md:grid-cols-6 gap-2 px-5 sm:px-10 md:px-0">
          {/* Table Header */}
          {cart.length > 0 && (
            <ul className="col-span-3 md:col-span-6 grid grid-cols-3 md:grid-cols-6 gap-2 font-bold text-center p-4">
              <li></li>
              <li>Product</li>
              <li>Price</li>
              <li>Quantity</li>
              <li>Subtotal</li>
              <li></li>
            </ul>
          )}
          {/* Table Body */}
          <ul className="col-span-3 md:col-span-6">
            {cart.length > 0 ? (
              cart.map((item) => (
                <li
                  key={item.id}
                  className="grid grid-cols-3 md:grid-cols-6 gap-4 items-center border border-gray-300 p-4"
                >
                  <Link to={`/shop/${item.id}`}>
                    <div className="col-span-1 flex justify-center">
                      <img
                        src={item.images[0]}
                        className="bg-gold-light-2 w-24 h-24"
                      />
                    </div>
                  </Link>
                  <div className="col-span-1 text-center">{item.title}</div>
                  <div className="col-span-1 text-center">{item.price}€</div>
                  <div className="col-span-1 flex justify-center">
                    {/* Quantity Buttons */}
                    <div className="flex items-center gap-2 outline outline-2 outline-grey-700 px-3 py-1">
                      <Button
                        variant="text"
                        handleClick={() => updateCart(item, "decrement", 1)}
                      >
                        -
                      </Button>
                      <span>
                        {item.quantity < item.stock ? item.quantity : "MAX"}
                      </span>
                      <Button
                        variant="text"
                        handleClick={() => updateCart(item, "increment", 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="col-span-1 text-center">
                    {(item.price * item.quantity).toFixed(2)}€
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <FaTrash
                      className="text-gold cursor-pointer"
                      onClick={() => removeItem(item.id)}
                    />
                  </div>
                </li>
              ))
            ) : (
              <div className="flex flex-col justify-center items-center gap-4 my-10">
                <p className="text-2xl">Your cart is empty!</p>
                <Link to={"/shop"}>
                  <Button
                    variant="secondary-reversed"
                    extraStyles="px-4 py-1.5"
                    type={"button"}
                    tooltipOptions={{
                      text: "Go to our shop page",
                      position: "bottom",
                      distance: "120",
                    }}
                  >
                    Add Products
                  </Button>
                </Link>
              </div>
            )}
          </ul>
        </div>
        <div className="xl:w-96 max-h-max bg-gold-light-2 hover:bg-gold-light-3 px-16 py-5 lg:py-10 sticky top-10">
          <p className="text-4xl text-center mb-5">Cart Total</p>
          <div className="flex flex-col">
            <div className="flex space-x-16 justify-between pt-5 pb-2">
              <span className="font-bold">Subtotal</span>
              <span className="text-grey-500">{subTotalPrice()} €</span>
            </div>
            <div className="flex justify-between gap-6 mb-0.5">
              <label htmlFor="vat">Apply VAT</label>
              <input
                type="checkbox"
                name="vat"
                id="vat"
                checked={vat}
                onChange={() => setVat(!vat)}
              />
            </div>
            <div className="flex justify-between gap-6">
              <label htmlFor="members-discount">Member&apos;s Discount</label>
              <input
                type="checkbox"
                name="members-discount"
                id="members-discount"
                checked={discount}
                onChange={() => setDiscount(!discount)}
              />
            </div>
            <div className="flex space-x-16 justify-between py-6">
              <span className="text-2xl">Total</span>
              <span className="text-gold text-2xl">
                {totalPrice(vat, discount)} €
              </span>
            </div>
          </div>
          <div className="justify-self-center">
            <Link
              to="/cart/checkout"
              state={{
                subTotal: subTotalPrice(),
                vat,
                discount,
                total: totalPrice(vat, discount),
              }}
            >
              <Button
                variant="secondary-reversed"
                type={"button"}
                tooltipOptions={{
                  text: "Place order",
                  position: "bottom",
                  distance: "120",
                }}
                extraStyles="px-10 py-2 mt-3 lg:mt-6 mb-[2px] justify-self-center align-self-center"
              >
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <CharacteristicsList />
    </div>
  );
}

export default Cart;
