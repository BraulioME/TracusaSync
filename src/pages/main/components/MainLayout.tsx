import { Link } from "react-router";
import { ThemeToggle } from "@/shared/ThemeToggle.tsx";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {


  return (
    <div className={"  flex flex-col bg-background min-h-svh "}>
      <header
        className={" px-4 sticky top-0 z-50 w-full border-b   bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"}>
        <div className={""}>
          <div className={" h-14 flex items-center gap-2 md:gap-4 "}>
            <div className={"mr-4 hidden md:flex "}>
              <Link to={""} className={"mr-4 flex items-center gap-2 lg:mr-6  "}>
                <svg
                  viewBox="0 0 152.42952 113.85402"
                  version="1.1"
                  id="svg1"
                  className={"w-6 h-6 fill-base-primary"}
                  xmlns="http://www.w3.org/2000/svg">
                  <defs
                    id="defs1" />
                  <path
                    d="m 62.692969,112.4849 c -11.595,-2.818 -24.902,-11.895 -32.215,-21.975996 l -2.89,-3.981 9.81,-1.231 c 11.965,-1.502 23.283,-4.354 37.809,-9.528 24.598,-8.76 46.915001,-13.396 54.875001,-11.399 3.193,0.802 3.45,3.84 0.948,11.193 -6.004,17.65 -21.708,32.103996 -40.039001,36.853996 -7.286,1.889 -20.673,1.92 -28.298,0.068 z M 136.26697,79.035904 c 3.26,-8.024 3.216,-12.969 -0.145,-16.12 -2.44,-2.289 -3.241,-2.422 -14.25,-2.366 -13.088,0.067 -20.617,1.77 -44.425001,10.056 -38.328,13.339 -62.337,14.788 -72.7350003,4.39 -8.217,-8.217 -5.45500003,-23.925 6.4750003,-36.81 5.88,-6.351 8.01,-7.347 5.438,-2.542 -2.136,3.991 -1.869,14.64 0.431,17.18 2.843,3.142 10.295,4.33 19.402,3.096 8.816,-1.196 15.678,-3.072 36.249,-9.913 29.835001,-9.921 42.000001,-12.504 55.478001,-11.78 19.48,1.049 27.364,10.124 23.134,26.633 -2.142,8.362 -8.221,17.58 -14.58,22.108 l -2.913,2.074 z m -114.310001,-27.707 c -2,-0.807 -1.453,-6.752 1.29,-14.04 3.444,-9.15 7.272,-14.84 14.93,-22.194 20.887,-20.0570006 56.331,-20.1370006 77.260001,-0.176 4.93,4.702 11.27,12.619 11.27,14.072 0,0.385 -3.938,0.983 -8.75,1.328 -10.41,0.746 -26.288001,4.709 -46.552001,11.617 -20.7,7.057 -33.2,10.07 -41.38,9.976 -3.75,-0.043 -7.38,-0.306 -8.068,-0.583 z"

                    id="path1" />
                </svg>
                <span className={"hidden md:inline-block font-bold md:text-md"}>Tracusa/Sync</span>
              </Link>
              {/*<nav className={"flex items-center gap-4 text-md xl:gap-6"}>*/}
              {/*  <Link to={""}*/}
              {/*        className={"hover:text-base-primary/80  visited:bg-red-500"}>*/}
              {/*    Tareas*/}
              {/*  </Link>*/}
              {/*</nav>*/}
            </div>
            <div className={"flex items-center gap-2 md:flex-1 md:justify-end"}>
              <ThemeToggle />
              <div className="relative group flex items-center">
                <button className="cursor-pointer">
                  <img
                    src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/610991ee4e8d8d006985a9e6/37ef2f7d-c06b-483c-9987-1697c7097706/128"
                    className="block rounded-full w-6 h-6"
                  />
                </button>
                <div
                  className="absolute rounded-sm shadow-md invisible opacity-0 right-0 top-9 transition-all duration-200   group-hover:visible group-hover:opacity-100 bg-secondary "
                >
                  <div className=" flex gap-6  flex-col min-w-[280px] p-4 border-b border-foreground/30">
                    <span className={" inline-block mt-[10px]"}>Cuenta</span>
                    <div className={"flex items-center px-[8px] gap-3"}>
                      <img
                        src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/610991ee4e8d8d006985a9e6/37ef2f7d-c06b-483c-9987-1697c7097706/128"
                        className="block rounded-full w-8 h-8"
                      />
                      <div className={"flex flex-col"}>
                        <p>Braulio Monroy Estrada</p>
                        <p>brauliome98@gmail.com</p>
                      </div>
                    </div>
                    <div
                      className={"    flex justify-between items-center rounded-sm hover:bg-background/80 transition-colors duration-300 hover:cursor-pointer"}>
                      <p>Administrar cuenta</p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={"fill-base-primary/50"}
                           viewBox="0 0 256 256">
                        <path
                          d="M228,104a12,12,0,0,1-24,0V69l-59.51,59.51a12,12,0,0,1-17-17L187,52H152a12,12,0,0,1,0-24h64a12,12,0,0,1,12,12Zm-44,24a12,12,0,0,0-12,12v64H52V84h64a12,12,0,0,0,0-24H48A20,20,0,0,0,28,80V208a20,20,0,0,0,20,20H176a20,20,0,0,0,20-20V140A12,12,0,0,0,184,128Z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className={"p-4"}>
                    <div
                      className={" flex justify-between items-center hover:bg-background/80 transition-colors duration-300 hover:cursor-pointer  rounded-sm"}>
                      <p>Cerrar sesion</p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={"fill-base-primary/50"}
                           viewBox="0 0 256 256">
                        <path
                          d="M124,216a12,12,0,0,1-12,12H48a12,12,0,0,1-12-12V40A12,12,0,0,1,48,28h64a12,12,0,0,1,0,24H60V204h52A12,12,0,0,1,124,216Zm108.49-96.49-40-40a12,12,0,0,0-17,17L195,116H112a12,12,0,0,0,0,24h83l-19.52,19.51a12,12,0,0,0,17,17l40-40A12,12,0,0,0,232.49,119.51Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </header>
      <main className={"flex flex-1 flex-col"}>
        <div className={" px-4 "}>
          <div
            className={"items-start  md:gap-6 flex  lg:gap-10"}>
            <aside
              className={"border-grid fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] min-w-[250px] p-1   border-r md:sticky md:block"}>
              <div className={"no-scrollbar h-full overflow-auto py-6 pr-4 lg:py-8"}>
                <div className={"flex flex-col gap-6"}>
                  <div className={"flex flex-col gap-1"}>
                    <h4 className={"rounded-md mb-2 text-xs uppercase font-medium px-2"}>Desarrollo</h4>
                    <div className={"flex hover:bg-accent p-2 items-center rounded-sm"}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={"fill-foreground"}
                           viewBox="0 0 256 256">
                        <path
                          d="M216,48H40a8,8,0,0,0-8,8V208a16,16,0,0,0,16,16H88a16,16,0,0,0,16-16V160h48v16a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V56A8,8,0,0,0,216,48ZM88,208H48V128H88Zm0-96H48V64H88Zm64,32H104V64h48Zm56,32H168V128h40Zm0-64H168V64h40Z"></path>
                      </svg>
                      <Link to={"hola"}
                            className={"font-normal block cursor-pointer w-full text-sm  h-8 flex items-center rounded-lg px-2 hover:text-accent-foreground text-foreground"}>Tareas</Link>
                    </div>
                  </div>
                  <div className={"flex flex-col gap-1"}>
                    <h4 className={"rounded-md mb-2 text-xs font-medium px-2 uppercase"}>Planeación</h4>
                    <div className={"flex hover:bg-accent p-2 items-center rounded-sm"}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={"fill-foreground"}
                           viewBox="0 0 256 256">
                        <path
                          d="M88,96a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,96Zm8,40h64a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16Zm32,16H96a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16ZM224,48V156.69A15.86,15.86,0,0,1,219.31,168L168,219.31A15.86,15.86,0,0,1,156.69,224H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM48,208H152V160a8,8,0,0,1,8-8h48V48H48Zm120-40v28.7L196.69,168Z"></path>
                      </svg>
                      <Link to={"/tracusaSync/featuresRequest"}
                            className={"font-normal block cursor-pointer w-full text-sm  h-8 flex items-center rounded-lg px-2 hover:text-accent-foreground text-foreground"}>Solicitudes</Link>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            <main className={" py-6 w-full "}>
              {children}
            </main>
          </div>
        </div>
      </main>

    </div>
  );
};