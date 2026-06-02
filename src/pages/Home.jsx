// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import heroBg from "../assets/hero-bg2.jpg";
// import profileBg from "../assets/profile.jpg";
// import toast from "react-hot-toast";
// import {
//   ArrowRight,
//   Mail,
//   ExternalLink,
//   ChevronDown,
//   Terminal,
//   Braces,
//   GitBranch,
//   Award,
//   GraduationCap,
//   Briefcase,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import API from "../api/axios";

// const Home = () => {
//   const [about, setAbout] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [skills, setSkills] = useState([]);
//   const [experience, setExperience] = useState([]);
//   const [educations, setEducations] = useState([]);
//   const [certifications, setCertifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentCertIndex, setCurrentCertIndex] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [
//           aboutRes,
//           projectsRes,
//           skillsRes,
//           experienceRes,
//           educationRes,
//           certificationsRes,
//         ] = await Promise.all([
//           API.get("/about"),
//           API.get("/projects"),
//           API.get("/skills"),
//           API.get("/experience"),
//           API.get("/education"),
//           API.get("/certifications"),
//         ]);
//         setAbout(aboutRes.data);
//         setProjects(projectsRes.data.slice(0, 3));
//         setSkills(skillsRes.data.slice(0, 8));
//         setExperience(experienceRes.data);
//         setEducations(educationRes.data);
//         setCertifications(certificationsRes.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const prevCert = () =>
//     setCurrentCertIndex((i) => (i === 0 ? certifications.length - 1 : i - 1));
//   const nextCert = () =>
//     setCurrentCertIndex((i) => (i === certifications.length - 1 ? 0 : i + 1));
//   const currentCert = certifications[currentCertIndex];

//   const handleLiveClick = (url) => {
//     if (!url || url === "null") {
//       toast.error("This project is not live yet!", {
//         style: {
//           background: "#0f172a",
//           color: "#f1f5f9",
//           border: "1px solid rgba(255,255,255,0.1)",
//           fontSize: "12px",
//           fontWeight: "bold",
//         },
//       });
//       return;
//     }
//     window.open(url, "_blank");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#020617] flex items-center justify-center">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
//           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
//             Loading...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#020617] text-slate-100 font-sans">
//       {/* ── Background ── */}
//       <div
//         className="fixed inset-0 z-0 pointer-events-none"
//         style={{
//           backgroundImage: `url(${heroBg})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           opacity: 0.9,
//         }}
//       />
//       <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-[#020617]/95 via-[#020617]/85 to-[#030712]/90" />
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
//         <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
//       </div>

//       <div className="relative z-10">
//         {/* ══ HERO ══ */}
//         <section className="min-h-[80vh] sm:min-h-screen flex items-start justify-center px-4 sm:px-6 lg:px-8 pt-4 pb-16 relative overflow-hidden">
//           <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center mt-6 md:mt-12">
//             {/* Left */}
//             <div className="flex flex-col items-center text-center md:items-start md:text-left order-2 md:order-1">
//               <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.1] rounded-full px-4 py-2 mb-6">
//                 <span className="relative flex h-2 w-2">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
//                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
//                 </span>
//                 <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
//                   Available for Work
//                 </span>
//               </div>

//               <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white uppercase mb-4 leading-none">
//                 {about?.name?.split(" ")[0] || "Kuruba"}{" "}
//                 <br className="hidden sm:block" />
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
//                   {about?.name?.split(" ")[1] || "Ramesh"}
//                 </span>
//               </h1>

//               <div className="flex items-center gap-3 mb-5 justify-center md:justify-start">
//                 <div className="h-[1px] w-8 bg-indigo-500/50" />
//                 <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-indigo-400">
//                   {about?.title || "Full Stack Developer"}
//                 </p>
//                 <div className="h-[1px] w-8 bg-indigo-500/50 md:hidden" />
//               </div>

//               <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium max-w-md">
//                 {about?.bio ||
//                   "Passionate developer building modern web applications with the MERN stack."}
//               </p>

