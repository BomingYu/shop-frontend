import { useState } from "react";
import { LuMapPin } from "react-icons/lu";
import { useUserContext } from "@/Contexts/UserContext";

export default function OrderDetailCard({ items }) {
  const {user} = useUserContext();

  const [location, setLocation] = useState("");
  const [showLocation, setShowLocation] = useState(0);

  const [diffContact, setDiffContact] = useState(false);
  const [contact, setContact] = useState("");

  const componentTestButton = () => {
    const total = items.reduce((sum, item) => {
      if (item && item.cartItems) {
        return sum + item.cartItems[0].total;
      }
      return sum;
    }, 0);
    console.log(contact);
  };

  const handleGreenPatchButton = () => {
    setLocation("Green Patch");
    setShowLocation(1);
  };
  const handleBormanFreshButton = () => {
    setLocation("Borman Fresh");
    setShowLocation(2);
  };
  return (
    <div className="font-bodyFont w-[260px] flex flex-col space-y-5 items-center">
      <button onClick={componentTestButton}>TestButton</button>
      <div className="p-1 flex flex-col justify-start space-y-1 w-full">
        <span className="">Pickup Location</span>
        <div className="flex flex-col space-y-1">
          <button
            className={`flex flex-col justify-start border border-green-600 dark:border-gray-100 p-1 rounded-lg ${
              showLocation === 1
                ? "border-4 font-black bg-green-200 dark:bg-gray-300"
                : "font-semibold"
            }`}
            onClick={handleGreenPatchButton}
          >
            {showLocation === 1 && <LuMapPin />}
            <span>GREEN PATCH,</span>680 Grey St, Hamilton East
          </button>
          <button
            className={`flex flex-col justify-start border border-green-600 dark:border-gray-100 p-1 rounded-lg ${
              showLocation === 2
                ? "border-4 font-black bg-green-200 dark:bg-gray-300"
                : "font-semibold"
            }`}
            onClick={handleBormanFreshButton}
          >
            {showLocation === 2 && <LuMapPin />}
            <span>BORMAN FRESH,</span>
            1/5 Borman Rd, Huntington
          </button>
        </div>
      </div>

      <div className="flex flex-col space-y-1 w-full">
        {diffContact && (
          <div className="flex space-x-2 items-center">
            <span className="w-24 text-right ">Contact</span>
            <input
              type="text"
              name="contact"
              id="contact"
              onChange={(e) => {
                setContact(e.target.value);
              }}
              value={contact}
              className="dark:text-black rounded-full w-48 h-7 p-2 text-md"
              placeholder="Contact Number"
            />
          </div>
        )}
        <div className="flex space-x-2 items-center">
          <input
            type="checkbox"
            name="item1"
            checked={diffContact}
            onChange={() => {
              setDiffContact(!diffContact);
            }}
          />
          <span className="text-sm font-bold">
            Use a different contact number than the registered.
          </span>
        </div>
      </div>

      <div className="flex items-center w-full justify-center space-x-5">
        <button className="bg-gray-700 p-1 rounded-full font-semibold text-gray-200">Back</button>
        <button className="bg-amber-500 dark:bg-amber-700 p-1 rounded-full font-semibold dark:text-gray-100">Submit</button>
      </div>
    </div>
  );
}
