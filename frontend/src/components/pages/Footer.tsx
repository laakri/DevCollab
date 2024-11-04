import { Code2 } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Features", href: "#" },
    { label: "Security", href: "#" },
    { label: "Roadmap", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Integrations", href: "#" },
  ],
  Resources: [
    { label: "Blog", href: "#" },
    { label: "Documentation", href: "#" },
    { label: "Guides", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Community", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Partners", href: "#" },
    { label: "News", href: "#" },
  ],
  // Legal: [
  //   { label: "Privacy", href: "#" },
  //   { label: "Terms", href: "#" },
  //   { label: "Cookie Policy", href: "#" },
  //   { label: "Licenses", href: "#" },
  //   { label: "Settings", href: "#" },
  // ],
};

const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Discord", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/95 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12">
          {/* Logo and Description */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">DevCollab</span>
              </div>
              <p className="text-muted-foreground max-w-sm">
                Connect with developers worldwide, exchange knowledge, and grow
                together through peer-to-peer learning.
              </p>
              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold mb-4">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Subscription */}
          <div className="border-t border-border/50 pt-8 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-semibold mb-2">Stay up to date</h3>
                <p className="text-muted-foreground">
                  Get the latest updates on features and community events.
                </p>
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-md border border-border/50 bg-background/50 px-4 py-2"
                />
                <button className="bg-primary text-primary-foreground rounded-md px-4 py-2 hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DevCollab. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
