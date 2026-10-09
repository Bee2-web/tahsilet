import Link from "next/link";
import { lottie, type HomeContent } from "@/content";
import { BrandWordmark } from "@/components/icons/BrandWordmark";
import { CurrentYear } from "./CurrentYear";
import { FooterMascot } from "./FooterMascot";
import styles from "./Footer.module.css";

type Props = { content: Pick<HomeContent, "footer" | "brand" | "contactEmail"> };

export function Footer({ content }: Props) {
  const { footer, brand } = content;
  return (
    <footer id="site-footer" className={`section ${styles.footer}`}>
      <div className={styles.padding}>
        <div className={styles.container}>
          <div className={styles.about}>
            <p className={styles.tagline}>{footer.tagline}</p>
            <a className={styles.mail} href={`mailto:${content.contactEmail}`}>
              {content.contactEmail}
            </a>
          </div>
          <nav className={styles.navDiv} aria-label={footer.navLabel}>
            {footer.columns.map((column) => (
              <div key={column.title} className={styles.row}>
                <span className={styles.columnTitle}>{column.title}</span>
                {column.links.map((link) => (
                  <a key={link.label} href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
            <div className={styles.row}>
              <span className={styles.columnTitle}>{footer.languageTitle}</span>
              <Link href="/tr" className={styles.link} hrefLang="tr">
                Türkçe
              </Link>
              <Link href="/en" className={styles.link} hrefLang="en">
                English
              </Link>
            </div>
          </nav>
          <Link href="#hero" className={styles.logoLink} aria-label={brand.homeLabel}>
            <BrandWordmark name={brand.name} suffix={brand.suffix} label={brand.homeLabel} />
          </Link>
          <div className={styles.copyright}>
            <div className={`${styles.copyrightTxt} ${styles.small}`}>
              © <CurrentYear /> {footer.rights}
            </div>
            <div className={`${styles.copyrightTxt} ${styles.small}`}>{footer.madeIn}</div>
          </div>
        </div>
      </div>
      <FooterMascot src={lottie.footer} className={styles.lottie} />
    </footer>
  );
}