//               <div className="flex flex-wrap gap-3 mb-8 justify-center md:justify-start">
//                 <Link
//                   to="/projects"
//                   className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-200 no-underline shadow-[0_0_20px_rgba(99,102,241,0.3)]"
//                 >
//                   View Projects <ArrowRight className="w-3.5 h-3.5" />
//                 </Link>
//                 <Link
//                   to="/contact"
//                   className="flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-300 px-5 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-200 no-underline"
//                 >
//                   Contact Me <Mail className="w-3.5 h-3.5" />
//                 </Link>
//               </div>

//               <div className="flex items-center gap-3 justify-center md:justify-start">
//                 {about?.github && (
//                   <a
//                     href={about.github}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="w-4 h-4"
//                     >
//                       <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
//                       <path d="M9 18c-4.51 2-5-2-7-2" />
//                     </svg>
//                   </a>
//                 )}
//                 {about?.linkedin && (
//                   <a
//                     href={about.linkedin}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="w-4 h-4"
//                     >
//                       <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
//                       <rect width="4" height="12" x="2" y="9" />
//                       <circle cx="4" cy="4" r="2" />
//                     </svg>
//                   </a>
//                 )}
//                 {about?.email && (
//                   <a
//                     href={`https://mail.google.com/mail/?view=cm&fs=1&to=${about.email}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
//                   >
//                     <Mail className="w-4 h-4" />
//                   </a>
//                 )}
//               </div>
//             </div>

//             {/* Right — Photo */}
//             <div className="flex justify-center items-center order-1 md:order-2">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-indigo-600/20 rounded-3xl blur-2xl scale-110" />
//                 <div className="relative w-52 h-64 sm:w-64 sm:h-72 lg:w-80 lg:h-96 rounded-3xl overflow-hidden border border-white/[0.2]">
//                   <img
//                     src={about?.image_url || profileBg}
//                     alt="Kuruba Ramesh"
//                     className="w-full h-full object-cover object-top"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 to-transparent" />
//                 </div>
//                 <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-[#0b0f19] border border-white/[0.07] rounded-xl px-3 py-2">
//                   <p className="text-[8px] font-black uppercase tracking-[0.15em] text-slate-500">
//                     IIT Roorkee
//                   </p>
//                   <p className="text-[10px] font-black uppercase tracking-tight text-white">
//                     PG Certified
//                   </p>
//                 </div>
//                 <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-indigo-600/20 border border-indigo-500/30 rounded-xl px-3 py-2">
//                   <p className="text-[8px] font-black uppercase tracking-[0.25em] text-indigo-400">
//                     Full Stack
//                   </p>
//                   <p className="text-[10px] font-black uppercase tracking-tight text-white">
//                     Developer
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce z-20">
//             <span className="hidden sm:block text-[10px] font-black uppercase tracking-[0.25em] text-slate-500/80">
//               Scroll
//             </span>
//             <div className="w-8 h-8 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center backdrop-blur-sm">
//               <ChevronDown className="w-4 h-4 text-slate-400" />
//             </div>
//           </div>
//         </section>

//         {/* ══ TECH STACK ══ */}
//         <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-6xl mx-auto">
//             <div className="flex items-center gap-4 mb-10">
//               <Braces className="w-5 h-5 text-indigo-400 flex-shrink-0" />
//               <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400 whitespace-nowrap">
//                 Tech Stack
//               </h2>
//               <div className="flex-1 h-[1px] bg-white/[0.05]" />
//             </div>
//             <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
//               {skills.map((skill) => (
//                 <div
//                   key={skill._id}
//                   className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] hover:border-indigo-500/30 hover:bg-indigo-600/10 rounded-full px-3 sm:px-4 py-2 transition-all duration-200 cursor-default"
//                 >
//                   <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
//                   <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.08em] text-slate-300">
//                     {skill.name}
//                   </span>
//                 </div>
//               ))}
//               <Link
//                 to="/skills"
//                 className="flex items-center gap-2 border border-dashed border-white/[0.1] hover:border-indigo-500/30 rounded-full px-3 sm:px-4 py-2 transition-all duration-200 no-underline"
//               >
//                 <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.08em] text-slate-500 hover:text-indigo-400">
//                   View All
//                 </span>
//               </Link>
//             </div>
//           </div>
//         </section>

