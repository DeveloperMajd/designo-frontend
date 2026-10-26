/** An office address: the first line, the office's name, in bold, then one line each. */
export const Address = ({ lines }: { lines: string[] }) => {
  const [name, ...rest] = lines;
  return (
    <>
      {name && (
        <p>
          <strong>{name}</strong>
        </p>
      )}
      {rest.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </>
  );
};
