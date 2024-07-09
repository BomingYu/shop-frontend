import { useState } from "react";
import { LuMapPin } from "react-icons/lu";

export default function OrderDetailCard({ items }) {
  const [location, setLocation] = useState("");
  const [showLocation, setShowLocation] = useState(0);

  const [diffContact , setDiffContact] = useState(false);

  const componentTestButton = () => {
    const total = items.reduce((sum, item) => {
      if (item && item.cartItems) {
        return sum + item.cartItems[0].total;
      }
      return sum;
    }, 0);
    console.log(total);
  };

  const handleGreenPatchButton = () => {
    setShowLocation(1);
  };
  const handleBormanFreshButton = () => {
    setShowLocation(2);
  };
  return (
    <div className="font-bodyFont w-[260px] flex flex-col space-y-3">
      <button onClick={componentTestButton}>TestButton</button>
      <div className="p-1 flex flex-col justify-start space-y-1">
        <span className="text-lg">Pickup Location</span>
        <div className="flex flex-col space-y-1">
          <button
            className={`flex flex-col justify-start border border-gray-500 dark:border-gray-200 p-1 rounded-lg ${
              showLocation === 1 ? "border-4 font-black" : "font-semibold"
            }`}
            onClick={handleGreenPatchButton}
          >
            {showLocation === 1 && <LuMapPin />}
            <span>GREEN PATCH,</span>680 Grey St, Hamilton East
          </button>
          <button
            className={`flex flex-col justify-start border border-gray-500 dark:border-gray-200 p-1 rounded-lg ${
              showLocation === 2 ? "border-4 font-black" : "font-semibold"
            }`}
            onClick={handleBormanFreshButton}
          >
            {showLocation === 2 && <LuMapPin />}
            <span>BORMAN FRESH,</span>
            1/5 Borman Rd, Huntington
          </button>
        </div>
      </div>

      <div>
        <div className="flex space-x-2 items-center">
          <input
            type="checkbox"
            name="item1"
            checked={diffContact}
            onChange={()=>{setDiffContact(!diffContact)}}
          />
          <span >Use a different contact number than the registered.</span>
        </div>
      </div>
      {
        diffContact && (<div>Diff</div>)
      }
    </div>
  );
}
