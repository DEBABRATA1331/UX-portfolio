"use client";

import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { ArrowDown, ExternalLink, MoveRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";
import ShaderBackground from "@/components/ui/shader-background";

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorHover = useMotionValue(0); // 0 = default, 1 = hover expanding
  const springX = useSpring(cursorX, { stiffness: 400, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 400, damping: 28 });
  const springHover = useSpring(cursorHover, { stiffness: 300, damping: 20 });
  const cursorSize = useTransform(springHover, [0, 1], [32, 80]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - (cursorSize.get() / 2));
      cursorY.set(e.clientY - (cursorSize.get() / 2));
    };

    const handleInteractableEnter = () => cursorHover.set(1);
    const handleInteractableLeave = () => cursorHover.set(0);

    window.addEventListener("mousemove", moveCursor);

    // Add magnetic hover listeners to interactive elements
    const interactables = document.querySelectorAll('a, button, .hover-trigger');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleInteractableEnter);
      el.addEventListener('mouseleave', handleInteractableLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleInteractableEnter);
        el.removeEventListener('mouseleave', handleInteractableLeave);
      });
    };
  }, [cursorX, cursorY, cursorHover, cursorSize]);

  // Smooth Scroll (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.06,
      smoothWheel: true,
      wheelMultiplier: 1.2,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-zinc-950 text-zinc-100 min-h-screen font-sans selection:bg-white/20">

      {/* Background Layer */}
      <div className="fixed inset-0 z-0 bg-zinc-950">
        <div className="absolute inset-0 opacity-[0.4] mix-blend-screen mask-image" style={{ maskImage: "radial-gradient(circle at center, black 0%, transparent 100%)", WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 80%)" }}>
          <ShaderBackground />
        </div>
        {/* Grain overlay for texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />
      </div>

      {/* Custom Cursor */}
      <motion.div
        style={{
          translateX: springX,
          translateY: springY,
          width: cursorSize,
          height: cursorSize,
          background: useTransform(springHover, [0, 1], ["transparent", "rgba(255,255,255,1)"]),
          mixBlendMode: 'difference'
        }}
        className="fixed top-0 left-0 rounded-full border border-white/50 pointer-events-none z-50 transition-colors duration-300 hidden md:flex items-center justify-center backdrop-invert"
      >
        <motion.span style={{ opacity: springHover }} className="text-black text-xs font-semibold tracking-wider">VIEW</motion.span>
      </motion.div>

      {/* Nav */}
      <nav className="fixed top-0 w-full p-8 md:p-12 z-40 flex justify-between items-center mix-blend-difference">
        <span className="font-bold tracking-tighter text-2xl">DS.</span>
        <a href="/docs/cv.pdf" target="_blank" className="text-sm font-medium tracking-widest uppercase hover-trigger border-b border-white/20 pb-1 hover:border-white transition-colors duration-300">Resume</a>
      </nav>

      {/* Hero */}
      <motion.section style={{ opacity: opacityHero, scale: scaleHero }} className="h-[120vh] flex flex-col justify-center items-center text-center px-4 md:px-10 relative z-10 pt-10 will-change-transform transform-gpu">
        <div className="w-full h-[300px] md:h-[600px] mb-8 flex items-center justify-center">
          <VaporizeTextCycle
            texts={["Debabrata", "Researcher", "Analyst"]}
            font={{
              fontFamily: "Outfit, system-ui, sans-serif",
              fontSize: "120px",
              fontWeight: 800
            }}
            color="rgba(255, 255, 255, 0.95)"
            spread={8}
            density={4}
            animation={{
              vaporizeDuration: 2.5,
              fadeInDuration: 1.5,
              waitDuration: 3
            }}
            direction="left-to-right"
            alignment="center"
            tag={Tag.H1}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-3xl text-zinc-400 max-w-3xl leading-snug font-light tracking-tight mt-6"
        >
          Studying human behavior in digital systems and <br className="hidden md:block" />designing products that <span className="text-zinc-100 font-medium">change decisions.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 text-zinc-600 animate-pulse-glow"
        >
          <span className="uppercase tracking-[0.3em] text-[10px] block mb-4">Scroll to discover</span>
          <ArrowDown className="mx-auto w-4 h-4" />
        </motion.div>
      </motion.section>

      {/* Thinking Principles - Asymmetric Layout */}
      <section className="px-6 md:px-12 py-32 relative z-10 max-w-[1600px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5 md:sticky top-40 h-fit">
            <span className="text-zinc-500 uppercase tracking-widest text-sm font-semibold mb-6 block">01 / Methodology</span>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter leading-[1.1]">How I approach complex problems.</h2>
          </div>

          <div className="md:col-span-6 md:col-start-7 space-y-6">
            {[
              { t: "Users rarely fail. Systems fail to support recovery.", desc: "If a user drops off, the product lacked the specific scaffolding required at that exact friction point." },
              { t: "Behavior is magnitudes more reliable than opinion.", desc: "What users say they want rarely aligns with their actual click pathways and decision trees." },
              { t: "Uncertainty destroys trust faster than delay.", desc: "A slow system that communicates status is infinitely better than a fast system that fails silently." },
              { t: "Metrics should measure decisions, not just activity.", desc: "Time-on-site is a vanity metric. Confidence-at-checkout is a conversion metric." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="glass-panel p-8 md:p-10 rounded-[2rem] hover:bg-white/10 transition-colors duration-500 group"
              >
                <h3 className="text-2xl font-medium tracking-tight mb-4 group-hover:text-white text-zinc-200 transition-colors">{item.t}</h3>
                <p className="text-zinc-500 leading-relaxed text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultra-Premium Ideal / UpmarkCurve Section */}
      <section className="py-40 relative z-10 w-full overflow-hidden bg-zinc-950/50">

        <div className="mb-24 px-6 md:px-20 text-center max-w-5xl mx-auto">
          <span className="text-zinc-500 uppercase tracking-widest text-sm font-semibold mb-6 block">02 / Current Endeavor</span>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-zinc-400 mb-6">At <span className="text-white font-semibold">UpmarkCurve.com</span>, I am developing a STEM-focused product that bridges curiosity with clarity.</h2>

          <div className="h-[145px] md:h-[180px] w-full flex flex-col items-center justify-center mt-8 md:mt-12">
            <GooeyText
              texts={["Product Developer", "Data Analyst", "User Researcher"]}
              morphTime={1.2}
              cooldownTime={2.5}
              className="w-full h-full"
              textClassName="font-bold text-5xl md:text-[80pt] tracking-tighter text-white"
            />
          </div>
        </div>

        <div className="px-4 md:px-12 max-w-[1800px] mx-auto">
          {/* The Premium Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">

            {/* Intro Text Card (Spans 3 cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:col-span-4 lg:col-span-3 glass-panel rounded-[2rem] p-6 md:p-10 flex flex-col justify-between overflow-hidden will-change-transform transform-gpu"
            >
              <div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-md">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse-glow" />
                </div>
                <h3 className="text-xl md:text-2xl font-medium tracking-tight leading-snug text-zinc-200 mb-4">Helping students move from excitement to sustained understanding through research-backed learning design.</h3>
              </div>
              <ul className="space-y-3 text-sm text-zinc-400 font-medium">
                <li className="flex items-center"><MoveRight className="w-4 h-4 mr-3 opacity-50 shrink-0" /> Retention & drop-off loops</li>
                <li className="flex items-center"><MoveRight className="w-4 h-4 mr-3 opacity-50 shrink-0" /> Engagement friction points</li>
                <li className="flex items-center"><MoveRight className="w-4 h-4 mr-3 opacity-50 shrink-0" /> Difficulty-driven disengagement</li>
              </ul>
            </motion.div>

            {/* Primary Image (Spans 4 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="md:col-span-4 lg:col-span-4 rounded-[2rem] overflow-hidden group relative hover-trigger bg-zinc-900 border border-white/5 will-change-transform transform-gpu"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent z-10 opacity-80 mix-blend-multiply group-hover:opacity-40 transition-opacity duration-700" />
              <img
                src="/images/ideal-section/media__1772252982100.jpg"
                alt="Product Work"
                className="absolute inset-0 w-full h-full object-cover object-top filter grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-1000 ease-out image-mask"
              />
              <div className="absolute bottom-8 left-8 right-8 z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="glass-panel p-5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">Impact Metric</p>
                    <p className="text-lg font-medium text-white tracking-tight">System Architecture</p>
                  </div>
                  <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-500">40%</span>
                </div>
              </div>
            </motion.div>

            {/* Vertical Portrait (Spans 3 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:col-span-2 lg:col-span-3 rounded-[2rem] overflow-hidden group relative hover-trigger bg-zinc-900 border border-white/5 flex items-end p-8 will-change-transform transform-gpu"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent z-10 group-hover:bg-zinc-950/30 transition-colors duration-700" />
              <img
                src="/images/ideal-section/media__1772252981869.jpg"
                alt="Developer"
                className="absolute inset-0 w-full h-full object-cover filter brightness-90 saturate-50 group-hover:saturate-100 group-hover:scale-[1.03] transition-all duration-1000 ease-out image-mask"
              />
              <div className="relative z-20 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-2 block border-l-2 border-white pl-3">Role</span>
                <h4 className="text-2xl font-bold tracking-tighter leading-none mb-1">Developer</h4>
                <p className="text-sm font-light text-zinc-300">Translating findings into functioning systems.</p>
              </div>
            </motion.div>

            {/* Landscape / Wide (Spans 5 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="md:col-span-4 lg:col-span-5 rounded-[2rem] overflow-hidden group relative hover-trigger bg-zinc-900 border border-white/5 p-8 flex flex-col justify-end will-change-transform transform-gpu"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/50 to-transparent z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
              <img
                src="/images/ideal-section/media__1772252982102.jpg"
                alt="Product Setup"
                className="absolute inset-0 w-full h-full object-cover filter brightness-75 group-hover:brightness-100 group-hover:scale-[1.02] transition-all duration-[1.5s] ease-out opacity-80"
              />
              <div className="relative z-20 max-w-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="px-4 py-2 rounded-full glass-panel text-[10px] tracking-[0.2em] uppercase font-bold text-white mb-4 inline-block">Methodology</span>
                <h4 className="text-xl text-white font-medium tracking-tight mb-2">Behavioral Intervention</h4>
                <p className="text-sm text-zinc-400 font-light">Iterating on user flows by tracking drop-off triggers instead of stated preferences.</p>
              </div>
            </motion.div>

            {/* Small Accent Box (Spans 2 cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:col-span-2 lg:col-span-2 glass-panel rounded-[2rem] p-8 flex flex-col justify-center items-center text-center group hover-trigger hover:bg-white/10 transition-colors duration-500 will-change-transform transform-gpu relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors duration-500 pointer-events-none" />
              <h4 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2 relative z-10">94%</h4>
              <p className="text-zinc-500 text-[10px] tracking-[0.2em] uppercase font-semibold relative z-10">Retention Lift <br />Recorded</p>
            </motion.div>

            {/* Final Image (Spans 3 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="md:col-span-2 lg:col-span-3 rounded-[2rem] overflow-hidden group relative hover-trigger bg-zinc-900 border border-white/5 p-8 flex items-end will-change-transform transform-gpu"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent z-10 group-hover:bg-zinc-950/30 transition-colors duration-700" />
              <img
                src="/images/ideal-section/media__1772252981907.jpg"
                alt="Analyst"
                className="absolute inset-0 w-full h-full object-cover filter brightness-90 saturate-50 group-hover:saturate-100 group-hover:scale-[1.03] transition-all duration-[1.2s] ease-out opacity-80"
              />
              <div className="relative z-20 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-2 block border-l-2 border-white pl-3">Focus</span>
                <h4 className="text-xl font-bold tracking-tight mb-1">Data Synthesis</h4>
                <p className="text-xs font-light text-zinc-300">Turning raw usage logs into actionable heuristics.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Infinite Marquee */}
      <section className="py-12 overflow-hidden whitespace-nowrap bg-zinc-950 text-zinc-800 border-y border-white/5 relative z-10 flex">
        <div className="animate-[scroll_30s_linear_infinite] text-4xl md:text-6xl font-bold tracking-tighter uppercase flex items-center">
          <span className="mx-8">Product Development</span> <span className="w-4 h-4 rounded-full bg-zinc-800" />
          <span className="mx-8">UX Research</span> <span className="w-4 h-4 rounded-full bg-zinc-800" />
          <span className="mx-8">System Thinking</span> <span className="w-4 h-4 rounded-full bg-zinc-800" />
          <span className="mx-8">Behavioral Science</span> <span className="w-4 h-4 rounded-full bg-zinc-800" />
          <span className="mx-8">Product Development</span> <span className="w-4 h-4 rounded-full bg-zinc-800" />
          <span className="mx-8">UX Research</span> <span className="w-4 h-4 rounded-full bg-zinc-800" />
          <span className="mx-8">System Thinking</span> <span className="w-4 h-4 rounded-full bg-zinc-800" />
          <span className="mx-8">Behavioral Science</span>
        </div>
      </section>

      {/* Projects */}
      <section className="px-6 md:px-12 py-40 relative z-10 max-w-[1600px] mx-auto">
        <div className="mb-20 text-center">
          <span className="text-zinc-500 uppercase tracking-widest text-sm font-semibold mb-6 block">03 / Selected Works</span>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter">Case Studies</h2>
        </div>

        <div className="space-y-8">
          <ProjectCard
            title="Reliable Pickup System"
            description="Designed a commitment-based ride matching framework focused on certainty instead of speed to reduce user cancellations and increase trust."
            meta={{ role: "Research & Solution Design", duration: "2 weeks", type: "Independent" }}
            links={[
              { label: "View Report", url: "/docs/Debabrata_sahoo_unstop.pdf" },
              { label: "Open Prototype", url: "https://v0-ride-request-wireframe-no.vercel.app/" }
            ]}
          />

          <ProjectCard
            title="Learning App Drop-off Study"
            description="Behavioral experiment proving that users quit learning apps due to recovery friction (cognitive load) rather than motivation loss."
            meta={{ role: "Research & Data Analysis", duration: "1 week", type: "Independent" }}
            links={[
              { label: "View Report", url: "/docs/Why-Students-Stop-Using-Learning-Apps-After-the-First-Week.pdf" },
              { label: "Interactive Simulation", url: "https://response-7w81.onrender.com/" }
            ]}
          />

          <ProjectCard
            title="LeapScholar UX Audit"
            description="Identified decision-confidence friction in the counselling booking journey and proposed prioritized usability fixes to increase conversions."
            meta={{ role: "Usability Evaluation", duration: "3 days", type: "Independent" }}
            links={[
              { label: "View Audit Document", url: "/docs/Leap_Task.pdf" }
            ]}
          />
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="py-24 md:py-32 border-t border-white/5 relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-12">Let's talk about behavior & structure</h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-16">
            <a href="mailto:debabratasahoo1331@gmail.com" className="group flex items-center gap-4 hover-trigger glass-panel px-8 py-4 rounded-full transition-transform hover:scale-105 duration-300">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-glow" />
              <span className="text-lg text-white font-medium">debabratasahoo1331@gmail.com</span>
            </a>
            <a href="tel:+919560900718" className="group flex items-center gap-3 hover-trigger glass-panel px-8 py-4 rounded-full transition-transform hover:scale-105 duration-300">
              <span className="text-lg text-zinc-300 group-hover:text-white transition-colors">+91 95609 00718</span>
            </a>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-zinc-600 text-sm font-medium pt-8 border-t border-white/5">
            <span className="mb-4 md:mb-0">© {new Date().getFullYear()} Debabrata Sahoo.</span>
            <span className="uppercase tracking-[0.2em]">Designing for Decisions</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProjectCard({ title, description, links = [], meta }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="glass-panel rounded-[2rem] p-8 md:p-16 group hover:bg-white/5 transition-colors duration-500 border border-white/5 hover:border-white/20 relative overflow-hidden will-change-transform transform-gpu"
    >
      {/* Hover glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 blur-[100px] transition-opacity duration-700 pointer-events-none rounded-full" />

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 relative z-10">
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium tracking-wider uppercase text-zinc-400">{meta.role}</span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium tracking-wider text-zinc-400">{meta.duration}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-all duration-500">{title}</h2>

          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-8">{description}</p>
        </div>

        <div className="flex flex-col gap-3 min-w-[200px]">
          {links.map((link: any, idx: number) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="group/btn flex items-center justify-between px-6 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 font-medium tracking-wide hover-trigger"
            >
              {link.label}
              <ExternalLink className="w-4 h-4 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
