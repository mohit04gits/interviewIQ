// import React from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";

// function Layout() {
//   return (
//     <>
//       <Navbar />
//       <main className="pt-20">
//         <Outlet />
//       </main>
//     </>
//   );
// }

// export default Layout;

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {" "}
        {/* // ✅ Yeh theek hai — navbar ki height ke hisaab se */}
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
