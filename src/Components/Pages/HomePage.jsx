import { useAppContext } from "../../../Context/AppContext";
import Cards from "../Card/Cards";
import SkeletonCard from "../Card/SkeletonCard";
import Modal from "../Modal/Modal";

const HomePage = () => {
  const { showData, isModal } = useAppContext();
  const { loader } = useAppContext();

  return loader ? (
    <div className="h-full w-full flex flex-col items-center justify-center pt-20 gap-4 px-5 pb-7">
      <SkeletonCard />
      <SkeletonCard />
    </div>
  ) : (
    <div className="h-full w-full flex flex-col items-center justify-center pt-20 gap-4 px-5 pb-7">
      {showData.map((v, i) => (
        <div className="w-full max-w-[550px]" key={v._id}>
          <Cards
            title={v.title}
            description={v.description}
            file={v.filePath?.url}
            postTime={v.postTime}
            userData={v.userData}
            postId={v._id}
            likeArr={v.isLike}
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
