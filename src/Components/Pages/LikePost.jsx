import { useAppContext } from "../../../Context/AppContext";
import LikePostCard from "../Card/LikePostCard";

const LikePost = () => {
  const { likeData } = useAppContext();

  return (
    <div className="h-full w-full p-4">
      <h2 className="text-2xl font-bold mb-6 text-white content-center text-center">
        Your Liked Posts ❤️
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {likeData?.map((v, i) => {
          return (
            <div key={i}>
              <LikePostCard
                title={v.title}
                description={v.description}
                image={v.filePath.replace("Public", "")}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LikePost;
