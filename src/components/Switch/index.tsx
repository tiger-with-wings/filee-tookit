import React, { useState } from 'react';

type Props = {
  onChange?: (status: boolean) => void;
  status?: boolean;
}

const Switch = ({ onChange, status }: Props) => {
  const [checked, setChecked] = useState(status);

  return (
    <span
      className={`ui-switch ${checked ? 'checked' : 'unchecked'}`}
      onClick={
        () => {
          const newStatus = !checked;
          setChecked(newStatus);
          onChange && onChange(newStatus);
        }
      }
    />
  )
}

export default Switch;