// import React from "react";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
// } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     padding: 30,
//     fontSize: 12,
//     fontFamily: "Helvetica",
//     backgroundColor: "#ffffff",
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#059669",
//     marginBottom: 10,
//     textAlign: "center",
//   },

//   subtitle: {
//     fontSize: 14,
//     color: "#555",
//     textAlign: "center",
//     marginBottom: 25,
//   },

//   card: {
//     border: "1 solid #e5e7eb",
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 20,
//   },

//   score: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "#059669",
//     textAlign: "center",
//     marginBottom: 10,
//   },

//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },

//   label: {
//     fontWeight: "bold",
//   },

//   heading: {
//     fontSize: 18,
//     marginBottom: 15,
//     marginTop: 10,
//     color: "#111827",
//     fontWeight: "bold",
//   },

//   questionCard: {
//     border: "1 solid #d1d5db",
//     padding: 12,
//     borderRadius: 6,
//     marginBottom: 12,
//   },

//   question: {
//     fontWeight: "bold",
//     marginBottom: 6,
//   },

//   feedback: {
//     marginTop: 6,
//     color: "#4b5563",
//     fontStyle: "italic",
//   },
// });

// const InterviewReportPDF = ({ report, interview }) => {
//   const data = report || interview;

//   if (!data) return null;

//   const questions =
//     data.questionWiseScore ||
//     data.questions ||
//     [];

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <Text style={styles.title}>InterviewIQ</Text>
//         <Text style={styles.subtitle}>Mock Interview Assessment Report</Text>

//         <View style={styles.card}>
//           <Text style={styles.score}>
//             {data.finalScore || 0}/10
//           </Text>

//           <View style={styles.row}>
//             <Text style={styles.label}>Confidence</Text>
//             <Text>{data.confidence || 0}/10</Text>
//           </View>

//           <View style={styles.row}>
//             <Text style={styles.label}>Communication</Text>
//             <Text>{data.communication || 0}/10</Text>
//           </View>

//           <View style={styles.row}>
//             <Text style={styles.label}>Correctness</Text>
//             <Text>{data.correctness || 0}/10</Text>
//           </View>
//         </View>

//         <Text style={styles.heading}>
//           Question-wise Breakdown
//         </Text>

//         {questions.map((q, index) => (
//           <View key={index} style={styles.questionCard}>
//             <Text style={styles.question}>
//               Question {index + 1}
//             </Text>

//             <Text>{q.question}</Text>

//             <Text>
//               Score: {q.score || 0}/10
//             </Text>

//             {q.confidence !== undefined && (
//               <Text>
//                 Confidence: {q.confidence}/10
//               </Text>
//             )}

//             {q.communication !== undefined && (
//               <Text>
//                 Communication: {q.communication}/10
//               </Text>
//             )}

//             {q.correctness !== undefined && (
//               <Text>
//                 Correctness: {q.correctness}/10
//               </Text>
//             )}

//             {q.feedback && (
//               <Text style={styles.feedback}>
//                 Feedback: {q.feedback}
//               </Text>
//             )}
//           </View>
//         ))}
//       </Page>
//     </Document>
//   );
// };

// export default InterviewReportPDF;











import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#059669",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 25,
  },
  card: {
    border: "1 solid #e5e7eb",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  score: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#059669",
    textAlign: "center",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: { fontWeight: "bold" },
  heading: {
    fontSize: 18,
    marginBottom: 15,
    marginTop: 10,
    color: "#111827",
    fontWeight: "bold",
  },
  questionCard: {
    border: "1 solid #d1d5db",
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  question: { fontWeight: "bold", marginBottom: 6 },
  feedback: { marginTop: 6, color: "#4b5563", fontStyle: "italic" },
});

const InterviewReportPDF = ({ report, interview }) => {
  const data = report || interview;
  if (!data) return null;

  const questions = data.questionWiseScore || data.questions || [];

  // ✅ Fix — averages calculate karo questions se agar direct fields nahi hain
  const getAvg = (key) => {
    // Pehle directly data mein dekho (InterviewReport se aata hai)
    if (data[key] !== undefined && data[key] !== 0) return data[key];

    // Phir questions se calculate karo (InterviewHistory se aata hai)
    if (!questions.length) return 0;
    const total = questions.reduce((sum, q) => sum + (q[key] || 0), 0);
    return parseFloat((total / questions.length).toFixed(1));
  };

  const confidence = getAvg("confidence");
  const communication = getAvg("communication");
  const correctness = getAvg("correctness");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>InterviewIQ</Text>
        <Text style={styles.subtitle}>Mock Interview Assessment Report</Text>

        {/* Role + Date if available */}
        {data.role && (
          <View style={{ marginBottom: 15 }}>
            <Text style={{ textAlign: "center", color: "#6b7280", fontSize: 11 }}>
              Role: {data.role} • Experience: {data.experience} yrs • Mode: {data.mode}
            </Text>
          </View>
        )}

        {/* Overall Score Card */}
        <View style={styles.card}>
          <Text style={styles.score}>{data.finalScore || 0}/10</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Confidence</Text>
            <Text>{confidence}/10</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Communication</Text>
            <Text>{communication}/10</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Correctness</Text>
            <Text>{correctness}/10</Text>
          </View>
        </View>

        {/* Question Breakdown */}
        <Text style={styles.heading}>Question-wise Breakdown</Text>

        {questions.map((q, index) => (
          <View key={index} style={styles.questionCard}>
            <Text style={styles.question}>Question {index + 1}</Text>
            <Text style={{ marginBottom: 6 }}>{q.question}</Text>
            <Text>Score: {q.score || 0}/10</Text>
            {q.confidence !== undefined && <Text>Confidence: {q.confidence}/10</Text>}
            {q.communication !== undefined && <Text>Communication: {q.communication}/10</Text>}
            {q.correctness !== undefined && <Text>Correctness: {q.correctness}/10</Text>}
            {q.feedback && <Text style={styles.feedback}>Feedback: {q.feedback}</Text>}
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default InterviewReportPDF;