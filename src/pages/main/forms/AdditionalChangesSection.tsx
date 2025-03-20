import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";

const changeSchema = z.object({
  changes: z.array(
    z.object({
      description: z.string().min(10, "Descripción requerida"),
      requester: z.string().min(3, "Solicitante requerido"),
      impact: z.enum(["TIME", "COST", "RISK"]),
      approved: z.enum(["PENDING", "NO", "YES"])
    })
  ).optional()
});

type ChangeForm = z.infer<typeof changeSchema>;

// Componente del formulario
export const AdditionalChangesSection = () => {
  const form = useForm<ChangeForm>({
    resolver: zodResolver(changeSchema),
    defaultValues: {
      changes: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "changes"
  });

  const onSubmit = (form: z.infer<typeof changeSchema>) => {
    console.log(form);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descripción</TableHead>
              <TableHead>Solicitante</TableHead>
              <TableHead>Impacto</TableHead>
              <TableHead>Aprobado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell className={"w-xs"}>
                  <FormField
                    control={form.control}
                    name={`changes.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Descripción detallada del cambio"
                            className="max-h-[80px] resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

                <TableCell>
                  <FormField
                    control={form.control}
                    name={`changes.${index}.requester`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Nombre del solicitante"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

                <TableCell>
                  <FormField
                    control={form.control}
                    name={`changes.${index}.impact`}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona impacto" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="TIME">Tiempo</SelectItem>
                            <SelectItem value="COST">Costo</SelectItem>
                            <SelectItem value="RISK">Riesgo</SelectItem>
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
                    name={`changes.${index}.approved`}
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
                            <SelectItem value="PENDING">Pendiente</SelectItem>
                            <SelectItem value="NO">No aprobado</SelectItem>
                            <SelectItem value="YES">Aprobado</SelectItem>
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
                    size="sm"
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
          className="mt-4"
          onClick={() => append({
            description: "",
            requester: "",
            impact: "TIME",
            approved: "PENDING"
          })}
        >
          Agregar Cambio
        </Button>

        <Button type="submit">Guardar Cambios</Button>
      </form>
    </Form>
  );
};