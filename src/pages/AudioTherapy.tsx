import React, { useEffect } from 'react';
import { Music, Activity, Laugh, BookOpen, User, MessageCircle, ArrowRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function AudioTherapy() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <header className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1610041321327-b794c052db27)',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6" data-aos="fade-up" data-aos-duration="800">
              Welcome to Our <br />
              <span className="text-stress-yellow">Audio Therapy</span>
            </h1>
            <h3 className="text-xl" data-aos="fade-up" data-aos-duration="800">
              Listen to Music, Motivational Podcasts and Audiobooks <br />
              to gain some happiness, knowledge and also lighten your stress side by side.
            </h3>
          </div>
        </div>
      </header>

      {/* Music Section */}
      <section id="music" className="py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Music</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div data-aos="fade-up" data-aos-duration="1000" className="bg-black rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-white">Stress Relief Sounds</h3>
            <iframe
              className="w-full rounded-lg"
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DWXe9gFZP0gtP?utm_source=generator"
              height="380"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>

          <div data-aos="fade-up" data-aos-duration="1500" className="bg-black rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-white">Peaceful Guitar</h3>
            <iframe
              className="w-full rounded-lg"
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0jgyAiPl8Af?utm_source=generator"
              height="380"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>

          <div data-aos="fade-up" data-aos-duration="2000" className="bg-black rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-white">Calm Nature Sounds</h3>
            <iframe
              className="w-full rounded-lg"
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4PP3DA4J0N8?utm_source=generator"
              height="380"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>
        </div>
      </section>

      {/* Podcasts Section */}
      <section id="podcasts" className="py-20 px-4 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Podcasts</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div data-aos="fade-up" data-aos-duration="800" className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <iframe
              className="w-full rounded-lg"
              src="https://open.spotify.com/embed/episode/0p6UzeMN67UnhzF6YHGrEH?utm_source=generator"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <iframe
              className="w-full rounded-lg"
              src="https://open.spotify.com/embed/show/5ZxgpIlnsT8kILxQItEQ5f?utm_source=generator"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <iframe
              className="w-full rounded-lg"
              src="https://open.spotify.com/embed/episode/4ahVo34YZsDDtCgXX5KS5P?utm_source=generator"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <iframe
              className="w-full rounded-lg"
              src="https://open.spotify.com/embed/episode/3ZvJ1jpxtjFIZ8sTghil7u?utm_source=generator"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <iframe
              className="w-full rounded-lg"
              src="https://open.spotify.com/embed/episode/0vEWGG6S1wL6IbxJsxb3sF?utm_source=generator"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <iframe
              className="w-full rounded-lg"
              src="https://open.spotify.com/embed/episode/0PLXymZ2KH89Ty2KGFpREP?utm_source=generator"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <iframe
              className="w-full rounded-lg"
              src="https://open.spotify.com/embed/episode/3qZRmQtsUgHyOVNmZzxxPw?utm_source=generator"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <iframe
              className="w-full rounded-lg"
              src="https://open.spotify.com/embed/episode/3rG0WSWKcQ4iEM4JkLQRGg?utm_source=generator"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <iframe
              className="w-full rounded-lg"
              src="https://open.spotify.com/embed/episode/2UmljSQsLNonJRZ88b2zfx?utm_source=generator"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <iframe
              className="w-full rounded-lg"
              src="https://open.spotify.com/embed/episode/24JEpPldCxgeqGprKO7kMI?utm_source=generator"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <iframe
              className="w-full rounded-lg"
              src="https://open.spotify.com/embed/episode/5nWxL1XA1Jr3C3aJLem5ZK?utm_source=generator"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <iframe
              className="w-full rounded-lg"
              src="https://open.spotify.com/embed/episode/06OxqMY33JiZ23Pxw8NmDs?utm_source=generator"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>
        </div>
      </section>

      {/* Audiobooks Section */}
      <section id="audiobooks" className="py-20 px-4 bg-gray-850">
        <h2 className="text-4xl font-bold text-center mb-12">Audiobooks</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div data-aos="fade-up" data-aos-duration="800" className="bg-black rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src="https://m.media-amazon.com/images/I/41wuB-s8vRL._SL300_.jpg" 
                alt="The Power of Now" 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold">The Power of Now</h3>
                <p className="text-gray-600">By Eckhart Tolle</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">A guide to spiritual enlightenment that teaches you how to live in the present moment.</p>
            <a href="https://www.audible.com/pd/The-Power-of-Now-Audiobook/B002V0KFPW" className="text-blue-600 hover:text-blue-800">Listen on Audible →</a>
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-black rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src="https://m.media-amazon.com/images/I/51-nXsSRfZL._SL300_.jpg" 
                alt="Atomic Habits" 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold">Atomic Habits</h3>
                <p className="text-gray-600">By James Clear</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Learn how to build good habits and break bad ones with this practical guide.</p>
            <a href="https://www.audible.com/pd/Atomic-Habits-Audiobook/B07RFSSYBH" className="text-blue-600 hover:text-blue-800">Listen on Audible →</a>
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-black rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src="https://m.media-amazon.com/images/I/41ZxwGrcC9L._SL300_.jpg" 
                alt="The Alchemist" 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold">The Alchemist</h3>
                <p className="text-gray-600">By Paulo Coelho</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">A philosophical adventure about following your dreams and finding your destiny.</p>
            <a href="https://www.audible.com/pd/The-Alchemist-Audiobook/B002V5HUL4" className="text-blue-600 hover:text-blue-800">Listen on Audible →</a>
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-black rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src="https://m.media-amazon.com/images/I/41+GyScGExL._SL300_.jpg" 
                alt="The Four Agreements" 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold">The Four Agreements</h3>
                <p className="text-gray-600">By Don Miguel Ruiz</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Ancient Toltec wisdom for achieving personal freedom and happiness.</p>
            <a href="https://www.audible.com/pd/The-Four-Agreements-Audiobook/B002V0KFPW" className="text-blue-600 hover:text-blue-800">Listen on Audible →</a>
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-black rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src="https://m.media-amazon.com/images/I/41+GyScGExL._SL300_.jpg" 
                alt="The Untethered Soul" 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold">The Untethered Soul</h3>
                <p className="text-gray-600">By Michael A. Singer</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">A journey beyond yourself to find inner peace and freedom.</p>
            <a href="https://www.audible.com/pd/The-Untethered-Soul-Audiobook/B002V0KFPW" className="text-blue-600 hover:text-blue-800">Listen on Audible →</a>
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-black rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src="https://m.media-amazon.com/images/I/41+GyScGExL._SL300_.jpg" 
                alt="The Seven Spiritual Laws of Success" 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold">The Seven Spiritual Laws of Success</h3>
                <p className="text-gray-600">By Deepak Chopra</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Ancient wisdom for achieving success and fulfillment in life.</p>
            <a href="https://www.audible.com/pd/The-Seven-Spiritual-Laws-of-Success-Audiobook/B002V0KFPW" className="text-blue-600 hover:text-blue-800">Listen on Audible →</a>
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-black rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src="https://m.media-amazon.com/images/I/41+GyScGExL._SL300_.jpg" 
                alt="The Art of Happiness" 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold">The Art of Happiness</h3>
                <p className="text-gray-600">By Dalai Lama</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">A guide to finding lasting happiness through Buddhist wisdom.</p>
            <a href="https://www.audible.com/pd/The-Art-of-Happiness-Audiobook/B002V0KFPW" className="text-blue-600 hover:text-blue-800">Listen on Audible →</a>
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-black rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src="https://m.media-amazon.com/images/I/41+GyScGExL._SL300_.jpg" 
                alt="The Power of Positive Thinking" 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold">The Power of Positive Thinking</h3>
                <p className="text-gray-600">By Norman Vincent Peale</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Learn how to overcome obstacles and achieve success through positive thinking.</p>
            <a href="https://www.audible.com/pd/The-Power-of-Positive-Thinking-Audiobook/B002V0KFPW" className="text-blue-600 hover:text-blue-800">Listen on Audible →</a>
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-black rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src="https://m.media-amazon.com/images/I/41+GyScGExL._SL300_.jpg" 
                alt="The Miracle Morning" 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold">The Miracle Morning</h3>
                <p className="text-gray-600">By Hal Elrod</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Transform your life by starting each day with purpose and intention.</p>
            <a href="https://www.audible.com/pd/The-Miracle-Morning-Audiobook/B002V0KFPW" className="text-blue-600 hover:text-blue-800">Listen on Audible →</a>
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-black rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src="https://m.media-amazon.com/images/I/41+GyScGExL._SL300_.jpg" 
                alt="The Happiness Project" 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold">The Happiness Project</h3>
                <p className="text-gray-600">By Gretchen Rubin</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">A year-long experiment in finding happiness through small, manageable changes.</p>
            <a href="https://www.audible.com/pd/The-Happiness-Project-Audiobook/B002V0KFPW" className="text-blue-600 hover:text-blue-800">Listen on Audible →</a>
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-black rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src="https://m.media-amazon.com/images/I/41+GyScGExL._SL300_.jpg" 
                alt="The Power of Habit" 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold">The Power of Habit</h3>
                <p className="text-gray-600">By Charles Duhigg</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Understanding how habits work and how to transform them for better results.</p>
            <a href="https://www.audible.com/pd/The-Power-of-Habit-Audiobook/B002V0KFPW" className="text-blue-600 hover:text-blue-800">Listen on Audible →</a>
          </div>

          <div data-aos="fade-up" data-aos-duration="800" className="bg-black rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src="https://m.media-amazon.com/images/I/41+GyScGExL._SL300_.jpg" 
                alt="The Gifts of Imperfection" 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold">The Gifts of Imperfection</h3>
                <p className="text-gray-600">By Brené Brown</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Embrace your imperfections and live a wholehearted life.</p>
            <a href="https://www.audible.com/pd/The-Gifts-of-Imperfection-Audiobook/B002V0KFPW" className="text-blue-600 hover:text-blue-800">Listen on Audible →</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AudioTherapy; 