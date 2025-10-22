import React from "react";
import { ArrowRight } from "lucide-react";

const NewsBlog = () => {
  const posts = [
    {
      category: "",
      date: "30 March 2024",
      title:
        "Revitalizing Workplace Morale: Innovative Tactics For Boosting Employee Engagement In 2024",
      image:
        "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      category: "Blog",
      date: "30 March 2024",
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
          className="text-teal-500 hover:text-teal-600 transition-colors"
        >
          View all
        </a>
      </div>

      <p className="text-gray-600 mb-8">
        Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed
        tristique in dolor
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, index) => (
          <div key={index} className="flex flex-col">
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[16/10]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="space-y-3">
              <span className="text-gray-500">{post.date}</span>
              <h3 className="text-2xl font-bold leading-tight">{post.title}</h3>
              <a
                href="https://economictimes.indiatimes.com/jobs"
                className="inline-flex items-center text-teal-500 hover:text-teal-600 transition-colors"
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