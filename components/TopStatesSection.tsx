"use client"
import React from 'react';
import Link from 'next/link';

interface StateItem {
  name: string;
  image: string;
}

const TopStatesSection: React.FC = () => {
  const [states, setStates] = React.useState<StateItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoading(true);
        const response = await fetch('/mbbs-india.json');
        if (!response.ok) {
          throw new Error('Failed to fetch states data');
        }
        const data = await response.json();
        
        // Transform the data to match StateItem interface
        const transformedStates: StateItem[] = data.states.map((state: any) => ({
          name: state.name,
          image: state.image
        }));
        
        setStates(transformedStates);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load states data');
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  // Function to create state slug for URL
  const getStateSlug = (stateName: string): string => {
    // Convert state name to lowercase with hyphens for URL
    return stateName.toLowerCase().replace(/\s+/g, '-');
  };

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading states...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            List of Top States to Pursue MBBS in India
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore the best states across India that offer excellent medical education facilities, 
            renowned colleges, and great career opportunities for aspiring doctors.
          </p>
        </div>

        {/* States Grid - 3x3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {states.map((state, index) => (
            <Link
              href={`/states/${getStateSlug(state.name)}`}
              key={index}
              className="block"
            >
              <div
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group cursor-pointer"
              >
                {/* State Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={state.image}
                    alt={state.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* State Name */}
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {state.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Each of these states offers unique advantages for medical education, from premier government 
            institutions to private medical colleges with excellent infrastructure. Our team can help you 
            choose the right state based on your preferences, eligibility, and career goals.
          </p>
          <Link 
            href="/states"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Explore State-wise Colleges
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopStatesSection;
