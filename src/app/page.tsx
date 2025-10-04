import CategoryTab from "@/components/CategoryTab";
import DealsTab from "@/components/DealsTab";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sweeper from "@/components/Sweeper";

type carouseType = {
  id: number;
  imgUrl: string;
  name: string;
};

export default async function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiUrl}/open/carousel`);
  const carouses: carouseType[] = await res.json();

  return (
    <>
      <Header />
      <div className=" bg-gray-100 flex justify-center">
        <div className="flex flex-col items-center max-w-[1920px]">
          <div className="flex w-full justify-center">
            <Sweeper carouses={carouses} />
          </div>
          <CategoryTab />
          <DealsTab />
        </div>
      </div>
      <Footer />
    </>
  );
}
