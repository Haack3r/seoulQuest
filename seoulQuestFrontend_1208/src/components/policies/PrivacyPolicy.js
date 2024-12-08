import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="p-6 text-gray-800">
      <h1 className=" text-center text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        At Seoul Culture Quest, we value your privacy and are committed to protecting the personal
        information you share with us. This Privacy Policy outlines how we collect, use, and safeguard
        your data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect the following types of information:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Personal details (e.g., name, email address, phone number)</li>
        <li>Payment information (e.g., credit card details)</li>
        <li>Usage data (e.g., pages visited, time spent on our website)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <p className="mb-4">
        Your information is used to:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Process transactions and bookings</li>
        <li>Provide customer support</li>
        <li>Send updates, offers, and notifications</li>
        <li>Analyze website usage and improve our services</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
      <p className="mb-4">
        We implement industry-standard security measures to protect your personal data. However, no
        online platform is completely secure, and we cannot guarantee absolute data protection.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Sharing of Information</h2>
      <p className="mb-4">
        We do not sell or rent your personal information. We may share your data with trusted third
        parties for processing payments, delivering orders, or complying with legal requirements.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <p className="mb-4">
        You have the right to:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Access and review your personal information</li>
        <li>Request corrections or updates to your data</li>
        <li>Withdraw consent for marketing communications</li>
        <li>Request the deletion of your personal data</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about our Privacy Policy, please contact us at:
        <br />
        <strong>Email:</strong> support@seoulculturequest.com
        <br />
        <strong>Phone:</strong> +82-1234-5678
      </p>

      <p className="text-sm text-gray-600">
        This Privacy Policy is effective as of [Insert Date] and may be updated from time to time.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
