import { db, storage } from "@/firebase/firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { FC } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { selectAuthSlice, setUser } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

interface Props {
  width: number;
  height: number;
  changeable: boolean;
}

const Avatar: FC<Props> = ({ width, height, changeable }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const userImage = user?.photo_url || "";
  const fisrtNameWord = user?.display_name[0]?.toLowerCase();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && user) {
      const file = files[0];
      if (!file) return;
      const imageRef = ref(storage, `users/${user?.user_id}/settings/profile`);
      uploadBytes(imageRef, file)
        .then(() => {
          getDownloadURL(imageRef)
            .then(async (newImageUrl) => {
              await updateDoc(doc(db, "users", user.user_id), {
                photo_url: newImageUrl,
              });
              const userUpdated = {
                ...user,
                photo_url: newImageUrl,
              };
              dispatch(setUser(userUpdated));
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      {!userImage ? (
        <div
          className={`flex items-center justify-center rounded-full bg-gray-400 dark:bg-gray-700`}
        >
          <span className="text-lg opacity-80">{fisrtNameWord}</span>
          {changeable && (
            <input
              title="Upload a new photo"
              type="file"
              onChange={handleChange}
              accept="image/*"
            />
          )}
        </div>
      ) : (
        <div
          className={`relative flex items-center justify-center rounded-full `}
        >
          {changeable && (
            <input
              title="Upload a new photo"
              type="file"
              onChange={handleChange}
              accept="image/*"
            />
          )}
          <Image
            className="flex items-center justify-center overflow-auto rounded-full"
            alt="Avatar"
            src={userImage}
            width={width}
            height={height}
          />
        </div>
      )}
      <style jsx>{`
        div {
          height: ${height}px;
          width: ${width}px;
          overflow: hidden;
          min-height: ${height}px;
          min-width: ${width}px;
        }
        input[type="file"] {
          cursor: pointer;
          width: 100%;
          height: 100%;
          font-size: 0;
          position: absolute;
          background: #00000080;
          background-image: url("/images/icons/add-image.png");
          background-repeat: no-repeat;
          background-position: center center;
          z-index: 999;
          border-radius: 50%;
          opacity: 0;
          transition: 0.3s;
        }
        input:hover {
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default Avatar;
