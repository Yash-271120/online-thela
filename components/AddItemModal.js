import { RxCross1 } from "react-icons/rx";
import { IoAddOutline } from "react-icons/io5";
import edit from "../public/Edit.svg";
import Image from "next/image";
import { useState } from "react";

const AddItemModal = ({ open, units, closeHandler, submitAdd }) => {
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemUnit, setItemUnit] = useState("10");
  const [itemWeight, setItemWeight] = useState("");
  const [itemId, setItemId] = useState("");

  const submitHandler = () => {
    if (submitAdd(itemName, itemQuantity, itemUnit, itemWeight, itemId)) {
      setItemName("");
      setItemQuantity("");
      setItemUnit("1");
      setItemWeight("");
      setItemId("");
      closeHandler();
    }
  };

  return (
    <div
      id="addItemBox"
      className={`z-40 h-full top-0 fixed bg-white left-0 md:left-[30rem] bottom-0 right-20 ${
        open ? "translate-x-24" : "translate-x-[12000px]"
      } transition-all duration-200`}
    >
      <div className="flex justify-between p-4 bg-blue-50">
        <div className="flex items-center gap-3">
          <span className=" text-5xl">ADD ITEM</span>
          <Image src={edit} className=" mt-1" />
        </div>
        <div className=" border-2 rounded-full border-black mr-1 p-1">
          <RxCross1
            className="text-4xl hover:rotate-[-180deg] transition-all duration-300 cursor-pointer"
            onClick={closeHandler}
          />
        </div>
      </div>

      <div className=" px-3 py-6">
        <div className="py-2">
          <p className="mb-2">Item Name</p>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className=" outline-none border-blue-300 border-2 rounded w-4/5 h-10"
            required
          />
        </div>
        <div className="py-2">
          <p className="mb-2">Quantity</p>
          <input
            type="text"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
            className=" outline-none border-blue-300 border-2 rounded w-4/5 h-10"
            required
          />
        </div>
        <div className="py-2">
          <p className="mb-2">Unit</p>
          <select
            className=" outline-none border-blue-300 border-2 rounded w-4/5 h-10"
            onChange={(e) => setItemUnit(e.target.value)}
            required
            value={itemUnit}
          >
            <option value="10" disabled>
              Select Unit
            </option>
            {units.map((unit, index) => {
              return <option value={index + 1}>{unit.name}</option>;
            })}
          </select>
        </div>
        <div className="py-2">
          <p className="mb-2">Weight</p>
          <div className=" items-center flex">
            <input
              type="text"
              value={itemWeight}
              onChange={(e) => setItemWeight(e.target.value)}
              className=" outline-none border-blue-300 border-2 border-r-0 rounded-r-none w-8/12 h-10"
              required
            />
            <span className="border-blue-300 border-2 border-l rounded rounded-l-none pb-1 px-3 text-2xl">
              Kg
            </span>
          </div>
        </div>
      </div>
      <div className="">
        <div className=" flex justify-around">
          <button className=" text-yellow-300 py-1 px-2 border border-yellow-300 rounded-lg text-2xl">
            Cancel
          </button>
          <button className=" text-yellow-300 py-1 px-2 border border-yellow-300 rounded-lg text-2xl">
            Reset
          </button>
          <button
            className="flex items-center gap-3 hover:bg-[#00cc88] transition-all duration-200 group py-1 px-2 border text-white bg-yellow-300 rounded-lg text-2xl"
            onClick={submitHandler}
          >
            Save{" "}
            <IoAddOutline className="text-2xl mr-1 group-hover:text-3xl transition-all duration-200" />
          </button>
        </div>
        <div
          className=" flex justify-between my-5 rounded-lg w-3/5 items-center m-auto bg-yellow-300 cursor-pointer md:hidden"
          onClick={submitHandler}
        >
          <span className=" py-1 px-2 bg-yellow-300 rounded-lg text-xl text-black">
            Add Item
          </span>
          <IoAddOutline className="text-2xl mr-1" />
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
