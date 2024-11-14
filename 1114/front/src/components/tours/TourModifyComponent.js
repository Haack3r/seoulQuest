import React, { useEffect, useRef, useState } from "react";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { deleteOne, getOne, putOne } from "../../api/tourApi";

const host = API_SERVER_HOST;

const initState = {
  tno: 0,
  tname: "",
  tdesc: "",
  tprice: 0,
  uploadFileNames: [],
};

const TourModifyComponent = ({ tno }) => {
  const [tour, setTour] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);
  const { moveToList, moveToRead, page, size } = useCustomMove();
  const uploadRef = useRef();

  useEffect(() => {
    setFetching(true);
    getOne(tno).then((data) => {
      setTour(data);
      setFetching(false);
    });
  }, [tno]); //tno가 바뀔때마다 useEffect실행

  const handleChangeTour = (e) => {
    tour[e.target.name] = e.target.value;
    setTour({ ...tour });
  };

  const deleteOldImages = (imageName) => {
    const resultFileNames = tour.uploadFileNames.filter(
      (fileName) => fileName !== imageName
    );
    tour.uploadFileNames = resultFileNames;

    setTour({ ...tour });
  };

  const handleClickModify = () => {
    const files = uploadRef.current.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("tname", tour.tname);
    formData.append("tdesc", tour.tdesc);
    formData.append("price", tour.price);
    formData.append("delFlag", tour.delFlag);

    for (let i = 0; i < tour.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", tour.uploadFileNames[i]);
    }

    setFetching(true);

    putOne(tno, formData);
  };

  const handleClickDelete = () => {
    setFetching(true);
    deleteOne(tno).then((data) => {
      setResult("Deleted");
      setFetching(false);
    });
  };

  const closeModal = () => {
    if (result === "Modified") {
      moveToRead(tno);
    } else if (result === "Deleted") {
      moveToList({ page, size });
    }
    setResult(null);
  };

  return (
    <div>
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <ResultModal
          title={`${result}`}
          content={"정상적으로 처리되었습니다"}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Tour Name</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="tname"
            type={"text"}
            value={tour.tname}
            onChange={handleChangeTour}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">DESC</div>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="tdesc"
            rows="10"
            onChange={handleChangeTour}
            value={tour.tdesc}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Price</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="price"
            type={"number"}
            value={tour.tprice}
            onChange={handleChangeTour}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Delete</div>
          <select
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="delFlag"
            value={tour.delFlag}
            onChange={handleChangeTour}
          >
            <option value={false}>사용</option>
            <option value={true}>삭제</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Files</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            ref={uploadRef}
            multiple={true} // 파일 여러개 올리기 가능
            type={"file"}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Images</div>
          <div className="w-4/5 justify-center flex flex-wrap items-start">
            {tour.uploadFileNames.map((imgFile, i) => (
              <div
                className="flex justify-center flex-col w-1/3 m-1 align-baseline"
                key={i}
              >
                <button
                  className="bg-blue-500 text-3xl text-white"
                  onClick={() => deleteOldImages(imgFile)}
                >
                  Delete
                </button>
                <img src={`${host}/api/tours/view/s_${imgFile}`} alt="img" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleClickDelete}
        >
          Delete
        </button>
        <button
          type="butotn"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-orange-500"
          onClick={handleClickModify}
        >
          Modify
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={() => moveToList({ page, size })}
        >
          List
        </button>
      </div>
    </div>
  );
};

export default TourModifyComponent;
