import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import MenuItem from "./MenuItem";
import { useContext, useState } from "react";
import BecomeSellerModal from "../../../Modal/BecomeSellerModal"; 
import { AuthContext } from './../../../../providers/AuthProvider'; 
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CustomerMenu = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const {user} = useContext(AuthContext)
  const {email} = user
  const axiosSecure = useAxiosSecure()


  const handleSeller=async()=>{
    try{
     const {data} =  await axiosSecure.patch(`/users/${email}`)
      closeModal()
      console.log(data)
      Swal.fire({
        icon:'success',
        title:'Request successfully send'
      })
    }catch(err){
      console.log(err.response.data)
      closeModal()
      Swal.fire({
        icon:'error',
        title: `${err.response.data}`
      })
    }
  }
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <MenuItem icon={BsFingerprint} label="My Orders" address="my-orders" />

      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer"
      >
        <GrUserAdmin className="w-5 h-5" />

        <span className="mx-4 font-medium">Become A Seller</span>
      </div>

      <BecomeSellerModal closeModal={closeModal} handleSeller={handleSeller} isOpen={isOpen} />
    </>
  );
};

export default CustomerMenu;
