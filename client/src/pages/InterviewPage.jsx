// import { useState } from "react"
// import Step1Setup from "../components/Step1Setup"
// import Step2Interview from "../components/Step2Interview"
// import Step3Report from "../components/Step3Report"

// function InterviewPage() {

//   const [step,setStep] = useState(1)
//   const [interviewData,setInterviewData] = useState(null)
//   return (
//     <div>
//         {step === 1&&(
//           <Step1Setup onStart={(data)=>{
//             setInterviewData(data)
//             setStep(2)
//           }}/>
//         )}

//         {step === 2&&(
//           <Step2Interview interviewData={interviewData}
//             onFinsh={(report)=>{setInterviewData(report)}}
//           />
//         )}

//         {step === 3&&(
//           <Step3Report report = {interviewData}/>
//         )}
//     </div>
//   )
// }

// export default InterviewPage





// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import Step1Setup from "../components/Step1Setup";
// import Step2Interview from "../components/Step2Interview";
// import Step3Report from "../components/Step3Report";

// function InterviewPage() {
//   const [step, setStep] = useState(1);
//   const [interviewData, setInterviewData] = useState(null);

//   return (
//     <>
//       <Navbar />

//       <div className="pt-20">
//         {step === 1 && (
//           <Step1Setup
//             onStart={(data) => {
//               setInterviewData(data);
//               setStep(2);
//             }}
//           />
//         )}

//         {step === 2 && (
//           <Step2Interview
//             interviewData={interviewData}
//             onFinish={(report) => {
//               setInterviewData(report);
//               setStep(3);
//             }}
//           />
//         )}

//         {step === 3 && <Step3Report report={interviewData} />}
//       </div>
//     </>
//   );
// }

// export default InterviewPage;







import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Step1Setup from "../components/Step1Setup";
import Step2Interview from "../components/Step2Interview";

function InterviewPage() {
  const [step, setStep] = useState(1);
  const [interviewData, setInterviewData] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      {/* <Navbar /> */}
      <div className="pt-0">
        {step === 1 && (
          <Step1Setup
            onStart={(data) => {
              setInterviewData(data);
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <Step2Interview
            interviewData={interviewData}
            onFinish={(report) => {
              // ✅ Report data state mein store karo aur navigate karo
              navigate("/interview-report", { state: { report } });
            }}
          />
        )}
      </div>
    </>
  );
}

export default InterviewPage;