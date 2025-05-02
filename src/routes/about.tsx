import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-y-scroll">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-primary mb-6">About DMARC United</h1>

        <div className="prose max-w-none">
          <p className="mb-4">
            DMARC United is dedicated to connecting people with food pantries and essential resources
            in their communities. Our mission is to make nutritious food accessible to everyone and
            reduce food insecurity.
          </p>

          <h2 className="text-xl font-bold text-primary-dark mt-6 mb-3">Our Mission</h2>
          <p className="mb-4">
            We strive to create a network of pantries that are easily accessible, well-stocked, and
            welcoming to all members of the community. Through our platform, users can quickly locate
            nearby pantries, check availability, and get directions.
          </p>

          <h2 className="text-xl font-bold text-primary-dark mt-6 mb-3">In-Network Pantries</h2>
          <p className="mb-4">
            Our in-network pantries follow specific guidelines to ensure consistent quality, accessibility,
            and service. They receive regular deliveries, maintain consistent hours, and provide a
            diverse selection of food items including fresh produce when available.
          </p>

          <h2 className="text-xl font-bold text-primary-dark mt-6 mb-3">How You Can Help</h2>
          <p className="mb-4">
            There are many ways to support our mission:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Donate funds to help us expand our network and services</li>
            <li className="mb-2">Volunteer at a local pantry</li>
            <li className="mb-2">Contribute food items to your neighborhood pantries</li>
            <li className="mb-2">Spread awareness about food insecurity in your community</li>
          </ul>

          <div className="bg-blue-50 p-4 rounded-lg mt-8">
            <h3 className="text-lg font-medium text-primary mb-2">Contact Us</h3>
            <p className="text-gray-700">
              For more information about DMARC United, please email
              <a href="mailto:info@dmarcunited.org" className="text-primary hover:underline ml-1">
                info@dmarcunited.org
              </a>
              or call us at (555) 123-4567.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
