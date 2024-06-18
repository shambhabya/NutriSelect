"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "./ui/checkbox";

const items = [
  {
    id: "diabetes",
    label: "diabetes",
  },
  {
    id: "lactose intolerant",
    label: "lactose intolerant",
  },
  {
    id: "gastogenical reflux",
    label: "gastorgenical reflux",
  },
] as const;

const formSchema = z.object({
  Age: z.coerce.number().gt(0).lt(80).int(),
  Weight: z.coerce.number().gt(0),
  Height: z.coerce.number().gt(0),
  Gender: z.enum(["male", "female"]),
  ExerciseLevel: z.enum(["0", "1", "2", "3", "4", "5"]),
  VegNonVeg: z.enum(["veg", "nonVeg"]),
  //   Disease: z.enum([
  //     "",
  //     "diabetes",
  //     "lactose intolerant",
  //     "gastrogenical reflux",
  //   ]),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export default function Calculator() {
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Age: 0,
      Weight: 0,
      Height: 0,
      items: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-3/5 p-10"
      >
        <div className="flex">
          <FormField
            control={form.control}
            name="Age"
            render={({ field }) => (
              <FormItem className="p-1">
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input placeholder="Age" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Weight"
            render={({ field }) => (
              <FormItem className="p-1">
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input placeholder="Weight(kg)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Height"
            render={({ field }) => (
              <FormItem className="p-1">
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input placeholder="Height(cm)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex">
          <FormField
            control={form.control}
            name="Gender"
            render={({ field }) => (
              <FormItem className="w-full p-1">
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ExerciseLevel"
            render={({ field }) => (
              <FormItem className="w-full p-1">
                <FormLabel>Exercise Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your exercise level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">Little Or No Exercise</SelectItem>
                    <SelectItem value="1">Exercise 1-3 times/week</SelectItem>
                    <SelectItem value="2">
                      Exercise or Intense Exercise 3-4 times/week
                    </SelectItem>
                    <SelectItem value="3">Exercise 4-5 times/week</SelectItem>
                    <SelectItem value="4">
                      Intense Exercise 4-5 times/week
                    </SelectItem>
                    <SelectItem value="5">Intense Exercise Daily</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="VegNonVeg"
          render={({ field }) => (
            <FormItem className="p-1">
              <FormLabel>Veg/Non-Veg</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Veg or Non-Veg" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="veg">Veg</SelectItem>
                  <SelectItem value="nonVeg">NonVeg</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem className="p-1">
              <div className="mb-4">
                <FormLabel className="text-base">Disease or Allergy</FormLabel>
                <FormDescription>
                  Select the disease or allergy based on which you want to
                  filter food items.
                </FormDescription>
              </div>
              <div className="flex ">
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0 mx-3"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="m-1">
          Submit
        </Button>
      </form>
    </Form>
  );
}
