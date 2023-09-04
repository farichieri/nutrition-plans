import { useWindowWidth } from "@/hooks";
import { FC, useState } from "react";
import { Drawer } from "vaul";
import Modal from "../Modal/Modal";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  children: React.ReactNode;
  btnText: string;
  title?: string;
}

const VaulDrawer: FC<Props> = ({ children, title, btnText }) => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {isMobile ? (
        <Drawer.Root open={open} shouldScaleBackground>
          <Drawer.Trigger asChild>
            <button
              onClick={() => setOpen(true)}
              className="m-auto rounded-3xl border px-4 py-2 duration-300 hover:bg-slate-500/20"
            >
              {btnText}
            </button>
          </Drawer.Trigger>
          <Drawer.Overlay className="fixed inset-0 z-[9999] bg-black/40" />
          <Drawer.Portal>
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[9999] mt-36 flex h-[100%] flex-col bg-tertiary-color">
              <div className="flex items-center px-4 py-2">
                <BsChevronDown
                  onClick={() => setOpen(false)}
                  className="h-6 w-6 text-green-500"
                />
                {title && (
                  <span className="mx-auto pl-4 text-xl font-semibold leading-5 text-green-500">
                    {title.charAt(0).toUpperCase() + title.slice(1)}
                  </span>
                )}
                <span className="w-8"></span>
              </div>
              <div className="flex w-auto min-w-full flex-col overflow-hidden px-2">
                {/* <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" /> */}
                {children}
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      ) : (
        <>
          <button
            className="m-auto rounded-3xl border px-4 py-2 duration-300 hover:bg-slate-500/20"
            onClick={handleOpen}
          >
            {btnText}
          </button>
          {open && (
            <Modal onClose={handleClose}>
              <section className="!z-[999] flex h-auto max-h-[80vh] w-auto min-w-full max-w-[95vw] flex-col overflow-hidden px-2 py-4">
                <span className="px-2 py-4 text-xl font-semibold text-green-500 ">
                  {title}
                </span>
                {children}
              </section>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default VaulDrawer;
