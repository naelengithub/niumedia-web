"use client";
import SocialLinkRow from "./SocialLinkRow";

export default function Footer() {
  return (
    <footer className="flex flex-col">
      <div className="flex flex-col gap-6 pt-24 pb-12">
        <SocialLinkRow url="https://instagram.com" name="Instagram" />
        <SocialLinkRow url="https://facebook.com" name="Facebook" />
        <SocialLinkRow url="https://linkedin.com" name="LinkedIn" />
      </div>
      <p className="mb-5 text-center text-xs text-gray-300 -z-50">
        &copy; 2025 Niumedia. Derechos reservados.
        {/* <br />
        Web por{" "}
        <Link href="https://anaelisavargas.com" target="_blank">
          Ana Elisa
        </Link>
        . */}
      </p>
    </footer>
  );
}
