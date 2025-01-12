/* eslint-disable react/prop-types */
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const PurchaseModal = ({ closeModal, isOpen, plant }) => {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure();
  const { seller, quantity, price, name, imageURL, description, category, _id } =
    plant;
  const { photoURL, email, displayName } = seller;

  // Total Price Calculation
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const handleQuantity = (value) => {
    if (value > quantity) {
      setTotalQuantity(quantity);
      setErrorMessage("Invalid quantity: Not enough stock available.");
      return;
    }
    if (value <= 0) {
      setTotalQuantity(1);
      setErrorMessage("Invalid quantity: Must be at least 1.");
      return;
    }
    setTotalQuantity(value);
    setErrorMessage(""); // Clear error message when valid input is entered
  };

  const handleForm = async (e) => {
    e.preventDefault();

    const form = e.target;
    const userQuantity = parseInt(form.quantity.value);
    const UserAddress = form.address.value;
    const userTotalPrice = totalQuantity * price;

    const purchaseInfo = { userQuantity, UserAddress, userTotalPrice, plant,status:'Pending', customerEmail: user.email, customerName: user.displayName};

    try {
      await axiosSecure.post("/orders", purchaseInfo);
      await axiosSecure.patch(`/plants/quantity/${_id}`, {quantityToUpdate: userQuantity, status:'de'})
      navigate('/dashboard/my-orders')
      Swal.fire({
        icon: "success",
        title: "wow...",
        text: "Purchase successfully!",
      });
    } catch (err) {
      console.log(err);
    }
    finally{
      closeModal()
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Review Info Before Purchase
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Plant: {name}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Category: {category}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Customer: {displayName}
                  </p>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">Price: $ {price}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Available Quantity: {quantity}
                  </p>
                </div>
                <form onSubmit={handleForm}>
                  <div className="my-1">
                    <label>
                      <span className="text-sm text-gray-500">Quantity:</span>
                      <input
                        // max={quantity}
                        onChange={(e) => handleQuantity(e.target.value)}
                        type="number"
                        name="quantity"
                        className="input ml-4 input-sm input-bordered"
                      />
                    </label>
                    {errorMessage && (
                      <p className="text-xs text-red-500 mt-1">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                  <div>
                    <label>
                      <span className="text-sm text-gray-500">Address:</span>
                      <input
                        type="text"
                        name="address"
                        className="input ml-5 input-sm input-bordered"
                      />
                    </label>
                  </div>
                  {errorMessage ? (
                    <button
                      disabled
                      className="btn btn-sm mt-1 w-full bg-lime-500 text-white"
                    >
                      pay:- {totalQuantity * price}$
                    </button>
                  ) : (
                    <button className="btn btn-sm mt-1 w-full bg-lime-500 text-white">
                      pay:- {totalQuantity * price}$
                    </button>
                  )}
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PurchaseModal;