//         {/* ══ FEATURED PROJECTS ══ */}
//         <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-6xl mx-auto">
//             <div className="flex items-center justify-between mb-10">
//               <div className="flex items-center gap-3">
//                 <Terminal className="w-5 h-5 text-indigo-400 flex-shrink-0" />
//                 <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">
//                   Featured Projects
//                 </h2>
//               </div>
//               <Link
//                 to="/projects"
//                 className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 hover:text-indigo-400 transition-colors no-underline whitespace-nowrap"
//               >
//                 All <ArrowRight className="w-3 h-3" />
//               </Link>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {projects.map((project, i) => (
//                 <div
//                   key={project._id}
//                   className="group bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.05] flex flex-col"
//                 >
//                   {/* ── Project Image ── */}
//                   {project.image_url ? (
//                     <div className="w-full h-44 overflow-hidden">
//                       <img
//                         src={project.image_url}
//                         alt={project.title}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                       />
//                     </div>
//                   ) : (
//                     <div className="w-full h-44 bg-indigo-600/10 border-b border-white/[0.05] flex items-center justify-center">
//                       <Terminal className="w-8 h-8 text-indigo-500/30" />
//                     </div>
//                   )}

//                   {/* ── Project Content ── */}
//                   <div className="p-5 sm:p-6 flex flex-col flex-1">
//                     <div className="flex items-center justify-between mb-3">
//                       <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
//                         {String(i + 1).padStart(2, "0")}
//                       </span>
//                       <div className="flex gap-2">
//                         {project.github_url && (
//                           <a
//                             href={project.github_url}
//                             target="_blank"
//                             rel="noreferrer"
//                             className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-500 hover:text-white transition-colors"
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               className="w-4 h-4"
//                             >
//                               <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
//                               <path d="M9 18c-4.51 2-5-2-7-2" />
//                             </svg>
//                           </a>
//                         )}
//                         <button
//                           onClick={() => handleLiveClick(project.live_url)}
//                           className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-500 hover:text-white transition-colors cursor-pointer"
//                         >
//                           <ExternalLink className="w-3.5 h-3.5" />
//                         </button>
//                       </div>
//                     </div>

//                     <h3 className="text-white font-black uppercase text-sm tracking-tight mb-2 group-hover:text-indigo-300 transition-colors">
//                       {project.title}
//                     </h3>
//                     <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-1 line-clamp-2">
//                       {project.description}
//                     </p>
//                     <div className="flex flex-wrap gap-1.5">
//                       {project.tech_stack?.split(",").map((tech) => (
//                         <span
//                           key={tech}
//                           className="text-[9px] font-black uppercase tracking-[0.08em] bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 px-2 py-1 rounded-full"
//                         >
//                           {tech.trim()}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ══ CERTIFICATION CAROUSEL ══ */}
//         <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-6xl mx-auto">
//             <div className="flex items-center gap-4 mb-12">
//               <Award className="w-5 h-5 text-indigo-400 flex-shrink-0" />
//               <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">
//                 Certification
//               </h2>
//               <div className="flex-1 h-[1px] bg-white/[0.05]" />
//               {certifications.length > 1 && (
//                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">
//                   {currentCertIndex + 1} / {certifications.length}
//                 </span>
//               )}
//             </div>

//             {certifications.length === 0 ? (
//               <p className="text-xs text-slate-500 italic text-center py-10">
//                 No certifications yet.
//               </p>
//             ) : (
//               <div className="relative flex items-center gap-4">
//                 {/* Prev button */}
//                 {certifications.length > 1 && (
//                   <button
//                     onClick={prevCert}
//                     className="flex-shrink-0 w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all duration-200"
//                   >
//                     <ChevronLeft className="w-4 h-4" />
//                   </button>
//                 )}

