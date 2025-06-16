import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import RoleInfoHeader from "../../components/RoleInfoHeader";
import axiosInstance from "../../Utils/axiousInstance";
import { API_PATHS } from "../../Utils/apiPath";

const InterviewPrep = () => {
  const { sessionId } = useParams();


 const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data by session id
  // Fetch session data by session id
const fetchSessionDetailsById = async () => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.SESSION.GET_ONE(sessionId)
    );

    if (response.data && response.data.session) {
      setSessionData(response.data.session);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};


  // Generate Concept Explanation
  const generateConceptExplanation = async (question) => {};

  // Pin Question
  const toggleQuestionPinStatus = async (questionId) => {};

  // Add more questions to a session
  const uploadMoreQuestions = async () => {};

  useEffect(()=>{
    if (sessionId){
      fetchSessionDetailsById();
    }

    return () => {};
  }, []);
  return (
  <DashboardLayout hideSidebar={true}>
    {/* HEADER SECTION */}
    <RoleInfoHeader
      role={sessionData?.role || ""}
      topicsToFocus={sessionData?.topicsToFocus || ""}
      experience={sessionData?.experience || "-"}
      questions={sessionData?.questions?.length || "-"}
      description={sessionData?.description || ""}
      lastUpdated={
        sessionData?.updatedAt
          ? moment(sessionData.updatedAt).format("Do MMM YYYY")
          : ""
      }
    />

    {/* LOADER */}
    {isLoading ? (
      <div className="flex justify-center items-center py-10">
        <SpinnerLoader />
      </div>
    ) : sessionData?.questions?.length ? (
      <div className="container mx-auto px-6 md:px-10 py-6">
        <div className="grid gap-6">
          {sessionData.questions.map((question, idx) => (
            <motion.div
              key={question._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-md transition-all duration-300"
            >
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Q{idx + 1}
              </div>
              <h3 className="text-lg font-medium text-black dark:text-white mb-2">
                {question.question}
              </h3>
              <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-3">
                {question.answer}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => generateConceptExplanation(question)}
                  className="text-xs px-3 py-1 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition"
                >
                  Learn More
                </button>
                <button
                  onClick={() => toggleQuestionPinStatus(question._id)}
                  className="text-xs px-3 py-1 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition"
                >
                  {question.pinned ? "Unpin" : "Pin"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ) : (
      <div className="text-center text-gray-500 py-10">
        No questions available.
      </div>
    )}
  </DashboardLayout>
);

};

export default InterviewPrep
