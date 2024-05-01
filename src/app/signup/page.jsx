import SignupComponent from "@/Components/SignupComponent";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA">
      <div className="flex flex-col space-y-10 items-center ">
        <h1 className="font-tagFont text-5xl font-bold">Sign Up</h1>
        <SignupComponent />
      </div>
    </main>
  );
}
