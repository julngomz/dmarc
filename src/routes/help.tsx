import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/help')({
  component: Help,
});

function Help() {
  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-y-scroll">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Help & Support</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-primary-dark mb-4">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium text-lg mb-2">How do I find a pantry near me?</h3>
                <p className="text-gray-700">
                  Click the "Find a Pantry" button on the map screen. The app will use your current location
                  to show nearby pantries. You can also manually search for locations using the search bar.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium text-lg mb-2">What's the difference between in-network and out-of-network pantries?</h3>
                <p className="text-gray-700">
                  In-network pantries are official partners with DMARC United and follow our standards for food quality,
                  accessibility, and service hours. Out-of-network pantries are community resources we've listed,
                  but they may have different policies or availability.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium text-lg mb-2">How can I add a pantry to the map?</h3>
                <p className="text-gray-700">
                  To suggest a new pantry, click the "Add a Pantry" link in the navigation menu. You'll need to
                  provide details like the location, hours, and any special services offered. Our team will review
                  submissions before they appear on the map.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium text-lg mb-2">Can I volunteer at a pantry?</h3>
                <p className="text-gray-700">
                  Yes! Most pantries welcome volunteers. Visit the specific pantry's details page by clicking on it
                  in the map. Contact information will be provided there, or you can reach out to us directly for
                  volunteering opportunities.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary-dark mb-4">Using the App</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-primary mb-2">Map Navigation</h3>
                <p className="text-sm text-gray-700">
                  Use the + and - buttons to zoom in and out. Click and drag to move around the map.
                  Pantry locations are marked with pins on the map.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-primary mb-2">Filtering Results</h3>
                <p className="text-sm text-gray-700">
                  Use the "Pantry Type" dropdown in the sidebar to filter locations by in-network or
                  out-of-network status. This helps you find pantries that meet your specific needs.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-primary mb-2">Location Details</h3>
                <p className="text-sm text-gray-700">
                  Click on any pantry in the list or on the map to view detailed information, including
                  hours, services, and contact information.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-primary mb-2">Mobile Features</h3>
                <p className="text-sm text-gray-700">
                  On mobile devices, the pantry list slides up from the bottom. You can tap the X to close
                  it, or tap outside the panel to dismiss it.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary-dark mb-4">Contact Support</h2>
            <p className="text-gray-700 mb-4">
              Still have questions? Our support team is available to help:
            </p>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex flex-col space-y-2">
                <p className="flex items-center">
                  <span className="font-medium w-24">Email:</span>
                  <a href="mailto:support@dmarcunited.org" className="text-primary hover:underline">
                    support@dmarcunited.org
                  </a>
                </p>
                <p className="flex items-center">
                  <span className="font-medium w-24">Phone:</span>
                  <span>(555) 987-6543</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium w-24">Hours:</span>
                  <span>Monday-Friday, 9am-5pm EST</span>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
