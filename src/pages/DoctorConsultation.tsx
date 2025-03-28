import React from 'react';

const DoctorConsultation: React.FC = () => {
  const handlePractoNavigation = () => {
    window.open('https://www.practo.com/', '_blank');
  };

  return (
    <div className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="text-yellow-500">Doctor</span>{" "}
          <span className="text-white">Consultation</span>
        </h1>
        <div className="bg-gray-500/10 backdrop-blur-3xl rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="text-center space-y-6">
            <p className="text-white/90 text-lg">
              Connect with verified doctors instantly through our partnership with Practo.
            </p>
            <div className="flex flex-col items-center space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-lg">
                  <h3 className="text-yellow-500 text-xl font-semibold mb-2">Instant Consultation</h3>
                  <p className="text-white/80">Connect with doctors within 60 seconds</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-lg">
                  <h3 className="text-yellow-500 text-xl font-semibold mb-2">Verified Doctors</h3>
                  <p className="text-white/80">Consult with experienced and verified medical professionals</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-lg">
                  <h3 className="text-yellow-500 text-xl font-semibold mb-2">24/7 Availability</h3>
                  <p className="text-white/80">Access healthcare support anytime, anywhere</p>
                </div>
              </div>
              <button
                onClick={handlePractoNavigation}
                className="mt-8 bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Connect with Doctors Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorConsultation; 