import React from 'react';

const WhoWeAre: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Image */}
          <div className="lg:w-1/2 relative">
            <div className="flex justify-center lg:justify-start">
              <img
                src="https://argroupofeducation.com/wp-content/uploads/2024/04/doctors-images.png"
                alt="Future Mind Educare Team"
                className="w-full max-w-md h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Who We Are?
            </h2>
            
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Future Mind Educare is a leading educational consultancy specializing in MBBS admissions for aspiring medical students. With years of experience and a proven track record, we provide comprehensive guidance and support to help students secure admission in top medical colleges across India and abroad.
              </p>
              
              <p>
                Our team of experienced counselors and medical professionals understand the complexities of the medical admission process and are dedicated to helping students navigate through every step with ease. From career counseling to college selection, application assistance to admission guidance, we offer end-to-end solutions tailored to each student's unique needs and aspirations.
              </p>
              
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
