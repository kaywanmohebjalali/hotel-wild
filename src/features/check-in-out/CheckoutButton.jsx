import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

// eslint-disable-next-line react/prop-types
function CheckoutButton({ bookingId }) {
  const {checkout, isLoading}=useCheckout()
  return (
    <Button onClick={()=>checkout(bookingId)} 
    disabled={isLoading} 
    variation="primary" size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
