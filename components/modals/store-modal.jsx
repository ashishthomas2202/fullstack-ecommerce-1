"use client";

import { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", data);

      console.log(response.data);
      toast.success("Store created.");
      storeModal.onClose();
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories."
      isOpen={storeModal.isOpen}
      isClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="E-Commerce"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
