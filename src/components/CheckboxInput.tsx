interface CheckboxInputProps {
  label: string;
  defaultChecked?: boolean;
}

export const CheckboxInput = ({
  label,
  defaultChecked = false,
  ...rest
}: CheckboxInputProps) => {
  return (
    <div className="flex gap-x-2">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        {...rest}
      />
      <label htmlFor="">{label}</label>
    </div>
  );
};
