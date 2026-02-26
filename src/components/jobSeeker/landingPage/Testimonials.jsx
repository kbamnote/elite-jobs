import { Star, Quote } from "lucide-react";
import shobhit from '../../../assets/LinkedinProfile/shobhit.jpg'
import pranay from '../../../assets/LinkedinProfile/pranay.jpg'
import sourabh from '../../../assets/LinkedinProfile/sourabh.jpg'

const Testimonials = () => {
  const testimonials = [
    {
      rating: 5,
      title: "Amazing services",
      content:
        "I was struggling to find a job in my field, but this website made the process so much easier. The search filters are great, and I was able to find relevant openings quickly. I landed my dream job within a month! Thank you! - Sarah J., Marketing Professional",
      author: "Shobhit Gajbe",
      role: "Happy Client",
      image: shobhit,
    },
    {
      rating: 5,
      title: "Everything simple",
      content:
        "The resume builder tool was a lifesaver! It helped me create a professional resume that highlighted my skills and experience. I received so much more interest from employers after using it. - David L., Software Engineer",
      author: "Pranay Charde",
      role: "Happy Client",
      image: pranay,
    },
    {
      rating: 5,
      title: "Awesome, thank you!",
      content:
        "The resources and articles on the site were incredibly helpful. I learned so much about interview techniques and job search strategies. It gave me the confidence I needed to succeed. - John K., Recent Graduate",
      author: "Saurabh Bante",
      role: "Happy Client",
      image: sourabh,
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            What Our Customers Say
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Hear from job seekers who found success using our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 relative border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 sm:w-6 sm:h-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800" style={{ fontFamily: 'var(--font-heading)' }}>
                {testimonial.title}
              </h3>

              {/* Content */}
              <p className="text-gray-600 italic mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base flex-grow" style={{ fontFamily: 'var(--font-body)' }}>
                {testimonial.content}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-300 object-cover"
                />
                <div>
                  <div className="font-semibold text-base sm:text-lg text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-500" style={{ fontFamily: 'var(--font-body)' }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>

              {/* Quote Icon */}
              <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 opacity-30" style={{ color: 'var(--color-accent)' }}>
                <Quote className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
            </div>
          ))}
        </div>
        
        {/* New Success Stories Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--color-primary)' }}>Success Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--color-accent)' }}>500+</div>
              <h4 className="text-xl font-semibold mb-2">Jobs Secured</h4>
              <p className="text-gray-600">Professionals found their dream jobs this month</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--color-accent)' }}>95%</div>
              <h4 className="text-xl font-semibold mb-2">Satisfaction Rate</h4>
              <p className="text-gray-600">Users rate our service as excellent</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--color-accent)' }}>24h</div>
              <h4 className="text-xl font-semibold mb-2">Average Response</h4>
              <p className="text-gray-600">Time from application to interview</p>
            </div>
          </div>
        </div>
        
        {/* New Community Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--color-primary)' }}>Join Our Community</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6">
                Connect with thousands of professionals, get career advice, and stay updated with industry trends. 
                Our community is here to support your career journey every step of the way.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Career Advice</span>
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">Networking</span>
                <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Mentorship</span>
                <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">Resources</span>
              </div>
              <button className="px-6 py-3 btn-accent rounded-lg font-semibold shadow-md hover:shadow-lg transition-all">
                Join Community
              </button>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-5xl mb-2">👥</div>
                    <div className="text-2xl font-bold">10K+</div>
                    <div className="text-lg">Members</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-200 rounded-full flex items-center justify-center">
                  <div className="text-center text-green-800">
                    <div className="text-2xl">💬</div>
                    <div className="text-sm font-bold">Live Chat</div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center">
                  <div className="text-center text-purple-800">
                    <div className="text-xl">🎓</div>
                    <div className="text-xs font-bold">Webinars</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;