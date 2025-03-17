import Hero from "../../components/Hero";
import shopHeroBg from "../../assets/images/hero-bg/Shop-hero-bg.png";
import CharacteristicsList from "../../components/CharacteristicsList";
import BillingForm from "../../components/form/BillingForm";

function Checkout() {
  return (
    <div>
      <Hero
        ancestors={["Home", "Cart"]}
        currentPage="Checkout"
        hasImage={shopHeroBg}
      />
      <BillingForm />
      <CharacteristicsList />
    </div>
  );
}

export default Checkout;
