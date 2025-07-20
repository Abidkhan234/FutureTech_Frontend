import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard = () => {
  return (
    <SkeletonTheme baseColor="#eee" highlightColor="#fff">
      <div
        className="flex flex-col gap-3 p-2 rounded-md
       bg-[#1A1A1A] w-full max-w-[500px] basis-[500px]"
      >
        <div className="flex gap-4 items-center">
          <div className="">
            <Skeleton circle width={45} height={45} />
          </div>
          <div className="flex flex-col gap-1 items-start">
            <Skeleton width={100} height={15} borderRadius={3} />
            <Skeleton width={120} height={18} borderRadius={3} />
          </div>
        </div>
        <div className="">
          <Skeleton height={250} width={`${100}%`} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="">
            <Skeleton width={`${100}%`} height={40} />
          </div>
          <div className="">
            <Skeleton width={`${100}%`} height={70} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonCard;
