import * as React from "react";
import { IoAlertCircle } from "react-icons/io5";
import { Input } from "@material-tailwind/react";
interface InputProps {
  name: string;
  label: string;
  type: string;
  register: any;
  error: any;
  disabled: boolean;
}

const InputBox: React.FunctionComponent<InputProps> = (props) => {
  const { name, label, type, disabled, register, error } = props;
  return (
    <>
      <div className="relative">
        <Input
          type={type}
          disabled={disabled}
          label={label}
          className="text-gray-400 autofill:!bg-transparent autofill:!shadow-black"
          {...register(name)}
        />
        {error && (
          <div className="fill-red-500 absolute right-1 top-2.5 text-xl">
            <IoAlertCircle color="#ED4337" />
          </div>
        )}
        {error && <p className="text-sm text-[#ED4337] mt-1 ml-2">{error}</p>}
      </div>
    </>
  );
};

export default InputBox;
