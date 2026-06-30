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











// import React from "react";
// import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

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
//   label: { fontWeight: "bold" },
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
//   question: { fontWeight: "bold", marginBottom: 6 },
//   feedback: { marginTop: 6, color: "#4b5563", fontStyle: "italic" },
// });

// const InterviewReportPDF = ({ report, interview }) => {
//   const data = report || interview;
//   if (!data) return null;

//   const questions = data.questionWiseScore || data.questions || [];

//   // ✅ Fix — averages calculate karo questions se agar direct fields nahi hain
//   const getAvg = (key) => {
//     // Pehle directly data mein dekho (InterviewReport se aata hai)
//     if (data[key] !== undefined && data[key] !== 0) return data[key];

//     // Phir questions se calculate karo (InterviewHistory se aata hai)
//     if (!questions.length) return 0;
//     const total = questions.reduce((sum, q) => sum + (q[key] || 0), 0);
//     return parseFloat((total / questions.length).toFixed(1));
//   };

//   const confidence = getAvg("confidence");
//   const communication = getAvg("communication");
//   const correctness = getAvg("correctness");

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <Text style={styles.title}>InterviewIQ</Text>
//         <Text style={styles.subtitle}>Mock Interview Assessment Report</Text>

//         {/* Role + Date if available */}
//         {data.role && (
//           <View style={{ marginBottom: 15 }}>
//             <Text style={{ textAlign: "center", color: "#6b7280", fontSize: 11 }}>
//               Role: {data.role} • Experience: {data.experience} yrs • Mode: {data.mode}
//             </Text>
//           </View>
//         )}

//         {/* Overall Score Card */}
//         <View style={styles.card}>
//           <Text style={styles.score}>{data.finalScore || 0}/10</Text>

//           <View style={styles.row}>
//             <Text style={styles.label}>Confidence</Text>
//             <Text>{confidence}/10</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Communication</Text>
//             <Text>{communication}/10</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Correctness</Text>
//             <Text>{correctness}/10</Text>
//           </View>
//         </View>

//         {/* Question Breakdown */}
//         <Text style={styles.heading}>Question-wise Breakdown</Text>

//         {questions.map((q, index) => (
//           <View key={index} style={styles.questionCard}>
//             <Text style={styles.question}>Question {index + 1}</Text>
//             <Text style={{ marginBottom: 6 }}>{q.question}</Text>
//             <Text>Score: {q.score || 0}/10</Text>
//             {q.confidence !== undefined && <Text>Confidence: {q.confidence}/10</Text>}
//             {q.communication !== undefined && <Text>Communication: {q.communication}/10</Text>}
//             {q.correctness !== undefined && <Text>Correctness: {q.correctness}/10</Text>}
//             {q.feedback && <Text style={styles.feedback}>Feedback: {q.feedback}</Text>}
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
    padding: 36,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    color: "#1f2937",
  },

  // ── Header ──
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#059669",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 6,
  },
  metaText: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 9.5,
    marginBottom: 22,
  },
  divider: {
    borderBottom: "1 solid #e5e7eb",
    marginBottom: 22,
  },

  // ── Score Card ──
  card: {
    backgroundColor: "#f8faf9",
    border: "1 solid #d1fae5",
    padding: 20,
    borderRadius: 12,
    marginBottom: 26,
  },
  scoreLabel: {
    fontSize: 9,
    color: "#9ca3af",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  score: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#059669",
    textAlign: "center",
    marginBottom: 18,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    border: "1 solid #e5e7eb",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 8.5,
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },

  // ── Section Heading ──
  heading: {
    fontSize: 15,
    marginBottom: 14,
    color: "#111827",
    fontWeight: "bold",
  },

  // ── Question Card ──
  questionCard: {
    border: "1 solid #e5e7eb",
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  qBadge: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#059669",
    backgroundColor: "#ecfdf5",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  qScoreBadge: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#059669",
  },
  question: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1f2937",
    lineHeight: 1.4,
  },
  metricsRow: {
    flexDirection: "row",
    gap: 14,
    marginTop: 4,
    marginBottom: 6,
  },
  metricText: {
    fontSize: 9,
    color: "#6b7280",
  },
  feedback: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#f9fafb",
    borderLeft: "2 solid #10b981",
    color: "#4b5563",
    fontStyle: "italic",
    fontSize: 10,
    lineHeight: 1.4,
  },

  // ── Footer ──
  footer: {
    position: "absolute",
    bottom: 24,
    left: 36,
    right: 36,
    textAlign: "center",
    fontSize: 8,
    color: "#9ca3af",
    borderTop: "1 solid #e5e7eb",
    paddingTop: 8,
  },
});

const InterviewReportPDF = ({ report, interview }) => {
  const data = report || interview;
  if (!data) return null;

  const questions = data.questionWiseScore || data.questions || [];

  const getAvg = (key) => {
    if (data[key] !== undefined && data[key] !== 0) return data[key];
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
        {/* Header */}
        <View style={styles.headerBar}>
          <Text style={styles.title}>InterviewIQ</Text>
        </View>
        <Text style={styles.subtitle}>Mock Interview Assessment Report</Text>

        {data.role && (
          <Text style={styles.metaText}>
            Role: {data.role}  •  Experience: {data.experience} yrs  •  Mode: {data.mode}
          </Text>
        )}

        <View style={styles.divider} />

        {/* Score Card */}
        <View style={styles.card}>
          <Text style={styles.scoreLabel}>Overall Score</Text>
          <Text style={styles.score}>{data.finalScore || 0}/10</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Confidence</Text>
              <Text style={styles.statValue}>{confidence}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Communication</Text>
              <Text style={styles.statValue}>{communication}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Correctness</Text>
              <Text style={styles.statValue}>{correctness}</Text>
            </View>
          </View>
        </View>

        {/* Question Breakdown */}
        <Text style={styles.heading}>Question-wise Breakdown</Text>

        {questions.map((q, index) => (
          <View key={index} style={styles.questionCard} wrap={false}>
            <View style={styles.questionHeader}>
              <Text style={styles.qBadge}>QUESTION {index + 1}</Text>
              <Text style={styles.qScoreBadge}>{q.score || 0}/10</Text>
            </View>

            <Text style={styles.question}>{q.question}</Text>

            <View style={styles.metricsRow}>
              {q.confidence !== undefined && (
                <Text style={styles.metricText}>Confidence: {q.confidence}/10</Text>
              )}
              {q.communication !== undefined && (
                <Text style={styles.metricText}>Communication: {q.communication}/10</Text>
              )}
              {q.correctness !== undefined && (
                <Text style={styles.metricText}>Correctness: {q.correctness}/10</Text>
              )}
            </View>

            {q.feedback && (
              <Text style={styles.feedback}>"{q.feedback}"</Text>
            )}
          </View>
        ))}

        {/* Footer */}
        <Text style={styles.footer} fixed>
          Generated by InterviewIQ — AI-Powered Mock Interview Platform
        </Text>
      </Page>
    </Document>
  );
};

export default InterviewReportPDF;