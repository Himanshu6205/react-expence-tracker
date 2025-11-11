import { Mail, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-200 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Expense Calculator. All rights
          reserved.
        </p>

        <div className="flex items-center gap-6">
          <a
            href="mailto:youremail@example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition-colors flex items-center gap-1"
          >
            <Mail size={18} />
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
