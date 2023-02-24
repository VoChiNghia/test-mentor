import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { setOpentModal } from "../redux/ModalHoc";
import { AiOutlineDown } from "react-icons/ai";
import Slider from "rc-slider";
import { HiMenuAlt4 } from "react-icons/hi";
type Props = {};

const EditProjectDetail = (props: Props) => {
  const [statusId, setStatusId] = useState<string>("");
  const [typeId, setTypeId] = useState<string>("");

  const { taskDetail } = useSelector(
    (state: RootState) => state.projectReducer
  );
  console.log(taskDetail);
  const [timeTrackingRemaining, setTimeTrackingRemaining] = useState<any>(0);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setOpentModal(false));
  };

  return (
    <div className="">
      <div className="flex">
        <div className="w-72">
          <div className="">
            <select
              name="cars"
              id="cars"
              defaultValue={taskDetail.taskId}
              className="hover:bg-gray-100 outline-none rounded-sm text-xs"
              onChange={(e) => setTypeId(e.target.value)}
            >
              <option value="1" className="text-xs">
                BUG
              </option>
              <option value="2" className="text-xs">
                NEW TASK
              </option>
            </select>
          </div>
          <h1 className="font-bold text-xl">{taskDetail.taskName}</h1>
          <div>
            <h1 className="font-bold">Description</h1>
            <p>{taskDetail.description}</p>
          </div>
        </div>
        <div className="w-96">
          <select
            name="cars"
            id="cars"
            className="mt-1 p-1 outline-none border-2 rounded-sm"
            onChange={(e) => setStatusId(e.target.value)}
          >
            <option value="1">BACKLOG</option>
            <option value="2">SELECTED FOR DEVELOPMENT</option>
            <option value="3">IN PROCESS</option>
            <option value="4">DONE</option>
          </select>

          <div className="mt-2">
            <div className="font-bold p-2 bg-slate-50 flex items-center justify-between border">
              <p>Detail</p>
              <AiOutlineDown />
            </div>
            <div className="flex border p-2 pb-3">
              <ul className="flex-1">
                <li className="flex justify-between my-4">
                  <p className="mr-2 font-bold w-32">Assignees</p>
                </li>
                <li className="flex my-2">
                  <p className="mr-2 font-bold w-32">Priority</p>
                </li>
                <li className="flex ">
                  <p className="mr-2 font-bold w-32">Estimate</p>
                </li>
                <li className="flex mt-2 items-center">
                  <p className="mr-2 font-bold w-32">Time tracking</p>
                </li>
              </ul>
              <ul className="flex-1">
                <li className="flex justify-between my-4">
                  <input
                    type="text"
                    value={taskDetail.originalEstimate}
                    className="flex-grow outline-none hover:bg-slate-50  focus:bg-slate-50"
                  />
                </li>
                <li className="flex my-2">
                  <select
                    id="small"
                    className="outline-none block w-full p-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-5000 "
                  >
                    <option value="1">
                      <span>--</span> Hight
                    </option>
                    <option value="2">
                      <span>--</span> Medium
                    </option>
                    <option value="3">
                      <span>--</span> Low
                    </option>
                    <option value="4">
                      <span>--</span> Lowest
                    </option>
                  </select>
                </li>
                <li className="flex ">
                  <input
                    type="text"
                    value={taskDetail.originalEstimate}
                    className="flex-grow outline-none hover:bg-slate-50  focus:bg-slate-50"
                  />
                </li>
                <li className="flex mt-2 items-center">
                  <Slider
                    value={timeTrackingRemaining}
                    onChange={setTimeTrackingRemaining}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button
        className="mt-5 px-12 py-2 rounded border-2 bg-white shadow-sm text-gray-600 hover:scale-105 cursor-pointer"
        onClick={closeModal}
      >
        Cancel
      </button>
    </div>
  );
};

export default EditProjectDetail;
