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
import { useDietContext } from "@/context/dietDataContext";
import axios from "axios";

const diseases = [
  {
    id: "no disease",
    label: "no disease",
  },
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

export const formSchema = z.object({
  age: z.coerce.number().gt(0).lt(80).int(),
  weight: z.coerce.number().gt(0),
  height: z.coerce.number().gt(0),
  gender: z.enum(["male", "female"]),
  activityLevel: z.enum([
    "sedentary",
    "lightly_active",
    "moderately_active",
    "very_active",
    "super_active",
  ]),
  vegNonVeg: z.enum(["veg", "nonVeg"]),
  diseases: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export default function Calculator() {
  const { dietItems, setDietItems } = useDietContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 0,
      weight: 0,
      height: 0,
      diseases: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const newValues = values;
    try {
      const res = await axios.post("/api", values);
      console.log(res.data);
      setDietItems(res.data);
    } catch (error) {
      console.log(error);
    }
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
            name="age"
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
            name="weight"
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
            name="height"
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
            name="gender"
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
            name="activityLevel"
            render={({ field }) => (
              <FormItem className="w-full p-1">
                <FormLabel>activity Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your activity level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sedentary">
                      Little or no Activity
                    </SelectItem>
                    <SelectItem value="lightly_active">
                      Lightly Active(light exercise/sports 1-3 days/week)
                    </SelectItem>
                    <SelectItem value="moderately_active">
                      Moderately active(Moderate exercise/spots 3-5 days per
                      week)
                    </SelectItem>
                    <SelectItem value="very_active">
                      Very active(Hard exercise/sports 6-7 days a week)
                    </SelectItem>
                    <SelectItem value="super_active">
                      Super active(Intense exercise everyday)
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="vegNonVeg"
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
          name="diseases"
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
                {diseases.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="diseases"
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
