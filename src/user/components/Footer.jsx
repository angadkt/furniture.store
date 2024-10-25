import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-12">
  <div className="container mx-auto px-6 md:px-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
      
      {/* About Us Section */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">About Us</h2>
        <p className="text-gray-400 leading-relaxed">
          Urban Oak is a platform that provides world-class products and services to help you achieve the lifestyle you deserve. We focus on quality and satisfaction.
        </p>
      </div>
      
      {/* Quick Links Section */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Quick Links</h2>
        <ul className="space-y-2">
          <li><a href="/about" className="hover:text-blue-400 transition-colors">About</a></li>
          <li><a href="/services" className="hover:text-blue-400 transition-colors">Services</a></li>
          <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
          <li><a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
        </ul>
      </div>
      
      {/* Contact & Social Section */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Contact Us</h2>
        <p className="text-gray-400">Urban Oak</p>
        <p className="text-gray-400">Email: urbanoak@gmail.com</p>
        <p className="text-gray-400">Phone: 9876543012</p>
        
        <div className="mt-6 flex justify-center md:justify-start space-x-6">
          <a href="https://facebook.com" className="text-gray-400 hover:text-blue-500 transition-colors">
            <FaFacebook size={28} />
          </a>
          <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400 transition-colors">
            <FaTwitter size={28} />
          </a>
          <a href="https://instagram.com" className="text-gray-400 hover:text-pink-500 transition-colors">
            <FaInstagram size={28} />
          </a>
          <a href="https://linkedin.com" className="text-gray-400 hover:text-blue-600 transition-colors">
            <FaLinkedin size={28} />
          </a>
        </div>
      </div>

    </div>
    
    {/* Divider */}
    <div className="mt-12 border-t border-gray-700 pt-6 text-center">
      <p className="text-gray-500">&copy; 2024 Urban Oak. All rights reserved.</p>
    </div>
  </div>
</footer>

  );
};

export default Footer;
