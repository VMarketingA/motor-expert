import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Motor Expert',
  description: 'Privacy Policy of Motor Expert Auto Service',
};

export default function PrivacyPolicyEnPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-gray-600 hover:text-[#003366] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to home
      </Link>

      <div className="bg-white border border-black p-6 sm:p-8 lg:p-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center">
          PRIVACY POLICY
        </h1>

        <div className="space-y-8 text-sm sm:text-base">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">1. General Provisions</h2>
            <div className="space-y-3 text-gray-700">
              <p>1.1. This Privacy Policy (hereinafter referred to as the Policy) defines the procedure for processing and protecting personal data of users of the website [website address] (hereinafter referred to as the Website).</p>
              <p>1.2. The personal data operator is [Auto service name / Individual entrepreneur name], TIN [specify], PSRN [specify] (hereinafter referred to as the Operator).</p>
              <p>1.3. The Policy has been developed in accordance with Federal Law No. 152-FZ of July 27, 2006 "On Personal Data".</p>
              <p>1.4. This Policy does not constitute a public offer.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">2. Data We Collect</h2>
            <div className="space-y-3 text-gray-700">
              <p>2.1. The Operator processes the following personal data:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Name (if provided by the user in the form);</li>
                <li>Phone number (if provided by the user in the form);</li>
                <li>IP address (collected automatically when visiting the Website).</li>
              </ul>
              <p>2.2. The Operator does not collect passport data, email addresses, geolocation data, or any other personal data not specified in clause 2.1.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">3. Processing Purposes</h2>
            <div className="space-y-3 text-gray-700">
              <p>3.1. Personal data is processed for the following purposes:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Processing requests for service appointments, consultations, or repairs;</li>
                <li>Providing feedback to the user regarding their request;</li>
                <li>Website traffic analytics (Google Analytics).</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">4. Data Transfer</h2>
            <div className="space-y-3 text-gray-700">
              <p>4.1. Personal data is not transferred to third parties, except in cases provided by the legislation of the Russian Federation.</p>
              <p>4.2. IP addresses are transferred to Google Analytics in anonymized form exclusively for the purposes of statistical analysis of Website traffic.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">5. Storage Period</h2>
            <div className="space-y-3 text-gray-700">
              <p>5.1. Personal data is stored for 1 (one) year from the date of the last request or until consent for processing is withdrawn.</p>
              <p>5.2. After the expiration of the storage period, personal data is deleted or anonymized.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">6. Data Subject Rights</h2>
            <div className="space-y-3 text-gray-700">
              <p>6.1. The user has the right to:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Obtain information about their personal data;</li>
                <li>Request correction of inaccurate data;</li>
                <li>Request deletion of personal data;</li>
                <li>Withdraw consent for the processing of personal data.</li>
              </ul>
              <p>6.2. To exercise these rights, send a request to the Operator using the contacts specified in clause 7.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">7. Operator Contacts</h2>
            <div className="space-y-3 text-gray-700">
              <p>7.1. To contact the Operator, use:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Address: [specify address]</li>
                <li>Phone: [specify phone]</li>
                <li>Business hours: [specify hours]</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">8. Final Provisions</h2>
            <div className="space-y-3 text-gray-700">
              <p>8.1. Consent for the processing of personal data is provided by the user by filling out the form on the Website and clicking the "Submit" / "Book" button.</p>
              <p>8.2. The Operator takes necessary organizational and technical measures to protect personal data from unauthorized access, destruction, modification, blocking, and other unlawful actions.</p>
              <p>8.3. The Operator reserves the right to make changes to the Policy. The new version comes into effect from the moment of its publication on the Website.</p>
              <p>8.4. The current version of the Policy is always available at: [policy page address].</p>
              <p>8.5. Last updated: {new Date().toLocaleDateString('en-US')}.</p>
            </div>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <Link
              href="/privacy-policy"
              className="text-[#003366] hover:underline font-medium"
            >
              ← Русская версия
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
