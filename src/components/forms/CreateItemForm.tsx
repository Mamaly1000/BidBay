"use client";
import React from "react";
import Heading from "../common/Heading";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import UploadWidget from "../ui/UploadWidget";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  name: z.string({ required_error: "name is required!" }).min(1),
  startingPrice: z.string({ required_error: "price is required!" }),
  fileKey: z.string({ required_error: "Image is required!" }).min(1),
});
type formValueType = z.infer<typeof formSchema>;
const CreateItemForm = () => {
  const form = useForm<formValueType>({
    values: {
      name: "",
      startingPrice: "",
      fileKey: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = form.handleSubmit(async (vals: formValueType) => {
    console.log(vals);
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
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
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
