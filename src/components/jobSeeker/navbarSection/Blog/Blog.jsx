import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users, TrendingUp, Lightbulb, Calendar, Clock } from "lucide-react";
import { blogPosts } from "../../landingPage/blogPosts";

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
        {/* <div className="mb-16">
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
        </div> */}

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
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col"
              >
                {/* Image */}
                <div className="bg-gray-200 border-2 border-dashed w-full h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt="Blog"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Top meta */}
                  <div className="flex items-center mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500 text-xs flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.date}
                    </span>
                  </div>

                  {/* Title & excerpt */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {post.heading}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {post.excerpt}
                  </p>

                  {/* Bottom aligned section */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t">
                    {/* Author */}
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-200 border-2 border-dashed rounded-full w-8 h-8 flex items-center justify-center text-gray-500">
                        A
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {post.author}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {post.date}
                        </p>
                      </div>
                    </div>

                    {/* Read more */}
                    <Link
                      to={`/blog/${post.id}`}
                      className="text-blue-600 font-medium hover:text-blue-800 transition-colors text-sm"
                    >
                      Read More →
                    </Link>
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