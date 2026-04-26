import Link from "next/link";

const FACEBOOK_URL =
  "https://www.facebook.com/Zaya-Projektowanie-Wn%C4%99trz-i-Ogrod%C3%B3w-593941440962918";
const INSTAGRAM_URL = "https://www.instagram.com/zayadesignstudio/";
const PHONE = "+48 512 722 365";
const ADDRESS = "ul. Cynamonowa 2, Jelenia Góra";

export function Footer() {
  return (
    <footer className="bg-charcoal text-stone-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <p className="text-white font-bold tracking-widest uppercase text-lg mb-2">
            Zaya Design
          </p>
          <p className="text-sm">Garden &amp; Interior Design Studio</p>
        </div>

        {/* Contact */}
        <div>
          <p className="text-white font-semibold mb-3 uppercase text-xs tracking-wider">
            Contact
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="hover:text-forest transition-colors">
                {PHONE}
              </a>
            </li>
            <li>{ADDRESS}</li>
          </ul>

          {/* Social links */}
          <div className="flex gap-4 mt-4">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zaya Design on Facebook"
              className="hover:text-forest transition-colors"
            >
              Facebook
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zaya Design on Instagram"
              className="hover:text-forest transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Legal */}
        <div>
          <p className="text-white font-semibold mb-3 uppercase text-xs tracking-wider">
            Legal
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/policy/cookies" className="hover:text-forest transition-colors">
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link href="/policy/privacy" className="hover:text-forest transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-xs text-stone-500 py-4">
        &copy; {new Date().getFullYear()} Zaya Design Studio. All rights reserved.
      </div>
    </footer>
  );
}
