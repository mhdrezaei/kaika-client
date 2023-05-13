import {
  ExclamationTriangleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { Checkbox, Avatar, Typography } from "@material-tailwind/react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../data/constants";
import { alertUnderThreshold } from "../../../service/api";

const AllWorkersRow = ({
  firstName,
  lastName,
  tel,
  job,
  imageUrl,
  birthDate,
  _id,
  className,
  isSearch,
  filter,
  isShowJustAlertEmployees,
  selectWorkerHandler,
}) => {
  const { data } = useQuery("alerUnderThreshold" + _id, () =>
    alertUnderThreshold(_id)
  );
  return (
    <tr
      className={
        (isSearch && !filter.length) ||
        (isShowJustAlertEmployees && !data?.data.isAlert)
          ? "hidden"
          : ""
      }
      key={_id}
    >
      <td className={`pl-2 ${className}`}>
        <Checkbox
          id={_id}
          color="orange"
          value={_id}
          onChange={(e) => selectWorkerHandler(e, _id)}
        />
      </td>
      <td className={className}>
        <div className="flex items-center gap-4">
          <div className="w-fit h-fit relative">
            <Avatar
              src={
                imageUrl
                  ? baseUrl + imageUrl
                  : "/assets/image/no-profile-photo.jpg"
              }
              alt={`${firstName} + ${lastName}`}
              size="sm"
            />
            <ExclamationTriangleIcon
              className={
                "w-5 absolute -right-1/4 -top-1/4 " +
                (data?.data.isAlert ? "opacity-100" : "opacity-0")
              }
              color="yellow"
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold text-blue-gray-50"
            >
              {`${firstName} ${lastName}`}
            </Typography>
            {/* <Typography className="text-xs font-normal text-blue-gray-500">
                                {email}
                              </Typography> */}
          </div>
        </div>
      </td>
      <td className={className}>
        <Typography className="text-xs font-semibold text-blue-gray-50">
          {job}
        </Typography>
      </td>
      <td className={className}>
        <Typography className="text-xs font-semibold text-blue-gray-50">
          {tel}
        </Typography>
      </td>
      <td className={className}>
        <Typography className="text-xs font-semibold text-blue-gray-50">
          {new Date(birthDate).toLocaleDateString("fr")}
        </Typography>
      </td>
      <td className={className}>
        <div className="flex justify-center gap-2">
          <Link
            to={`/user/workers/worker-info/${_id}`}
            className="inline text-xs font-semibold text-blue-gray-50"
          >
            <PencilSquareIcon strokeWidth={2.5} className="h-5 w-5" />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default AllWorkersRow;
