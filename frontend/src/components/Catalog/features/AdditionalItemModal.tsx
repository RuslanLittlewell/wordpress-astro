import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useStore } from "@nanostores/react";
import { addItemModal, closeAdditemModal } from "@/stores/ui";

interface Props {
  image: string;
  title: string;
  description: string;
  sendData: (data: any) => Promise<void>;
  price1Day: number;
  price2Day: number;
  additionalPriceOne: number;
  additionalPriceTwo: number;
}
export const AdditionalItemModal: FC<Props> = ({
  image,
  title,
  description,
  price1Day,
  price2Day,
  additionalPriceOne,
  additionalPriceTwo,
  sendData,
}) => {
  const { open, values } = useStore(addItemModal);

  const isOneDay = values?.rentalPeriod === "1";

  const handleAddItem = async () => {
    const formatData = {
      ...values,
      rentalPeriod: isOneDay ? "1 день" : "2 дня",
      additionalItem: `${title} (${
        isOneDay ? additionalPriceOne : additionalPriceTwo
      } BYN)`,
      price: isOneDay
        ? `${price1Day + additionalPriceOne} BYN (${price1Day} + ${additionalPriceOne})`
        : `${price2Day + additionalPriceTwo} BYN (${price2Day} + ${additionalPriceTwo})`,
    };
    closeAdditemModal();
    sendData(formatData);
  };

  const handleClose = () => {
    const formatData = {
      ...values,
      rentalPeriod: isOneDay ? "1 день" : "2 дня",
      price: isOneDay ? `${price1Day} BYN` : `${price2Day} BYN`,
    };
    closeAdditemModal();
    sendData(formatData);
  };
  return (
    <Dialog open={open} onOpenChange={(v) => addItemModal.set({ open: v })}>
      <DialogContent className="border-indigo-200 bg-gray-100 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold">
            Рекомендуем - {title}
          </DialogTitle>
          <DialogDescription>
            <img
              src={image}
              alt="Рекомендованные товары"
              width={500}
              height={500}
              className="mx-auto my-6 h-[400px] w-[400px]"
              loading="lazy"
            />
            <div className="text-2xl text-center text-black mb-4">
              Дополнительно{" "}
              <span className="text-indigo-700 font-bold">
                {isOneDay ? additionalPriceOne : additionalPriceTwo}{" "}
                 BYN
              </span>{" "}
              за {isOneDay ? "1 день" : "2 дня"}
            </div>
            <span className="text-center block w-full">{description}</span>
          </DialogDescription>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="bg-indigo-100 mt-6 block hover:opacity-90 w-full"
              onClick={handleClose}
            >
              Нет, спасибо
            </Button>
            <Button
              variant="outline"
              className="mt-6 block bg-main-gradient text-white w-full hover:opacity-90 hover:text-white"
              onClick={handleAddItem}
            >
              Хорошо
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
