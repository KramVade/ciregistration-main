"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransition } from "react";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { registerForInstitute } from "@/app/actions";

const formSchema = z.object({
  pangalan: z.string().min(2, "Kinakailangan ang buong pangalan."),
  palayaw: z.string().min(2, "Kinakailangan ang palayaw."),
  edad: z.string().min(1, "Kinakailangan ang edad."),
  kasarian: z.enum(["Lalaki", "Babae"], {
    required_error: "Kailangan mong pumili ng kasarian.",
  }),
  contactNumber: z
    .string()
    .min(10, "Kinakailangan ang contact number."),
  localChurch: z.string().min(2, "Kinakailangan ang lokal na simbahan."),
  kasapian: z.enum(["Baptized", "Professing"], {
    required_error: "Kailangan mong pumili ng kasapian.",
  }),
  ilangBeses: z
    .string()
    .min(1, "Kinakailangan ang sagot kung ilang beses nang nakadalo."),
  mgaInaasahan: z.string().min(5, "Kinakailangan ang iyong mga inaasahan."),
});

type FormValues = z.infer<typeof formSchema>;

export function RegistrationForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pangalan: "",
      palayaw: "",
      edad: "",
      contactNumber: "",
      localChurch: "",
      ilangBeses: "",
      mgaInaasahan: "",
    },
  });

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await registerForInstitute(null, formData);

      if (result.errors && Object.keys(result.errors).length > 0) {
        Object.entries(result.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            form.setError(field as keyof FormValues, {
              type: "manual",
              message: messages.join(", "),
            });
          }
        });
        toast({
          variant: "destructive",
          title: "Uh oh! May nagkamali.",
          description: result.message || "Pakisuri ang iyong input.",
        });
      } else if (result.message) {
        toast({
          title: "Matagumpay ang Pagpaparehistro!",
          description: result.message,
        });
        form.reset();
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 text-left"
      >
        <FormField
          control={form.control}
          name="pangalan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pangalan (Full Name)</FormLabel>
              <FormControl>
                <Input placeholder="Juan dela Cruz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="palayaw"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Palayaw (Nickname)</FormLabel>
                <FormControl>
                  <Input placeholder="Juan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="edad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Edad (Age)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="18" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="kasarian"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Kasarian (Gender)</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Lalaki" />
                    </FormControl>
                    <FormLabel className="font-normal">Lalaki</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Babae" />
                    </FormControl>
                    <FormLabel className="font-normal">Babae</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="09123456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="localChurch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Local Church</FormLabel>
              <FormControl>
                <Input placeholder="St. Luke UMC" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kasapian"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Kasapian (Membership)</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Baptized" />
                    </FormControl>
                    <FormLabel className="font-normal">Baptized</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Professing" />
                    </FormControl>
                    <FormLabel className="font-normal">Professing</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ilangBeses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ilang beses ka nang nakadalo sa gawaing ito?</FormLabel>
              <FormControl>
                <Input placeholder="Hal. Una, Pangalawa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mgaInaasahan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mga inaasahan sa gawain</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ano ang iyong mga inaasahan sa pagdalo sa gawaing ito?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
