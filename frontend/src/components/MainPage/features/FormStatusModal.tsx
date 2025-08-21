import { Button } from "@/components/ui/button";
import { useStore } from "@nanostores/react";
import { formStatusModal, closeModal } from "@/stores/ui";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import successUrl from "@/assets/images/success.webp?url";
import errorUrl from "@/assets/images/error.webp?url";

export const FormStatusModal = () => {
  const { open, type, message } = useStore(formStatusModal);
  const isError = type === "error";

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => formStatusModal.set({ ...formStatusModal.get(), open: v })}
    >
      <DialogContent className="border-indigo-200 bg-gray-100 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold">
            {isError
              ? "Произошла ошибка при отправке"
              : "Мы получили вашу заявку"}
          </DialogTitle>
          <DialogDescription>
            <img
              src={isError ? errorUrl : successUrl}
              alt={isError ? "Ошибка отправки" : "Заявка отправлена"}
              width={160}
              height={160}
              className="mx-auto my-6 h-28 w-28"
              loading="lazy"
            />
            <span className="text-center block w-full">{message}</span>
          </DialogDescription>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="bg-main-gradient text-white mt-6 block hover:opacity-90"
              onClick={closeModal}
            >
              Хорошо
            </Button>
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
