import CategoryTab from "@/components/CategoryTab";
import DealsTab from "@/components/DealsTab";
import Sweeper from "@/components/Sweeper";

export default function Home() {
  return (
    <div className="flex flex-col items-center max-w-[1920px]">
      <div className="flex w-full justify-center">
        <Sweeper />
      </div>
      <CategoryTab />
      <DealsTab />
    </div>
  );
}
