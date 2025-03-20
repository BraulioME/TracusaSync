import { AppRouter } from "./router/AppRouter.tsx";

function App() {

  return (
    <div
      className="min-h-screen bg-white dark:bg-[#121212] transition-colors duration-300 font-geist font-medium subpixel-antialiased">
      <AppRouter />
    </div>
  );
}

export default App;
