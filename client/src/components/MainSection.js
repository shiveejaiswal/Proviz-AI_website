import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Parallax } from 'react-parallax';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

// Reusable ProgramCard component
const ProgramCard = ({ title, duration, description, image, index }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-gray-700 rounded-lg overflow-hidden shadow-lg"
  >
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300 mb-4">Duration: {duration}</p>
      <p className="text-gray-400">{description}</p>
    </div>
  </motion.div>
);

// Reusable TestimonialCard component
const TestimonialCard = ({ name, role, quote, image, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="bg-gray-800 p-6 rounded-lg shadow-lg"
  >
    <img src={image} alt={name} className="w-24 h-24 rounded-full mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
    <p className="text-blue-400 mb-4">{role}</p>
    <p className="text-gray-300 italic">"{quote}"</p>
  </motion.div>
);

const MainSection = () => {
  // Set up scroll-based animation
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);

  // Set up intersection observer for fade-in effect
  const [inViewRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Create a ref for the parallax section
  const parallaxRef = useRef(null);

  // Apply GSAP animation when the parallax section comes into view
  useEffect(() => {
    if (inView) {
      gsap.to(parallaxRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }
  }, [inView]);

  return (
    <div className="relative w-full bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/bg.jpeg)' }}
      />
      <div className="relative z-10">
        {/* Parallax Section */}
        <Parallax bgImage="/assets/futuristic-bg.jpg" strength={500}>
          <section className="relative w-full bg-black bg-opacity-60 text-white overflow-hidden">
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: 'url(/assets/particles.png)',
                backgroundSize: 'cover',
                y,
              }}
            />
            {/* Hero Section */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center space-y-8 px-6">
              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-6xl font-bold tracking-wide leading-tight md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              >
                Proviz School of AI
              </motion.h1>

              {/* Main Description */}
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl max-w-2xl mx-auto text-gray-300"
              >
                Embark on a transformative journey into the world of Artificial Intelligence. Our cutting-edge curriculum and expert instructors will guide you towards becoming a leader in AI innovation.
              </motion.p>

              {/* Apply Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link to="/apply">
                  <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    Apply Now
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* "Why Choose Proviz?" Section */}
            <motion.div
              ref={(el) => {
                // Combine the parallaxRef and inViewRef
                parallaxRef.current = el;
                inViewRef(el);
              }}
              initial={{ opacity: 0, y: 100 }}
              className="bg-gray-900 bg-opacity-90 py-16"
            >
              <div className="container mx-auto text-center text-white">
                <h2 className="text-4xl font-semibold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  Why Choose Proviz School of AI?
                </h2>
                <div className="grid md:grid-cols-3 gap-12 px-6">
                  {[ 
                    {
                      title: 'Cutting-edge AI Curriculum',
                      image: '/assets/ai-curriculum.jpg',
                      description: 'Our curriculum is constantly updated to reflect the latest advancements in AI, ensuring you\'re always at the forefront of technology.'
                    },
                    {
                      title: 'Industry Partnerships',
                      image: '/assets/industry-partnerships.jpg',
                      description: 'Benefit from our strong ties with leading tech companies, opening doors to internships and job opportunities.'
                    },
                    {
                      title: 'Expert Faculty',
                      image: '/assets/expert-faculty.jpg',
                      description: 'Learn from world-renowned AI researchers and industry professionals who bring real-world experience to the classroom.'
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="p-6 bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-md mb-4" />
                      <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Programs Section */}
            <div className="bg-gray-800 py-16">
              <div className="container mx-auto px-6">
                <h2 className="text-4xl font-semibold mb-8 text-center text-white">Our Programs</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {[ 
                    {
                      title: 'Machine Learning Mastery',
                      duration: '6 months',
                      description: 'Dive deep into the world of machine learning algorithms, neural networks, and data analysis.',
                      image: '/assets/machine-learning.jpg'
                    },
                    {
                      title: 'AI for Robotics',
                      duration: '8 months',
                      description: 'Learn to apply AI in robotics, covering topics like computer vision, sensor fusion, and autonomous navigation.',
                      image: '/assets/ai-robotics.jpg'
                    },
                    {
                      title: 'Natural Language Processing',
                      duration: '4 months',
                      description: 'Master the techniques behind chatbots, sentiment analysis, and language translation systems.',
                      image: '/assets/nlp.jpg'
                    },
                    {
                      title: 'AI Ethics and Governance',
                      duration: '3 months',
                      description: 'Explore the ethical implications of AI and learn to develop responsible AI systems.',
                      image: '/assets/ai-ethics.jpg'
                    },
                  ].map((item, index) => (
                    <ProgramCard key={index} {...item} index={index} />
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-gray-900 py-16">
              <div className="container mx-auto text-center text-white">
                <h2 className="text-4xl font-semibold mb-12">What Our Students Say</h2>
                <div className="grid md:grid-cols-3 gap-8 px-6">
                  {[ 
                    {
                      name: 'John Doe',
                      role: 'Software Engineer',
                      quote: 'Proviz School of AI provided me with the knowledge and skills needed to excel in the AI industry. The hands-on experience was invaluable!',
                      image: '/assets/testimonial2.jpg'
                    },
                    {
                      name: 'Jane Smith',
                      role: 'Data Scientist',
                      quote: 'The faculty at Proviz are top-notch! I learned from industry leaders who truly care about student success.',
                      image: '/assets/testimonial3.jpg'
                    },
                    {
                      name: 'Alice Johnson',
                      role: 'AI Researcher',
                      quote: 'I\'ve never encountered a more comprehensive AI program. Proviz sets you up for success from day one.',
                      image: '/assets/testimonial1.jpg'
                    },
                  ].map((testimonial, index) => (
                    <TestimonialCard key={index} {...testimonial} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </Parallax>
      </div>
    </div>
  );
};

export default MainSection;