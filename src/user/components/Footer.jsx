import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About Us Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p>
             details
            </p>
          </div>
          
          {/* Quick Links Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
            <ul>
              <li><a href="/about" className="hover:text-gray-400">About</a></li>
              <li><a href="/services" className="hover:text-gray-400">Services</a></li>
              <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
              <li><a href="/privacy" className="hover:text-gray-400">Privacy Policy</a></li>
            </ul>
          </div>
          
          {/* Contact & Social Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p>Urban Oak</p>
            <p>Email: urbanoak@gmail.com</p>
            <p>Phone: 9876543012</p>
            
            <div className="mt-4 flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p>&copy; 2024 Urban Oak. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
