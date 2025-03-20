import { AuthLayout } from "../components/AuthLayout.tsx";
import { ThemeToggle } from "../../../shared/ThemeToggle.tsx";
import { Button } from "@/components/ui/button.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { InputPassword } from "@/shared/InputPassword.tsx";
import { Link } from "react-router";


const FormSchema = z.object({
  username: z.string().min(2, { message: "El usuario debe tener almenos 2 caracteres" }),
  password: z.string().min(2, { message: "La contraseña es requerida" })
});
export const Login = () => {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),

    defaultValues: {
      username: "",
      password: ""
    }
  });

  const onSubmit = (form: z.infer<typeof FormSchema>) => {
    console.log(form);
  };

  return (
    <AuthLayout>
      <section
        className={"bg-[#eff1f3] dark:bg-[#414141] p-4 rounded-lg flex items-stretch   min-h-[400px]  gap-6 dark:text-[#dee2e6] "}>
        <div className={" p-4 flex items-center justify-center  flex-col"}>
          <h3 className={"text-2xl mb-8"}>Bienvenido nuevamente!</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"grid w-full max-w-sm gap-6 mb-6"}>
              <FormField name={"username"} control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className={"dark:data-[error=true]:text-[#fca5a5]"}>
                    Usuario
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={"APEREZ"} className={"dark:aria-invalid:border-[#fca5a5]"} {...field} />

                  </FormControl>
                  <FormMessage className={"dark:text-[#fca5a5]"} />
                </FormItem>
              )} />
              <FormField name={"password"} control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className={"dark:data-[error=true]:text-[#fca5a5]"}>
                    Contraseña
                  </FormLabel>
                  <FormControl>
                    <InputPassword
                      className={"dark:aria-invalid:border-[#fca5a5]"}
                      {...field} />
                  </FormControl>
                  <FormMessage className={"dark:text-[#fca5a5]"} />
                </FormItem>
              )} />
              <Button className={"w-full bg-[#343a40] dark:bg-[#dee2e6]"}>Iniciar Sesión</Button>
            </form>
          </Form>
          <div className="flex items-center justify-center">

            <Link
              to="/planPadrino/identity/password/reset"
              className="inline-block font-semibold"
            >
                <span className={"relative underline-anim text-md lg:text-md font-normal"}>
                    ¿Olvidates tu contraseña?
                  </span>
            </Link>

          </div>
        </div>
        <div
          className={"hidden md:flex relative bg-[#dee2e6] max-w-[350px] p-2  flex-col items-center justify-center text-center rounded-lg"}>
          <div
            className={"absolute top-0 right-0  flex p-2"}>
            <ThemeToggle className={"ring-0 bg-white dark:bg-[#414141]"} />
          </div>
          <div className={""}>
            <blockquote
              className="text-center text-2xl font-medium  italic dark:text-[#343a40] transtition-all durantion-300">
              ¿Nuevas notificaciones? Es nuestro equipo
              <span
                className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 p-1 m-2 before:bg-[#eff1f3] dark:before:bg-[#414141]">
                <span className="relative dark:text-[#dee2e6]">optimizando</span>
              </span>
              lo que usas a diario.
            </blockquote>
          </div>
        </div>
      </section>
    </AuthLayout>
  );
};