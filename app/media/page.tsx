import Image from 'next/image';
import Link from 'next/link';

export default function Media() {
  const filmProjects = [
    {
      id: 1,
      title: "Action Blockbuster",
      year: "2024",
      role: "Vehicle Design & Build",
      description: "Featured car for high-speed chase sequences",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Luxury Brand Commercial",
      year: "2024",
      role: "Cinematic Vehicle",
      description: "Star vehicle for premium brand campaign",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Music Video Production",
      year: "2023",
      role: "Custom Build",
      description: "Featured vehicle in high-profile music video",
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop"
    }
  ];

  const features = [
    {
      id: 1,
      publication: "Auto Magazine",
      title: "The Art of Transformation",
      date: "March 2024",
      excerpt: "XENEX redefines what's possible in automotive customization..."
    },
    {
      id: 2,
      publication: "Cinema Weekly",
      title: "Cars That Own the Screen",
      date: "February 2024",
      excerpt: "How <span className=\"text-xenex-red\">XENEX</span> creates vehicles that become characters in their own right..."
    },
    {
      id: 3,
      publication: "Design Today",
      title: "Where Craft Meets Character",
      date: "January 2024",
      excerpt: "Exploring the philosophy behind <span className=\"text-xenex-red\">XENEX</span>'s unique approach..."
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-xenex-dark">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&h=1080&fit=crop"
            alt="Media & Press"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-xenex-dark via-xenex-dark/80 to-xenex-dark" />
        </div>
        <div className="relative z-20 text-center px-4 md:px-6">
          <h1 className="text-5xl md:text-7xl font-bold font-display text-white mb-4">
            Media / <span className="text-xenex-red">Press</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80">
            Recognition & Credibility
          </p>
        </div>
      </section>

      {/* Film Projects */}
      <section className="py-20 px-4 md:px-6 bg-xenex-black">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 font-display text-white text-center">
            Film <span className="text-xenex-red">Projects</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filmProjects.map((project, index) => (
              <div key={project.id} className="group animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-card mb-4 group-hover:shadow-red-glow transition-all duration-300">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 border-2 border-xenex-red/30 group-hover:border-xenex-red transition-colors duration-300 rounded-xl" />
                </div>
                <div className="bg-xenex-gray p-6 rounded-xl border border-xenex-red/20">
                  <span className="text-xenex-red text-sm font-bold">{project.year}</span>
                  <h3 className="text-2xl font-bold mb-2 text-white font-display mt-2 group-hover:text-xenex-red transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-2">{project.role}</p>
                  <p className="text-white/80">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborations */}
      <section className="py-20 px-4 md:px-6 bg-xenex-dark">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 font-display text-white text-center">
            Industry <span className="text-xenex-red">Trust</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {['Production House A', 'Brand Agency B', 'Film Studio C', 'Media Company D'].map((name, i) => (
              <div key={i} className="text-center p-6 bg-xenex-gray rounded-xl border border-xenex-red/20 card-hover">
                <div className="text-4xl mb-3">🎬</div>
                <p className="text-white/70 text-sm font-semibold">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 md:px-6 bg-xenex-black">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 font-display text-white text-center">
            Press <span className="text-xenex-red">Features</span>
          </h2>
          
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={feature.id} className="bg-xenex-gray p-6 rounded-xl border-l-4 border-xenex-red shadow-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <span className="text-xenex-red text-sm font-bold">{feature.publication}</span>
                  <span className="text-white/50 text-sm">{feature.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-display">
                  {feature.title}
                </h3>
                <p className="text-white/70">
                  {feature.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Reach */}
      <section className="py-20 px-4 md:px-6 bg-xenex-dark">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display text-white">
            Social <span className="text-xenex-red">Reach</span>
          </h2>
          <p className="text-6xl font-bold text-xenex-red mb-4 font-display">
            4K+
          </p>
          <p className="text-white/70 text-lg mb-8">
            Followers across platforms, proof of our impact and community
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-white/70 hover:text-xenex-red transition-colors duration-300 text-3xl hover:scale-110 transform">
              📷
            </a>
            <a href="#" className="text-white/70 hover:text-xenex-red transition-colors duration-300 text-3xl hover:scale-110 transform">
              🎬
            </a>
            <a href="#" className="text-white/70 hover:text-xenex-red transition-colors duration-300 text-3xl hover:scale-110 transform">
              📘
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
