export default function Page({ params }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA font-bodyFont">
      <div className="flex flex-col justify-start items-center space-y-10">
        <h1 className="text-5xl font-bold mb-3">
          Order{" "}
          <span className="text-7xl font-extrabold">{params.orderId}</span>{" "}
          Created Successfully
        </h1>
        <div className="text-2xl w-[300px] flex flex-col space-y-5">
          <p>
            Thank you for your order! Your order number is <span className="text-3xl font-bold underline">{params.orderId}</span>.
          </p>
          <p>
            Please present this order number to our staff when picking up your
            order.
          </p>
        </div>
      </div>
    </main>
  );
}
