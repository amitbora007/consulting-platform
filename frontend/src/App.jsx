import "@/App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

const Home = lazy(() => import("@/pages/Home"));
const Admin = lazy(() => import("@/pages/Admin"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono text-xs uppercase tracking-widest text-white/40">
              <span className="w-1.5 h-1.5 bg-bronze-500 mr-2 animate-pulse"></span>
              Consult Inc.
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
