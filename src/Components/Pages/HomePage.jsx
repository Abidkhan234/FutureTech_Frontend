import { useAppContext } from "../../../Context/AppContext";
import Cards from "../Card/Cards";
import SkeletonCard from "../Card/SkeletonCard";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";

const HomePage = () => {
  const { showData, tokenData, isModal } = useAppContext();
  const { loader } = useAppContext();

  return loader ? (
    <div className="md:min-h-[89.2vh] min-h-[90.5vh] h-full w-full flex flex-col items-center justify-center pt-2 gap-4 px-5">
      <SkeletonCard />
      <SkeletonCard />
    </div>
  ) : (
    <div className="md:min-h-[89.2vh] min-h-[90.5vh] h-full w-full flex flex-col items-center justify-center pt-4 gap-4 px-5">
      {showData.map((v, i) => (
        <div className="w-full max-w-[500px] basis-[500px]" key={i}>
          <Cards
            title={v.title}
            description={v.description}
            file={v.filePath}
            postTime={v.postTime}
            userData={v.userData}
            postId={v._id}
            isLiked={v.isLike.includes(tokenData?.userId)}
          />
        </div>
      ))}
      <>
        <Modal isOpen={isModal} />
      </>
    </div>
  );
};

export default HomePage;
