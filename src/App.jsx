import Dashboard from "@/pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
