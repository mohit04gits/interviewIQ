// import axios from "axios";

// export const askAi = async (messages) => {
//   try {
//     if (!messages || !Array.isArray(messages) || messages.length === 0) {
//       throw new Error("Message array is empty.");
//     }

//     // Convert messages array into a single prompt
//     const prompt = messages
//       .map((msg) => `${msg.role}: ${msg.content}`)
//       .join("\n");

//     const response = await axios.post(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         contents: [
//           {
//             parts: [
//               {
//                 text: prompt,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const content = response?.data?.choices?.[0]?.message?.content
//     //return response.data.candidates[0].content.parts[0].text;
//     return content

//   } catch (error) {
//     console.error(
//       error.response?.data || error.message
//     );
//     throw new Error("AI Error");
//   }
// };

// ...........................................................................

// import axios from "axios";

// export const askAi = async (messages) => {
//   try {
//     if (!messages || !Array.isArray(messages) || messages.length === 0) {
//       throw new Error("Message array is empty.");
//     }

//     const prompt = messages
//       .map((msg) => `${msg.role}: ${msg.content}`)
//       .join("\n");

//     const response = await axios.post(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         contents: [
//           {
//             parts: [
//               {
//                 text: prompt,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );

//     const content = response.data.candidates[0].content.parts[0].text;

//     return content;
//     // } catch (error) {
//     //   console.error("Gemini Error:");
//     //   console.error(error.response?.data || error.message);
//     //   throw error;
//     // }
//   } catch (error) {
//     console.log("========== GEMINI ERROR ==========");

//     console.log("Status:", error.response?.status);

//     console.log("Data:");
//     console.dir(error.response?.data, { depth: null });

//     console.log("Message:", error.message);

//     console.log("==================================");

//     throw error;
//   }
// };

// .................................................................................

// import axios from "axios";

// export const askAi = async (messages) => {
//   if (!messages || !Array.isArray(messages) || messages.length === 0) {
//     throw new Error("Message array is empty.");
//   }

//   const prompt = messages
//     .map((msg) => `${msg.role}: ${msg.content}`)
//     .join("\n");

//   // const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
// const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
//   const body = {
//     contents: [{ parts: [{ text: prompt }] }],
//     generationConfig: { temperature: 0.2 },
//   };

//   const MAX_RETRIES = 3;

//   for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
//     try {
//       const response = await axios.post(url, body, {
//         headers: { "Content-Type": "application/json" },
//       });
//       return response.data.candidates[0].content.parts[0].text;

//     } catch (error) {
//       const status = error.response?.status;
//       console.log(`Gemini Attempt ${attempt} Failed — Status: ${status}`);

//       // ✅ 429 pe zyada wait karo — 15 sec
//       if (status === 429 && attempt < MAX_RETRIES) {
//         console.log("Rate limit hit — waiting 15 seconds...");
//         await new Promise((resolve) => setTimeout(resolve, 15000));
//         continue;
//       }

//       // 500/503 pe 2 sec wait
//       if ((status === 500 || status === 503) && attempt < MAX_RETRIES) {
//         await new Promise((resolve) => setTimeout(resolve, 2000));
//         continue;
//       }

//       throw error;
//     }
//   }
// };

import axios from "axios";

export const askAi = async (messages) => {
  try {
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("Message array is empty.");
    }

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.log("========== GROQ ERROR ==========");

    if (error.response) {
      console.log("Status:", error.response.status);
      console.dir(error.response.data, { depth: null });
    } else {
      console.log(error.message);
    }

    console.log("================================");

    throw error;
  }
};
