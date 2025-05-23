interface DateTimeInputProps {
  label: string;
  defaultValue?: string;
  error?: string | undefined;
}

export const DateTimeInput = ({
  label,
  defaultValue,
  error,
  ...rest
}: DateTimeInputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="">{label}</label>
      <input
        type="datetime-local"
        defaultValue={defaultValue ?? undefined}
        {...rest}
      />
      <div className="h-8">Error: {error}</div>
    </div>
  );
};
