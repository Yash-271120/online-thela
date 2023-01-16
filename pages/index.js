import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useState, useRef, createRef, useEffect } from "react";
import AddItemModal from "../components/AddItemModal";
import { GiHamburgerMenu } from "react-icons/gi";
import userImage from "../public/UserImage.png";
import searchIcon from "../public/SearchIcon.svg";
import BackDrop from "@/utils/BackDrop";
import refreshIcon from "../public/RefreshIcon.svg";
import { IoAddOutline } from "react-icons/io5";
import editIcon from "../public/EditIcon.svg";
import deleteIcon from "../public/DeleteIcon.svg";
import EditItemModal from "@/components/EditItemModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menu from "../components/Menu";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [currentItemName, setCurrentItemName] = useState("");
  const [itemRefs, setItemRefs] = useState({});
  const [currentItemQuantity, setCurrentItemQuantity] = useState("");
  const [currentItemUnit, setCurrentItemUnit] = useState("");
  const [currentItemWeight, setCurrentItemWeight] = useState("");
  const [currentItemId, setCurrentItemId] = useState("");
  const [itemList, setItemList] = useState([
    {
      id: 1,
      item_name: "Ashirvadh Ata",
      item_quantity: 4,
      item_unit: "3",
      item_weight: 230,
    },
    {
      id: 2,
      item_name: "Maida",
      item_quantity: 9,
      item_unit: "3",
      item_weight: 13,
    },
    {
      id: 3,
      item_name: "Matar",
      item_quantity: 32,
      item_unit: "2",
      item_weight: 23,
    },
    {
      id: 4,
      item_name: "Fortune Oil",
      item_quantity: 1,
      item_unit: "3",
      item_weight: 33,
    },
    {
      id: 5,
      item_name: "Bailkoluh Oil",
      item_quantity: 11,
      item_unit: "3",
      item_weight: 20,
    },
    {
      id: 6,
      item_name: "besan",
      item_quantity: 14,
      item_unit: "3",
      item_weight: 17.0,
    },
    {
      id: 7,
      item_name: "Raaj Oil",
      item_quantity: 17,
      item_unit: "3",
      item_weight: 24,
    },
    {
      id: 8,
      item_name: "Soya Chunk",
      item_quantity: 19,
      item_unit: "3",
      item_weight: 6,
    },
    {
      id: 9,
      item_name: "Kurkurey",
      item_quantity: 10,
      item_unit: "3",
      item_weight: 9.0,
    },
    {
      id: 10,
      item_name: "Chips",
      item_quantity: 20,
      item_unit: "3",
      item_weight: 10.0,
    },
  ]);

  const [unitsList, setUnitsList] = useState([
    {
      name: "g",
    },
    {
      name: "kg",
    },
    {
      name: "pkt",
    },
    {
      name: "piece",
    },
    {
      name: "l",
    },
    {
      name: "ml",
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddingDisabled, setIsAddingDisabled] = useState(false);
  const [isEditingDisabled, setIsEditingDisabled] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userName, setUserName] = useState("Kushagra");
  const bottomRef = useRef(null);

  useEffect(() => {
    const refs = {};
    itemList.forEach((item) => {
      refs[item.id] = createRef();
    });
    setItemRefs(refs);

    /*
      GET request to https://www.onlinethela.online/assignment/api/items
      and update itemList state with the response data.
      if the response is not successful, show a toast with the error message
    */
  }, []);

  const refreshHandler = () => {
    toast.info("Refreshing...", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    setIsRefreshing(true);

    /*
      GET request to https://www.onlinethela.online/assignment/api/items
      and update itemList state with the response data
      if the response is not successful, show a toast with the error message
    */
    setTimeout(() => {
      setIsRefreshing(false);
    }, 3000);
  };

  const toggleAddItemModal = () => {
    if (isAddingDisabled) return;
    setIsAdding(!isAdding);
  };

  const toggleEditItemModal = (itemData) => {
    if (isEditingDisabled) return;
    setCurrentItemName(itemData.item_name);
    setCurrentItemQuantity(itemData.item_quantity);
    setCurrentItemUnit(itemData.item_unit);
    setCurrentItemWeight(itemData.item_weight);
    setCurrentItemId(itemData.id);

    setIsEditing(!isEditing);
  };

  const formValidator = (itemName, itemQuantity, itemUnit, itemWeight) => {
    if (itemName === "") {
      toast.error("Item name cannot be empty", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false;
    }
    if (itemQuantity === "") {
      toast.error("Item quantity cannot be empty", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false;
    }

    if (isNaN(itemQuantity)) {
      toast.error("Item quantity should be a number", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false;
    }

    if (itemUnit === "") {
      toast.error("Item unit cannot be empty", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false;
    }

    if ((isNaN(itemUnit) && Number(itemUnit) < 1) || Number(itemUnit) > 6) {
      toast.error("Please select a valid unit", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false;
    }

    if (itemWeight === "") {
      toast.error("Item weight cannot be empty", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false;
    }

    if (isNaN(itemWeight)) {
      toast.error("Item weight should be a number", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false;
    }

    return true;
  };

  const submitEditHandler = () => {
    if (
      !formValidator(
        currentItemName,
        currentItemQuantity,
        currentItemUnit,
        currentItemWeight
      )
    )
      return false;

    /*
      PATCH request to https://www.onlinethela.online/assignment/api//items/itemId
      with the following body
      {
        "item_name": currentItemName,
        "item_quantity": currentItemQuantity,
        "item_unit": currentItemUnit,
        "item_weight": currentItemWeight
      }
      and update itemList state
      if the response is not successful, show a toast with the error message
    */
    const updatedItemList = itemList.map((item) => {
      if (item.id === currentItemId) {
        item.item_name = currentItemName;
        item.item_quantity = currentItemQuantity;
        item.item_unit = currentItemUnit;
        item.item_weight = currentItemWeight;
      }
      return item;
    });
    setItemList(updatedItemList);
    setIsEditing(!isEditing);
    toast.success("Item edited successfully...", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setCurrentItemName("");
    setCurrentItemQuantity("");
    setCurrentItemUnit("");
    setCurrentItemWeight("");
    setIsEditingDisabled(true);
    setTimeout(() => {
      setIsEditingDisabled(false);
      setCurrentItemId(null);
    }, 5000);
    return true;
  };

  const submitAddHandler = (itemName, itemQuantity, itemUnit, itemWeight) => {
    if (!formValidator(itemName, itemQuantity, itemUnit, itemWeight))
      return false;

    /*
      POST request to https://www.onlinethela.online/assignment/api/items
      with the following body
      {
        "item_name": "itemName",
        "item_quantity": "itemQuantity",
        "item_unit": "itemUnit",
        "item_weight": "itemWeight"
      }
      and update itemList state
      if the response is not successful, show a toast with the error message
    */

    const newItem = {
      id: itemList.length + 1,
      item_name: itemName,
      item_quantity: itemQuantity,
      item_unit: itemUnit,
      item_weight: itemWeight,
    };
    setItemList([...itemList, newItem]);
    setIsAdding(!isAdding);
    setItemRefs({ ...itemRefs, [newItem.id]: createRef() });
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
    toast.success("Item added successfully to the list 🚀", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setCurrentItemId(newItem.id);
    setIsAddingDisabled(true);
    setTimeout(() => {
      setCurrentItemId(null);
      setIsAddingDisabled(false);
    }, 5000);
    return true;
  };

  const deleteItemHandler = (itemId) => {
    /*
      DELETE request to https://www.onlinethela.online/assignment/api//items/itemId
      and update itemList state
      if the response is not successful, show a toast with the error message
    */

    const updatedItemList = itemList.filter((item) => item.id !== itemId);
    setItemList(updatedItemList);
    toast.success("Item deleted successfully from the list 🚀", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <Head>
        <title>Online Thela</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_FAVICON}/favicon.ico`} />
      </Head>
      <main className=" relative overflow-x-hidden h-screen w-full">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
        />
        <BackDrop
          open={isEditing}
          closeHandler={() => {
            setIsEditing(!isEditing);
            setCurrentItemName("");
            setCurrentItemQuantity("");
            setCurrentItemUnit("");
            setCurrentItemWeight("");
            setCurrentItemId(null);
          }}
          zIndex={20}
        />
        <BackDrop
          open={isAdding}
          closeHandler={toggleAddItemModal}
          zIndex={20}
        />
        <AddItemModal
          units={unitsList}
          open={isAdding}
          closeHandler={toggleAddItemModal}
          submitAdd={submitAddHandler}
        />
        <EditItemModal
          units={unitsList}
          open={isEditing}
          closeHandler={toggleEditItemModal}
          name={currentItemName}
          setName={(name) => setCurrentItemName(name)}
          quantity={currentItemQuantity}
          setQuantity={(quantity) => setCurrentItemQuantity(quantity)}
          unit={currentItemUnit}
          setUnit={(unit) => setCurrentItemUnit(unit)}
          weight={currentItemWeight}
          setWeight={(weight) => setCurrentItemWeight(weight)}
          id={currentItemId}
          setId={(id) => setCurrentItemId(id)}
          submitEdit={submitEditHandler}
        />
        <div className=" md:flex md:h-full z-20">
          <BackDrop
            open={isMenuOpen}
            closeHandler={() => setIsMenuOpen(!isMenuOpen)}
            zIndex={0}
          />
          <Menu open={isMenuOpen} />
          <div className=" basis-9/12 h-full">
            <section>
              <nav>
                <ul className=" bg-yellow-300 flex items-center justify-between p-2">
                  <li className="md:hidden">
                    <GiHamburgerMenu
                      className=" text-4xl cursor-pointer"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />
                  </li>
                  <li>
                    <div className=" border border-black p-2 md:ml-3 rounded-lg flex cursor-pointer">
                      <input
                        id="searchInput"
                        type="text"
                        value={searchData}
                        placeholder="Search"
                        onChange={(e) => setSearchData(e.target.value)}
                        className={` bg-transparent transition-all ${
                          isSearching ? "block" : "hidden"
                        } ease-in-out duration-300 outline-none text-sm md:block`}
                      />
                      <Image
                        className=" h-5 w-5"
                        src={searchIcon}
                        onClick={() => setIsSearching(!isSearching)}
                      />
                    </div>
                  </li>
                  <li className="md:flex md:gap-3 md:items-center md:mr-3">
                    <div className=" rounded-3xl h-12 w-12 overflow-hidden">
                      <Image src={userImage} />
                    </div>
                    <div className="hidden md:block">
                      <p className=" text-l">Welcome</p>
                      <h1 className="text-xl text-white">{userName}</h1>
                    </div>
                  </li>
                </ul>
              </nav>
            </section>

            <section className=" md:p-5 md:border md:bg-[#f2f2f2] h-full ">
              <div className=" bg-white md:drop-shadow-xl md:rounded-xl">
                <section className=" pt-5">
                  <div className=" flex justify-between p-2">
                    <div className=" flex items-center gap-4">
                      <h2 className=" text-3xl font-bold">Items</h2>
                      <Image
                        className={` h-6 w-6 mt-2 hover:rotate-[-180deg] transition-all duration-200 cursor-pointer ${
                          isRefreshing ? "animate-wiggle" : ""
                        }`}
                        src={refreshIcon}
                        onClick={refreshHandler}
                      />
                    </div>

                    <div>
                      <span
                        className={` flex items-center ${
                          isAddingDisabled ? "bg-gray-500" : " bg-black"
                        } p-2 text-white rounded-md cursor-pointer`}
                        onClick={toggleAddItemModal}
                      >
                        Add Item{" "}
                        <IoAddOutline className=" text-white text-2xl ml-2" />
                      </span>
                    </div>
                  </div>
                </section>

                <section className="py-10">
                  {itemList.length === 0 ? (
                    <div className="text-center text-2xl">No Items to show</div>
                  ) : (
                    <table className=" w-full">
                      <tr className="border-b-2 border-black">
                        <th className=" text-left p-1 px-4 text-2xl">ID</th>
                        <th className=" text-left p-1 text-2xl">NAME</th>
                        <th className=" text-left p-1 text-2xl hidden md:table-cell">
                          QUANTITY
                        </th>
                        <th className=" text-left p-1 text-2xl hidden md:table-cell">
                          UNIT
                        </th>
                        <th className=" text-left p-1 text-2xl hidden md:table-cell">
                          WEIGHT
                        </th>
                      </tr>
                      {itemList?.length > 0 &&
                        itemList?.map((item, index) => {
                          return (
                            <tr
                              ref={itemRefs[item.id]}
                              className={`transition-all border-black duration-200 ${
                                currentItemId === item.id
                                  ? "border-4 border-yellow-300"
                                  : "border-b"
                              }`}
                            >
                              <td
                                className={`p-1 px-4 ${
                                  index % 2 ? "bg-gray-200" : ""
                                }`}
                              >
                                {item.id}
                              </td>
                              <td
                                className={`p-1 ${
                                  index % 2 ? "bg-gray-200" : ""
                                }`}
                              >
                                {item.item_name}
                              </td>
                              <td
                                className={`p-1 ${
                                  index % 2 ? "bg-gray-200" : " "
                                } hidden md:table-cell`}
                              >
                                {item.item_quantity}
                              </td>
                              <td
                                className={`p-1 ${
                                  index % 2 ? "bg-gray-200" : " "
                                } hidden md:table-cell`}
                              >
                                {unitsList[Number(item.item_unit) - 1].name}
                              </td>
                              <td
                                className={`p-1 ${
                                  index % 2 ? "bg-gray-200" : " "
                                } hidden md:table-cell`}
                              >
                                {item.item_weight}{" "}
                                <span className=" text-sm text-gray-500">
                                  Kg
                                </span>
                              </td>
                              <td
                                className={`p-1 ${
                                  index % 2 ? "bg-gray-200" : ""
                                }  cursor-pointer ${
                                  isEditingDisabled
                                    ? "bg-[#cccccc]"
                                    : "bg-green-400"
                                }`}
                                onClick={() => toggleEditItemModal(item)}
                              >
                                <Image src={editIcon} className="" />
                              </td>
                              <td
                                className={`p-1 ${
                                  index % 2 ? "bg-gray-200" : ""
                                } bg-red-400 cursor-pointer `}
                                onClick={() => deleteItemHandler(item.id)}
                              >
                                <Image src={deleteIcon} />
                              </td>
                            </tr>
                          );
                        })}
                    </table>
                  )}
                </section>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-14" ref={bottomRef}></div>
      </main>
    </>
  );
}
