import CategoryTab from "@/components/CategoryTab";
import DealsTab from "@/components/DealsTab";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sweeper from "@/components/Sweeper";

export default function Home() {
  return (
    <>
      <Header />
      <div className=" bg-gray-100 flex justify-center">
        <div className="flex flex-col items-center max-w-[1920px]">
          <div className="flex w-full justify-center">
            <Sweeper />
          </div>
          <CategoryTab />
          <DealsTab />
        </div>
      </div>
      <Footer />
    </>
  );
}
