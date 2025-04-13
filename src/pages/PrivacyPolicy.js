import React from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <ShieldCheckIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-lg prose-primary mx-auto">
          <p>
            At TeamMeraki, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including:
          </p>
          <ul>
            <li>Personal identification information (name, email address, phone number, etc.)</li>
            <li>Immigration status and related documents</li>
            <li>Financial information for budget planning</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process your transactions</li>
            <li>Send you technical notices, updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Personalize your experience</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
          </ul>

          <h2>Information Sharing and Disclosure</h2>
          <p>
            We may share your information in the following circumstances:
          </p>
          <ul>
            <li>With your consent</li>
            <li>With service providers, partners, and contractors who perform services on our behalf</li>
            <li>To comply with laws or to respond to lawful requests and legal process</li>
            <li>To protect our rights and property</li>
            <li>In an emergency to protect public safety</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no security system is impenetrable, and we cannot guarantee the security of our systems.
          </p>

          <h2>Your Choices</h2>
          <p>
            You may have certain rights regarding your personal information, including:
          </p>
          <ul>
            <li>Accessing, correcting, or deleting your personal information</li>
            <li>Objecting to or restricting certain processing of your information</li>
            <li>Data portability</li>
            <li>Withdrawing consent</li>
          </ul>

          <h2>Children's Privacy</h2>
          <p>
            Our services are not directed to children under 13, and we do not knowingly collect personal information from children under 13. If we learn we have collected personal information from a child under 13, we will delete that information.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email or through a notice on our website prior to the change becoming effective.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            Email: privacy@teammeraki.com<br />
            Address: Seneca College, North York, Canada<br />
            Phone: +1 (123) 456-7890
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 