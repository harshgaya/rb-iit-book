import { FileText, CheckCircle, AlertCircle, Mail, Phone } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 sm:p-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl text-black font-bold text-primaryColor flex items-center justify-center gap-2">
            <FileText className="w-8 h-8" />
            Terms & Conditions
          </h1>
          <p className="text-gray-600 mt-2">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-10 text-gray-700 leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-primaryColor mb-2">
              1. Introduction
            </h2>
            <p>
              Welcome to <strong>RAJESWARI BOOK PUBLISHERS</strong>. By using
              our website, services, or purchasing our study materials, you
              agree to the terms outlined here. Please read them carefully.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-primaryColor mb-2">
              2. Use of Website & Services
            </h2>
            <p>
              You agree not to misuse the website or engage in activities that
              may harm our system, users, or operations. This includes:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Attempting to disrupt or hack the website</li>
              <li>Using false information while placing an order</li>
              <li>
                Copying or distributing website content without permission
              </li>
            </ul>
          </section>

          {/* Section 3: Orders */}
          <section>
            <h2 className="text-2xl font-semibold text-primaryColor mb-2">
              3. Orders & Payments
            </h2>
            <p>
              All online payments are securely processed through{" "}
              <strong>Razorpay</strong>. By placing an order, you confirm that:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>All information provided is accurate</li>
              <li>You are authorized to use the selected payment method</li>
              <li>You agree to our pricing, taxes, and shipping charges</li>
            </ul>
          </section>

          {/* Section 4: Shipping */}
          <section>
            <h2 className="text-2xl font-semibold text-primaryColor mb-2">
              4. Shipping & Delivery
            </h2>
            <p>
              Orders are usually shipped within{" "}
              <strong>2–5 business days</strong>. Delivery timelines may vary
              based on location and courier availability.
            </p>
            <p className="mt-2">
              Tracking details will be shared via email or SMS when available.
            </p>
          </section>

          {/* Section 5: Refunds */}
          <section>
            <h2 className="text-2xl font-semibold text-primaryColor mb-2 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              5. Refund & Cancellation Policy
            </h2>

            <p className="mb-3">
              We want every customer to be fully satisfied. Refunds are provided
              under these conditions:
            </p>

            <h3 className="text-xl font-semibold mb-1">
              ✔ Eligible for Refund
            </h3>
            <ul className="list-disc ml-6 mb-3 space-y-1">
              <li>Wrong product delivered</li>
              <li>Damaged or defective product</li>
              <li>Duplicate payment detected</li>
              <li>Order not processed but payment deducted</li>
            </ul>

            <h3 className="text-xl font-semibold mb-1">
              ✔ Not Eligible for Refund
            </h3>
            <ul className="list-disc ml-6 mb-3 space-y-1">
              <li>Books damaged after delivery</li>
              <li>Digital content once accessed or downloaded</li>
            </ul>

            <p>
              Refunds are processed within <strong>5–7 working days</strong>{" "}
              after approval.
            </p>
          </section>

          {/* Section 6: Cancellations */}
          <section>
            <h2 className="text-2xl font-semibold text-primaryColor mb-2">
              6. Cancellations
            </h2>
            <p>
              Orders can only be cancelled before they are shipped. Once
              dispatched, cancellation is not possible. You may still request a
              return or refund if eligible.
            </p>
          </section>

          {/* Section 7: Content Usage */}
          <section>
            <h2 className="text-2xl font-semibold text-primaryColor mb-2">
              7. Content & Intellectual Property
            </h2>
            <p>
              All content on this website—including text, images, logos, books,
              and materials—is the intellectual property of{" "}
              <strong>RAJESWARI BOOK PUBLISHERS</strong>.
            </p>
            <p className="mt-2">
              Unauthorized copying, distribution, or use of content is strictly
              prohibited.
            </p>
          </section>

          {/* Section 8: Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-primaryColor mb-2">
              8. Limitation of Liability
            </h2>
            <p>We are not liable for losses caused due to:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Incorrect address provided</li>
              <li>Courier delays or issues</li>
              <li>User errors or misuse</li>
              <li>Technical issues beyond our control</li>
            </ul>
          </section>

          {/* Section 9: Changes */}
          <section>
            <h2 className="text-2xl font-semibold text-primaryColor mb-2">
              9. Updates to Terms
            </h2>
            <p>
              We may update these Terms & Conditions anytime. Continued use of
              the website indicates your acceptance of the updated terms.
            </p>
          </section>

          {/* Section 10: Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-primaryColor mb-2 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              10. Contact Us
            </h2>

            <p className="mb-3">
              If you have questions about these terms, contact us:
            </p>

            <div className="bg-gray-100 border p-4 rounded-md space-y-2">
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primaryColor" />
                rbiitacademy@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primaryColor" />
                +91 90305 65621
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
