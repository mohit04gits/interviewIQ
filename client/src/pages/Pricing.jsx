import React, { useState } from "react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import {
  FaCoins,
  FaCheckCircle,
  FaRocket,
  FaStar,
  FaCrown,
} from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: <FaRocket />,
    price: 99,
    credits: 200,
    color: "emerald",
    badge: null,
    features: [
      "200 Interview Credits",
      "4 Full Mock Interviews",
      "AI Answer Evaluation",
      "Performance Report",
      "PDF Download",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    icon: <BsLightningChargeFill />,
    price: 199,
    credits: 500,
    color: "blue",
    badge: "Most Popular",
    features: [
      "500 Interview Credits",
      "10 Full Mock Interviews",
      "AI Answer Evaluation",
      "Performance Report",
      "PDF Download",
      "Resume Analysis",
      "Priority Support",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    icon: <FaCrown />,
    price: 399,
    credits: 1200,
    color: "purple",
    badge: "Best Value",
    features: [
      "1200 Interview Credits",
      "24 Full Mock Interviews",
      "AI Answer Evaluation",
      "Performance Report",
      "PDF Download",
      "Resume Analysis",
      "Priority Support",
      "Unlimited History",
    ],
  },
];

const colorMap = {
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: "bg-emerald-100 text-emerald-600",
    badge: "bg-emerald-600",
    btn: "from-emerald-600 to-emerald-500 shadow-emerald-200",
    ring: "ring-emerald-500",
    text: "text-emerald-600",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "bg-blue-100 text-blue-600",
    badge: "bg-blue-600",
    btn: "from-blue-600 to-blue-500 shadow-blue-200",
    ring: "ring-blue-500",
    text: "text-blue-600",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: "bg-purple-100 text-purple-600",
    badge: "bg-purple-600",
    btn: "from-purple-600 to-purple-500 shadow-purple-200",
    ring: "ring-purple-500",
    text: "text-purple-600",
  },
};

function Pricing() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState(null);

  const handleBuy = async (plan) => {
    console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);
    if (!userData) {
      navigate("/");
      return;
    }

    setLoadingId(plan.id);

    try {
      const { data } = await axios.post(
        serverUrl + "/api/payment/create-order",
        { amount: plan.price },
        { withCredentials: true }
      );
console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "InterviewIQ",
        description: `${plan.name} Plan — ${plan.credits} Credits`,
        order_id: data.order.id,
        image: "https://interviewiq.ai/logo.png",

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              serverUrl + "/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                credits: plan.credits,
              },
              { withCredentials: true }
            );

            if (verifyRes.data.success) {
              // Redux update
              dispatch(
                setUserData({
                  ...userData,
                  credits: verifyRes.data.credits,
                })
              );
              navigate("/", {
                state: { paymentSuccess: true, credits: plan.credits },
              });
            }
            // console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);
          } catch (err) {
            console.error("Verify error:", err);
          }
        },

        prefill: {
          name: userData?.name || "",
          email: userData?.email || "",
        },

        theme: { color: "#10B981" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-emerald-50/30 py-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold mb-5">
            <FaCoins size={14} />
            Buy Interview Credits
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Invest in Your{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Interview Success
            </span>
          </h1>

          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
            Each interview costs 50 credits. Pick a plan and start practising
            with AI-powered mock interviews today.
          </p>

          {userData && (
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <FaCoins className="text-emerald-500" />
              <span className="text-sm font-bold text-gray-700">
                Current Balance:{" "}
                <span className="text-emerald-600">{userData.credits} credits</span>
              </span>
            </div>
          )}
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => {
            const c = colorMap[plan.color];
            const isLoading = loadingId === plan.id;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative bg-white rounded-[2rem] border ${c.border} shadow-lg shadow-gray-900/5 p-7 flex flex-col ${
                  plan.badge ? `ring-2 ${c.ring} ring-offset-2` : ""
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 ${c.badge} text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md`}>
                    {plan.badge}
                  </div>
                )}

                {/* Icon + Name */}
                <div className={`w-12 h-12 rounded-2xl ${c.icon} flex items-center justify-center text-xl mb-5`}>
                  {plan.icon}
                </div>

                <h2 className="text-xl font-black text-gray-900">{plan.name}</h2>

                {/* Price */}
                <div className="mt-3 mb-5">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ₹{plan.price}
                  </span>
                  <div className={`flex items-center gap-1.5 mt-1 ${c.text} font-bold text-sm`}>
                    <FaCoins size={13} />
                    {plan.credits} Credits
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <FaCheckCircle className={`${c.text} shrink-0 mt-0.5`} size={14} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleBuy(plan)}
                  disabled={isLoading}
                  className={`w-full py-3.5 rounded-2xl bg-gradient-to-r ${c.btn} text-white font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <FaStar size={13} /> Buy {plan.name}
                    </>
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-400 text-sm mt-10">
          Secure payments via Razorpay • Credits never expire • Instant delivery
        </p>
      </div>
    </div>
  );
}

export default Pricing;