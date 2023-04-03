import React, { FormEvent } from "react";

interface FormLayoutProps {
  children: React.ReactNode;
  onSubmit: () => Promise<void> | void;
  formHeading: string;
  formSubHeading: string;
  buttonText: string;
}

const FormLayout = ({
  children,
  onSubmit,
  formHeading,
  formSubHeading,
  buttonText,
}: FormLayoutProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className=" flex flex-col  mt-12 space-y-4 max-w-2xl w-full mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-semibold">{formHeading}</h2>
        <p className="text-lg mt-2">{formSubHeading}</p>
      </div>

      <div className="w-4/6 mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col ">
          {children}
          <button
            type="submit"
            className="w-full hover:bg-neutral-900  py-2 px-3 rounded-md mx-auto mt-4 bg-neutral-700 border border-white"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormLayout;
