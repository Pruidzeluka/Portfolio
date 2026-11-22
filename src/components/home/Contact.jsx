import React, { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import Card from '../common/Card';
import Button from '../common/Button';
import { Mail, Copy, Check, MapPin, Briefcase, Send, Github, Linkedin, MessageSquare, User, Bookmark } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';

export default function Contact({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(personalInfo.email);
      }
      setCopied(true);
      if (onShowToast) onShowToast("Email copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      if (onShowToast) onShowToast("Email: " + personalInfo.email);
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please enter a message (at least 10 characters).';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      if (onShowToast) onShowToast("Message sent! Luka will be in touch soon.");
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Get In Touch"
          titlePrefix="Let's Connect &amp;"
          gradientWord="Build Together"
          subtitle="Whether you have an internship opportunity, project collaboration, or just want to say hi, my inbox is always open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <Card glow className="p-6 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Contact Channels
                </h3>
                <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                  Feel free to reach out directly via email or connect with me on professional networks. I respond promptly!
                </p>

                <div className="space-y-4 mb-8">
                  {/* Email with copy button */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent-cyan/40 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-400 uppercase tracking-wider block font-mono">
                          Direct Email
                        </span>
                        <a 
                          href={`mailto:${personalInfo.email}`}
                          className="text-sm font-semibold text-white hover:text-accent-cyan transition-colors"
                        >
                          {personalInfo.email}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="p-2 text-gray-400 hover:text-accent-cyan hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                      title="Copy email address"
                      aria-label="Copy email address"
                    >
                      {copied ? <Check className="w-4 h-4 text-accent-emerald" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Location & Academy */}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-accent-emerald/10 border border-accent-emerald/30 flex items-center justify-center text-accent-emerald">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wider block font-mono">
                        Location / Academy
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {personalInfo.location} • TBC Academy
                      </span>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wider block font-mono">
                        Current Status
                      </span>
                      <span className="text-sm font-semibold text-accent-emerald">
                        Full-Stack Roles &amp; Internships
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="pt-6 border-t border-white/10">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-3">
                  Find me online:
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-accent-cyan hover:border-accent-cyan/40 hover:bg-accent-cyan/10 transition-all cursor-pointer"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-accent-cyan hover:border-accent-cyan/40 hover:bg-accent-cyan/10 transition-all cursor-pointer"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-accent-cyan hover:border-accent-cyan/40 hover:bg-accent-cyan/10 transition-all cursor-pointer"
                    aria-label="Send direct email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Card glow className="p-6 sm:p-8 lg:p-10">
              <h3 className="text-2xl font-bold text-white mb-2">
                Send Me a Message
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Fill in the fields below and I'll get back to you as soon as possible.
              </p>

              {submitSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-accent-emerald/10 border border-accent-emerald/30 text-accent-emerald flex items-center gap-3 text-sm">
                  <Check className="w-5 h-5 flex-shrink-0" />
                  <span>Thank you! Your message has been simulated successfully. I will get back to you soon.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5 font-mono">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        placeholder="Alex Morgan"
                        className={`w-full bg-dark-900/80 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
                          errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-accent-cyan'
                        }`}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5 font-mono">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="alex@company.com"
                        className={`w-full bg-dark-900/80 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
                          errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-accent-cyan'
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5 font-mono">
                    Subject
                  </label>
                  <div className="relative">
                    <Bookmark className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project Inquiry / Job Opportunity"
                      className="w-full bg-dark-900/80 border border-white/10 focus:border-accent-cyan rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5 font-mono">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      placeholder="Tell me about your project, team, or opportunity..."
                      className={`w-full bg-dark-900/80 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
                        errors.message ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-accent-cyan'
                      }`}
                    />
                  </div>
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                  icon={isSubmitting ? null : <Send className="w-4 h-4" />}
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </Button>
              </form>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}

