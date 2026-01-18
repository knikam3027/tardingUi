import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

type Props = { children: React.ReactNode };

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="pt-14 pl-56 min-h-screen bg-zinc-50">
        <div className="max-w-7xl mx-auto p-6">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
