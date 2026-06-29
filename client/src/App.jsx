// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import Auth from "./pages/Auth";
// import { useEffect } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setUserData } from "./redux/userSlice";
// import InterviewPage from "./pages/InterviewPage";
// import Step1Setup from "./components/Step1Setup";
// import InterviewReport from "./pages/InterviewReport";
// import InterviewHistory from "./components/ViewHistory";
// import Layout from "./layout/Layout";

// export const serverUrl = "http://localhost:8000";

// function App() {
//   // REDUX KA KAAM

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const result = await axios.get(serverUrl + "/api/user/current-user", {
//           withCredentials: true,
//         });

//         console.log(result.data);
//         dispatch(setUserData(result.data));
//       } catch (error) {
//         console.log(error);
//         dispatch(setUserData(null));
//       }
//     };

//     getUser(); // <-- Missing
//   }, [dispatch]); //READ ABOUT THIS

//   return (
//     // <Routes>
//     //   <Route path="/" element={<Home />} />
//     //   <Route path="/auth" element={<Auth />} />
//     //   <Route path="/interview" element={<InterviewPage />} />
//     //   {/* <Route path="/step1" element={<Step1Setup />} /> */}
//     //   // Routes mein add karo
//     //   <Route path="/interview-report" element={<InterviewReport />} />

//     // <Route path="/history" element={<InterviewHistory />} />

//     // </Routes>

//     <Routes>
//       {" "}
//       <Route element={<Layout />}>
//         {" "}
//         <Route path="/" element={<Home />} />{" "}
//         <Route path="/auth" element={<Auth />} />{" "}
//         <Route path="/interview" element={<InterviewPage />} />{" "}
//         <Route path="/interview-report" element={<InterviewReport />} />{" "}
//         <Route path="/history" element={<InterviewHistory />} />{" "}
//       </Route>{" "}
//     </Routes>
//   );
// }

// export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";
import InterviewPage from "./pages/InterviewPage";
import InterviewReport from "./pages/InterviewReport";
import InterviewHistory from "./components/ViewHistory";
import Layout from "./layout/Layout";

// ✅ Render URL update kiya
export const serverUrl =
  import.meta.env.VITE_SERVER_URL || "https://interviewiq-1-gv3j.onrender.com";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/user/current-user", {
          withCredentials: true,
        });
        dispatch(setUserData(result.data));
      } catch (error) {
        dispatch(setUserData(null));
      }
    };
    getUser();
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/interview-report" element={<InterviewReport />} />
        <Route path="/history" element={<InterviewHistory />} />
      </Route>
    </Routes>
  );
}

export default App;
