import Link from "next/link";
import { footer, lottie } from "@/content/home";
import { Wordmark } from "@/components/icons/Wordmark";
import { CurrentYear } from "./CurrentYear";
import { FooterMascot } from "./FooterMascot";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer id="site-footer" className={`section ${styles.footer}`}>
      <div className={styles.padding}>
        <div className={styles.container}>
          <nav className={styles.navDiv} aria-label="Footer">
            {footer.rows.map((row, index) => (
              <div key={index} className={styles.row}>
                {row.map((link) => (
                  <a key={link.label} href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
            <div className={styles.socials}>
              {footer.socials.map((social) => (
                <a key={social.label} href={social.href} className={styles.social} aria-label={social.label}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- tiny SVG icon */}
                  <img src={social.icon} alt="" width={27} height={27} />
                </a>
              ))}
            </div>
          </nav>
          <div className={`${styles.copyright} ${styles.year}`}>
            <div className={styles.copyrightTxt}>
              © <CurrentYear /> {footer.rights}
            </div>
          </div>
          <Link href="/" className={styles.logoLink} aria-label="Stuut home">
            <Wordmark />
          </Link>
          <div className={styles.copyright}>
            <div className={`${styles.copyrightTxt} ${styles.small}`}>{footer.backers}</div>
          </div>
        </div>
      </div>
      <FooterMascot src={lottie.footer} className={styles.lottie} />
    </footer>
  );
}
