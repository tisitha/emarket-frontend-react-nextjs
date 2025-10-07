import CategoryTab from "@/components/CategoryTab";
import DealsTab from "@/components/DealsTab";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sweeper from "@/components/Sweeper";
import { apiFetch } from "@/lib/apiClient.server";

type carouseType = {
  id: number;
  imgUrl: string;
  name: string;
};

export default async function Home() {
  const carousels = await apiFetch<carouseType[]>(`/open/carousel`);

  return (
    <>
      <Header />
      <div className=" bg-gray-100 flex justify-center">
        <div className="flex flex-col items-center max-w-[1920px]">
          <div className="flex w-full justify-center">
            <Sweeper carousels={carousels} />
          </div>
          <CategoryTab />
          <DealsTab />
        </div>
      </div>
      <Footer />
    </>
  );
}
