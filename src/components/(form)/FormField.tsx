interface FormFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
}: FormFieldProps) => {
  return (
    <div className="flex flex-col space-y-1 mb-3 ">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        name={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-white rounded-md py-2 px-2 text-gray-800"
      />
    </div>
  );
};

export default FormField;