//                 {/* Card */}
//                 <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white/[0.03] border border-white/[0.03] rounded-3xl p-6 sm:p-8">
//                   {/* Image */}
//                   <div className="lg:col-span-5 relative group">
//                     <div className="absolute inset-0 bg-indigo-600/10 rounded-2xl blur-2xl scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                     <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0b0f19] shadow-2xl hover:border-indigo-500/30 transition-all duration-300">
//                       {currentCert?.image_url ? (
//                         <img
//                           src={currentCert.image_url}
//                           alt={currentCert.certificate_name}
//                           className="w-full h-auto object-contain block group-hover:scale-[1.02] transition-transform duration-300"
//                         />
//                       ) : (
//                         <div className="w-full h-48 flex items-center justify-center">
//                           <Award className="w-12 h-12 text-indigo-500/30" />
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Info */}
//                   <div className="lg:col-span-7 flex flex-col gap-6">
//                     <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[260px]">
//                       <div>
//                         <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
//                           <p className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400">
//                             {currentCert?.institution_name}
//                           </p>
//                           <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
//                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//                             <span className="text-[9px] font-black uppercase tracking-[0.1em] text-emerald-400">
//                               Verified · {currentCert?.end_date}
//                             </span>
//                           </div>
//                         </div>
//                         <h3 className="text-white font-black uppercase text-xl sm:text-2xl tracking-tight mb-2">
//                           {currentCert?.certificate_name}
//                         </h3>
//                         {currentCert?.start_date && (
//                           <p className="text-indigo-300/80 font-bold text-xs sm:text-sm uppercase tracking-wider mb-4">
//                             {currentCert.start_date} –{" "}
//                             {currentCert.end_date || "Present"}
//                           </p>
//                         )}
//                         {currentCert?.description && (
//                           <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
//                             {currentCert.description}
//                           </p>
//                         )}
//                         {currentCert?.certificate_id && (
//                           <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-600">
//                             ID: {currentCert.certificate_id}
//                           </p>
//                         )}
//                       </div>
//                       {currentCert?.credential_url && (
//                         <div className="pt-4 border-t border-white/[0.05]">
//                           <a
//                             href={currentCert.credential_url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-200 no-underline shadow-[0_0_20px_rgba(99,102,241,0.25)] w-fit"
//                           >
//                             View Credentials{" "}
//                             <ArrowRight className="w-3.5 h-3.5" />
//                           </a>
//                         </div>
//                       )}
//                     </div>

//                     {currentCert?.skills && (
//                       <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
//                         <div className="flex items-center gap-2 mb-4">
//                           <div className="h-1 w-3 bg-indigo-500 rounded-full" />
//                           <h4 className="text-slate-300 font-black uppercase text-[10px] tracking-[0.2em]">
//                             Core Expertise
//                           </h4>
//                         </div>
//                         <div className="flex flex-wrap gap-2">
//                           {currentCert.skills.split(",").map((skill, index) => (
//                             <span
//                               key={index}
//                               className="text-[10px] font-bold tracking-wide text-slate-300 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-1.5 hover:bg-white/[0.08] hover:border-indigo-500/30 transition-all duration-150"
//                             >
//                               {skill.trim()}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Next button */}
//                 {certifications.length > 1 && (
//                   <button
//                     onClick={nextCert}
//                     className="flex-shrink-0 w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all duration-200"
//                   >
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>
//             )}

//             {/* Dots */}
//             {certifications.length > 1 && (
//               <div className="flex justify-center gap-2 mt-6">
//                 {certifications.map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setCurrentCertIndex(i)}
//                     className={`w-2 h-2 rounded-full transition-all duration-200 ${i === currentCertIndex ? "bg-indigo-400 w-6" : "bg-white/[0.15]"}`}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>

