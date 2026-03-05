import MarketingPageShell from "@/components/marketing/shared/MarketingPageShell";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata = {
  title: "Privacy Policy | SeaNeB Property",
  description:
    "Read the SeaNeB Property privacy policy to understand how personal information is collected, processed, stored, and protected.",
  alternates: {
    canonical: getSiteUrl("/privacy-policy"),
  },
  openGraph: {
    title: "Privacy Policy | SeaNeB Property",
    description:
      "SeaNeB Property privacy notice covering data collection, usage, sharing, retention, and user rights.",
    type: "website",
    url: getSiteUrl("/privacy-policy"),
  },
};

export default function PrivacyPolicyPage() {
  return (
    <MarketingPageShell>
      <section className="bg-gradient-to-r from-amber-900 via-amber-800 to-orange-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">SeaNeB Property</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-amber-100 sm:text-lg">Last updated March 02, 2026</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-8 text-sm leading-relaxed text-slate-700">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p>
              This Privacy Notice for SeaNeB Technologies (doing business as SeaNeB) (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;), describes how and why we might access, collect, store, use, and/or share
              (&quot;process&quot;) your personal information when you use our services (&quot;Services&quot;),
              including when you:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                Visit our website at{" "}
                <a
                  href="https://property.seaneb.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-900 underline underline-offset-2"
                >
                  https://property.seaneb.com
                </a>{" "}
                or any website of ours that links to this Privacy Notice
              </li>
              <li>Download and use our mobile application (SeaNeB Property), or any other application of ours that links to this Privacy Notice</li>
              <li>Use SeaNeB Property, a property real estate marketplace platform</li>
              <li>Engage with us in other related ways, including any marketing or events</li>
            </ul>
            <p className="mt-4">
              Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices.
              We are responsible for making decisions about how your personal information is processed. If you do not
              agree with our policies and practices, please do not use our Services.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Summary Of Key Points</h2>
            <p className="mt-3">
              This summary provides key points from our Privacy Notice. You can find out more details about any of
              these topics by using the table of contents below to find the section you are looking for.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <strong>What personal information do we process?</strong> When you visit, use, or navigate our Services,
                we may process personal information depending on how you interact with us and the Services, the choices
                you make, and the products and features you use.
              </li>
              <li>
                <strong>Do we process any sensitive personal information?</strong> No. We do not process sensitive personal information.
              </li>
              <li>
                <strong>Do we collect any information from third parties?</strong> No. We do not collect any information from third parties.
              </li>
              <li>
                <strong>How do we process your information?</strong> We process your information to provide, improve, and administer our
                Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your
                information for other purposes with your consent.
              </li>
              <li>
                <strong>In what situations and with which parties do we share personal information?</strong> We may share information in
                specific situations and with specific third parties.
              </li>
              <li>
                <strong>How do we keep your information safe?</strong> We use organizational and technical processes and procedures to protect
                your personal information, but no system can be guaranteed to be 100% secure.
              </li>
              <li>
                <strong>What are your rights?</strong> Depending on where you are located geographically, applicable privacy law may mean
                you have certain rights regarding your personal information.
              </li>
              <li>
                <strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by visiting{" "}
                <a href="/contact" className="font-medium text-slate-900 underline underline-offset-2">
                  our contact page
                </a>
                , or by contacting us using the details in this notice.
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Table Of Contents</h2>
            <ol className="mt-4 list-decimal space-y-1 pl-5">
              <li>What information do we collect?</li>
              <li>How do we process your information?</li>
              <li>When and with whom do we share your personal information?</li>
              <li>Do we use cookies and other tracking technologies?</li>
              <li>How long do we keep your information?</li>
              <li>How do we keep your information safe?</li>
              <li>What are your privacy rights?</li>
              <li>Controls for Do-Not-Track features</li>
              <li>Do we make updates to this notice?</li>
              <li>How can you contact us about this notice?</li>
              <li>How can you review, update, or delete the data we collect from you?</li>
            </ol>
          </section>

          <section id="info-we-collect" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">1. What Information Do We Collect?</h2>
            <p className="mt-3">
              <strong>Personal information you disclose to us.</strong> We collect personal information that you provide to us.
            </p>
            <p className="mt-3">
              We collect personal information that you voluntarily provide to us when you register on the Services,
              express an interest in obtaining information about us or our products and Services, when you participate in
              activities on the Services, or otherwise when you contact us.
            </p>
            <p className="mt-3">
              The personal information we collect may include:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Names</li>
              <li>Phone numbers</li>
              <li>Email addresses</li>
              <li>Usernames</li>
              <li>Passwords</li>
              <li>Contact preferences</li>
              <li>Contact or authentication data</li>
              <li>Billing addresses</li>
            </ul>
            <p className="mt-3">
              <strong>Sensitive Information.</strong> We do not process sensitive information.
            </p>
            <p className="mt-3">
              <strong>Application Data.</strong> If you use our application(s), we also may collect the following information
              if you choose to provide us with access or permission:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>Geolocation Information:</strong> We may request access or permission to track location-based information from your
                mobile device, either continuously or while you are using our mobile application(s), to provide certain location-based services.
              </li>
              <li>
                <strong>Push Notifications:</strong> We may request to send you push notifications regarding your account or certain features
                of the application(s). You may opt out in your device settings.
              </li>
            </ul>
            <p className="mt-3">
              This information is primarily needed to maintain the security and operation of our application(s), for troubleshooting,
              and for our internal analytics and reporting purposes.
            </p>
            <p className="mt-3">
              All personal information that you provide to us must be true, complete, and accurate, and you must notify us of
              any changes to such personal information.
            </p>
            <p className="mt-3">
              <strong>Google API:</strong> Our use of information received from Google APIs will adhere to Google API Services
              User Data Policy, including the Limited Use requirements.
            </p>
          </section>

          <section id="how-we-process" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">2. How Do We Process Your Information?</h2>
            <p className="mt-3">
              We process your information to provide, improve, and administer our Services, communicate with you, for security
              and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.
            </p>
            <p className="mt-3">We process your personal information for a variety of reasons, including:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>To facilitate account creation and authentication and otherwise manage user accounts.</li>
              <li>To deliver and facilitate delivery of services to the user.</li>
              <li>To post testimonials that may contain personal information.</li>
            </ul>
          </section>

          <section id="sharing" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">3. When And With Whom Do We Share Your Personal Information?</h2>
            <p className="mt-3">We may share information in specific situations and/or with the following third parties.</p>
            <p className="mt-3">We may need to share your personal information in the following situations:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of,
                any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
              </li>
              <li>
                <strong>Google Maps Platform APIs:</strong> We may share your information with certain Google Maps Platform APIs (for example,
                Google Maps API and Places API). Google Maps may use GPS, Wi-Fi, and cell towers to estimate your location.
              </li>
            </ul>
            <p className="mt-3">
              We obtain and store on your device (&quot;cache&quot;) your location. You may revoke your consent any time by contacting us
              at the contact details provided at the end of this document.
            </p>
          </section>

          <section id="cookies" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">4. Do We Use Cookies And Other Tracking Technologies?</h2>
            <p className="mt-3">We may use cookies and other tracking technologies to collect and store your information.</p>
            <p className="mt-3">
              We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you
              interact with our Services. Some online tracking technologies help us maintain security, prevent crashes, fix bugs,
              save preferences, and assist with basic site functions.
            </p>
            <p className="mt-3">
              We also permit third parties and service providers to use online tracking technologies on our Services for analytics
              and advertising.
            </p>
            <p className="mt-3">
              Specific information about how we use such technologies and how you can refuse certain cookies is set out in our
              Cookie Notice.
            </p>
            <p className="mt-3">
              <strong>Google Analytics:</strong> We may share your information with Google Analytics to track and analyze the use
              of the Services. The Google Analytics Advertising Features that we may use include Google Display Network Impressions
              Reporting and Google Analytics Demographics and Interests Reporting.
            </p>
            <p className="mt-3">
              To opt out of being tracked by Google Analytics across the Services, visit{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-900 underline underline-offset-2"
              >
                https://tools.google.com/dlpage/gaoptout
              </a>
              . Other opt-out links:{" "}
              <a
                href="http://optout.networkadvertising.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-900 underline underline-offset-2"
              >
                http://optout.networkadvertising.org/
              </a>{" "}
              and{" "}
              <a
                href="http://www.networkadvertising.org/mobile-choice"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-900 underline underline-offset-2"
              >
                http://www.networkadvertising.org/mobile-choice
              </a>
              .
            </p>
          </section>

          <section id="retention" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">5. How Long Do We Keep Your Information?</h2>
            <p className="mt-3">
              We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless
              otherwise required by law.
            </p>
            <p className="mt-3">
              We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice,
              unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
            </p>
            <p className="mt-3">
              When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize
              such information, or, if this is not possible, then we will securely store your personal information and isolate it from any
              further processing until deletion is possible.
            </p>
          </section>

          <section id="security" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">6. How Do We Keep Your Information Safe?</h2>
            <p className="mt-3">
              We aim to protect your personal information through a system of organizational and technical security measures.
            </p>
            <p className="mt-3">
              We have implemented appropriate and reasonable technical and organizational security measures designed to protect
              the security of any personal information we process. However, no electronic transmission over the Internet or information
              storage technology can be guaranteed to be 100% secure.
            </p>
            <p className="mt-3">
              Although we do our best to protect your personal information, transmission of personal information to and from our Services
              is at your own risk. You should only access the Services within a secure environment.
            </p>
          </section>

          <section id="privacy-rights" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">7. What Are Your Privacy Rights?</h2>
            <p className="mt-3">
              You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.
            </p>
            <p className="mt-3">
              <strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal information,
              you have the right to withdraw your consent at any time by contacting us using the details provided in this notice.
            </p>
            <p className="mt-3">
              <strong>Account Information:</strong> You can log in to your account settings and update your user account.
            </p>
            <p className="mt-3">
              Upon your request to terminate your account, we will deactivate or delete your account and information from active databases,
              subject to legal and operational retention requirements.
            </p>
            <p className="mt-3">
              <strong>Cookies and similar technologies:</strong> Most web browsers accept cookies by default. You can usually set your
              browser to remove or reject cookies, which may affect certain features or services of our Services.
            </p>
          </section>

          <section id="dnt" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">8. Controls For Do-Not-Track Features</h2>
            <p className="mt-3">
              Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (&quot;DNT&quot;)
              feature or setting you can activate to signal your privacy preference not to have data about your online browsing
              activities monitored and collected.
            </p>
            <p className="mt-3">
              Because no uniform technology standard for recognizing and implementing DNT signals has been finalized, we do not
              currently respond to DNT browser signals. If a standard is adopted that we must follow in the future, we will inform
              you in a revised version of this Privacy Notice.
            </p>
          </section>

          <section id="updates" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">9. Do We Make Updates To This Notice?</h2>
            <p className="mt-3">Yes. We will update this notice as necessary to stay compliant with relevant laws.</p>
            <p className="mt-3">
              We may update this Privacy Notice from time to time. The updated version will be indicated by an updated revised date
              at the top of this Privacy Notice. If we make material changes, we may notify you by posting a notice or by directly
              sending you a notification.
            </p>
          </section>

          <section id="contact-us" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">10. How Can You Contact Us About This Notice?</h2>
            <p className="mt-3">If you have questions or comments about this notice, you may contact us by post at:</p>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">
              <p>SeaNeB Technologies</p>
              <p>FF 8, Madhav Arcade</p>
              <p>Jol, Anand, Gujarat 388120</p>
              <p>India</p>
            </div>
          </section>

          <section id="review-update-delete" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              11. How Can You Review, Update, Or Delete The Data We Collect From You?
            </h2>
            <p className="mt-3">
              You have the right to request access to the personal information we collect from you, details about how we have
              processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your
              consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law.
            </p>
            <p className="mt-3">
              To request to review, update, or delete your personal information, please visit{" "}
              <a href="/contact" className="font-medium text-slate-900 underline underline-offset-2">
                /contact
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </MarketingPageShell>
  );
}
