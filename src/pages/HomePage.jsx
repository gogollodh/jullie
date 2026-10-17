import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { GUIDES } from '../data/guides';
import { REVIEWS } from '../data/reviews';
import { ProductCard } from '../components/ProductCard';
import {
  Sparkles, ArrowRight, ShieldCheck, Heart, Leaf, PackageCheck,
  BookOpen, Star, Instagram, Compass, Droplet, Sun, CheckCircle, Gift
} from 'lucide-react';

export const HomePage = () => {
  const { navigateTo, setSelectedCategory, addToast } = useShop();

  const featuredProducts = PRODUCTS.slice(0, 8);
  const carnivorousShowcaseProducts = PRODUCTS.filter((p) => p.category === 'carnivorous').slice(0, 3);

  const benefits = [
    {
      title: 'Healthy Plants',
      desc: 'Hand-inspected, pest-free, & established specimens raised in ideal greenhouse humidity.',
      icon: Leaf
    },
    {
      title: 'Carefully Selected',
      desc: 'Sustainably cultivated cultivars & rare tissue-culture genetics for optimal longevity.',
      icon: Compass
    },
    {
      title: 'Collector-Friendly',
      desc: 'Clear beginner, intermediate, and collector difficulty ratings on every single plant.',
      icon: Star
    },
    {
      title: 'Secure Packaging',
      desc: 'Thermal eco-insulated boxes with heat packs designed for 100% safe live travel.',
      icon: PackageCheck
    },
    {
      title: 'Plant Care Guidance',
      desc: 'Comprehensive step-by-step care cards & 24/7 access to our botanical team.',
      icon: ShieldCheck
    }
  ];

  const instagramPosts = [
    { id: 1, title: 'Nepenthes Pitcher Unboxing', image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=400&q=80', tag: '@TheSapliing' },
    { id: 2, title: 'Closed Apothecary Terrarium', image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=400&q=80', tag: '@TheSapliing' },
    { id: 3, title: 'Venus Flytrap Dew Droplets', image: 'https://images.unsplash.com/photo-1620127252536-03bdfcf6d5c3?auto=format&fit=crop&w=400&q=80', tag: '@TheSapliing' },
    { id: 4, title: 'Jewel Orchid Leaves Shimmering', image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80', tag: '@TheSapliing' },
    { id: 5, title: 'Greenhouse Cultivation', image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=400&q=80', tag: '@TheSapliing' },
    { id: 6, title: 'Miniature Moss Aquascaping', image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=400&q=80', tag: '@TheSapliing' }
  ];

  return (
    <div className="space-y-24 pb-16 overflow-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-forest-950 text-beige-50 overflow-hidden pt-12 pb-20">
        {/* Background Atmospheric Photography with Dark Overlay */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
          <img
            src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=2000&q=85"
            alt="Carnivorous Pitcher Plant Botanical Hero"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          />
        </div>

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-transparent to-forest-950/90 z-0" />

        {/* Floating Animated Leaf Particles Accent */}
        <div className="absolute top-1/4 left-10 text-moss-500/30 animate-float-slow pointer-events-none z-10 hidden lg:block">
          <Leaf className="w-16 h-16 transform -rotate-45" />
        </div>
        <div className="absolute bottom-1/3 right-12 text-moss-400/20 animate-float-delayed pointer-events-none z-10 hidden lg:block">
          <Leaf className="w-20 h-20 transform rotate-12" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">

          <div className="inline-flex items-center gap-2 bg-moss-900/80 border border-moss-700/60 rounded-full px-4 py-1.5 text-xs font-mono text-moss-300 backdrop-blur-md shadow-lg animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-moss-400 animate-spin" />
            <span>Boutique Botanical Studio & Cultivation Lab</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-beige-50 leading-[1.15]">
            Discover the Extraordinary <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-beige-100 via-moss-300 to-beige-200">
              World of Plants.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-beige-300/90 font-light leading-relaxed">
            Carnivorous plants, living terrariums & exotic botanical treasures — carefully grown for curious minds and nature lovers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setSelectedCategory('all');
                navigateTo('shop');
              }}
              className="w-full sm:w-auto bg-moss-700 hover:bg-moss-600 text-beige-50 font-medium px-8 py-4 rounded-xl transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group text-sm border border-moss-500/40"
            >
              <span>Explore Plants</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateTo('builder')}
              className="w-full sm:w-auto bg-forest-900/80 hover:bg-forest-800 text-beige-100 font-medium px-8 py-4 rounded-xl border border-moss-700/50 backdrop-blur-md transition-all duration-300 text-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-moss-400" />
              <span>Build Your Terrarium</span>
            </button>
          </div>

          {/* Trust badges row */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-beige-300/70 border-t border-forest-800/60 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-moss-400" />
              <span>Double-Insulated Shipping</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-moss-400" />
              <span>Live Arrival Guarantee</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-moss-400" />
              <span>Sustainable Cultivation</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-moss-400" />
              <span>Expert Care Included</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. FEATURED CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-moss-700 font-mono text-xs uppercase tracking-widest font-semibold block mb-2">
            Botanical Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
            Curated Plant Realms
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                navigateTo('shop');
              }}
              className="group relative rounded-3xl overflow-hidden bg-forest-950 text-beige-50 shadow-lg border border-beige-300/60 cursor-pointer h-96 flex flex-col justify-end p-8 transition-transform duration-500 hover:-translate-y-1.5"
            >
              {/* Category Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />

              {/* Content */}
              <div className="relative z-10 space-y-3">
                <span className="text-xs font-mono italic text-moss-300 block">
                  "{cat.subtitle}"
                </span>
                <h3 className="font-serif text-2xl font-bold text-beige-50">
                  {cat.title}
                </h3>
                <p className="text-xs text-beige-200/80 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-moss-300 group-hover:text-beige-50 transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-moss-700 font-mono text-xs uppercase tracking-widest font-semibold block mb-2">
              Rare & Handpicked
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
              Featured Botanical Treasures
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              navigateTo('shop');
            }}
            className="text-xs font-semibold text-moss-800 hover:text-moss-600 flex items-center gap-1.5 transition-colors border-b border-moss-700/40 pb-1"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. BRAND STORY SECTION */}
      <section className="bg-beige-100/80 border-y border-beige-200/80 py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Story Text */}
            <div className="space-y-6">
              <span className="text-moss-700 font-mono text-xs uppercase tracking-widest font-semibold block">
                Our Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest-950 leading-tight">
                “More Than Plants. Tiny Worlds.”
              </h2>
              <p className="text-charcoal-800/80 text-sm sm:text-base leading-relaxed">
                The Sapliing was created for people who see plants not simply as home decoration, but as fascinating living ecosystems.
              </p>
              <p className="text-charcoal-800/80 text-sm sm:text-base leading-relaxed">
                We specialize in extraordinary flora that challenge standard gardening norms — from carnivorous Venus Flytraps and pitcher plants that capture prey to enclosed glass terrariums that recycle their own atmospheric rain. Every specimen is carefully selected and grown with sustainable, collector-grade standards.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-semibold text-forest-900">
                <div className="p-4 bg-white/80 rounded-xl border border-beige-200 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-moss-700 shrink-0" />
                  <span>Curiosity-Driven Botanicals</span>
                </div>
                <div className="p-4 bg-white/80 rounded-xl border border-beige-200 flex items-center gap-3">
                  <Leaf className="w-5 h-5 text-moss-700 shrink-0" />
                  <span>Sustainable Eco-Cultivation</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo('about')}
                  className="bg-forest-950 hover:bg-forest-900 text-beige-50 font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm inline-flex items-center gap-2"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Story Image Grid */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1000&q=80"
                  alt="Botanical Laboratory & Exotic Plant Cultivation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-forest-950 text-beige-50 p-6 rounded-2xl border border-moss-700 shadow-xl max-w-xs hidden sm:block">
                <p className="font-serif italic text-sm text-moss-300 mb-1">“Meet nature’s little predators.”</p>
                <p className="text-[11px] text-beige-200/80">Hand-grown with love in our Pacific Northwest greenhouse.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CARNIVOROUS PLANT SHOWCASE (DARK SECTION) */}
      <section className="bg-forest-950 text-beige-50 py-20 border-y border-moss-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-moss-400 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-moss-400" /> Carnivorous Collection
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-beige-50">
              “Nature Has a Wild Side.”
            </h2>
            <p className="text-beige-300/80 text-sm sm:text-base font-light">
              Explore Venus Flytraps, Nepenthes pitcher plants, and glistening Sundews that hunt for survival.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {carnivorousShowcaseProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setSelectedCategory('carnivorous');
                navigateTo('shop');
              }}
              className="bg-moss-700 hover:bg-moss-600 text-beige-50 font-semibold px-8 py-4 rounded-xl transition-all shadow-xl inline-flex items-center gap-3 text-sm"
            >
              <span>Explore Carnivorous Plants</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 6. TERRARIUM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-beige-100 via-beige-50 to-beige-100 rounded-3xl p-8 sm:p-14 border border-beige-300/80 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-moss-700 font-mono text-xs uppercase tracking-widest font-semibold block">
                Living Art Under Glass
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest-950">
                “A Little Forest, Under Glass.”
              </h2>
              <p className="text-charcoal-800/80 text-sm sm:text-base leading-relaxed">
                Bring a living miniature ecosystem into your space. Our hand-crafted apothecary terrariums feature cushion moss, miniature ferns, and dragon stones that recycle their own moisture.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setSelectedCategory('terrariums');
                    navigateTo('shop');
                  }}
                  className="bg-moss-800 hover:bg-moss-700 text-beige-50 font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm inline-flex items-center gap-2 shadow-md"
                >
                  <span>Shop Terrariums</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('builder')}
                  className="bg-white hover:bg-beige-200 text-forest-950 font-semibold px-6 py-3.5 rounded-xl border border-beige-300 transition-colors text-sm inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-moss-700" />
                  <span>Build Custom Kit</span>
                </button>
              </div>
            </div>

            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80"
                alt="Apothecary Glass Terrarium Ecosystem"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE THE SAPLIING? */}
      <section className="bg-forest-950 text-beige-100 py-20 border-y border-moss-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-moss-400 font-mono text-xs uppercase tracking-widest font-semibold block mb-2">
              The Sapliing Promise
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-beige-50">
              Why Choose The Sapliing?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {benefits.map((b, idx) => {
              const IconComp = b.icon;
              return (
                <div key={idx} className="bg-forest-900/60 p-6 rounded-2xl border border-moss-800/60 hover:border-moss-600 transition-colors space-y-3 text-center">
                  <div className="w-12 h-12 bg-moss-900 rounded-xl flex items-center justify-center mx-auto text-moss-400 border border-moss-700">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-beige-50">{b.title}</h3>
                  <p className="text-xs text-beige-300/70 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. PLANT CARE & KNOWLEDGE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-moss-700 font-mono text-xs uppercase tracking-widest font-semibold block mb-2">
              Botanical Academy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
              “Learn. Grow. Discover.”
            </h2>
          </div>
          <button
            onClick={() => navigateTo('care')}
            className="bg-moss-800 hover:bg-moss-700 text-beige-50 text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors inline-flex items-center gap-2"
          >
            <span>Explore Plant Care</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GUIDES.map((guide) => (
            <div
              key={guide.id}
              onClick={() => navigateTo('care', guide.id)}
              className="group bg-white rounded-2xl border border-beige-200 overflow-hidden shadow-sm hover:shadow-xl cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="aspect-[16/10] overflow-hidden bg-beige-100">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-mono text-moss-700 uppercase font-bold block mb-1">
                    {guide.category} • {guide.readTime}
                  </span>
                  <h3 className="font-serif text-base font-bold text-forest-950 group-hover:text-moss-700 transition-colors line-clamp-2">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-charcoal-800/70 line-clamp-2 mt-1">
                    {guide.summary}
                  </p>
                </div>
                <span className="text-xs font-semibold text-moss-800 flex items-center gap-1">
                  Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. CUSTOMER REVIEWS */}
      <section className="bg-beige-100/90 py-20 border-y border-beige-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-moss-700 font-mono text-xs uppercase tracking-widest font-semibold block mb-2">
              Verified Collector Feedback
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
              “Growing Happiness, One Plant at a Time.”
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((rev) => (
              <div key={rev.id} className="bg-white p-8 rounded-3xl border border-beige-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-forest-950">"{rev.title}"</h3>
                  <p className="text-xs text-charcoal-800/80 leading-relaxed italic">"{rev.text}"</p>
                </div>

                <div className="pt-4 border-t border-beige-200/80 flex items-center gap-3">
                  <img src={rev.image} alt="" className="w-10 h-10 rounded-full object-cover border border-moss-700" />
                  <div>
                    <h4 className="text-xs font-bold text-forest-950">{rev.author}</h4>
                    <span className="text-[10px] text-charcoal-800/60 block">{rev.role} • {rev.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. INSTAGRAM / SOCIAL GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-moss-700 font-mono text-xs uppercase tracking-widest font-semibold block mb-2">
            #TheSapliing Greenhouse
          </span>
          <h2 className="font-serif text-3xl font-bold text-forest-950 mb-3">
            Join Our Botanical Community
          </h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-moss-800 hover:text-moss-600 bg-moss-100 px-4 py-2 rounded-full"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @TheSapliing</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <div key={post.id} className="group relative aspect-square rounded-2xl overflow-hidden bg-forest-950 cursor-pointer shadow-md">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90" />
              <div className="absolute inset-0 bg-forest-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center text-white">
                <Instagram className="w-6 h-6 text-moss-300 mb-1" />
                <span className="text-[10px] font-bold">{post.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
