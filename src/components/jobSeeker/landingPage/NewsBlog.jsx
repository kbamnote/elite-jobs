import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { blogPosts } from "./blogPosts";

const NewsBlog = () => {
  const navigate = useNavigate();
  return (
    <div className="px-[10%] py-12">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-4xl font-bold">News and Blog</h2>

        <Link
          to="/blog"
          className="text-[var(--color-accent)] transition-colors"
        >
          View all
        </Link>
      </div>

      <p className="text-gray-600 mb-8">
        Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed
        tristique in dolor
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-9">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="h-full rounded-2xl"
            style={{
              background:
                "linear-gradient(0deg, rgb(255, 238, 238) 10%, rgba(255, 255, 255, 0) 40%)",
            }}
          >
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-3">
              <span className="text-xs text-white bg-[var(--color-text-light)] px-3 py-1 rounded-full">
                {post.date}
              </span>

              <h3 className="text-xl py-2 font-bold leading-tight">
                {post.heading}
              </h3>

              <Link
                to={`/blog/${post.id}`}
                className="inline-flex items-center gap-2 text-[var(--color-accent)]"
              >
                Read more
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* New Blog Categories Section */}
      <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--color-primary)' }}>Explore by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Career Advice", icon: "🎯", count: "24" },
            { name: "Industry Trends", icon: "📈", count: "18" },
            { name: "Skill Development", icon: "🎓", count: "32" },
            { name: "Workplace Culture", icon: "🏢", count: "15" }
          ].map((category, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl text-center hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
              onClick={() => navigate(`/blog?category=${encodeURIComponent(category.name)}`)}
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h4 className="text-lg font-semibold mb-1">{category.name}</h4>
              <p className="text-sm text-gray-600">{category.count} articles</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* New Newsletter Section */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-12 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-4">Stay Updated with Career Insights</h3>
            <p className="text-xl mb-6">Get the latest job market trends, career advice, and industry insights delivered to your inbox weekly.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg text-gray-800 flex-grow max-w-md"
              />
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-48 h-48 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-2">📰</div>
                  <div className="text-2xl font-bold">Weekly</div>
                  <div className="text-lg">Newsletter</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-400 bg-opacity-30 rounded-full flex items-center justify-center">
                <div className="text-2xl">✅</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsBlog;
