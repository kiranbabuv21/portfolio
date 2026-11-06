import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import emailjs from '@emailjs/browser';

const CONTACT = {
  name: 'Kiran Babu V',
  email: 'kiranbabuv21@gmail.com',
  phone: '+91 9902348152',
  location: 'Bengaluru, Karnataka, India',
  github: 'https://github.com/kiranbabuv21',
  linkedin: 'https://www.linkedin.com/in/kiran-babu-a31a01391/',
  title: 'AI & ML Engineering Student | Freelance Web Developer',
};

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const isEmailJsConfigured = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

const WEB3FORMS_ACCESS_KEY = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'a8d75f94-c346-41df-8579-d73841266dea').trim();
const isWeb3FormsConfigured = Boolean(WEB3FORMS_ACCESS_KEY);

const contactLinks = [
  {
    label: 'Email',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: CONTACT.phone,
    href: 'tel:+919902348152',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: CONTACT.location,
    href: 'https://maps.google.com/?q=Bengaluru,+Karnataka,+India',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'kiranbabuv21',
    href: CONTACT.github,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'kiran-babu',
    href: CONTACT.linkedin,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const Contact = () => {
  const ref = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    permission: false,
  });
  const [submitStatus, setSubmitStatus] = useState('idle');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '20%']);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const sendViaMailto = () => {
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${formData.firstName} ${formData.lastName}`
    );
    const body = encodeURIComponent(
      `Hi Kiran,\n\n${formData.message}\n\n---\nSender: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}`
    );
    // Direct Gmail Web composer (works without any local email client software)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT.email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.permission) {
      alert('Please accept the contact permission checkbox.');
      return;
    }

    setSubmitStatus('sending');

    // 1. Try Web3Forms if configured (Easiest & most direct background delivery)
    if (isWeb3FormsConfigured) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            message: formData.message,
            subject: `New Portfolio Message from ${formData.firstName} ${formData.lastName}`,
            from_name: `${formData.firstName} ${formData.lastName}`,
          }),
        });

        const data = await response.json();
        if (data.success) {
          setSubmitStatus('success');
          setFormData({ firstName: '', lastName: '', email: '', message: '', permission: false });
          return;
        } else {
          console.error('Web3Forms error:', data);
          setSubmitStatus('error');
          return;
        }
      } catch (err) {
        console.error('Web3Forms network error:', err);
        setSubmitStatus('error');
        return;
      }
    }

    // 2. Try EmailJS if configured
    if (isEmailJsConfigured) {
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: `${formData.firstName} ${formData.lastName}`,
            from_email: formData.email,
            reply_to: formData.email,
            message: formData.message,
            to_email: CONTACT.email,
          },
          EMAILJS_PUBLIC_KEY
        );

        setSubmitStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', message: '', permission: false });
        return;
      } catch (error) {
        console.error('EmailJS error:', error);
        setSubmitStatus('error');
        return;
      }
    }

    // 3. Direct mailto fallback
    sendViaMailto();
    setSubmitStatus('success');
    setFormData({ firstName: '', lastName: '', email: '', message: '', permission: false });
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="bg-[#0b0b0b] w-full min-h-screen relative overflow-hidden flex items-center pt-32 pb-16 border-t border-white/10 select-none"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[160px] pointer-events-none z-0" />

      <motion.div
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12 opacity-10"
      >
        <span
          aria-hidden="true"
          className="text-[25vw] leading-[0.75] font-black text-red-600 uppercase tracking-tighter select-none scale-y-[1.6] origin-top"
          style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
        >
          CONTACT
        </span>
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* Left — Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col gap-8"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-red-600/10 border border-red-600/30 text-xs font-mono uppercase tracking-widest text-red-500">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
              <span>REACH OUT // GET IN TOUCH</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
              LET&apos;S <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700">
                CONNECT.
              </span>
            </h2>
            <p className="text-sm md:text-base text-white/60 font-light leading-relaxed max-w-md">
              Open to freelance projects, collaborations, internships, and AI/ML opportunities. Drop a message or reach out directly.
            </p>
          </div>

          {/* Availability badge */}
          <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-[#141414]/90 border border-green-600/30 w-fit">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
            <span className="text-xs font-mono uppercase tracking-widest text-green-400 font-bold">
              Available for Freelance & Collaborations
            </span>
          </div>

          {/* Contact detail cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href || '#'}
                target={item.href && item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href && item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="p-5 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-2xl hover:border-red-600/60 hover:bg-[#1f1f1f] transition-all duration-300 group block cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-red-500 group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="text-xs font-mono uppercase tracking-widest text-white/40">{item.label}</span>
                </div>
                <p className="text-sm text-white/80 group-hover:text-red-400 transition-colors break-all font-medium">
                  {item.value}
                </p>
              </a>
            ))}
          </div>

          {/* Quick action buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={`mailto:${CONTACT.email}`}
              className="px-6 py-3 bg-red-600 text-white font-bold text-xs uppercase tracking-widest rounded hover:bg-red-700 transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.5)] hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Me
            </a>
            <a
              href="tel:+919902348152"
              className="px-6 py-3 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded hover:bg-neutral-800 hover:border-red-600/40 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Me
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded hover:bg-neutral-800 hover:border-red-600/40 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Right — Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="bg-[#141414]/95 backdrop-blur-2xl border border-white/15 p-8 md:p-10 text-white flex flex-col rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-90" />

          <div className="mb-8">
            <h3 className="text-xl font-black text-white tracking-tight mb-1">Send a Message</h3>
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest">
              // FILL IN THE FORM BELOW
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="relative">
                <label htmlFor="firstName" className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2 block">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-base focus:outline-none focus:border-red-600 transition-colors placeholder-white/30 font-medium rounded-none text-white"
                />
              </div>
              <div className="relative">
                <label htmlFor="lastName" className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2 block">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-base focus:outline-none focus:border-red-600 transition-colors placeholder-white/30 font-medium rounded-none text-white"
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2 block">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full bg-transparent border-b border-white/20 pb-3 text-base focus:outline-none focus:border-red-600 transition-colors placeholder-white/30 font-medium rounded-none text-white"
              />
            </div>

            <div className="relative">
              <label htmlFor="message" className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2 block">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                required
                rows={4}
                className="w-full bg-transparent border-b border-white/20 pb-3 text-base focus:outline-none focus:border-red-600 transition-colors placeholder-white/30 font-medium resize-none rounded-none text-white"
              />
            </div>

            <div className="flex items-center gap-3 py-2 text-sm font-light text-white/70">
              <input
                type="checkbox"
                id="permission"
                checked={formData.permission}
                onChange={handleChange}
                className="w-4 h-4 rounded-sm border-white/30 bg-transparent text-red-600 focus:ring-0 focus:ring-offset-0 cursor-pointer shrink-0"
                style={{ accentColor: '#E50914' }}
              />
              <label htmlFor="permission" className="cursor-pointer leading-tight">
                I give permission to contact me at this email address.
              </label>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
              <button
                type="submit"
                disabled={submitStatus === 'sending'}
                className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-red-600 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-red-700 transition-all duration-300 group shadow-[0_0_20px_rgba(229,9,20,0.6)] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              {submitStatus === 'success' && (
                <p className="text-sm text-green-400 font-mono">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-sm text-red-400 font-mono">Failed to send message. Please try again or reach out directly.</p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
