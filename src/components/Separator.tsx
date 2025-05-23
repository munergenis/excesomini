export const Separator = ({
  marginTop = '4',
}: {
  marginTop?: '2' | '4' | '8';
}) => {
  const margin = {
    '2': 'mt-2',
    '4': 'mt-4',
    '8': 'mt-8',
  };

  return (
    <>
      <hr
        className={`${margin[marginTop]} ring-1 text-gray-100 max-w-lg mx-auto`}
      />
      <hr className="mt-2 ring-1 text-gray-100 max-w-lg mx-auto" />
    </>
  );
};
