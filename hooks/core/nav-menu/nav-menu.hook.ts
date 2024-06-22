import { useState } from "react";



export default function useNavMenu() {
  const [isOpen, setOpen] = useState(true);

  const toggleOpen = () => setOpen(prev => !prev);

  return {
    open: {
      value: isOpen,
      set: setOpen,
      toggle: toggleOpen
    }
  }

}