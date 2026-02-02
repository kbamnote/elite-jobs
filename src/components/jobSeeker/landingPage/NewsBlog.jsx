import { ArrowRight } from "lucide-react";
import blog1 from "../../../assets/blog1.jpeg";
import blog2 from "../../../assets/blog2.jpeg";

const NewsBlog = () => {
  const posts = [
    {
      category: "Blog",
      date: "30 March 2024",
      title: "The Growing Demand for Technology and Network Professionals: A Career Path to Consider",
      image: blog1,
    },
    {
      category: "Blog",
      date: "21 March 2024",
      title: "DevOps: Powering Modern Software Delivery and Career Advancement",
      image: blog2
    },
    {
      category: "Blog",
      date: "3 March 2024",
      title: "How To Avoid The Top Six Most Common Job Interview Mistakes",
      image:
        "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="px-[10%] py-12">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-4xl font-bold">News and Blog</h2>
        <a
          href="#"
          className="transition-colors"
          style={{
            color: 'var(--color-accent)',
            fontFamily: 'var(--font-body)'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = 'var(--color-accent-dark)';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = 'var(--color-accent)';
          }}
        >
          View all
        </a>
      </div>

      <p className="text-gray-600 mb-8">
        Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed
        tristique in dolor
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-9">
        {posts.map((post, index) => (
          <div key={index} className="h-full rounded-2xl" style={{ background: 'linear-gradient(0deg, rgb(255, 238, 238) 10%, rgba(255, 255, 255, 0) 40%)' }}>
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-3">
              <div className="py-1"><span className="text-gray-500 py-2 px-3 text-xs bg-[var(--color-text-light)] text-white rounded-4xl">{post.date}</span></div>
              <h3 className="text-xl py-2 font-bold leading-tight">{post.title}</h3>
              <a
                href="https://economictimes.indiatimes.com/jobs"
                className="inline-flex items-center transition-colors"
                style={{
                  color: 'var(--color-accent)',
                  fontFamily: 'var(--font-body)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--color-accent-dark)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--color-accent)';
                }}
              >
                Read more
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsBlog;