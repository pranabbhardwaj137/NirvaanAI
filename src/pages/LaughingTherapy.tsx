import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LaughingTherapy: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  const showSlides = (n: number) => {
    const slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) setSlideIndex(1);
    if (n < 1) setSlideIndex(slides.length);
    for (let i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = "none";
    }
    (slides[slideIndex - 1] as HTMLElement).style.display = "block";
  };

  useEffect(() => {
    showSlides(slideIndex);
  }, [slideIndex]);

  const plusSlides = (n: number) => {
    setSlideIndex(prev => prev + n);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header Section */}
      <header className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/src/imgs/laugh.jpg)',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl">
            <h1 data-aos="fade-down" className="text-5xl md:text-6xl font-bold text-white mb-6">
              Welcome to Our <br />
              <span className="text-yellow-500">Laughing Therapy</span>
            </h1>
            <h3 data-aos="fade-up-right" data-aos-duration="1500" className="text-xl text-white/90">
              Read some memes and <br />
              enjoy watching standup to gain some happiness and relief <br />
              from your problems.
            </h3>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <h1 data-aos="flip-right" className="text-4xl font-bold text-center text-white mb-12">
          ABOUT
        </h1>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-up-right" data-aos-duration="5000" className="image">
            <img src="/src/imgs/laugh2.jpg" alt="Laughing Therapy" className="rounded-2xl shadow-xl" />
          </div>
          <div className="about-content">
            <h4 data-aos="fade-up-left" className="text-2xl font-semibold text-yellow-500 mb-6">
              Laughter Yoga includes four things:
            </h4>
            <ol className="space-y-4 text-white/90">
              <li data-aos="fade-left">Clapping in rhythm to 'ho-ho-ha-ha-ha'.</li>
              <li data-aos="fade-left">Breathing and stretching.</li>
              <li data-aos="fade-left">Child-like play.</li>
              <li data-aos="fade-left">Laughter exercises.</li>
            </ol>
            <a 
              href="https://www.healthline.com/nutrition/laughing-yoga" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-all"
            >
              Know More
            </a>
          </div>
        </div>
      </section>

      {/* Memes Section */}
      <section id="memes" className="py-20 px-4">
        <h1 data-aos="zoom-out" className="text-4xl font-bold text-center text-white mb-12">
          MEMES
        </h1>
        <div data-aos="flip-up" className="max-w-4xl mx-auto relative">
          <div className="mySlides fade">
            <img src="/src/imgs/meme1.jpg" alt="Meme 1" className="w-1/2 mx-auto rounded-lg shadow-xl" />
          </div>
          <div className="mySlides fade">
            <img src="/src/imgs/meme2.jpg" alt="Meme 2" className="w-1/2 mx-auto rounded-lg shadow-xl" />
          </div>
          <div className="mySlides fade">
            <img src="/src/imgs/meme3.jpg" alt="Meme 3" className="w-1/2 mx-auto rounded-lg shadow-xl" />
          </div>
          <div className="mySlides fade">
            <img src="/src/imgs/meme4.jpg" alt="Meme 4" className="w-1/2 mx-auto rounded-lg shadow-xl" />
          </div>
          <div className="mySlides fade">
            <img src="/src/imgs/meme5.jpg" alt="Meme 5" className="w-1/2 mx-auto rounded-lg shadow-xl" />
          </div>
          <div className="mySlides fade">
            <img src="/src/imgs/meme6.jpg" alt="Meme 6" className="w-1/2 mx-auto rounded-lg shadow-xl" />
          </div>

          <button 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
            onClick={() => plusSlides(-1)}
          >
            ❮
          </button>
          <button 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
            onClick={() => plusSlides(1)}
          >
            ❯
          </button>
        </div>
      </section>

      {/* Standups Section */}
      <section id="standups" className="py-20 px-4">
        <h1 data-aos="zoom-in-up" className="text-4xl font-bold text-center text-white mb-12">
          STANDUPS
        </h1>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "Tqsz6fjvhZM", "Y2Oj9gllHno", "XDlyS4N__3o", "z12bz7adLKI",
            "pjSxOnCkHIA", "J38ZBIvLank", "dtaJzUbQS7E", "8PtsKRBgLrA",
            "cHLM9L_5gj0", "injU8xUHoyU", "KKnhgkmV7k8", "_9x9zagDbks",
            "L9pA6sZZjeY", "MLOp3iQFlXY", "AhacYw9dkyE", "qkxuFKqJXWY"
          ].map((videoId, index) => (
            <div key={videoId} data-aos="flip-down" className="video">
              <iframe
                width="100%"
                height="330"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg shadow-xl"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LaughingTherapy; 