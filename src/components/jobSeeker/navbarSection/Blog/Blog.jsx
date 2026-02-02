import { useState } from "react";
import { BookOpen, Users, TrendingUp, Lightbulb, Calendar, Clock } from "lucide-react";
import blog1 from "../../../../assets/blog1.jpeg";
import blog2 from "../../../../assets/blog2.jpeg";
import blog3 from "../../../../assets/blog3.jpeg";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const blogCategories = [
    {
      title: "Career Development",
      description: "Advance your career with expert advice on professional growth, skill development, and leadership.",
      icon: <TrendingUp className="w-10 h-10" style={{ color: 'var(--color-accent)' }} />,
      topics: [
        "Career advancement strategies",
        "Leadership skill development",
        "Professional networking tips",
        "Workplace communication skills"
      ]
    },
    {
      title: "Education & Learning",
      description: "Stay updated with the latest educational trends, online learning opportunities, and skill-building resources.",
      icon: <BookOpen className="w-10 h-10" style={{ color: 'var(--color-accent)' }} />,
      topics: [
        "Online certification courses",
        "Upskilling and reskilling",
        "Educational technology trends",
        "Lifelong learning benefits"
      ]
    },
    {
      title: "Job Market Insights",
      description: "Get the latest information on job market trends, in-demand skills, and employment opportunities.",
      icon: <Users className="w-10 h-10" style={{ color: 'var(--color-accent)' }} />,
      topics: [
        "High-demand job sectors",
        "Remote work trends",
        "Salary benchmark reports",
        "Industry growth forecasts"
      ]
    },
    {
      title: "Success Stories",
      description: "Be inspired by real stories of professionals who transformed their careers with our platform.",
      icon: <Lightbulb className="w-10 h-10" style={{ color: 'var(--color-accent)' }} />,
      topics: [
        "Career change success stories",
        "Entrepreneurship journeys",
        "Skill development achievements",
        "Work-life balance transformations"
      ]
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Top 10 High-Paying Jobs in 2025: What You Need to Know",
      excerpt: "Discover the most lucrative career opportunities in today's competitive job market and the skills required to land them.",
      date: "November 15, 2025",
      readTime: "5 min read",
      category: "Job Market Insights",
      author: "Sarah Johnson",
      image: "career-opportunities"
    },
    {
      id: 2,
      title: "Mastering Virtual Interviews: A Complete Guide for 2025",
      excerpt: "Essential tips and techniques to excel in remote interview settings and impress hiring managers in the digital age.",
      date: "November 10, 2025",
      readTime: "7 min read",
      category: "Career Development",
      author: "Michael Chen",
      image: "virtual-interviews"
    },
    {
      id: 3,
      title: "The Future of Remote Work: Trends to Watch in 2025",
      excerpt: "Exploring how remote work is evolving and what it means for job seekers and professionals worldwide.",
      date: "November 5, 2025",
      readTime: "6 min read",
      category: "Job Market Insights",
      author: "Emma Rodriguez",
      image: "remote-work"
    },
    {
      id: 4,
      title: "10 Online Certifications That Will Boost Your Career in 2025",
      excerpt: "Invest in your future with these high-value certifications that employers are actively seeking.",
      date: "October 28, 2025",
      readTime: "8 min read",
      category: "Education & Learning",
      author: "David Wilson",
      image: "online-certifications"
    },
    {
      id: 5,
      title: "How to Negotiate Your Salary: Expert Strategies That Work",
      excerpt: "Learn proven techniques to confidently negotiate your compensation package and maximize your earning potential.",
      date: "October 22, 2025",
      readTime: "6 min read",
      category: "Career Development",
      author: "Jennifer Park",
      image: "salary-negotiation"
    },
    {
      id: 6,
      title: "The Rise of AI in the Workplace: Preparing for the Future",
      excerpt: "Understanding how artificial intelligence is transforming industries and what skills you need to stay relevant.",
      date: "October 15, 2025",
      readTime: "9 min read",
      category: "Job Market Insights",
      author: "Robert Kim",
      image: "ai-workplace"
    },
    {
      id: 7,
      title: "DevOps: Powering Modern Software Delivery and Career Advancement",
      excerpt: "In today’s fast-moving technology landscape, organizations are under constant pressure to deliver reliable software faster than ever before.",
      date: "February 02, 2026",
      readTime: "9 min read",
      category: "Career Development",
      author: "Admin",
      image: blog1
    },
    {
      id: 8,
      title: "The Growing Demand for Technology and Network Professionals: A Career Path to Consider",
      excerpt: "In today’s digital-first world, technology-driven roles have become essential to the success of modern businesses.",
      date: "February 02, 2026",
      readTime: "7 min read",
      category: "Career Development",
      author: "Admin",
      image: blog2
    },
    {
      id: 9,
      title: "Frontend Development: Shaping the Digital User Experience",
      excerpt: "In today’s digital-driven world, the way a website or application looks and feels can define a brand’s success. This is where frontend developers play a critical role.",
      date: "February 02, 2026",
      readTime: "10 min read",
      category: "Career Development",
      author: "Admin",
      image: blog3
    }
  ];

  const categories = ["All", "Career Development", "Education & Learning", "Job Market Insights", "Success Stories"];

  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  const featuredPost = blogPosts[0];

  return (
    <>
      {/* Hero Section */}
      <section className="w-full h-60 bg-gray-900 text-white flex items-center justify-center">
        <h2 className="text-5xl font-bold" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>
          Career Insights & Blog
        </h2>
      </section>

      {/* Blog Introduction */}
      <section className="py-12 px-[10%]">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Expert Advice for Your Career Journey
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Discover valuable insights, industry trends, and expert advice to accelerate your career growth and achieve your professional goals.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Article</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gray-200 border-2 border-dashed w-full h-64 md:h-80 flex items-center justify-center text-gray-500">
                Featured Blog Image
              </div>
              <div className="p-6 md:p-8 md:w-1/2">
                <div className="flex items-center mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-500 text-sm flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{featuredPost.title}</h3>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10 flex items-center justify-center text-gray-500 mr-3">
                      Author
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{featuredPost.author}</p>
                      <p className="text-gray-500 text-sm flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {featuredPost.date}
                      </p>
                    </div>
                  </div>
                  <button className="px-6 py-2 btn-accent rounded-lg font-medium transition-colors duration-300">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Explore Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogCategories.map((category, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-4 flex justify-center">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{category.title}</h3>
                <p className="text-gray-600 mb-4 text-center text-sm">{category.description}</p>
                <ul className="space-y-2">
                  {category.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-700 text-sm">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Latest Articles</h2>

            {/* Category Filter */}
            <div className="hidden md:flex space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Category Filter */}
          <div className="md:hidden mb-6">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="bg-gray-200 border-2 border-dashed w-full h-48 flex items-center justify-center overflow-hidden rounded-lg">
                  <img
                    src= {post.image}  // put your image path here
                    alt="Blog"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500 text-xs flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-full w-8 h-8 flex items-center justify-center text-gray-500 mr-2">
                        Author
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{post.author}</p>
                        <p className="text-gray-500 text-xs">{post.date}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors text-sm">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-12 px-[10%] bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-4 bg-blue-100 rounded-full mb-6">
            <BookOpen className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Stay Updated with Career Insights</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss out on the latest career advice, industry insights, and job opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
            />
            <button className="px-8 py-4 btn-accent rounded-lg font-medium transition-colors duration-300 whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Join 50,000+ professionals who receive weekly career insights
          </p>
        </div>
      </section>
    </>
  );
};

export default Blog;