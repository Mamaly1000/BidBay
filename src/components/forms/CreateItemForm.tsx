"use client";
import React from "react";
import Heading from "../common/Heading";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "../ui/form";

const formSchema = z.object({});
type formValueType = z.infer<typeof formSchema>;
const CreateItemForm = () => {
  const form = useForm<formValueType>({ values: {} });
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
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* <FormField
            control={form.control}
            render={({ val }) => {
              return <></>;
            }}
          /> */}
        </form>
      </Form>
    </section>
  );
};

export default CreateItemForm;
