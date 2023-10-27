import { useState } from 'react';

export default function useToggle(initialValue = false) {
  const [toggled, setToggled] = useState<boolean>(initialValue);

  const toggle = (toggled: boolean) => setToggled(toggled);
  const open = () => setToggled(true);
  const close = () => setToggled(false);

  return {
    toggled,
    toggle,
    open,
    close,
  };
}
