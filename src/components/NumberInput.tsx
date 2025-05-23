interface NumberInputProps {
  label: string;
  value?: number;
  onChange?: () => void;
  disabled?: boolean;
}

export const NumberInput = ({
  label,
  value,
  onChange,
  disabled = false,
  ...rest
}: NumberInputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="">{label}</label>
      <input
        type="number"
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};
