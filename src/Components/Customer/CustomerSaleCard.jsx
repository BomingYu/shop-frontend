import { useRouter } from "next/navigation";

export default function CustomerSaleCard({id, name, start, end }) {
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
    router.push("/sale/"+id);
  }
  return (
    <button onClick={handleSaleSelect}>
      <ul className="flex lg:space-x-9 md:space-x-5 sm:space-x-3 xs:space-x-2 text-lg items-center justify-center border dark:border-gray-100 border-gray-500 p-1 rounded-md hover:border-yellow-500">
        <li className="w-24 text-right truncate">{name}</li>
        <li className="w-24">{start}</li>
        <li className="text-gray-600 dark:text-amber-800">to</li>
        <li className="w-24">{convertDate(end)}</li>
      </ul>
    </button>
  );
}
