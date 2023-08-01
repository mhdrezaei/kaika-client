import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

const CropImage = (props) => {
  const {t} = useTranslation()
  const [image, setImage] = useState<string>();
  const [cropper, setCropper] = useState<Cropper>();
  const [showModal, setShowModal] = useState(true);
  const getCropData = async () => {
    if (cropper) {
      const file = await fetch(cropper.getCroppedCanvas().toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          setImage(URL.createObjectURL(blob));
          return new File([blob], "newAvatar.png", { type: "image/png" });
        });
    }
  };
  const cancelHandler = () => {
    props.onRemove();
    setShowModal(false);
  };
  const saveHandler = async () => {
    if (cropper) {
      const file = await fetch(cropper.getCroppedCanvas().toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          const image = new File([blob], "newAvatar.png", {
            type: "image/png",
          });
          props.onCroped(image);
          setShowModal(false);
        });
    }
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-md shadow-brown-50 relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 bg-kaika-yellow border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl text-white font-semibold">{t("Crop your image")}</h3>
                  <button
                    className="flex justify-start items-center p-1  bg-transparent border-0 text-black  text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={cancelHandler}
                  >
                    <span className="block text-white h-6 w-6 text-2xl  outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto bg-black">
                  {image ? (
                    <img src={image} />
                  ) : (
                    <>
                      <Cropper
                        src={props.img}
                        style={{ height: 400, width: 400 }}
                        initialAspectRatio={4 / 4}
                        minCropBoxHeight={100}
                        minCropBoxWidth={100}
                        guides={false}
                        checkOrientation={false}
                        onInitialized={(instance) => {
                          setCropper(instance);
                        }}
                      />
                      {/* <Button variant="gradient"
                        className="relative  inline-flex items-center justify-center px-8 py-3 md:mt-4 overflow-hidden font-semibold text-base bg-kaika-yellow transition duration-300 ease-out border-2 rounded-md group"
                        type="button" ripple={true} size="sm" onClick={getCropData}>
                        {t("Crop Image")}
                      </Button> */}
                      {/* <button onClick={getCropData}>Crop Image</button> */}
                    </>
                  )}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end gap-2 bg-black p-6 border-t border-solid border-slate-200 rounded-b">
                  
                  <Button
                variant="gradient"
                // type="submit"
                color="red"
                ripple={true}
                size="md"
                className="relative  inline-flex items-center justify-center px-8 py-3 md:mt-4 overflow-hidden font-semibold text-base bg-kaika-yellow transition duration-300 ease-out border-2 rounded-md group"
                onClick={cancelHandler}
                >{t("Close")}</Button>
                  <Button
                variant="gradient"
                // type="submit"
                color="orange"
                ripple={true}
                size="md"
                className="relative  inline-flex items-center justify-center px-8 py-3 md:mt-4 overflow-hidden font-semibold text-base bg-kaika-yellow transition duration-300 ease-out border-2 rounded-md group"
                onClick={saveHandler}
              >
                {t("Save-Changes")}
              </Button>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="backdrop-blur-sm fixed inset-0 z-40 "></div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CropImage;
