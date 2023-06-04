import { useState } from "react";

function useSelect(initialValue: string): [
  string,
  {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }
] {
  const [value, setValue] = useState(initialValue);

  const data = {
    value,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value);
    },
  };

  return [value, data];
}

export default useSelect;