//         {/* ══ EDUCATION ══ */}
//         <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-6xl mx-auto">
//             <div className="flex items-center gap-4 mb-10">
//               <GraduationCap className="w-5 h-5 text-indigo-400 flex-shrink-0" />
//               <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">
//                 Education
//               </h2>
//               <div className="flex-1 h-[1px] bg-white/[0.05]" />
//             </div>
//             <div className="flex flex-col gap-4">
//               {educations.length > 0 ? (
//                 educations.map((edu) => (
//                   <div
//                     key={edu._id}
//                     className="bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/30 rounded-2xl p-5 sm:p-6 transition-all duration-300"
//                   >
//                     <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
//                       <div>
//                         <p className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-1">
//                           {edu.institution}
//                           {edu.location && ` · ${edu.location}`}
//                         </p>
//                         <h3 className="text-white font-black uppercase text-sm tracking-tight">
//                           {edu.degree}
//                           {edu.branch && ` — ${edu.branch}`}
//                         </h3>
//                       </div>
//                       <span className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-500 whitespace-nowrap">
//                         {edu.start_date} – {edu.end_date || "Present"}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div
//                         className={`w-1.5 h-1.5 rounded-full ${edu.is_current ? "bg-emerald-400" : "bg-indigo-400"}`}
//                       />
//                       <span
//                         className={`text-[10px] font-black uppercase tracking-[0.1em] ${edu.is_current ? "text-emerald-400" : "text-slate-400"}`}
//                       >
//                         {edu.progress || "Completed"}
//                       </span>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-xs text-slate-500 italic">
//                   No education records found.
//                 </p>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* ══ EXPERIENCE ══ */}
//         <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-6xl mx-auto">
//             <div className="flex items-center gap-4 mb-10">
//               <Briefcase className="w-5 h-5 text-indigo-400 flex-shrink-0" />
//               <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">
//                 Experience
//               </h2>
//               <div className="flex-1 h-[1px] bg-white/[0.05]" />
//             </div>
//             <div className="flex flex-col gap-4">
//               {experience.length > 0 ? (
//                 experience.map((exp) => (
//                   <div
//                     key={exp._id}
//                     className="bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/30 rounded-2xl p-5 sm:p-6 transition-all duration-300"
//                   >
//                     <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
//                       <div>
//                         <p className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-1">
//                           {exp.company}
//                           {exp.location && ` · ${exp.location}`}
//                         </p>
//                         <h3 className="text-white font-black uppercase text-sm tracking-tight mb-1">
//                           {exp.role}
//                         </h3>
//                         <span className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-600">
//                           {exp.type}
//                         </span>
//                       </div>
//                       <span className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-500 whitespace-nowrap">
//                         {exp.start_date} –{" "}
//                         {exp.is_current ? "Present" : exp.end_date}
//                       </span>
//                     </div>
//                     {exp.description && (
//                       <p className="text-slate-500 text-xs leading-relaxed mb-3">
//                         {exp.description}
//                       </p>
//                     )}
//                     {exp.skills && (
//                       <div className="flex flex-wrap gap-1.5">
//                         {exp.skills.split(",").map((skill) => (
//                           <span
//                             key={skill}
//                             className="text-[9px] font-black uppercase tracking-[0.08em] bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 px-2 py-1 rounded-full"
//                           >
//                             {skill.trim()}
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-xs text-slate-500 italic">
//                   No experience records found.
//                 </p>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* ══ CTA ══ */}
//         <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-2xl mx-auto text-center">
//             <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5" />
//               <div className="relative z-10">
//                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-4">
//                   Let's Work Together
//                 </p>
//                 <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mb-4">
//                   Have a Project in Mind?
//                 </h2>
//                 <p className="text-slate-500 text-sm mb-8">
//                   I'm currently available for freelance work and full-time
//                   positions.
//                 </p>
//                 <Link
//                   to="/contact"
//                   className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-200 no-underline shadow-[0_0_20px_rgba(99,102,241,0.3)]"
//                 >
//                   Get In Touch <ArrowRight className="w-3.5 h-3.5" />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Home;

import { Suspense, lazy } from "react";
import Loader from "../components/Loader";

const Hero = lazy(() => import("../components/home/Hero"));
const TechStack = lazy(() => import("../components/home/TechStack"));
const FeaturedProjects = lazy(
  () => import("../components/home/FeaturedProjects"),
);
const Certifications = lazy(() => import("../components/home/Certifications"));
const Education = lazy(() => import("../components/home/Education"));
const Experience = lazy(() => import("../components/home/Experience"));
const CTA = lazy(() => import("../components/home/CTA"));

const Home = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      {/* ── Background ── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(/src/assets/hero-bg2.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.9,
        }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-[#020617]/95 via-[#020617]/85 to-[#030712]/90" />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <Suspense fallback={<Loader />}>
          <Hero />
          <TechStack />
          <FeaturedProjects />
          <Certifications />
          <Education />
          <Experience />
          <CTA />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
