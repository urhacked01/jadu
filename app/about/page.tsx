import Image from 'next/image';
import Link from 'next/link';
import { Award, Users, ThumbsUp, CheckCircle } from 'lucide-react';

// Sample team members data
const TEAM_MEMBERS = [
  {
    name: 'Anita Patel',
    position: 'Sales Director',
    image: '/images/team/sales-director.jpg',
    bio: 'Anita brings 15 years of automotive sales experience and ensures our customers get the perfect bike that matches their needs and preferences.',
  },
  {
    name: 'Vikram Singh',
    position: 'Service Head',
    image: '/images/team/service-head.jpg',
    bio: 'Vikram leads our team of factory-trained technicians, ensuring that every bike that leaves our service center performs at its best.',
  },
  {
    name: 'Priya Desai',
    position: 'Customer Relations Manager',
    image: '/images/team/customer-relations.jpg',
    bio: 'Dedicated to creating exceptional customer experiences, Priya makes sure that our customers are satisfied throughout their journey with us.',
  },
];

const FOUNDERS = [
  {
    name: 'Shashikant Dhamdhere',
    position: 'Founder',
    image: '/images/team/founder1.jpg',
    bio: 'With over 23 years of experience in the motorcycle industry, Shashikant founded Dhanlaxmi Motor with a vision to provide premium bikes with exceptional customer service. His entrepreneurial spirit and deep understanding of the industry laid the foundation for our success.',
  },
  {
    name: 'Santosh Dhamdhere',
    position: 'Founder',
    image: '/images/team/founder2.jpg',
    bio: 'Santosh brings extensive leadership experience in the automotive industry. As Founder, he drives our strategic vision, operational excellence, and customer-centric approach, ensuring Dhanlaxmi Motor continues to set new standards in the motorcycle dealership industry.',
  },
];

const CEOS = [
  {
    name: 'Shrikant Dhamdhere',
    position: 'Managing Director',
  },
  {
    name: 'Akshay Dhamdhere',
    position: 'Managing Director',
  },
  {
    name: 'Shryash Dhamdhere',
    position: 'Managing Director',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-gray-50 py-8 sm:py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            About Dhanlaxmi Hero
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
            Your trusted dealer for Hero and Harley Davidson motorcycles with three premium showroom
            locations. Learn about our journey, our values, and what makes us different.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-[var(--primary)] font-semibold tracking-wide uppercase">
                Our Story
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A Legacy of Excellence
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Since 1995, we've been committed to providing the best two-wheeler experience in the
                region.
              </p>
            </div>

            <div className="mt-16">
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src="https://ik.imagekit.io/rnml0kqxo3/dhanlaxmi/rVKRTtM.png?updatedAt=1745651378171"
                  alt="Dhanlaxmi Motor Main Showroom"
                  width={1200}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Our Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Mission</h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
              To provide premium motorcycles with exceptional service, creating memorable
              experiences for every customer who walks through our doors.
            </p>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--primary)] mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base">
                  Offering top-quality motorcycles from Hero and Harley Davidson
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--primary)] mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base">
                  Providing expert guidance to help customers find their perfect ride
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--primary)] mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base">
                  Delivering exceptional after-sales service and support
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--primary)] mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base">
                  Creating a community of passionate motorcycle enthusiasts
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Vision</h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
              To be the most trusted and preferred motorcycle dealership, known for our integrity,
              expertise, and commitment to customer satisfaction.
            </p>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--primary)] mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base">
                  Expanding our reach to serve more communities
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--primary)] mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base">
                  Continuously improving our service standards
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--primary)] mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base">
                  Adopting the latest technologies to enhance customer experience
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--primary)] mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base">
                  Promoting responsible and safe motorcycle riding practices
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
            Why Choose Dhanlaxmi Motor
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Authorized Dealer</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We are an authorized dealer for Hero and Harley Davidson motorcycles, offering
                genuine products with manufacturer warranty and support.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Expert Team</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Our team of experts is passionate about motorcycles and dedicated to providing you
                with the best advice and service.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <ThumbsUp className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Customer Satisfaction</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                With thousands of happy customers, our commitment to satisfaction has earned us a
                reputation for excellence in the industry.
              </p>
            </div>
          </div>
        </div>

        {/* Our Achievements */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
            Our Achievements
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4 border border-gray-200 rounded-lg p-3 sm:p-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                1
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base">Best Dealer Award</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Awarded by Hero MotoCorp for 5 consecutive years (2018-2022)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 border border-gray-200 rounded-lg p-3 sm:p-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                2
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base">Customer Service Excellence</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Recognized for outstanding customer service by Motorcycle Dealers Association
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 border border-gray-200 rounded-lg p-3 sm:p-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                3
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base">Top Sales Performance</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Ranked #1 in regional sales for Harley Davidson (2021-2023)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 border border-gray-200 rounded-lg p-3 sm:p-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                4
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base">25 Years of Excellence</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Celebrating 25+ years of trusted service in the motorcycle industry
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Founders Section */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">Our Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {FOUNDERS.map((founder, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <div className="relative w-50 h-50 sm:w-50 sm:h-50 overflow-hidden">
                    <Image src={founder.image} alt={founder.name} fill className="object-cover" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-bold">{founder.name}</h3>
                    <p className="text-[var(--primary)] font-medium mb-2">{founder.position}</p>
                    <p className="text-gray-600 text-sm sm:text-base">{founder.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CEOs Section */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CEOS.map((ceo, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-bold">{ceo.name}</h3>
                  <p className="text-[var(--primary)] font-medium">{ceo.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            Ready to Experience Dhanlaxmi Hero?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-6 sm:mb-8">
            Visit one of our showrooms today or contact us to learn more about our bikes and
            services.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link href="/showrooms" className="btn-primary text-sm sm:text-base">
              Visit Our Showrooms
            </Link>
            <Link href="/contact" className="btn-outline text-sm sm:text-base">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
