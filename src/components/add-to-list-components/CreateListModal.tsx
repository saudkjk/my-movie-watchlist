"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { createNewCustomList } from "@/lib/actions/database";

interface CreateListModalProps {
  userId: string;
  username: string;
  onCreate: (newList: { id: string; name: string }) => void;
  onCancel: () => void;
}

const FormSchema = z.object({
  newListName: z
    .string()
    .min(3, { message: "List name must be at least 3 characters." })
    .max(50, { message: "List name cannot exceed 50 characters." }),
  newListDescription: z
    .string()
    .max(200, { message: "Description cannot exceed 200 characters." })
    .optional(),
  isPublic: z.boolean(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function CreateListModal({
  userId,
  username,
  onCreate,
  onCancel,
}: CreateListModalProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newListName: "",
      newListDescription: "",
      isPublic: false,
    },
  });

  const handleCreateNewCustomList = async (data: FormSchemaType) => {
    const response = await createNewCustomList(
      userId,
      data.newListName,
      data.newListDescription || "",
      data.isPublic,
      username,
    );

    if (response.status === 200 && response.customListId) {
      const newCustomList = {
        id: response.customListId,
        name: data.newListName,
      };
      onCreate(newCustomList);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateNewCustomList)}
        className="grid gap-4 py-4"
      >
        <FormField
          control={form.control}
          name="newListName"
          render={(
            { field }: { field: any },
          ) => (
            <FormItem>
              <FormLabel>New List Name</FormLabel>
              <FormControl>
                <Input placeholder="New List Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newListDescription"
          render={(
            { field }: { field: any }, 
          ) => (
            <FormItem>
              <FormLabel>New List Description</FormLabel>
              <FormControl>
                <Textarea placeholder="New List Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublic"
          render={(
            { field }: { field: any }, 
          ) => (
            <FormItem>
              <div className="flex flex-row items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Make list public</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            variant="secondary"
            className="bg-main-color hover:bg-main-color-dark"
          >
            Create
          </Button>
          <Button variant="destructive" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
