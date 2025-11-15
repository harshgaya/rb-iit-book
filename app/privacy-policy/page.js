import { ShieldCheck, RefreshCcw, FileText, Mail, Phone } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 sm:p-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl text-black font-bold text-primaryColor flex items-center justify-center gap-2">
            <ShieldCheck className="w-8 h-8" />
            Privacy Policy
          </h1>
          <p className="text-gray-600 mt-2">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-10 text-gray-700 leading-relaxed">
          {/* Section 1: Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-primaryColor mb-2">
              1. Introduction
            </h2>
            <p>
              At <strong>RB Books / AIM NEET Academy</strong>, we value your
              trust. This Privacy Policy explains how we collect, use, and
              protect your personal information when you use our website, mobile
              app, or purchase our products.
            </p>
          </section>

          {/* Section 2: Data We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-primaryColor mb-2">
              2. Information We Collect
            </h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Shipping/Billing Address</li>
              <li>
                Payment & Transaction Details (processed securely via Razorpay)
              </li>
              <li>Messages or queries submitted through contact forms</li>
            </ul>
          </section>

          {/* Section 3: Payment Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-primaryColor mb-2">
              3. Payment Information
            </h2>
            <p>
              All online payments are securely processed through
              <strong> Razorpay</strong>. We do <strong>not</strong> store any
              card details, UPI IDs, or bank login information on our servers.
            </p>
          </section>

          {/* Section 4: How We Use the Data */}
          <section>
            <h2 className="text-2xl font-semibold text-primaryColor mb-2">
              4. How We Use Your Information
            </h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>To process orders and deliver products</li>
              <li>To contact you for support or updates</li>
              <li>To improve our website, products, and user experience</li>
              <li>
                To send important communications (order updates, promotional
                insights)
              </li>
            </ul>
          </section>

          {/* Section 5: Refund Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-primaryColor mb-2 flex items-center gap-2">
              <RefreshCcw className="w-6 h-6" />
              5. Refund & Cancellation Policy
            </h2>

            <p className="mb-3">
              We aim for complete customer satisfaction. If you face any issue
              with your order, our team will assist you promptly.
            </p>

            <h3 className="text-xl font-semibold mb-1">✔ Refund Eligibility</h3>
            <ul className="list-disc ml-6 space-y-1 mb-3">
              <li>Damaged or defective book received</li>
              <li>Incorrect product delivered</li>
              <li>Payment charged but order not confirmed</li>
              <li>Duplicate payment</li>
            </ul>

            <h3 className="text-xl font-semibold mb-1">
              ✔ Cases Not Eligible for Refund
            </h3>
            <ul className="list-disc ml-6 space-y-1 mb-3">
              <li>Books damaged by the customer</li>
              <li>Non-returnable exam or digital materials</li>
            </ul>

            <h3 className="text-xl font-semibold mb-1">✔ Refund Timeline</h3>
            <p>
              Refunds are processed within <strong>5–7 working days</strong>{" "}
              after verification. Refunds will be issued to the original payment
              method used during purchase.
            </p>
          </section>

          {/* Section 6: Data Protection */}
          <section>
            <h2 className="text-2xl font-semibold text-primaryColor mb-2">
              6. Data Protection & Security
            </h2>
            <p>
              We use SSL encryption, secure servers, and up-to-date compliance
              measures to ensure your data is protected. Your information is
              never sold or shared with unauthorized third parties.
            </p>
          </section>

          {/* Section 7: Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-primaryColor mb-2">
              7. Cookies & Tracking
            </h2>
            <p>
              We use cookies to enhance user experience, analyze traffic, and
              personalize content. You may disable cookies anytime via browser
              settings.
            </p>
          </section>

          {/* Section 8: User Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-primaryColor mb-2">
              8. Your Rights
            </h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Request correction of your data</li>
              <li>Request deletion of your account</li>
              <li>Request details of stored information</li>
              <li>Opt-out of promotional messages</li>
            </ul>
          </section>

          {/* Section 9: Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-primaryColor mb-2 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              9. Contact Information
            </h2>

            <p className="mb-3">
              For any privacy-related or refund-related queries, contact us:
            </p>

            <div className="space-y-2 bg-gray-100 p-4 rounded-md border">
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
