import React from "react";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: JSX.Element;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto min-h-screen max-w-screen-xl px-4 py-4 lg:px-0">
        <Header />
        <main className="mt-20 flex min-h-[75vh] flex-col items-center">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
