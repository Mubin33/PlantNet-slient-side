import { useState } from "react";
import UpdateUserModal from "../../Modal/UpdateUserModal";
import PropTypes from "prop-types";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; 
import Swal from 'sweetalert2'




const UserDataRow = ({ item,refetch }) => {
  const { name, email, image, role, timestamp, status } = item;
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const updateRole = async (value) => {
    if (role === value) return 
      try {
        await axiosSecure.patch(`/user/update/role/${email}`,{role:value});
        Swal.fire({
          icon:'success',
          title:'DOne'
        })
        refetch()
      } catch (err) {
        console.log(err);
      } finally{
        setIsOpen(false)
      }
    }

  console.log(status);
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-red-500 whitespace-no-wrap">
          {status ? (
            status === "Requested" ? (
              <h1 className="text-yellow-500">{status}</h1>
            ) : (
              <h1 className="text-green-500">{status}</h1>
            )
          ) : (
            <p className="text-red-500">Unavailable</p>
          )}
        </p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Role</span>
        </span>
        {/* Modal */}
        <UpdateUserModal
          updateRole={updateRole}
          role={role}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;
