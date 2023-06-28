import { db, storage } from "@/services/firebase/firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { FC, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { selectAuthSlice, setUser } from "@/features/authentication/slice";
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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && user) {
      setIsLoading(true);
      const file = files[0];
      try {
        if (!file) throw new Error("No file selected");
        const imageRef = ref(
          storage,
          `users/${user?.user_id}/settings/profile`
        );
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
                throw new Error(error);
              });
          })
          .catch((error) => {
            throw new Error(error);
          });
      } catch (error) {
        console.log({ error });
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {!userImage ? (
        <div
          className={`flex items-center justify-center rounded-full bg-red-700 text-white`}
        >
          <span className="flex h-full w-full items-center justify-center opacity-80">
            {fisrtNameWord}
          </span>
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
          max-height: ${height}px;
          max-width: ${width}px;
          font-size: 0;
          position: absolute;
          background: #00000080;
          background-image: url("/images/icons/add-image.png");
          background-repeat: no-repeat;
          background-position: center center;
          z-index: 50;
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
