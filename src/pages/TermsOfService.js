import React from 'react';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';

const TermsOfService = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <DocumentDuplicateIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-lg prose-primary mx-auto">
          <p>
            Welcome to TeamMeraki. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read these terms carefully before using our services.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using TeamMeraki's website, mobile applications, or services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h2>2. Description of Services</h2>
          <p>
            TeamMeraki provides immigration assistance tools and resources, including but not limited to:
          </p>
          <ul>
            <li>Document management and tracking</li>
            <li>Budget planning and financial tools</li>
            <li>Reminder and notification services</li>
            <li>Immigration news and updates</li>
            <li>Community forums and support</li>
          </ul>
          <p>
            We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            To access certain features of our services, you may be required to create an account. You are responsible for:
          </p>
          <ul>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use of your account</li>
          </ul>
          <p>
            We reserve the right to suspend or terminate your account if we believe you have violated these terms or for any other reason at our sole discretion.
          </p>

          <h2>4. User Content</h2>
          <p>
            You retain ownership of any content you submit, post, or display on or through our services. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute such content.
          </p>
          <p>
            You are solely responsible for your content and the consequences of posting it. We do not endorse any user content or opinions expressed by users.
          </p>

          <h2>5. Prohibited Conduct</h2>
          <p>
            You agree not to:
          </p>
          <ul>
            <li>Use our services for any illegal purpose</li>
            <li>Violate any laws in your jurisdiction</li>
            <li>Post false, misleading, or fraudulent information</li>
            <li>Impersonate another person or entity</li>
            <li>Harass, abuse, or harm others</li>
            <li>Interfere with or disrupt our services</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Use automated means to access our services without our permission</li>
          </ul>

          <h2>6. Disclaimer of Warranties</h2>
          <p>
            Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, timely, secure, or error-free.
          </p>
          <p>
            We are not responsible for any immigration decisions or outcomes based on the information provided through our services. We recommend consulting with qualified immigration professionals for specific advice.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, TeamMeraki shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.
          </p>

          <h2>8. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless TeamMeraki and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, costs, expenses, or fees arising from your use of our services or your violation of these terms.
          </p>

          <h2>9. Changes to Terms</h2>
          <p>
            We may modify these terms at any time. If we make material changes, we will notify you by email or through a notice on our website. Your continued use of our services after such modifications constitutes your acceptance of the updated terms.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of Canada, without regard to its conflict of law provisions.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p>
            Email: legal@teammeraki.com<br />
            Address: Seneca College, North York, Canada<br />
            Phone: +1 (123) 456-7890
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 