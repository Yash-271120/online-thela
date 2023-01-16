import { RxCross1 } from "react-icons/rx";
import { IoAddOutline } from "react-icons/io5";
import editIcon from "../public/EditIcon.svg";
import Image from "next/image";

const EditItemModal = ({
  open,
  units,
  closeHandler,
  name,
  setName,
  quantity,
  setQuantity,
  unit,
  setUnit,
  weight,
  setWeight,
  id,
  setId,
  submitEdit,
}) => {
  const resetHandler = () => {
    setName("");
    setQuantity("");
    setUnit("1");
    setWeight("");
  };

  return (
    <div
      id="addItemBox"
      className={`z-40 h-full md:left-[30rem] top-0 fixed bg-white left-0 bottom-0 right-20 ${
        open ? "translate-x-24" : "translate-x-[12000px]"
      } transition-all duration-200`}
    >
      <div className="flex justify-between p-4 bg-blue-50">
        <div className="flex items-center gap-3">
          <span className=" text-5xl">EDIT ITEM</span>
          <Image src={editIcon} className=" mt-1" />
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" outline-none border-blue-300 border-2 rounded w-4/5 h-10"
            required
          />
        </div>
        <div className="py-2">
          <p className="mb-2">Quantity</p>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className=" outline-none border-blue-300 border-2 rounded w-4/5 h-10"
            required
          />
        </div>
        <div>
          <p className="mb-2">Unit</p>
          <select
            className=" outline-none border-blue-300 border-2 rounded w-4/5 h-10"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
          >
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
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
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
          <button
            className=" text-yellow-300 py-1 px-2 border border-yellow-300 rounded-lg text-2xl transition-all duration-200 hover:bg-gray-100"
            onClick={closeHandler}
          >
            Cancel
          </button>
          <button
            className=" text-yellow-300 py-1 px-2 border border-yellow-300 rounded-lg text-2xl transition-all duration-200 hover:bg-gray-100"
            onClick={resetHandler}
          >
            Reset
          </button>
          <button
            className="flex items-center gap-3 hover:bg-[#00cc88] transition-all duration-200 group py-1 px-2 border text-white bg-yellow-300 rounded-lg text-2xl"
            onClick={submitEdit}
          >
            Save{" "}
            <IoAddOutline className="text-2xl mr-1 group-hover:text-3xl transition-all duration-200" />
          </button>
        </div>
        <div
          className=" flex justify-between my-5 rounded-lg w-3/5 items-center m-auto bg-yellow-300 cursor-pointer group md:hidden"
          onClick={submitEdit}
        >
          <span className=" py-1 px-2 bg-yellow-300 rounded-lg text-xl text-black">
            Add Item
          </span>
          <IoAddOutline className="text-2xl mr-1 group-hover:text-3xl transition-all duration-200" />
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;
