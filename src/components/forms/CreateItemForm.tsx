"use client";
import React from "react";
import Heading from "../common/Heading";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import UploadWidget from "../ui/UploadWidget";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createItemAction } from "@/app/items/create/actions";
import { add, format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { PopoverContent, Popover, PopoverTrigger } from "../ui/popover";

const minDate = add(new Date(), { days: 1 });

const formSchema = z.object({
  name: z.string({ required_error: "name is required!" }).min(1),
  startingPrice: z.string({ required_error: "price is required!" }),
  fileKey: z.string({ required_error: "Image is required!" }).min(1),
  endDate: z.date({ required_error: "end date is required!" }).min(minDate),
});
type formValueType = z.infer<typeof formSchema>;
const CreateItemForm = () => {
  const form = useForm<formValueType>({
    values: {
      name: "",
      startingPrice: "",
      fileKey: "",
      endDate: minDate,
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = form.handleSubmit(async (vals: formValueType) => {
    await createItemAction({
      ...vals,
      startingPrice: parseFloat(vals.startingPrice) * 100,
    })
      .then(() => {
        console.log("success");
        form.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <section className="w-full flex flex-col items-start justify-start gap-10">
      <Heading
        title="Create new Item"
        subHeading="Here you can create an item to make it available for bidding."
        isLoading={isLoading}
      />
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 dark"
        >
          <div className="col-span-2 md:col-span-1 space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Item name..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="startingPrice"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>StartingPrice</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="$19.99"
                        type="number"
                        step="0.01"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          variant={"secondary"}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 dark" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < minDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="fileKey"
            render={({ field }) => {
              return (
                <FormItem className="flex-col flex items-start justify-start">
                  <FormLabel>Item image</FormLabel>
                  <FormControl>
                    <UploadWidget
                      image={field.value}
                      onChange={(val) => field.onChange(val)}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex items-center justify-start gap-5  col-span-full">
            <Button type="submit" variant={"primary"}>
              Add
            </Button>
            <Button
              type="reset"
              onClick={() => form.reset()}
              variant={"destructive"}
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreateItemForm;
