"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Download,
  Upload,
  Sparkles,
  ArrowRight,
  Type,
  Image,
  Video,
  Star,
  Copy,
  Check,
  ExternalLink,
  Zap,
  TrendingUp,
  ChevronDown,
  Menu,
  X,
  FileText,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ─── floating particles ─── */
function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 15,
    duration: Math.random() * 10 + 10,
    color: i % 3 === 0 ? "#ff2d95" : i % 3 === 1 ? "#00f0ff" : "#b829ff",
  }));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `float ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── categories data ─── */
const categories = [
  {
    id: "text-to-text",
    label: "Text → Text",
    description: "ChatGPT, Claude, Gemini & more",
    icon: Type,
    color: "#ff2d95",
    count: 1240,
    gradient: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
    iconBg: "bg-pink-500/20",
  },
  {
    id: "text-to-image",
    label: "Text → Image",
    description: "Midjourney, DALL-E, Stable Diffusion",
    icon: Image,
    color: "#00f0ff",
    count: 980,
    gradient: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/30",
    iconBg: "bg-cyan-500/20",
  },
  {
    id: "image-to-image",
    label: "Image → Image",
    description: "Img2Img, ControlNet, Inpainting",
    icon: Eye,
    color: "#b829ff",
    count: 640,
    gradient: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
    iconBg: "bg-purple-500/20",
  },
  {
    id: "text-to-video",
    label: "Text → Video",
    description: "Sora, Runway, Pika, Kling",
    icon: Video,
    color: "#00ff88",
    count: 320,
    gradient: "from-emerald-500/20 to-green-500/20",
    borderColor: "border-emerald-500/30",
    iconBg: "bg-emerald-500/20",
  },
  {
    id: "video-to-video",
    label: "Video → Video",
    description: "Video style transfer & enhancement",
    icon: Zap,
    color: "#ff8800",
    count: 210,
    gradient: "from-orange-500/20 to-amber-500/20",
    borderColor: "border-orange-500/30",
    iconBg: "bg-orange-500/20",
  },
];

/* ─── sample prompts ─── */
const latestPrompts = [
  {
    id: 1,
    title: "Hyperrealistic Cyberpunk Portrait",
    category: "Text → Image",
    categoryColor: "#00f0ff",
    description:
      "Create a stunning cyberpunk portrait with neon lighting, rain-soaked streets, and futuristic fashion. Perfect for character design concepts.",
    downloads: 2847,
    rating: 4.9,
    author: "NeonArtist",
    tags: ["cyberpunk", "portrait", "neon", "character design"],
  },
  {
    id: 2,
    title: "Professional Email Writer Pro",
    category: "Text → Text",
    categoryColor: "#ff2d95",
    description:
      "Generate polished, context-aware professional emails for any business scenario. Includes follow-ups, proposals, and client communication.",
    downloads: 5123,
    rating: 4.8,
    author: "BizPromptKing",
    tags: ["email", "business", "professional", "communication"],
  },
  {
    id: 3,
    title: "Cinematic B-Roll Generator",
    category: "Text → Video",
    categoryColor: "#00ff88",
    description:
      "Create cinematic b-roll footage descriptions for any topic. Generates detailed scene descriptions optimized for AI video generation tools.",
    downloads: 1890,
    rating: 4.7,
    author: "CineMaster",
    tags: ["cinematic", "b-roll", "video", "filmmaking"],
  },
  {
    id: 4,
    title: "Anime Character Style Transfer",
    category: "Image → Image",
    categoryColor: "#b829ff",
    description:
      "Transform any photo into stunning anime-style artwork while preserving facial features and composition. Multiple anime sub-styles supported.",
    downloads: 3456,
    rating: 4.9,
    author: "WeebPrompter",
    tags: ["anime", "style transfer", "character", "illustration"],
  },
  {
    id: 5,
    title: "SEO Content Machine",
    category: "Text → Text",
    categoryColor: "#ff2d95",
    description:
      "Generate fully optimized, human-readable SEO articles with proper keyword density, headings, meta descriptions, and internal linking suggestions.",
    downloads: 4210,
    rating: 4.6,
    author: "SEOWizard",
    tags: ["SEO", "content", "marketing", "blogging"],
  },
  {
    id: 6,
    title: "Product Photography Wizard",
    category: "Text → Image",
    categoryColor: "#00f0ff",
    description:
      "Create professional product photography with perfect lighting, shadows, and studio-quality backgrounds for e-commerce listings.",
    downloads: 2678,
    rating: 4.8,
    author: "StudioAI",
    tags: ["product", "photography", "e-commerce", "studio"],
  },
  {
    id: 7,
    title: "Video Style Morph",
    category: "Video → Video",
    categoryColor: "#ff8800",
    description:
      "Transform existing video clips into different artistic styles including watercolor, oil painting, sketch, and pixel art with smooth transitions.",
    downloads: 1230,
    rating: 4.5,
    author: "MotionLab",
    tags: ["video", "style transfer", "artistic", "animation"],
  },
  {
    id: 8,
    title: "UI/UX Design System Generator",
    category: "Text → Image",
    categoryColor: "#00f0ff",
    description:
      "Generate complete UI component sets with consistent design language, color palettes, and typography. Perfect for rapid prototyping.",
    downloads: 3890,
    rating: 4.9,
    author: "DesignPilot",
    tags: ["UI", "UX", "design system", "components"],
  },
];

/* ─── main page ─── */
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadCategory, setUploadCategory] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredPrompts = latestPrompts.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.includes(searchQuery.toLowerCase()));
    const matchesCategory =
      !activeCategory ||
      p.category === categories.find((c) => c.id === activeCategory)?.label;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (id: number) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalPrompts = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className="min-h-screen flex flex-col relative scanline cyber-grid">
      <FloatingParticles />

      {/* ─── NAVBAR ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a1a]/90 backdrop-blur-xl border-b border-[rgba(255,45,149,0.2)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#ff2d95] to-[#b829ff] flex items-center justify-center font-bold text-white text-sm sm:text-lg glow-pink">
                A
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-[#ff2d95] via-[#b829ff] to-[#00f0ff] bg-clip-text text-transparent">
                Agtalist
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#categories"
                className="text-sm text-[#8888aa] hover:text-[#00f0ff] transition-colors"
              >
                Categories
              </a>
              <a
                href="#prompts"
                className="text-sm text-[#8888aa] hover:text-[#00f0ff] transition-colors"
              >
                Latest Prompts
              </a>
              <a
                href="#stats"
                className="text-sm text-[#8888aa] hover:text-[#00f0ff] transition-colors"
              >
                Stats
              </a>
            </div>

            {/* Upload CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-[#ff2d95] to-[#b829ff] hover:from-[#ff1a80] hover:to-[#a020ff] text-white border-0 font-semibold glow-pink transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,45,149,0.4)]">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Prompt
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#0f0f2e] border border-[rgba(255,45,149,0.3)] text-[#e0e0ff] max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold bg-gradient-to-r from-[#ff2d95] to-[#00f0ff] bg-clip-text text-transparent">
                      Share Your Prompt
                    </DialogTitle>
                    <DialogDescription className="text-[#8888aa]">
                      Help the community grow by sharing your best AI prompts.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <div>
                      <Label className="text-[#8888aa] mb-1.5 block">
                        Prompt Title
                      </Label>
                      <Input
                        placeholder="e.g. Cinematic Landscape Generator"
                        className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,45,149,0.2)] text-[#e0e0ff] placeholder:text-[#555577] focus:border-[#ff2d95]"
                      />
                    </div>
                    <div>
                      <Label className="text-[#8888aa] mb-1.5 block">
                        Category
                      </Label>
                      <Select
                        value={uploadCategory}
                        onValueChange={setUploadCategory}
                      >
                        <SelectTrigger className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,45,149,0.2)] text-[#e0e0ff]">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0f0f2e] border-[rgba(255,45,149,0.3)]">
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-[#8888aa] mb-1.5 block">
                        Prompt Content
                      </Label>
                      <Textarea
                        placeholder="Paste your prompt here..."
                        className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,45,149,0.2)] text-[#e0e0ff] placeholder:text-[#555577] focus:border-[#ff2d95] min-h-[120px] resize-none"
                      />
                    </div>
                    <div>
                      <Label className="text-[#8888aa] mb-1.5 block">
                        Tags (comma separated)
                      </Label>
                      <Input
                        placeholder="e.g. cyberpunk, neon, portrait"
                        className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,45,149,0.2)] text-[#e0e0ff] placeholder:text-[#555577] focus:border-[#ff2d95]"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        className="border-[rgba(255,45,149,0.3)] text-[#8888aa] hover:text-[#e0e0ff]"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button className="bg-gradient-to-r from-[#ff2d95] to-[#b829ff] hover:from-[#ff1a80] hover:to-[#a020ff] text-white border-0">
                      <Upload className="w-4 h-4 mr-2" />
                      Submit Prompt
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-[#8888aa] hover:text-[#00f0ff] transition-colors p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0a0a1a]/95 backdrop-blur-xl border-b border-[rgba(255,45,149,0.2)]"
            >
              <div className="px-4 py-4 space-y-3">
                <a
                  href="#categories"
                  className="block text-[#8888aa] hover:text-[#00f0ff] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Categories
                </a>
                <a
                  href="#prompts"
                  className="block text-[#8888aa] hover:text-[#00f0ff] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Latest Prompts
                </a>
                <a
                  href="#stats"
                  className="block text-[#8888aa] hover:text-[#00f0ff] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Stats
                </a>
                <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-[#ff2d95] to-[#b829ff] text-white border-0 mt-2">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Prompt
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#0f0f2e] border border-[rgba(255,45,149,0.3)] text-[#e0e0ff]">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold bg-gradient-to-r from-[#ff2d95] to-[#00f0ff] bg-clip-text text-transparent">
                        Share Your Prompt
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <div>
                        <Label className="text-[#8888aa] mb-1.5 block">
                          Prompt Title
                        </Label>
                        <Input
                          placeholder="e.g. Cinematic Landscape Generator"
                          className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,45,149,0.2)] text-[#e0e0ff] placeholder:text-[#555577]"
                        />
                      </div>
                      <div>
                        <Label className="text-[#8888aa] mb-1.5 block">
                          Category
                        </Label>
                        <Select
                          value={uploadCategory}
                          onValueChange={setUploadCategory}
                        >
                          <SelectTrigger className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,45,149,0.2)] text-[#e0e0ff]">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0f0f2e] border-[rgba(255,45,149,0.3)]">
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-[#8888aa] mb-1.5 block">
                          Prompt Content
                        </Label>
                        <Textarea
                          placeholder="Paste your prompt here..."
                          className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,45,149,0.2)] text-[#e0e0ff] placeholder:text-[#555577] min-h-[120px] resize-none"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button className="bg-gradient-to-r from-[#ff2d95] to-[#b829ff] text-white border-0">
                        <Upload className="w-4 h-4 mr-2" />
                        Submit
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Hero background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/cyber-girl-hero.png"
            alt="Cyberpunk hero background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a]/60 via-[#0a0a1a]/80 to-[#0a0a1a]" />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(255,45,149,0.3)] bg-[rgba(255,45,149,0.1)] mb-6 sm:mb-8"
            >
              <Sparkles className="w-4 h-4 text-[#ff2d95] animate-pulse-neon" />
              <span className="text-xs sm:text-sm text-[#ff2d95] font-medium tracking-wide uppercase">
                {totalPrompts.toLocaleString()}+ AI Prompts Available
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-4 sm:mb-6">
              <span className="block text-white">Discover the Best</span>
              <span className="block bg-gradient-to-r from-[#ff2d95] via-[#b829ff] to-[#00f0ff] bg-clip-text text-transparent text-glow-pink">
                AI Prompts
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-[#8888aa] max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              The ultimate prompt marketplace. Find, download, and share
              high-quality prompts for every AI tool — from ChatGPT to
              Midjourney to Sora.
            </p>

            {/* Search box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="max-w-2xl mx-auto mb-8 sm:mb-12"
            >
              <div className="gradient-border">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 sm:left-5 w-5 h-5 text-[#8888aa]" />
                  <Input
                    type="text"
                    placeholder="Search prompts... e.g. 'cyberpunk portrait', 'SEO article'"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 sm:h-14 md:h-16 bg-transparent border-0 text-base sm:text-lg text-[#e0e0ff] placeholder:text-[#555577] pl-12 sm:pl-14 pr-32 sm:pr-36 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl"
                  />
                  <Button className="absolute right-2 sm:right-3 bg-gradient-to-r from-[#ff2d95] to-[#b829ff] hover:from-[#ff1a80] hover:to-[#a020ff] text-white border-0 h-9 sm:h-10 md:h-12 px-4 sm:px-6 font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,45,149,0.4)]">
                    <Search className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Search</span>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12 text-center"
              id="stats"
            >
              {[
                { label: "Total Prompts", value: `${totalPrompts.toLocaleString()}+` },
                { label: "Categories", value: "5" },
                { label: "Downloads", value: "25K+" },
                { label: "Contributors", value: "500+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#8888aa] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex flex-col items-center gap-2 cursor-pointer"
              onClick={() =>
                document
                  .getElementById("categories")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="text-xs text-[#8888aa]">Explore</span>
              <ChevronDown className="w-5 h-5 text-[#ff2d95]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section id="categories" className="relative z-10 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Browse by{" "}
              <span className="bg-gradient-to-r from-[#ff2d95] to-[#00f0ff] bg-clip-text text-transparent">
                Category
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#8888aa] max-w-xl mx-auto">
              Find the perfect prompt for your AI workflow across five powerful
              categories.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <button
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === cat.id ? null : cat.id
                    )
                  }
                  className={`category-card w-full p-5 sm:p-6 rounded-2xl border text-left cursor-pointer group ${
                    activeCategory === cat.id
                      ? `border-[${cat.color}] bg-gradient-to-br ${cat.gradient}`
                      : `border-[rgba(255,255,255,0.06)] bg-[rgba(15,15,40,0.6)]`
                  }`}
                  style={
                    activeCategory === cat.id
                      ? { borderColor: cat.color }
                      : undefined
                  }
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${cat.iconBg} flex items-center justify-center mb-3 sm:mb-4 transition-transform group-hover:scale-110`}
                  >
                    <cat.icon
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      style={{ color: cat.color }}
                    />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-[#8888aa] mb-3 leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-[rgba(255,255,255,0.05)] text-[#8888aa] border-0"
                    >
                      {cat.count.toLocaleString()} prompts
                    </Badge>
                    <ArrowRight
                      className="w-3 h-3 ml-auto text-[#555577] group-hover:text-white transition-colors"
                    />
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          {activeCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center"
            >
              <Button
                variant="ghost"
                onClick={() => setActiveCategory(null)}
                className="text-[#8888aa] hover:text-[#00f0ff]"
              >
                Clear filter <X className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── LATEST PROMPTS ─── */}
      <section id="prompts" className="relative z-10 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(0,240,255,0.3)] bg-[rgba(0,240,255,0.05)] mb-4">
              <TrendingUp className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span className="text-xs text-[#00f0ff] font-medium uppercase tracking-wide">
                Trending Now
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Latest{" "}
              <span className="bg-gradient-to-r from-[#00f0ff] to-[#b829ff] bg-clip-text text-transparent">
                Prompts
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#8888aa] max-w-xl mx-auto">
              Discover the most popular and highest-rated prompts from our
              community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPrompts.map((prompt, index) => (
                <motion.div
                  key={prompt.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                >
                  <div className="prompt-card h-full p-5 sm:p-6 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(15,15,40,0.6)] flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <Badge
                        className="text-xs border-0 font-medium px-2.5 py-0.5"
                        style={{
                          backgroundColor: `${prompt.categoryColor}15`,
                          color: prompt.categoryColor,
                        }}
                      >
                        {prompt.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-[#ffaa00]">
                        <Star className="w-3.5 h-3.5 fill-[#ffaa00]" />
                        <span className="text-xs font-medium">
                          {prompt.rating}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 line-clamp-1">
                      {prompt.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#8888aa] mb-4 line-clamp-2 leading-relaxed flex-1">
                      {prompt.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {prompt.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.04)] text-[#8888aa] border border-[rgba(255,255,255,0.06)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.06)]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#ff2d95] to-[#b829ff] flex items-center justify-center text-[8px] text-white font-bold">
                          {prompt.author[0]}
                        </div>
                        <span className="text-xs text-[#8888aa]">
                          {prompt.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(prompt.id)}
                          className="p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                          aria-label="Copy prompt"
                        >
                          {copiedId === prompt.id ? (
                            <Check className="w-3.5 h-3.5 text-[#00ff88]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-[#8888aa]" />
                          )}
                        </button>
                        <button
                          className="flex items-center gap-1 text-[#00f0ff] hover:text-[#00d4e0] transition-colors text-xs font-medium"
                          aria-label="Download prompt"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">
                            {prompt.downloads.toLocaleString()}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredPrompts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FileText className="w-12 h-12 text-[#555577] mx-auto mb-4" />
              <p className="text-[#8888aa] text-lg">
                No prompts found matching your search.
              </p>
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory(null);
                }}
                className="mt-4 text-[#ff2d95] hover:text-[#ff1a80]"
              >
                Clear all filters
              </Button>
            </motion.div>
          )}

          {/* View All CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10 sm:mt-14"
          >
            <Button
              size="lg"
              className="bg-transparent border-2 border-[rgba(255,45,149,0.4)] text-[#ff2d95] hover:bg-[rgba(255,45,149,0.1)] hover:border-[#ff2d95] transition-all duration-300 px-8 py-6 text-base font-semibold group"
            >
              View All Prompts
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="relative z-10 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="gradient-border p-8 sm:p-12 md:p-16 rounded-3xl"
          >
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#ff2d95] mx-auto mb-4 sm:mb-6 animate-pulse-neon" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Got an Amazing Prompt?
            </h2>
            <p className="text-sm sm:text-base text-[#8888aa] max-w-lg mx-auto mb-6 sm:mb-8 leading-relaxed">
              Share your best AI prompts with the community. Help others create
              incredible AI-generated content and get recognized for your
              expertise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#ff2d95] to-[#b829ff] hover:from-[#ff1a80] hover:to-[#a020ff] text-white border-0 font-semibold px-8 py-6 text-base glow-pink transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,45,149,0.4)]"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Your Prompt
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#0f0f2e] border border-[rgba(255,45,149,0.3)] text-[#e0e0ff] max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold bg-gradient-to-r from-[#ff2d95] to-[#00f0ff] bg-clip-text text-transparent">
                      Share Your Prompt
                    </DialogTitle>
                    <DialogDescription className="text-[#8888aa]">
                      Help the community grow by sharing your best AI prompts.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <div>
                      <Label className="text-[#8888aa] mb-1.5 block">
                        Prompt Title
                      </Label>
                      <Input
                        placeholder="e.g. Cinematic Landscape Generator"
                        className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,45,149,0.2)] text-[#e0e0ff] placeholder:text-[#555577]"
                      />
                    </div>
                    <div>
                      <Label className="text-[#8888aa] mb-1.5 block">
                        Category
                      </Label>
                      <Select
                        value={uploadCategory}
                        onValueChange={setUploadCategory}
                      >
                        <SelectTrigger className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,45,149,0.2)] text-[#e0e0ff]">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0f0f2e] border-[rgba(255,45,149,0.3)]">
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-[#8888aa] mb-1.5 block">
                        Prompt Content
                      </Label>
                      <Textarea
                        placeholder="Paste your prompt here..."
                        className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,45,149,0.2)] text-[#e0e0ff] placeholder:text-[#555577] min-h-[120px] resize-none"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button className="bg-gradient-to-r from-[#ff2d95] to-[#b829ff] text-white border-0">
                      <Upload className="w-4 h-4 mr-2" />
                      Submit Prompt
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                size="lg"
                variant="ghost"
                className="text-[#8888aa] hover:text-[#00f0ff] px-6 py-6 text-base"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Browse Guidelines
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-[rgba(255,45,149,0.15)] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff2d95] to-[#b829ff] flex items-center justify-center font-bold text-white text-sm">
                  A
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#ff2d95] via-[#b829ff] to-[#00f0ff] bg-clip-text text-transparent">
                  Agtalist
                </span>
              </div>
              <p className="text-sm text-[#8888aa] leading-relaxed max-w-xs">
                The ultimate AI prompt marketplace. Discover, download, and share
                the best prompts for every AI tool.
              </p>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                Categories
              </h4>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <a
                      href="#categories"
                      className="text-sm text-[#8888aa] hover:text-[#00f0ff] transition-colors"
                    >
                      {cat.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-[#8888aa] hover:text-[#00f0ff] transition-colors"
                  >
                    Submit a Prompt
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-[#8888aa] hover:text-[#00f0ff] transition-colors"
                  >
                    Prompt Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-[#8888aa] hover:text-[#00f0ff] transition-colors"
                  >
                    API Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-[#8888aa] hover:text-[#00f0ff] transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                Connect
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-[#8888aa] hover:text-[#00f0ff] transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-[#8888aa] hover:text-[#00f0ff] transition-colors"
                  >
                    Twitter / X
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-[#8888aa] hover:text-[#00f0ff] transition-colors"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@agtalist.net"
                    className="text-sm text-[#8888aa] hover:text-[#00f0ff] transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 sm:pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[#555577]">
              &copy; {new Date().getFullYear()} Agtalist. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-xs text-[#555577] hover:text-[#8888aa] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs text-[#555577] hover:text-[#8888aa] transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}