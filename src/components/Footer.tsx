// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Unit Converter</h3>
            <p className="text-gray-400 text-sm">Convert between various units of measurement</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-4 pt-4 text-sm text-gray-400 text-center">
          <p>© 2025 Unit Converter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}