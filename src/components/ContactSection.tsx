import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Loader2,
  X 
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LinkedInIcon, FacebookIcon } from './SocialIcons';

interface ContactSectionProps {
  isModal?: boolean;
  onClose?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isModal = false, onClose }) => {
  const { personal } = PORTFOLIO_DATA;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (statusMessage) setStatusMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatusMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    if (!emailRegex.test(formData.email.trim())) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      await emailjs.send(
        personal.emailJs.serviceId,
        personal.emailJs.templateId,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Inquiry',
          message: formData.message,
        },
        personal.emailJs.publicKey
      );

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore confetti errors
      }

      setStatusMessage({
        type: 'success',
        text: 'Message sent successfully! Karl will get back to you shortly.'
      });

      setFormData({ name: '', email: '', subject: '', message: '' });

      if (isModal && onClose) {
        setTimeout(() => onClose(), 2200);
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatusMessage({
        type: 'error',
        text: 'Failed to send message. Please email Karl directly at mendozajohnkarl@gmail.com'
      });
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // MODAL VIEW (Dedicated spacious two-column layout with no nesting)
  // ─────────────────────────────────────────────────────────────
  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 animate-in fade-in duration-200">
        <div className="relative w-full max-w-4xl rounded-2xl tech-surface border border-slate-700 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
          {/* Left Column: Direct Info Sidebar */}
          <div className="md:w-5/12 bg-[#090d16] p-6 sm:p-8 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open for Inquiries</span>
              </div>

              <h2 className="text-2xl font-heading font-black text-white mb-2">
                Let's Connect
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-light">
                Available for Technical Lead .NET engineering, distributed microservices architecture, and full-stack engagements.
              </p>

              {/* Direct Info List */}
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#111726] border border-slate-800 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${personal.email}`}
                      className="text-xs font-semibold text-white hover:text-teal-300 break-all transition-colors block"
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#111726] border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                      Phone / Mobile
                    </span>
                    <a
                      href={`tel:${personal.phone.replace(/[^0-9+]/g, '')}`}
                      className="text-xs font-semibold text-white hover:text-cyan-300 whitespace-nowrap transition-colors block"
                    >
                      {personal.phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#111726] border border-slate-800 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                      Location
                    </span>
                    <span className="text-xs font-semibold text-white block">
                      Villamor, Pasay City, Philippines
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-slate-800 mt-6">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">
                Social Profiles
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-[#111726] hover:bg-slate-800 border border-slate-800 hover:border-teal-500/40 text-xs font-medium text-white transition-all"
                >
                  <LinkedInIcon className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={personal.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-[#111726] hover:bg-slate-800 border border-slate-800 hover:border-blue-500/40 text-xs font-medium text-white transition-all"
                >
                  <FacebookIcon className="w-4 h-4 text-blue-400" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form Pane */}
          <div className="md:w-7/12 p-6 sm:p-8 bg-[#0d121f] relative flex flex-col justify-between overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-heading font-bold text-white mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-slate-400 mb-6 font-light">
                Fill out the form below and it will dispatch straight to my inbox.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Alex Vance"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080b12] border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-teal-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080b12] border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-teal-400 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Tech Lead .NET Role"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080b12] border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-teal-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Describe your project, team goals, or timeline..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080b12] border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-teal-400 transition-all resize-none"
                  />
                </div>

                {statusMessage && (
                  <div
                    className={`p-3 rounded-xl flex items-center gap-2.5 text-xs font-mono ${
                      statusMessage.type === 'success'
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                    }`}
                  >
                    {statusMessage.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    )}
                    <span>{statusMessage.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-xs tracking-wider uppercase shadow-lg shadow-teal-500/20 hover:shadow-teal-500/35 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message to Karl</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // IN-PAGE SECTION VIEW (#contact)
  // ─────────────────────────────────────────────────────────────
  return (
    <section id="contact" className="relative py-24 bg-[#080b12] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Communication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
            Let's Build Something High-Performance
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-2xl font-light">
            Have a project in mind, need technical lead guidance, or want to discuss architecture strategy? Send me a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Info Chips */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 sm:p-8 rounded-2xl tech-surface shadow-xl space-y-6">
              <h3 className="text-xl font-heading font-bold text-white mb-2">
                Contact Information
              </h3>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#090d16] border border-slate-800 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Email Address</span>
                  <a href={`mailto:${personal.email}`} className="text-sm font-medium text-white hover:text-teal-300 break-all transition-colors">
                    {personal.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#090d16] border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Phone / Mobile</span>
                  <a href={`tel:${personal.phone.replace(/[^0-9+]/g, '')}`} className="text-sm font-medium text-white hover:text-cyan-300 whitespace-nowrap transition-colors">
                    {personal.phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#090d16] border border-slate-800 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Location</span>
                  <span className="text-sm font-medium text-white">
                    {personal.location}
                  </span>
                </div>
              </div>

              {/* LinkedIn & Facebook */}
              <div className="pt-4 border-t border-slate-800 flex items-center gap-4">
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#090d16] hover:bg-slate-800 border border-slate-800 hover:border-teal-500/40 text-xs font-medium text-white transition-all"
                >
                  <LinkedInIcon className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={personal.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#090d16] hover:bg-slate-800 border border-slate-800 hover:border-blue-500/40 text-xs font-medium text-white transition-all"
                >
                  <FacebookIcon className="w-4 h-4 text-blue-400" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>

            {/* Location Map Embed */}
            <div className="rounded-2xl tech-surface overflow-hidden shadow-xl h-64 relative">
              <iframe
                title="Karl Mendoza Location - Pasay City"
                src="https://maps.google.com/maps?width=600&height=400&hl=en&q=Villamor%20Pasay%20City&t=&z=13&ie=UTF8&iwloc=B&output=embed"
                className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#0d121f] text-[11px] font-mono text-teal-300 border border-slate-800">
                📍 Villamor, Pasay City
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl tech-surface shadow-xl">
            <h3 className="text-2xl font-heading font-bold text-white mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase tracking-wider">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Alex Vance"
                    className="w-full px-4 py-3 rounded-xl bg-[#080b12] border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-teal-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase tracking-wider">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#080b12] border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-teal-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Technical Lead Role / Architecture Advisory"
                  className="w-full px-4 py-3 rounded-xl bg-[#080b12] border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-teal-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase tracking-wider">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Share details regarding your tech stack, system requirements, or scope..."
                  className="w-full px-4 py-3 rounded-xl bg-[#080b12] border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-teal-400 transition-all resize-none"
                />
              </div>

              {statusMessage && (
                <div
                  className={`p-4 rounded-xl flex items-center gap-3 text-xs font-mono ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatching Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to Karl</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
