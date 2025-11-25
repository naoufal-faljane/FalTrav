'use client';

import { motion } from 'framer-motion';

export default function TestAnimations() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-16">Animation Testing</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Fade In */}
          <motion.div 
            className="bg-card p-6 rounded-xl shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-bold mb-2">Fade In Animation</h3>
            <p>This element fades in with a slight vertical movement.</p>
          </motion.div>
          
          {/* Stagger Children */}
          <motion.div 
            className="bg-card p-6 rounded-xl shadow"
            initial="hidden"
            animate="show"
          >
            <h3 className="font-bold mb-2">Stagger Animation</h3>
            <motion.div variants={{
              hidden: { opacity: 0 },
              show: { 
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}>
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }} className="mb-2">
                First
              </motion.div>
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }} className="mb-2">
                Second
              </motion.div>
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
                Third
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Hover Effect */}
          <motion.div 
            className="bg-card p-6 rounded-xl shadow flex flex-col items-center justify-center"
            whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="font-bold mb-2">Hover Effect</h3>
            <p>Hover over me to see the effect</p>
          </motion.div>
          
          {/* Spring Animation */}
          <motion.div 
            className="bg-card p-6 rounded-xl shadow flex flex-col items-center justify-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >
            <h3 className="font-bold mb-2">Spring Animation</h3>
            <p>This element bounces in with a spring effect.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}