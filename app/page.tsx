"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Lenis from "lenis";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Portfolio() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 30 });
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      spotlightX.set(e.clientX);
      spotlightY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // Smooth Scroll (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative bg-black text-white min-h-screen font-sans overflow-x-hidden">
      {/* Spotlight */}
      <motion.div
        style={{
          background: "radial-gradient(600px at var(--x) var(--y), rgba(255,255,255,0.12), transparent 60%)",
        }}
        className="pointer-events-none fixed inset-0 z-0"
      />
      {/* Custom Cursor */}
      <motion.div
        style={{ translateX: springX, translateY: springY }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white pointer-events-none z-50 mix-blend-difference"
      />

      {/* Hero */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Debabrata Sahoo
        </motion.h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-2xl">
          Studying human behavior in digital systems and designing products that change decisions.
        </p>
        <div className="mt-8 flex gap-4">
          <a href="/docs/cv.pdf" target="_blank" rel="noreferrer" className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition">Resume</a>
        </div>
        <div className="absolute bottom-10 animate-bounce">
          <ArrowDown />
        </div>
      </section>

      {/* Thinking Principles */}
      <section className="px-6 md:px-20 py-24 border-t border-gray-800">
        <h2 className="text-3xl font-semibold mb-10">How I Approach Problems</h2>
        <ul className="space-y-4 text-gray-300 max-w-3xl list-disc pl-6">
          <li>Users rarely fail — systems fail to support recovery</li>
          <li>Behavior is more reliable than opinion</li>
          <li>Uncertainty destroys trust faster than delay</li>
          <li>Metrics should measure decisions, not activity</li>
        </ul>
      </section>

      {/* Tags */}
      <section className="border-y border-gray-800 py-6 overflow-hidden whitespace-nowrap">
        <div className="animate-[scroll_25s_linear_infinite] text-2xl tracking-widest opacity-70">
          PRODUCT • UX RESEARCH • SYSTEM THINKING • BEHAVIOR • RELIABILITY • RETENTION • PRODUCT • UX RESEARCH • SYSTEM THINKING • BEHAVIOR • RELIABILITY • RETENTION
        </div>
      </section>

      {/* Project Section */}
      <section className="px-6 md:px-20 py-32 space-y-40">
        <Project
          title="Reliable Pickup System"
          description="Designed a commitment-based ride matching framework focused on certainty instead of speed to reduce cancellations."
          color="bg-[#0c1b2a]"
          meta={{ role: "Research, problem framing, solution design", duration: "2 weeks", type: "Independent study" }}
          nextQuestions={["Would guaranteed pickup reduce driver acceptance rate?","How does reliability score affect multi-app booking?"]}
          links={[
            { label: "View Report PDF", url: "/docs/unstop1.pdf" },
            { label: "Open Wireframe", url: "https://v0-ride-request-wireframe-no.vercel.app/" }
          ]}
        />

        <Project
          title="Learning App Drop-off Study"
          description="Behavioral experiment showing users quit learning apps due to recovery friction rather than motivation loss."
          color="bg-[#1a1a1a]"
          meta={{ role: "Research design, data analysis, insight extraction", duration: "1 week", type: "Independent study" }}
          nextQuestions={["Do recovery micro-tasks improve week-2 retention?","How does adaptive difficulty impact habit builders vs restart users?"]}
          links={[
            { label: "View Report PDF", url: "/docs/learning-app-study.pdf" },
            { label: "View Responses", url: "https://docs.google.com/spreadsheets/d/1OFXcLrhc_H19RJBGgzuGOxN2ePhzHXoaT74v1SaB_84/edit?usp=sharing" },
            { label: "Interactive Simulation", url: "https://response-7w81.onrender.com/" }
          ]}
        />

        <Project
          title="LeapScholar UX Audit"
          description="Identified decision-confidence friction in counselling booking journey and proposed prioritized usability fixes."
          color="bg-[#141414]"
          meta={{ role: "Usability evaluation, heuristic analysis, recommendations", duration: "3 days", type: "Independent study" }}
          nextQuestions={["Does removing app gate increase scholarship exploration?","Will pre-demo checklist reduce call duration and improve satisfaction?"]}
          links={[
            { label: "View Report PDF", url: "/docs/leap-task.pdf" }
          ]}
        />
      </section>

      {/* Applied Work */}
      <section className="px-6 md:px-20 py-32 border-t border-gray-800">
        <h2 className="text-4xl font-semibold mb-16">Applied Work</h2>
        <div className="grid md:grid-cols-2 gap-16 text-gray-300">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">IEEE VSSUT Student Branch</h3>
            <p>Analysed engagement patterns and redesigned communication flow to improve participation consistency.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Amrit Peedhi Global Student Summit</h3>
            <p>Converted participant feedback into actionable recommendations for session structure and content sequencing.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Debabrata Sahoo
      </footer>
    </div>
  );
}

function Project({ title, description, color, links = [], meta, nextQuestions = [] }) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-3xl p-12 md:p-20 ${color}`}
    >
      <motion.div
        animate={{ opacity: hover ? 1 : 0 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <button
          onClick={(e)=>{e.stopPropagation(); setHover(!hover)}}
          className="w-32 h-32 rounded-full border border-white flex items-center justify-center text-lg tracking-wide pointer-events-auto hover:bg-white hover:text-black transition"
        >
          View
        </button>
      </motion.div>

      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {meta && (
        <div className="text-sm text-gray-400 mb-4">
          <span className="mr-4">Role: {meta.role}</span>
          <span className="mr-4">Duration: {meta.duration}</span>
          <span>Type: {meta.type}</span>
        </div>
      )}
      <p className="text-gray-300 max-w-2xl leading-relaxed mb-6">{description}</p>
      {hover && (
      <div className="flex flex-wrap gap-3 mb-6">
        {links.map((l, i) => (
          <a key={i} href={l.url} target="_blank" rel="noreferrer" className="text-sm border border-white/40 px-4 py-2 rounded-full hover:bg-white hover:text-black transition">
            {l.label}
          </a>
        ))}
      </div>
      )}
      {nextQuestions.length > 0 && (
        <div className="mt-4 text-gray-300">
          <p className="font-semibold mb-2">What I would test next</p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            {nextQuestions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
