import { useState } from "react";



export default function useSideNav() {
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