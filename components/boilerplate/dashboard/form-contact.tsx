"use client";

import { contactSchema, contactType } from "@/lib/validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Textarea } from "../../ui/textarea";
import { InputWithError } from "./InputWithError";

export function FormContact() {
  const [success, setSuccess] = useState<string | undefined>();
  /*const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<contactType>({
    resolver: zodResolver(contactSchema),
  });*/
  const form = useForm<contactType>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<contactType> = async (data) => {
    console.log("ok");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="on"
        className="grid grid-cols-1 md:grid-cols-2 gap-x-4 px-4"
      >
        <div className="max-w-md">
          <InputWithError
            id="name"
            label="Name"
            type="text"
            placeholder="Joe Robinson"
            register={form.register}
            errors={form.formState.errors}
            autoComplete="on"
          />
        </div>
        <div className="max-w-md">
          <InputWithError
            id="email"
            label="Email"
            type="email"
            placeholder="m@example.com"
            register={form.register}
            errors={form.formState.errors}
            autoComplete="on"
          />
        </div>
        <div className="md:col-span-2">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your message here"
                    className=""
                    {...field}
                    autoComplete="true"
                  />
                </FormControl>
                <FormDescription>Clearly describe your problem</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="md:col-span-2">
          <Button
            type="submit"
            className=""
            disabled={form.formState.isSubmitting}
          >
            Send
          </Button>
        </div>
      </form>
    </Form>
  );
}
