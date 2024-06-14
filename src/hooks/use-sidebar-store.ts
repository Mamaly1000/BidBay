import { create } from "zustand";
interface useSidebarStore {
  isOpen: boolean;
  onChange: (val: boolean) => void;
}
export const useSidebar = create<useSidebarStore>((set) => ({
  isOpen: false,
  onChange: (isOpen) => set({ isOpen }),
}));
