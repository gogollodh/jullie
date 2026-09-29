import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage = () => {
  const { addToast } = useShop();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Message received! Our botanical team will respond within 24 hours. 🌿');
  };

  return (
    <div className="bg-beige-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-moss-700 font-mono text-xs uppercase tracking-widest font-semibold block">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest-950">
            Contact The Greenhouse
          </h1>
          <p className="text-charcoal-800/80 text-sm sm:text-base">
            Have questions regarding flytrap dormancy, terrarium building, or custom corporate plant drops?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Contact Form */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-beige-200 shadow-sm space-y-6">
            <h2 className="font-serif text-2xl font-bold text-forest-950">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="bg-moss-50 border border-moss-300 p-6 rounded-2xl text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-moss-700 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-forest-950">Thank You!</h3>
                <p className="text-xs text-charcoal-800/80">
                  Your inquiry has been logged in our greenhouse queue.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Your Full Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Clara Sterling"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-beige-50 border border-beige-300 rounded-xl px-4 py-3 text-charcoal-900 focus:outline-none focus:border-moss-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Email Address:</label>
                  <input
                    type="email"
                    required
                    placeholder="clara@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-beige-50 border border-beige-300 rounded-xl px-4 py-3 text-charcoal-900 focus:outline-none focus:border-moss-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Subject:</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-beige-50 border border-beige-300 rounded-xl px-4 py-3 text-charcoal-900 focus:outline-none focus:border-moss-600"
                  >
                    <option value="">General Inquiry</option>
                    <option value="care">Plant Care Advice</option>
                    <option value="order">Order Status / Shipping</option>
                    <option value="custom">Custom Terrarium Event</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Your Message:</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="How can our botanists assist you?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-beige-50 border border-beige-300 rounded-xl px-4 py-3 text-charcoal-900 focus:outline-none focus:border-moss-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-moss-800 hover:bg-moss-700 text-beige-50 font-semibold py-3.5 rounded-xl transition-colors text-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Info Card */}
          <div className="bg-forest-950 text-beige-50 p-8 sm:p-10 rounded-3xl border border-moss-800 shadow-xl space-y-8">
            <div>
              <span className="text-moss-400 font-mono text-xs uppercase tracking-widest font-semibold block mb-1">
                Greenhouse Location
              </span>
              <h2 className="font-serif text-3xl font-bold text-beige-50 mb-3">
                Visit The Sapliing Studio
              </h2>
              <p className="text-xs text-beige-300/80 leading-relaxed">
                Our greenhouse laboratory in the Pacific Northwest welcomes plant collectors for weekend workshops and rare specimen viewing.
              </p>
            </div>

            <div className="space-y-4 text-xs text-beige-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-moss-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold block text-beige-50">Address</span>
                  <span>482 Greenhouse Way, Botanical District, Pacific NW 98101</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-moss-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold block text-beige-50">Studio Hours</span>
                  <span>Tuesday - Sunday: 10:00 AM - 6:00 PM PST</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-moss-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold block text-beige-50">Email Support</span>
                  <span>hello@thesapliing.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-moss-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold block text-beige-50">Phone</span>
                  <span>+1 (800) 555-PLNT</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-moss-800/80">
              <div className="bg-moss-900/60 p-4 rounded-2xl border border-moss-700 text-xs text-moss-300">
                🌱 <b>Live Arrival Guarantee:</b> If you are inquiring about a shipment, please attach photo verification of the plant box.
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
