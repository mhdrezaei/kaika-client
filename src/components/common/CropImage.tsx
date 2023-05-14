import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const CropImage = (props) => {
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
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Crop your image</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={cancelHandler}
                  >
                    <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
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
                      <button onClick={getCropData}>Crop Image</button>
                    </>
                  )}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={cancelHandler}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={saveHandler}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        <></>
      )}
    </>
    // <div>
    //   <input type="file" onChange={handleFileInputChange} />
    //   {image && (
    //     <Cropper
    //       src={image}
    //       initialAspectRatio={1}
    //       guides={false}
    //       viewMode={1}
    //       minCropBoxWidth={200}
    //       minCropBoxHeight={200}
    //       background={false}
    //       responsive={true}
    //       autoCropArea={1}
    //       checkOrientation={false}
    //       onInitialized={(instance) => {
    //         setCropper(instance);
    //       }}
    //     />
    //   )}
    //   <button onClick={handleCrop}>Crop</button>
    // </div>
  );
};

export default CropImage;
