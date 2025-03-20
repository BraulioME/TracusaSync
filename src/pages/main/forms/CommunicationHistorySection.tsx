import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";

const communicationSchema = z.object({
  communications: z.array(
    z.object({
      type: z.enum([
        "IN_PERSON_MEETING",
        "EMAIL",
        "VIRTUAL_MEETING",
        "PHONE_CALL",
        "OTHER"
      ]),
      participants: z.string().min(3, "Mínimo 3 caracteres"),
      summary: z.string().min(10, "Resumen demasiado corto")
    })
  ).optional()
});

type CommunicationForm = z.infer<typeof communicationSchema>;

// Componente del formulario
export const CommunicationHistorySection = () => {
  const form = useForm<CommunicationForm>({
    resolver: zodResolver(communicationSchema),
    defaultValues: {
      communications: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "communications"
  });
  const onSubmit = (form: z.infer<typeof communicationSchema>) => {
    console.log(form);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Tipo</TableHead>
              <TableHead>Participantes</TableHead>
              <TableHead>Resumen</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`communications.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="IN_PERSON_MEETING">
                              Reunión en persona
                            </SelectItem>
                            <SelectItem value="EMAIL">
                              Correo electrónico
                            </SelectItem>
                            <SelectItem value="VIRTUAL_MEETING">
                              Reunión virtual
                            </SelectItem>
                            <SelectItem value="PHONE_CALL">
                              Llamada telefónica
                            </SelectItem>
                            <SelectItem value="OTHER">
                              Otro
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

                <TableCell>
                  <FormField
                    control={form.control}
                    name={`communications.${index}.participants`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Ej: Juan Pérez, María Gómez"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

                <TableCell className={"w-[15rem]"}>
                  <FormField
                    control={form.control}
                    name={`communications.${index}.summary`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Detalles de la comunicación"
                            className="max-h-[80px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => append({
            type: "EMAIL",
            participants: "",
            summary: ""
          })}
        >
          Agregar Comunicación
        </Button>


        <Button type="submit">Guardar Historial</Button>
      </form>
    </Form>
  );
};