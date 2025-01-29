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
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";
import { useMutation } from "@apollo/client";
import { login, signup } from "@/graphql/query";
import toast from "react-hot-toast";
import { handleFirebaseError } from "@/utils";
import useStore from "@/context/StoreContext";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().min(6, {
    message: "Email must be at least 8 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

const signupSchema = z.object({
  fullName: z.string().min(1, {
    message: "Full name is required.",
  }),
  email: z.string().min(6, {
    message: "Email must be at least 8 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export function Auth() {
  const [signupHandler] = useMutation(signup);
  const [loginHandler] = useMutation(login);
  const { setUser } = useStore();
  const navigate = useNavigate();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onLoginSubmit(data: z.infer<typeof loginSchema>) {
    try {
      const { email, password } = data;
      console.log(email, password);

      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();
      localStorage.setItem("token", token);

      const { data: loginData } = await loginHandler({
        variables: {
          data: { email },
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      const { success, message, data: responseData } = loginData.login;
      console.log(success, message, responseData);

      if (success) {
        setUser(responseData);
        toast.success(message);
        navigate("/home");
      } else {
        toast.error(message);
      }
    } catch (e: any) {
      if (e.code) {
        console.log(e.code);

        toast.error(handleFirebaseError(e.code));
      } else {
        console.log(e.message);
      }
    }
  }

  async function onSignupSubmit(data: z.infer<typeof signupSchema>) {
    try {
      const { email, password, fullName } = data;
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await result.user.getIdToken();

      // Store token in localStorage
      localStorage.setItem("token", token);

      const { data: signupData } = await signupHandler({
        variables: {
          data: {
            email,
            fullName,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      const { success, message, data: responseData } = signupData.signup;
      console.log(responseData);
      if (success) {
        toast.success(message);
        setUser(responseData);
        navigate("/home");
      } else {
        toast.error(message);
      }
    } catch (e: any) {
      if (e.code) {
        toast.error(handleFirebaseError(e.code));
      } else {
        console.log(e.message);
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 py-8">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-white">
        GQL Expense Tracker
      </h2>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <div className="max-w-md max-h-[75vh] overflow-auto w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-6 shadow-input bg-white dark:bg-black">
            {/* <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Login
          </h2> */}
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <Label>Email Address</Label>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="tylerswift@gmail.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <Label>Password</Label>
                      <FormControl>
                        <Input
                          id="password"
                          placeholder="••••••••"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <div className="flex flex-col space-y-4">
                  <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                  >
                    Sign up &rarr;
                    <BottomGradient />
                  </button>

                  <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent !my-8 h-[1px] w-full" />

                  <div className="flex flex-col space-y-4 !-mt-1">
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
                </div>
              </form>
            </Form>
          </div>
        </TabsContent>
        <TabsContent value="signup">
          <div className="max-w-md max-h-[75vh] overflow-auto w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-6 shadow-input bg-white dark:bg-black">
            <Form {...signupForm}>
              <form
                className="mt-0"
                onSubmit={signupForm.handleSubmit(onSignupSubmit)}
              >
                <FormField
                  control={signupForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <Label>Full Name</Label>
                      <FormControl>
                        <Input
                          id="fullname"
                          placeholder="Tyler Swift"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <Label>Email Address</Label>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="tylerswift@gmail.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={signupForm.control}
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
        </TabsContent>
      </Tabs>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default Auth;
