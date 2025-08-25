import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Send, Instagram } from "lucide-react";
import { PopoverPhoneButton } from "./PopoverPhoneButton";
import { sendToCF7 } from "@/lib/cf7";
import { openAddItemModal, openModal } from "@/stores/ui";
import { AdditionalItemModal } from "./AdditionalItemModal";

type OrderFormProps = {
  productName: string;
  price1Day?: number | string;
  price2Day?: number | string;
  defaultPeriod?: "1" | "2";
  url: string;
  generaData: any;
  additionalItem?: {
    title: string;
    description: string;
    image: string;
    price: string | number;
    price_2?: string | number;
  };
};

const formSchema = z.object({
  product: z.string().optional(),
  userName: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(6, "Введите корректный номер телефона"),
  rentalPeriod: z.enum(["1", "2"], {
    required_error: "Выберите срок аренды",
  }),
  price: z.string().optional(),
});

export const OrderForm = ({
  productName,
  price1Day,
  price2Day,
  defaultPeriod = "1",
  additionalItem,
  url,
  generaData
}: OrderFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: productName,
      userName: "",
      phone: "",
      rentalPeriod: defaultPeriod,
      price: "",
    },
  });

  const sendData = async (formatData: any) => {
    try {
      const r = await sendToCF7({
        wpBase: url,
        formId: 85,
        values: formatData,
      });
      if (r.status === "mail_sent") {
        openModal("success", "Наш менеджер свяжется с вами в ближайшее время.");
      } else {
        openModal(
          "error",
          "Попробуйте ещё раз или свяжитесь с нами по телефону/мессенджеру."
        );
      }
    } catch (e) {
      openModal(
        "error",
        "Попробуйте ещё раз или свяжитесь с нами по телефону/мессенджеру."
      );
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formatData = {
      ...values,
      rentalPeriod: values.rentalPeriod === "1" ? "1 день" : "2 дня",
      price:
        values.rentalPeriod === "1" ? `${price1Day} BYN` : `${price2Day} BYN`,
    };
    if (additionalItem) {
      openAddItemModal(values);
    } else {
      sendData(formatData);
    }
  }

  const p1 = price1Day ?? "Цена не указана";
  const p2 = price2Day ?? "Цена не указана";

  return (
    <Form {...form}>
      {additionalItem && (
        <AdditionalItemModal
          title={additionalItem.title}
          image={additionalItem.image}
          description={additionalItem.description}
          sendData={(formatData) => sendData(formatData)}
          price1Day={Number(price1Day) ?? 0}
          price2Day={Number(price2Day) ?? 0}
          additionalPriceOne={Number(additionalItem.price) ?? 0}
          additionalPriceTwo={Number(additionalItem.price_2) ?? 0}
        />
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="rentalPeriod"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-md md:text-lg lg:text-xl">
                Срок аренды
              </FormLabel>
              <FormControl>
                <div className="mb-2 rounded-lg pt-4">
                  <RadioGroup
                    className="space-y-3"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <div className="relative">
                      <RadioGroupItem
                        value="1"
                        id="period-1"
                        className="peer sr-only"
                      />
                      <label
                        htmlFor="period-1"
                        className="block cursor-pointer rounded-xl border px-4 p-2 md:p-3 lg:p-4 transition bg-white/50
                 hover:bg-zinc-50
                 peer-data-[state=checked]:border-indigo-500
                 peer-data-[state=checked]:ring-2
                 peer-data-[state=checked]:ring-indigo-200
                 text-sm sm:text-md md:text-lg lg:text-xl 
                 "
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">1 день</span>
                          <span className="text-indigo-700 font-bold">
                            {p1} BYN
                          </span>
                        </div>
                      </label>
                    </div>

                    <div className="relative">
                      <RadioGroupItem
                        value="2"
                        id="period-2"
                        className="peer sr-only"
                      />
                      <label
                        htmlFor="period-2"
                        className="block cursor-pointer rounded-xl border px-4 p-2 md:p-3 lg:p-4 transition bg-white/50
                 hover:bg-zinc-50
                 peer-data-[state=checked]:border-indigo-500
                 peer-data-[state=checked]:ring-2
                 peer-data-[state=checked]:ring-indigo-200
                 text-sm sm:text-md md:text-lg lg:text-xl 
                 "
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">2 дня</span>
                          <span className="text-indigo-700 font-bold">
                            {p2} BYN
                          </span>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm md:text-md lg:text-lg">Ваше имя</FormLabel>
              <FormControl>
                <Input
                  className="bg-white/50 h-12"
                  placeholder="Введите ваше имя"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm md:text-md lg:text-lg">Номер телефона</FormLabel>
              <FormControl>
                <Input
                  className="bg-white/50 h-12"
                  placeholder="+375 (XX) XXX-XX-XX"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="h-3" />
        <Button
          type="submit"
          className="h-12 text-lg w-full rounded-2xl block ml-auto bg-main-gradient hover:opacity-90"
        >
          Заказать
        </Button>
        <div className="mt-6 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <PopoverPhoneButton generaData={generaData}/>

            <a
              href="https://instagram.com/your_username"
              aria-label="Открыть Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 place-items-center rounded-2xl bg-indigo-600/90 text-white shadow-sm transition hover:bg-indigo-600"
            >
              <Instagram className="h-5 w-5" />
            </a>

            <a
              href="https://t.me/your_username"
              aria-label="Написать в Telegram"
              className="grid h-10 place-items-center rounded-2xl bg-indigo-600/90 text-white shadow-sm transition hover:bg-indigo-600"
            >
              <Send className="h-5 w-5" />
            </a>
          </div>

          <p className="px-3 text-center text-sm text-zinc-500">
            Нажимая на кнопку «Заказать», вы соглашаетесь на обработку
            персональных данных.
          </p>
        </div>
      </form>
    </Form>
  );
};
