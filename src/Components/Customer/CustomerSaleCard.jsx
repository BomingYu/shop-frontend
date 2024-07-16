import { useRouter } from "next/navigation";

export default function CustomerSaleCard({ id, name, end }) {
  const router = useRouter();

  const convertDate = (date) => {
    if (date === "") {
      return "N/A";
    } else {
      return date;
    }
  };
  const handleSaleSelect = () => {
    console.log(id);
    router.push("/sale/" + id);
  };
  return (
    <button onClick={handleSaleSelect}>
      <ul className="flex flex-col md:flex-row md:flex-wrap lg:space-x-9 sm:space-y-2 xs:space-y-2 items-center justify-center border dark:border-gray-100 border-gray-500 p-1 rounded-md hover:border-yellow-500">
        <div className="flex text-xl space-x-2 items-center">
          <li className="w-[180px] truncate">{name}</li>
          <li className="w-20 font-semibold text-lime-800 dark:text-teal-800">Active</li>
        </div>
        <div className="flex space-x-3 items-center">
          <li className="text-gray-900">End To</li>
          <li className="w-24">{convertDate(end)}</li>
        </div>
      </ul>
    </button>
  );
}
