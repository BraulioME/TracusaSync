import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils.ts";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea.tsx";
import { AdditionalChangesSection } from "@/pages/main/forms/AdditionalChangesSection.tsx";
import { MilestonesSection } from "@/pages/main/forms/MilestonesSection.tsx";
import { CommunicationHistorySection } from "@/pages/main/forms/CommunicationHistorySection.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";

const reqType = ["NUEVO", "REINGENIERIA"] as const;

const currState = ["SIN INICIAR", "EN PROCESO", "COMPLETADO", "EN PAUSA", "CANCELADO"] as const;

const people = [{ name: "Braulio Monroy", email: "test@gmail.com" }, {
  name: "Francisco Saucedo",
  email: "test2@gmail.com"
}, { name: "Christian Caballero", email: "test3@gmail.com" }] as const;

const documents = [
  {
    id: "1",
    name: "Manual de Usuario del Sistema",
    url: "https://drive.google.com/example-manual-usuario.pdf"
  },
  {
    id: "2",
    name: "Políticas de Seguridad 2025",
    url: "https://drive.google.com/example-politicas-seguridad.pdf"
  },
  {
    id: "3",
    name: "Guía de Implementación",
    url: "https://drive.google.com/example-guia-implementacion.pdf"
  }
 
];

const FormSchema = z.object({
  projectId: z.string(),
  projectName: z.string().min(3, "El nombre del proyecto es requerido"),
  moduleName: z.string().min(3, "El nombre del módulo es requerido"),
  requestType: z.string({ required_error: "Selecciona el tipo de solicitud" }),
  requestDate: z.date(),
  applicant: z.string(),
  projectLeader: z.string().min(3, "El nombre de es requerido"),
  collaborators: z.array(
    z.object({
      name: z.string().min(2, "Nombre requerido"),
      email: z.string().email("Email inválido")
    })
  ).min(1, "Selecciona al menos un colaborador").default([]),
  informedParties: z.array(z.string()).optional(),
  startDate: z.date(),
  estimatedEndDate: z.date(),
  currentStatus: z.string().min(3, "El estatus es requerido"),

  // desc solicitud
  projectObjective: z.string().min(10, "El objetivo debe tener al menos 10 caracteres"),
  scope: z.string().min(20, "Describe el alcance con más detalle"),
  dependencies: z.string().optional(),
  requirements: z.string().min(10, "Los requerimientos son obligatorios"),
  additionalNotes: z.string().optional(),

  // hitos
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
  ).min(1, "Debe agregar al menos un hito"),

  // cambios adicionales
  changes: z.array(
    z.object({
      description: z.string().min(10, "Descripción requerida"),
      requester: z.string().min(3, "Solicitante requerido"),
      impact: z.enum(["TIME", "COST", "RISK"]),
      approved: z.enum(["PENDING", "NO", "YES"])
    })
  ).optional()

}).refine(data => data.estimatedEndDate > data.startDate, {
  message: "La fecha de finalizacion debe ser mayor a la inicial",
  path: ["estimatedEndDate"]
});
export const FeatureRequests = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),

    defaultValues: {
      projectId: "",
      projectName: "",
      moduleName: "",
      requestType: "", // Valor inicial del enum
      requestDate: new Date(), // Fecha actual por defecto
      applicant: "",
      projectLeader: "",
      collaborators: [], // Array con un string vacío
      informedParties: [],
      startDate: new Date(),
      estimatedEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 días
      currentStatus: "",

      // desc solicitud
      projectObjective: "",
      scope: "",
      dependencies: "",
      requirements: "",
      additionalNotes: "",

      // hitos
      milestones: [],

      // cambios adicionales
      changes: []
    }
  });


  const onSubmit = (form: z.infer<typeof FormSchema>) => {
    console.log(form);
  };

  return (
    <div className={" max-w-[80rem] mx-auto p-4 flex flex-col gap-12"}>
      <div>
        <div className={"mb-4"}>
          <h3 className={"font-medium text-xl"}>Solicitud</h3>
        </div>
        <div className={"border bg-[#e7e7e7]/20 dark:bg-[#232323]/80 rounded-sm p-[20px] border-foreground/20"}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col gap-6"}>
              <FormField control={form.control} name={"projectId"} render={({ field }) => (
                <FormItem>
                  <FormLabel className={"dark:data-[error=true]:text-[#fca5a5]"}>Folio de solicitud</FormLabel>
                  <FormControl>
                    <Input placeholder={"234fs234sfd"}
                           className={"border-foreground/20 dark:aria-invalid:border-[#fca5a5]"} {...field} />
                  </FormControl>
                  <FormMessage className={"dark:text-[#fca5a5]"} />
                </FormItem>
              )} />
              <FormField control={form.control} name={"projectName"} render={({ field }) => (
                <FormItem>
                  <FormLabel className={"dark:data-[error=true]:text-[#fca5a5]"}>Nombre del proyecto</FormLabel>
                  <FormControl>
                    <Input placeholder={"Desarrollo Humano"}
                           className={"border-foreground/20 dark:aria-invalid:border-[#fca5a5]"} {...field} />
                  </FormControl>
                  <FormMessage className={"dark:text-[#fca5a5]"} />
                </FormItem>
              )} />
              <FormField control={form.control} name={"moduleName"} render={({ field }) => (
                <FormItem>
                  <FormLabel className={"dark:data-[error=true]:text-[#fca5a5]"}>Nombre del módulo</FormLabel>
                  <FormControl>
                    <Input placeholder={"Incidencias"}
                           className={"border-foreground/20 dark:aria-invalid:border-[#fca5a5]"} {...field} />
                  </FormControl>
                  <FormMessage className={"dark:text-[#fca5a5]"} />
                </FormItem>
              )} />
              <FormField
                control={form.control}
                name="requestType"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tipo de solicitud</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between bg-background/5 border-foreground/20",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? reqType.find(
                                (rq) => rq === field.value
                              )
                              : "Selecciona un tipo de solicitud"}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                 className="opacity-50 fill-foreground"
                                 viewBox="0 0 256 256">
                              <path
                                d="M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z"></path>
                            </svg>

                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Buscar tipo..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No hay datos.</CommandEmpty>
                            <CommandGroup>
                              {reqType.map((reqType) => (
                                <CommandItem
                                  value={reqType}
                                  key={reqType}
                                  onSelect={() => {
                                    form.setValue("requestType", reqType);
                                  }}
                                >
                                  {reqType}
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={cn(
                                    "ml-auto fill-foreground",
                                    reqType === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                       viewBox="0 0 256 256">
                                    <path
                                      d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                                  </svg>

                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requestDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de solicitud</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal bg-background/5 border-foreground/20",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: es })
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="ml-auto h-4 w-4 opacity-50 fill-foreground"
                                 viewBox="0 0 256 256">
                              <path
                                d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"></path>
                            </svg>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">

                        <Calendar
                          mode="single"
                          locale={es}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          fromYear={new Date().getFullYear()}
                          toYear={new Date().getFullYear() + 1}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField control={form.control} name={"applicant"} render={({ field }) => (
                <FormItem>
                  <FormLabel className={"dark:data-[error=true]:text-[#fca5a5]"}>Solicitante</FormLabel>
                  <FormControl>
                    <Input placeholder={"Juan Perez"}
                           className={"border-foreground/20 dark:aria-invalid:border-[#fca5a5]"} {...field} />
                  </FormControl>
                  <FormMessage className={"dark:text-[#fca5a5]"} />
                </FormItem>
              )} />
              <FormField control={form.control} name={"projectLeader"} render={({ field }) => (
                <FormItem>
                  <FormLabel className={"dark:data-[error=true]:text-[#fca5a5]"}>Lider de proyecto</FormLabel>
                  <FormControl>
                    <Input placeholder={"Juan Perez"}
                           className={"border-foreground/20 dark:aria-invalid:border-[#fca5a5]"} {...field} />
                  </FormControl>
                  <FormMessage className={"dark:text-[#fca5a5]"} />
                </FormItem>
              )} />
              <FormField
                control={form.control}
                name="collaborators"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Colaboradores</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between bg-background/5 border-foreground/20",
                              !field.value?.length && "text-muted-foreground"
                            )}
                          >
                            <div className="flex flex-wrap gap-1 max-w-[90%]">
                              {field.value?.length > 0 ? (
                                field.value?.map((person) => (
                                  <div
                                    key={person.email}
                                    className="group relative flex items-center gap-1 px-2 py-1 text-sm bg-accent rounded-full hover:cursor-pointer"
                                  >
                                    {person.name}
                                    <a
                                      key={person.email}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        field.onChange(
                                          field.value.filter(p => p.email !== person.email)
                                        );
                                      }}
                                      className="ml-1 text-muted-foreground hover:text-foreground"
                                    >
                                      ×
                                    </a>
                                    <div
                                      className={"absolute top-7 left-0 bg-background text-foreground z-50 p-2 rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"}>
                                    <span>
                                      {person.email}
                                    </span>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                "Selecciona colaboradores"
                              )}
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                 className="opacity-50 fill-foreground"
                                 viewBox="0 0 256 256">
                              <path
                                d="M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z"></path>
                            </svg>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0">
                        <Command>
                          <CommandInput placeholder="Buscar colaborador..." />
                          <CommandList>
                            <CommandEmpty>No encontrado</CommandEmpty>
                            <CommandGroup>
                              {people?.map((person) => (
                                <CommandItem
                                  key={person.email}
                                  value={person.name} // Busqueda por nombre
                                  onSelect={() => {
                                    const currentValues = field.value || [];
                                    const exists = currentValues.some(p => p.email === person.email);

                                    const newValues = exists
                                      ? currentValues.filter(p => p.email !== person.email)
                                      : [...currentValues, person];

                                    field.onChange(newValues);
                                  }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={cn(
                                    " fill-foreground",
                                    field.value?.some(p => p.email === person.email)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                       viewBox="0 0 256 256">
                                    <path
                                      d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                                  </svg>
                                  {person.name}
                                  <span className="ml-2 text-muted-foreground text-sm">
                    ({person.email})
                  </span>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name={"projectId"} render={({ field }) => (
                <FormItem>
                  <FormLabel className={"dark:data-[error=true]:text-[#fca5a5]"}>Folio de solicitud</FormLabel>
                  <FormControl>
                    <Input placeholder={"234fs234sfd"}
                           className={"border-foreground/20 dark:aria-invalid:border-[#fca5a5]"} {...field} />
                  </FormControl>
                  <FormMessage className={"dark:text-[#fca5a5]"} />
                </FormItem>
              )} />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de inicio</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal bg-background/5 border-foreground/20",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: es })
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="ml-auto h-4 w-4 opacity-50 fill-foreground"
                                 viewBox="0 0 256 256">
                              <path
                                d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"></path>
                            </svg>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">

                        <Calendar
                          mode="single"
                          locale={es}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          fromYear={new Date().getFullYear()}
                          toYear={new Date().getFullYear() + 1}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="estimatedEndDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha estimada de finalización</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal bg-background/5 border-foreground/20",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: es })
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="ml-auto h-4 w-4 opacity-50 fill-foreground"
                                 viewBox="0 0 256 256">
                              <path
                                d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"></path>
                            </svg>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">

                        <Calendar
                          mode="single"
                          locale={es}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          fromYear={new Date().getFullYear()}
                          toYear={new Date().getFullYear() + 1}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentStatus"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Estado actual</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between bg-background/5 border-foreground/20",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? currState.find(
                                (rq) => rq === field.value
                              )
                              : "Selecciona un estado"}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                 className="opacity-50 fill-foreground"
                                 viewBox="0 0 256 256">
                              <path
                                d="M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z"></path>
                            </svg>

                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Buscar tipo..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No hay datos.</CommandEmpty>
                            <CommandGroup>
                              {currState.map((state) => (
                                <CommandItem
                                  value={state}
                                  key={state}
                                  onSelect={() => {
                                    form.setValue("currentStatus", state);
                                  }}
                                >
                                  {state}
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={cn(
                                    "ml-auto fill-foreground",
                                    state === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                       viewBox="0 0 256 256">
                                    <path
                                      d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                                  </svg>

                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
      <div>
        <div className={"mb-4"}>
          <h3 className={"font-medium text-xl"}>Descripción de la solicitud</h3>
        </div>
        <div className={"border bg-[#e7e7e7]/20 dark:bg-[#232323]/80 rounded-sm p-[20px] border-foreground/20"}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="projectObjective"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objetivo del proyecto</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ej. Implementar sistema de gestión de inventarios"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scope"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alcance</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Ej. Desarrollo del módulo principal, integración con ERP existente..."
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dependencies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dependencias</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ej. API de proveedor externo, servidores en la nube"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requerimientos</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Ej. Compatibilidad con móviles, soporte para 100 usuarios concurrentes"
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas adicionales</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Ej. Considerar presupuesto adicional para capacitación"
                        className="min-h-[80px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className={"self-end"}>Guardar</Button>
            </form>
          </Form>
        </div>
      </div>
      <div>
        <div className={"mb-4"}>
          <h3 className={"font-medium text-xl"}>Hitos y plazos</h3>
        </div>
        <div className={"border bg-[#e7e7e7]/20 dark:bg-[#232323]/80 rounded-sm p-[20px] border-foreground/20"}>
          <MilestonesSection />
        </div>
      </div>
      <div>
        <div className={"mb-4"}>
          <h3 className={"font-medium text-xl"}>Cambios adicionales (fuera del alcance inicial)</h3>
        </div>
        <div className={"border bg-[#e7e7e7]/20 dark:bg-[#232323]/80 rounded-sm p-[20px] border-foreground/20"}>
          <AdditionalChangesSection />
        </div>
      </div>
      <div>
        <div className={"mb-4"}>
          <h3 className={"font-medium text-xl"}>Historial de comunicaciones</h3>
        </div>
        <div className={"border bg-[#e7e7e7]/20 dark:bg-[#232323]/80 rounded-sm p-[20px] border-foreground/20"}>
          <CommunicationHistorySection />
        </div>
      </div>
      <div>
        <div className={"mb-4"}>
          <h3 className={"font-medium text-xl"}>Historial de comunicaciones</h3>
        </div>
        <div className={"border bg-[#e7e7e7]/20 dark:bg-[#232323]/80 rounded-sm p-[20px] border-foreground/20"}>
          <Table className={"overflow-hidden"}>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[85%]">Documento</TableHead>
                <TableHead className="text-right">Acción</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {documents.map((document) => (
                <TableRow key={document.id}
                          className={"cursor-pointer hover:translate-x-1 hover:shadow-md transition-all duration-300 translate-x-0 "}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className={"w-5 h-5 fill-red-500"}
                           viewBox="0 0 256 256">
                        <path
                          d="M224,152a8,8,0,0,1-8,8H192v16h16a8,8,0,0,1,0,16H192v16a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8h32A8,8,0,0,1,224,152ZM92,172a28,28,0,0,1-28,28H56v8a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8H64A28,28,0,0,1,92,172Zm-16,0a12,12,0,0,0-12-12H56v24h8A12,12,0,0,0,76,172Zm88,8a36,36,0,0,1-36,36H112a8,8,0,0,1-8-8V152a8,8,0,0,1,8-8h16A36,36,0,0,1,164,180Zm-16,0a20,20,0,0,0-20-20h-8v40h8A20,20,0,0,0,148,180ZM40,112V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88v24a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0ZM160,80h28.69L160,51.31Z"></path>
                      </svg>
                      <span className="font-medium">{document.name}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(document.url, "_blank")}
                      className={"cursor-pointer"}
                    >
                      Abrir PDF
                      <svg xmlns="http://www.w3.org/2000/svg" className={"ml-2 h-4 w-4 fill-foreground"}
                           viewBox="0 0 256 256">
                        <path
                          d="M224,104a8,8,0,0,1-16,0V59.32l-66.33,66.34a8,8,0,0,1-11.32-11.32L196.68,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z"></path>
                      </svg>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {documents.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No hay documentos disponibles
            </div>
          )}
        </div>
      </div>
    </div>
  );
};