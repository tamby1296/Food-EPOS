import MealList from "./Views/MealList";
import OrderDetails from "./Views/OrderDetails";

const HomeScreen = () => {
  return (
    <div className="flex pr-[400px]">
      <MealList />
      <OrderDetails />
    </div>
  );
};

export default HomeScreen;
