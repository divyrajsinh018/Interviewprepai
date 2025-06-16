import React, { useState, useContext } from 'react';
import Screenshot from "../assets/Screenshot.png";
import { APP_FEATURES } from '../Utils/data';
import { useNavigate } from 'react-router-dom';
import { LuSparkles } from 'react-icons/lu';
import Modal from '../components/Modal';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import { UserContext } from '../context/usercontext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

const Landingpage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModel, setopenAuthModel] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setopenAuthModel(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <div className='w-full min-h-screen bg-[#FFFCEF] relative'>
        <div className='w-[500px] h-[500px] bg-amber-200/20 blur-[100px] absolute top-0 -left-24 z-0' />

        <div className='container mx-auto px-4 pt-6 pb-[150px] relative z-10'>
          {/* Header */}
          <header className='flex justify-between items-center mb-16'>
            <div className='text-2xl font-bold text-black tracking-tight'>
              Interview Prep AI
            </div>

            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all shadow-sm"
                onClick={() => setopenAuthModel(true)}
              >
                Login / Sign Up
              </button>
            )}
          </header>

          {/* Hero Content */}
          <div className='flex flex-col md:flex-row items-center md:items-start'>
            {/* Left */}
            <div className='w-full md:w-1/2 mb-10 md:mb-0 md:pr-8'>
              {/* AI Powered Tag */}
              <div className='flex items-center mb-4'>
                <span className='flex items-center gap-2 text-sm text-amber-600 font-semibold bg-amber-100 px-4 py-1 rounded-full border border-amber-300 shadow-sm'>
                  <LuSparkles /> AI Powered
                </span>
              </div>

              {/* Main Heading */}
              <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight'>
                Ace Interviews with <br />
                <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine'>
                  AI-Powered
                </span>{" "}
                Learning
              </h1>

              {/* Subtext */}
              <p className='text-base md:text-lg text-gray-700 mb-6'>
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way — your ultimate interview toolkit is here.
              </p>

              {/* Get Started Button */}
              <button
                className='bg-black text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-white hover:text-black border border-black transition-all'
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>

            {/* Right */}
            <div className='w-full md:w-1/2 flex justify-center'>
              <img
                src={Screenshot}
                alt="Screenshot"
                className='w-full max-w-[700px] md:max-w-[800px] rounded-2xl shadow-2xl'
              />
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="bg-[#FDF8E7] py-16 font-inter">
        <div className="max-w-6xl mx-auto px-4">
          <section className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
              Features That Make You Shine
            </h2>

            <div className="flex flex-wrap justify-center gap-8">
              {APP_FEATURES.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-white rounded-xl p-6 w-full sm:w-[300px] transition-all duration-300 ease-in-out border border-white hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-lg hover:scale-105"
                >
                  <h3
                    className="text-lg font-semibold mb-2 transition-colors duration-300"
                    style={{ color: 'oklch(64.6% 0.222 41.116)' }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-800">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center mt-16 text-gray-500 text-sm">
            Made with ❤️....Happy Coding
          </div>
        </div>
      </div>

      {/* AUTH MODAL */}
      <Modal
        isopen={openAuthModel}
        onclose={() => {
          setopenAuthModel(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </>
  );
};

export default Landingpage;
