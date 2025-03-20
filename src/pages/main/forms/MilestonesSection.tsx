import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";

const milestonesSchema = z.object({
  milestones: z.array(
    z.object({
      name: z.string().min(3, "Nombre requerido"),
      description: z.string().min(10, "Descripción requerida"),
      owner: z.string().min(3, "Propietario requerido"),
      deadline: z.date(),
      status: z.enum([
        "NOT STARTED",
        "IN PROGRESS",
        "COMPLETED",
        "PAUSED",
        "CANCELLED"
      ])
    })
  ).min(1, "Debe agregar al menos un hito")
});

type MilestonesForm = z.infer<typeof milestonesSchema>;

// Componente del formulario
export const MilestonesSection = () => {
  const form = useForm<MilestonesForm>({
    resolver: zodResolver(milestonesSchema),
    defaultValues: {
      milestones: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "milestones"
  });

  const onSubmit = (form: z.infer<typeof milestonesSchema>) => {
    console.log(form);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hito</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Propietario</TableHead>
              <TableHead>Plazo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`milestones.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="Nombre del hito" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

                <TableCell className={"w-[15rem]"}>
                  <FormField
                    control={form.control}
                    name={`milestones.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea {...field} placeholder="Descripción" className={"max-h-[80px]"} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

                <TableCell>
                  <FormField
                    control={form.control}
                    name={`milestones.${index}.owner`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="Responsable" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

                <TableCell>
                  <FormField
                    control={form.control}
                    name={`milestones.${index}.deadline`}
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button variant="outline">
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy")
                                ) : (
                                  <span>Selecciona fecha</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

                <TableCell>
                  <FormField
                    control={form.control}
                    name={`milestones.${index}.status`}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Estado" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="NOT_STARTED">No iniciado</SelectItem>
                            <SelectItem value="IN_PROGRESS">En progreso</SelectItem>
                            <SelectItem value="COMPLETED">Completado</SelectItem>
                            <SelectItem value="PAUSED">En pausa</SelectItem>
                            <SelectItem value="CANCELLED">Cancelado</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

                <TableCell>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button
          type="button"
          variant="outline"
          onClick={() => append({
            name: "",
            description: "",
            owner: "",
            deadline: new Date(),
            status: "NOT STARTED"
          })}
        >
          Agregar Hito
        </Button>

        <Button type="submit">Guardar Hitos</Button>
      </form>
    </Form>
  );
};