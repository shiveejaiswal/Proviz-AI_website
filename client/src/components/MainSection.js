import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Parallax } from 'react-parallax';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ChevronRight, Users, Trophy, BookOpen } from 'lucide-react';

const MainSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const parallaxRef = useRef(null);

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
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/bg.jpg)' }}
      />
      <div className="relative z-10">
        <Parallax bgImage="/assets/futuristic-bg.jpg" strength={500}>
          <section className="relative w-full bg-black bg-opacity-60 text-white overflow-hidden">
            <motion.div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: 'url(/assets/particles.png)',
                backgroundSize: 'cover',
                y,
              }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center space-y-8 px-6">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-6xl font-bold tracking-wide leading-tight md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              >
                Proviz School of AI
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl max-w-2xl mx-auto text-gray-300"
              >
                Embark on a transformative journey into the world of Artificial Intelligence. Our cutting-edge curriculum and expert instructors will guide you towards becoming a leader in AI innovation.
              </motion.p>

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

            <motion.div
              ref={parallaxRef}
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
                    }
                  ].map((program, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-700 rounded-lg overflow-hidden shadow-lg"
                    >
                      <img src={program.image} alt={program.title} className="w-full h-48 object-cover" />
                      <div className="p-6">
                        <h3 className="text-2xl font-semibold mb-2 text-white">{program.title}</h3>
                        <p className="text-gray-300 mb-4">Duration: {program.duration}</p>
                        <p className="text-gray-400">{program.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-900 py-16">
              <div className="container mx-auto px-6">
                <h2 className="text-4xl font-semibold mb-12 text-center text-white">Our Success Stories</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      name: 'Sarah Johnson',
                      role: 'AI Research Scientist at Google',
                      quote: 'Proviz School of AI provided me with the foundation I needed to excel in my career. The hands-on projects and expert guidance were invaluable.',
                      image: '/assets/testimonial1.jpg'
                    },
                    {
                      name: 'Michael Chen',
                      role: 'Founder of AI Startup',
                      quote: 'The entrepreneurship skills I gained alongside AI expertise helped me launch my own successful AI startup. I\'m grateful for the holistic education.',
                      image: '/assets/testimonial2.jpg'
                    },
                    {
                      name: 'Emily Rodriguez',
                      role: 'AI Ethics Consultant',
                      quote: 'Proviz\'s focus on ethical AI practices set me on a path to make a real difference in how AI is developed and deployed responsibly.',
                      image: '/assets/testimonial3.jpg'
                    }
                  ].map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="bg-gray-800 p-6 rounded-lg shadow-lg"
                    >
                      <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">{testimonial.name}</h3>
                      <p className="text-blue-400 mb-4">{testimonial.role}</p>
                      <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-800 py-16">
              <div className="container mx-auto px-6">
                <h2 className="text-4xl font-semibold mb-12 text-center text-white">Key Features</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { icon: Users, title: 'Small Class Sizes', description: 'Enjoy personalized attention with our small class sizes, ensuring you get the support you need.' },
                    { icon: Trophy, title: 'Industry Recognition', description: 'Our programs are recognized and valued by top tech companies worldwide.' },
                    { icon: BookOpen, title: 'Cutting-edge Curriculum', description: 'Stay ahead with our constantly updated curriculum that reflects the latest in AI technology.' },
                    { icon: ChevronRight, title: 'Career Support', description: 'Benefit from our career services, including resume workshops, interview prep, and job placement assistance.' },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-700 p-6 rounded-lg shadow-lg text-center"
                    >
                      <feature.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-900 py-16">
              <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-semibold mb-8 text-white">Join the AI Revolution</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  The field of AI is evolving rapidly, and the demand for skilled professionals is soaring. At Proviz School of AI, we equip you with the knowledge and skills to lead this revolution. Don't miss your chance to be part of the future.
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link to="/apply">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Start Your AI Journey
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>
        </Parallax>
      </div>
    </div>
  );
};

export default MainSection;