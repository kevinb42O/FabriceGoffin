import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import PageTransition from '../components/PageTransition';
import { Send, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { contact } from '../data/contact';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request for premium feel
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Trigger the actual mailto action
      const body = `Naam: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0A${formData.message}`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(formData.subject)}&body=${body}`;
      
      // Reset form after a while
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 5000);
    }, 1500);
  };

  return (
    <PageTransition>
      <SEO title="Contact — Fabrice Goffin" description="Contacteer Fabrice Goffin met je vragen, ideeën, of om mee te werken aan een beter Oostende." />
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 bg-white flex items-center justify-center">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: High Def Vertical Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-5 w-full relative rounded-3xl overflow-hidden shadow-2xl min-h-[400px]"
          >
            <img src="/images/contacteermij.webp" alt="Contacteer Fabrice Goffin" className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
          </motion.div>

          {/* Right Column: Context & Form */}
          <div className="lg:col-span-7 flex flex-col justify-center py-4 lg:py-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-red-600"></div>
                <span className="text-red-600 font-bold uppercase tracking-[0.2em] text-xs">Contact</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-zinc-900 leading-none mb-6">
                Samen voor <br />
                <span className="text-red-600">Oostende</span>
              </h1>
              
              <p className="text-lg md:text-xl text-zinc-600 font-medium leading-relaxed max-w-lg">
                Heb je een sterk idee, een vraag over dierenwelzijn of wil je gewoon even kennismaken? Stuur me een bericht en ik neem zo snel mogelijk contact met je op.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative bg-zinc-50 p-8 md:p-12 rounded-3xl shadow-sm border border-zinc-100"
            >
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-zinc-50 rounded-3xl z-10"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >
                      <CheckCircle2 className="w-24 h-24 text-green-500 mb-6 mx-auto" />
                    </motion.div>
                    <h3 className="text-3xl font-black uppercase tracking-tight text-zinc-900 mb-4">Bericht Klaargezet!</h3>
                    <p className="text-zinc-500 font-medium text-lg">Je e-mailprogramma is geopend om het bericht te versturen.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-2">Naam</label>
                        <input 
                          type="text" 
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Jouw naam"
                          className="w-full bg-white px-6 py-4 rounded-xl border border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition-all font-medium text-zinc-900 placeholder:text-zinc-400 shadow-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-2">Email</label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="jouw@email.be"
                          className="w-full bg-white px-6 py-4 rounded-xl border border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition-all font-medium text-zinc-900 placeholder:text-zinc-400 shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="subject" className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-2">Onderwerp</label>
                      <input 
                        type="text" 
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Waar wil je het over hebben?"
                        className="w-full bg-white px-6 py-4 rounded-xl border border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition-all font-medium text-zinc-900 placeholder:text-zinc-400 shadow-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-2">Bericht</label>
                      <textarea 
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Typ hier je bericht..."
                        className="w-full bg-white px-6 py-4 rounded-xl border border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition-all font-medium text-zinc-900 placeholder:text-zinc-400 resize-none shadow-sm"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full flex justify-center items-center gap-3 px-8 py-5 bg-zinc-900 text-white font-black uppercase tracking-widest text-sm rounded-xl hover:bg-red-600 transition-colors duration-300 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed mt-4 shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span className="relative z-10">Verstuur Bericht</span>
                          <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
