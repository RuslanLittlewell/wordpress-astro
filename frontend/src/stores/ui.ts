import { atom } from "nanostores";

export type ModalType = "success" | "error" | null;

export const formStatusModal = atom<{ open: boolean; type: ModalType; message?: string }>({
  open: false,
  type: null,
});

export const addItemModal = atom<{ open: boolean; values?: any}>({
  open: false,
  values: {}
});

export const openModal  = (type: ModalType, message?: string) =>
  formStatusModal.set({ open: true, type, message });

export const closeModal = () =>
  formStatusModal.set({ ...formStatusModal.get(), open: false });

export const toggleModal = () =>
  formStatusModal.set({ ...formStatusModal.get(), open: !formStatusModal.get().open });


export const openAddItemModal = (values: any) =>
  addItemModal.set({ open: true, values });

export const closeAdditemModal = () =>
  addItemModal.set({ open: false });