import { formatDate } from "@/utils/Date";

const DashboardScreen = () => {
  return (
    <div className="p-7">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <h2>{formatDate(new Date(), "EEEE, dd MMMM yyyy")}</h2>
      </div>
    </div>
  );
};

export { DashboardScreen };

export function Component() {
  return <DashboardScreen />;
}
