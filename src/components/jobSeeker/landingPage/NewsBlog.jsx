import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "./blogPosts";

const NewsBlog = () => {
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
    </div>
  );
};

export default NewsBlog;
