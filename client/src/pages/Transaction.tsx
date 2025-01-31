"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { BottomGradient } from "@/utils/BottomGradient";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Transaction = () => {
  const transactionUpdateSchema = z.object({
    description: z.string().min(1, {
      message: "Description is required.",
    }),
    paymentType: z.string().min(1, {
      message: "Payment type is required.",
    }),
    category: z.string().min(1, {
      message: "Category is required.",
    }),
    amount: z.number().min(1, {
      message: "Category is required.",
    }),
    date: z.string().min(1, {
      message: "Date is required.",
    }),
  });

  const transactionForm = useForm<z.infer<typeof transactionUpdateSchema>>({
    resolver: zodResolver(transactionUpdateSchema),
    defaultValues: {
      description: "",
      paymentType: "Card",
      category: "Saving",
      amount: 1,
      // date
    },
  });

  async function onSignupSubmit(data: z.infer<typeof transactionUpdateSchema>) {
    try {
      // const { email, password, description } = data;
      // const result = await createUserWithEmailAndPassword(
      //   auth,
      //   email,
      //   password
      // );
      // const token = await result.user.getIdToken();
      // // Store token in localStorage
      // localStorage.setItem("token", token);
      // const { data: signupData } = await signupHandler({
      //   variables: {
      //     data: {
      //       email,
      //       description,
      //     },
      //   },
      //   context: {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      // });
      // const { success, message, data: responseData } = signupData.signup;
      // console.log(responseData);
      // if (success) {
      //   toast.success(message);
      //   setUser(responseData);
      //   navigate("/");
      // } else {
      //   toast.error(message);
      // }
    } catch (e: any) {
      if (e.code) {
        // console.log(e.code);
        // toast.error(handleFirebaseError(e.code));
      } else {
        // console.log(e.message);
      }
    }
  }

  return (
    <div className="">
      <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-center mt-8">
        GQL Expense Tracker
      </h1>

      <div className="min-h-screen flex flex-col items-center gap-4 py-8">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-white">
          Update Transaction
        </h2>

        <div className="max-w-md max-h-[75vh] overflow-auto w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-6 shadow-input bg-white dark:bg-black">
          <Form {...transactionForm}>
            <form
              className="mt-0"
              onSubmit={transactionForm.handleSubmit(onSignupSubmit)}
            >
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <FormField
                  control={transactionForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <Label>Description</Label>
                      <FormControl>
                        <Input
                          id="description"
                          placeholder="Rend, Groceries, Salary, etc."
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={transactionForm.control}
                  name="paymentType"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <Label>Payment Type</Label>
                      <FormControl>
                        {/* <Input
                          id="paymentType"
                          placeholder="tylerswift@gmail.com"
                          type="select"
                          {...field}
                        /> */}
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a fruit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Fruits</SelectLabel>
                              <SelectItem value="apple">Apple</SelectItem>
                              <SelectItem value="banana">Banana</SelectItem>
                              <SelectItem value="blueberry">
                                Blueberry
                              </SelectItem>
                              <SelectItem value="grapes">Grapes</SelectItem>
                              <SelectItem value="pineapple">
                                Pineapple
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <FormField
                control={transactionForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <Label>Password</Label>
                    <FormControl>
                      <Input
                        id="password"
                        placeholder="••••••••"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Sign up &rarr;
                <BottomGradient />
              </button>

              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

              <div className="flex flex-col space-y-4">
                <button
                  className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                  type="submit"
                >
                  {/* <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" /> */}
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Google
                  </span>
                  <BottomGradient />
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
