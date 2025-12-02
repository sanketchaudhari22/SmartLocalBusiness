import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-h4 text-white">LocalBiz</span>
            </div>
            <p className="text-sm text-neutral-400">
              Discover and book local services with ease. Connect with trusted businesses in your area.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/businesses" className="text-sm hover:text-primary-400 transition-colors">
                  Browse Businesses
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-sm hover:text-primary-400 transition-colors">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Business */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Business</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/businesses/create" className="text-sm hover:text-primary-400 transition-colors">
                  List Your Business
                </Link>
              </li>
              <li>
                <Link to="/my-businesses" className="text-sm hover:text-primary-400 transition-colors">
                  Manage Business
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm hover:text-primary-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm hover:text-primary-400 transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-primary-400" />
                <a href="mailto:info@localbiz.com" className="hover:text-primary-400 transition-colors">
                  info@localbiz.com
                </a>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-primary-400" />
                <a href="tel:+1234567890" className="hover:text-primary-400 transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-start space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5" />
                <span>123 Business St, Suite 100<br />City, State 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-neutral-400">
              © {currentYear} LocalBiz. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
