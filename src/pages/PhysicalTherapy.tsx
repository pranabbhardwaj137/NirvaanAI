import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PhysicalTherapy: React.FC = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Header Section */}
      <header className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/src/imgs/training.jpg)',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl">
            <h1 data-aos="fade-down" className="text-5xl md:text-6xl font-bold text-white mb-6">
              Physical Therapy
            </h1>
            <p data-aos="fade-up-right" data-aos-duration="1500" className="text-xl text-white/90">
              A mind and body practice combining various styles of physical postures, 
              breathing techniques, and meditation or relaxation. Physical therapy is 
              an ancient practice that helps improve overall well-being.
            </p>
          </div>
        </div>
      </header>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 bg-gray-900">
        <h1 data-aos="flip-right" className="text-4xl font-bold text-center text-white mb-12">
          Benefits of Physical Therapy
        </h1>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-up-right" className="text-white/90">
            <img 
              src="/src/imgs/yog.jpg"
              alt="Physical Therapy Benefits"
              className="w-full rounded-xl shadow-xl"
            />
          </div>
          <div data-aos="fade-up-left" className="space-y-6">
            <ul className="space-y-4 text-white/90">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                <span>Physical therapy benefits in <strong>weight loss</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                <span>One of the best solutions for <strong>stress relief</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                <span>Helps for <strong>inner peace</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                <span>Improves <strong>immunity</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                <span>Offers <strong>awareness</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                <span>Improves <strong>relationships</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                <span>Increases <strong>energy</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                <span>Gives you Better <strong>flexibility and posture</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                <span>Helps in improving <strong>intuition</strong></span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Exercises Section */}
      <section id="exercises" className="py-20 px-4">
        <h1 data-aos="zoom-out" className="text-4xl font-bold text-center text-white mb-12">
          Physical Exercises
        </h1>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Stretching Exercises",
              description: "Basic stretching exercises to improve flexibility and reduce muscle tension. These exercises help in maintaining good posture and preventing injuries.",
              image: "/src/imgs/yoga1.jpg",
              link: "https://www.artofliving.org/in-en/yoga/yoga-poses/standing-backward-bend"
            },
            {
              title: "Strength Training",
              description: "Build muscle strength and improve overall fitness with these targeted exercises. Perfect for maintaining a healthy body and mind.",
              image: "/src/imgs/yoga2.jpg",
              link: "https://www.artofliving.org/in-en/yoga/yoga-poses/warrior-pose-virbhadrasana"
            },
            {
              title: "Balance Exercises",
              description: "Enhance your stability and coordination with these balance-focused exercises. Great for improving focus and mental clarity.",
              image: "/src/imgs/yoga3.jpg",
              link: "https://www.artofliving.org/in-en/yoga/yoga-poses/reverse-prayer-pose"
            }
          ].map((exercise, index) => (
            <div key={index} data-aos="flip-up" className="bg-black/50 rounded-xl p-4 border border-yellow-500/20">
              <img 
                src={exercise.image} 
                alt={exercise.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">{exercise.title}</h3>
              <p className="text-white/70 mb-4">{exercise.description}</p>
              <a 
                href={exercise.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-yellow-500 text-black text-center py-2 rounded-lg hover:bg-yellow-400 transition-all"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="py-20 px-4 bg-gray-900">
        <h1 data-aos="zoom-in-up" className="text-4xl font-bold text-center text-white mb-12">
          Exercise Videos
        </h1>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            "s2NQhpFGIOg",
            "g_tea8ZNk5A",
            "c8hjhRqIwHE",
            "brjAjq4zEIE"
          ].map((videoId, index) => (
            <div key={index} data-aos="flip-down" className="bg-black/50 rounded-xl p-4 border border-yellow-500/20">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PhysicalTherapy; 