

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="shrink-0 border-t border-gray-200 bg-white">
      <div className="flex min-h-12 flex-col items-center justify-between gap-1 px-4 py-2.5 text-[11px] text-gray-400 sm:flex-row sm:px-5">
        {/* Copyright */}
        <p>
          © {currentYear}{" "}
          <span className="font-medium text-gray-600">
            DineFlow
          </span>
          . All rights reserved.
        </p>

        {/* Right */}
        <div className="flex items-center gap-3">
          <span>Restaurant POS</span>

          <span className="h-1 w-1 rounded-full bg-gray-300" />

          <span>v1.0.0</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
