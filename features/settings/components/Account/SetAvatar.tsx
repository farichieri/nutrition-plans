import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";
import { db, storage } from "@/services/firebase/firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { FC, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { selectAuthSlice, setUser } from "@/features/authentication/slice";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Spinner from "@/components/Loader/Spinner";

interface Props {}

const SetAvatar: FC<Props> = () => {
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
                toast.success("Avatar updated successfully");
                setIsLoading(false);
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
        toast.error("Error updating avatar");
      }
    }
  };

  return (
    <>
      <Box>
        <BoxMainContent>
          <div className="flex flex-col gap-5">
            <span className="text-3xl font-semibold">Your Avatar</span>
            <span>Click on the avatar to upload a new one.</span>
          </div>
          <>
            {!userImage ? (
              <div
                className={`flex h-24 min-h-[100px] w-24 min-w-[100px] items-center justify-center overflow-hidden rounded-full bg-red-700 text-5xl font-medium text-white`}
              >
                <span className="flex h-full w-full items-center justify-center opacity-80">
                  {fisrtNameWord}
                </span>
                <input
                  title="Upload a new Avatar"
                  type="file"
                  onChange={handleChange}
                  accept="image/*"
                />
              </div>
            ) : (
              <div
                className={`relative flex h-24 min-h-[100px] w-24  min-w-[100px] items-center justify-center overflow-hidden rounded-full`}
              >
                <input
                  title="Upload a new Avatar"
                  type="file"
                  onChange={handleChange}
                  accept="image/*"
                />
                <Image
                  className="flex items-center justify-center overflow-auto rounded-full"
                  alt="Avatar"
                  src={userImage}
                  width={100}
                  height={100}
                />
              </div>
            )}
          </>
        </BoxMainContent>
        <BoxBottomBar>
          <span className="text-sm opacity-50">
            Personalize your account adding a avatar
          </span>
          <div>{isLoading && <Spinner customClass="w-5 h-5" />}</div>
        </BoxBottomBar>
      </Box>
      <style jsx>{`
        input[type="file"] {
          cursor: pointer;
          width: 100%;
          height: 100%;
          max-height: ${100}px;
          max-width: ${100}px;
          font-size: 0;
          position: absolute;
          border-radius: 50%;
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default SetAvatar;