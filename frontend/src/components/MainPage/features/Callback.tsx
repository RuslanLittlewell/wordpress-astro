import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { sendToCF7 } from "@/lib/cf7";
import { FC, useState } from "react";
import { openModal } from "@/stores/ui";

// Схема валидации
const schema = z.object({
  userName: z.string().min(2, "Введите корректное имя"),
  phone: z
    .string()
    .regex(/^\+?\d[\d\s().-]{6,}$/, "Введите корректный номер телефона"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  url: string;
  className?: string
}

export const CallbackButton: FC<Props> = ({ url, className }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { userName: "", phone: "" },
  });

  async function onSubmit(values: FormValues) {
    form.reset();
    setOpen(false);
    try {
      const r = await sendToCF7({
        wpBase: url,
        formId: 123,
        values: values,
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
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={className}>Заказать звонок</Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 border-2 border-indigo-200 bg-gray-100">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Мы вам перезвоним</h4>
              <p className="text-sm text-muted-foreground">
                Оставьте контакты — свяжемся в ближайшее время.
              </p>
            </div>

            {/* Имя */}
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <FormLabel className="col-span-1">Имя</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите ваше имя"
                        className="col-span-2 h-8"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Телефон */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <FormLabel className="col-span-1">Телефон</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+375 (XX) XXX-XX-XX"
                        className="col-span-2 h-8"
                        inputMode="tel"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="mt-2 w-full bg-main-gradient hover:opacity-90"
            >
              {form.formState.isSubmitting ? "Отправляем..." : "Отправить"}
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};
