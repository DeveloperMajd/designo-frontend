export const findLabel = (
  label: string,
  labels: {
    [key: string]: string;
  }[]
) => {
  return labels?.find((item) => Object.keys(item)[0] === label)?.[label];
};
