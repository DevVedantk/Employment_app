import { RefObject } from "react";

interface datatype {
  title: string;
  inputref?: RefObject<HTMLInputElement | null>;
  handlefn: any;
}

export const UploadField = ({ title, inputref, handlefn }: datatype) => {
  const inputId = title.toLowerCase().replace(/\s+/g, '-') + "-upload";

  return (
    <div className="w-1/2">
      <h1>{title}</h1>
      <label
        htmlFor={inputId}
        className="block rounded-xl border-1 cursor-pointer h-10 w-1/3 flex items-center justify-center text-sm font-medium text-gray-900"
      >
        Choose file
      </label>
      <input
        id={inputId}
        type="file"
        onChange={handlefn}
        ref={inputref}
        className="hidden"
      />
    </div>
  );
};
