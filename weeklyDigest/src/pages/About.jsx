import { useNavigate } from "react-router-dom";
import TrueFocus from '../animations/TrueFocus';

const About = () => {
  const navigate = useNavigate();

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-green-100 px-4 py-10 sm:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1
          title="Back to Home"
          onClick={() => navigate("/")}
          className="text-green-700 font-serif font-base text-3xl sm:text-4xl cursor-pointer hover:text-green-900 transition"
        >
          About Weekly Digest
        </h1>
      </div>
      <hr className="border-gray-300 my-5 max-w-6xl mx-auto" />

      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-lg sm:text-xl text-gray-700 mb-4 leading-relaxed">
          A curated blogging experience where writers express their boldest ideas and readers discover fresh perspectives.
        </p>
        <p className="text-md sm:text-lg text-gray-600 leading-relaxed">
          Every week, we handpick the hottest content — breaking insights, experimental tech, juicy dev tips, and deep dives into what actually matters. The TL;DR that slaps.
        </p>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto space-y-20">
        <TrueFocus
          sentence="Express your ideas"
          manualMode={false}
          blurAmount={5}
          borderColor="green"
          animationDuration={2}
          pauseBetweenAnimations={1}
          className="text-3xl font-bold text-center"
        />

        {[
          {
            title: "Craft Your Masterpiece",
            desc: "Navigate to our Write section to compose your story with our elegant editor. Your ideas deserve a beautiful canvas.",
            img: "https://res.cloudinary.com/dcw7sozkr/image/upload/v1747640447/Write_zdvdtn.png",
            reverse: false,
          },
          {
            title: "Join Our Community",
            desc: "Not logged in yet? Sign up to unlock the full experience — write, comment, and engage with fellow thinkers.",
            img: "https://res.cloudinary.com/dcw7sozkr/image/upload/v1747640661/Login_xwarx0.png",
            reverse: true,
          },
          {
            title: "Refine Your Voice",
            desc: "Our editing tools help you polish your work to perfection. Craft content that resonates with your audience.",
            img: "https://res.cloudinary.com/dcw7sozkr/image/upload/v1747640929/Craft_k7byhv.png",
            reverse: false,
          },
          {
            title: "Share With The World",
            desc: "One click is all it takes to publish your story to our engaged community of readers and writers.",
            img: "https://res.cloudinary.com/dcw7sozkr/image/upload/v1747641410/Publish_lv5t2t.png",
            reverse: true,
          },
        ].map(({ title, desc, img, reverse }, i) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row items-center ${reverse ? "md:flex-row-reverse" : ""} gap-10`}
          >
            <img
              src={img}
              alt={title}
              className="w-full md:w-1/2 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300"
            />
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{title}</h2>
              <p className="text-md sm:text-lg text-gray-600 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    <hr className="border-gray-300 my-16 max-w-6xl mx-auto" />
      {/* Footer */}
      <div className="max-w-7xl mx-auto flex justify-center space-x-8">
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors duration-300">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors duration-300">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
            </a>
        </div>
        
        <div className="text-center text-gray-500 text-sm mt-8">
            © {new Date().getFullYear()} Weekly Digest. All rights reserved.
        </div>
    </div>
  );
};

export default About;
