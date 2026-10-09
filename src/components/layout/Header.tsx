"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { HomeContent, NavDropdownData, NavItem } from "@/content";
import { BrandWordmark } from "@/components/icons/BrandWordmark";
import { BannerArrowIcon } from "@/components/icons/UiIcons";
import { buttonClass } from "@/components/ui/Button";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, HEADER_TRIGGERS } from "@/lib/animations";
import { lockScroll } from "@/lib/scroll";
import { DESKTOP_QUERY, useMediaQuery } from "@/lib/useMediaQuery";
import { NavDropdown } from "./NavDropdown";
import styles from "./Header.module.css";

const isDropdown = (item: NavItem): item is NavDropdownData => "columns" in item;

type Props = { content: Pick<HomeContent, "announcement" | "nav" | "brand"> };

export function Header({ content }: Props) {
  const { announcement, nav, brand } = content;
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery(DESKTOP_QUERY, true);
  const [bannerCollapsed, setBannerCollapsed] = useState(false);
  const [navSolid, setNavSolid] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);

  // Header state follows the hero: the banner collapses once the top 100svh is <80% visible, then the
  // navbar turns solid and the logo drops in once the hero is <61% visible (Webflow scroll offsets).
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      setBannerCollapsed(window.scrollY > vh * (1 - HEADER_TRIGGERS.bannerCollapse));
      setNavSolid(hero.getBoundingClientRect().bottom < vh * HEADER_TRIGGERS.navSolid);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Mobile menu open/close timeline (Webflow nav "default" slide + IX2 "Menu Open 3"/"Menu Close 3").
  useGSAP(
    () => {
      const menu = menuRef.current;
      const root = rootRef.current;
      if (!menu || !root || !menuMounted) return;
      const overlay = root.querySelector(`.${styles.mobileOverlay}`);
      const links = menu.querySelector(`.${styles.navLinks}`);
      const ctas = menu.querySelectorAll(`.${styles.ctaDiv} > *`);

      if (menuOpen) {
        gsap
          .timeline()
          .set(overlay, { display: "block" })
          .fromTo(menu, { yPercent: -100 }, { yPercent: 0, duration: 0.65, ease: EASE.outCubic }, 0)
          .fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: EASE.webflow }, 0)
          .fromTo(links, { y: "15rem" }, { y: 0, duration: 0.75, ease: EASE.outCubic }, 0)
          .fromTo(ctas, { y: "15rem", opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: EASE.outCubic }, 0.1);
      } else {
        gsap
          .timeline({ onComplete: () => setMenuMounted(false) })
          .to(menu, { yPercent: -100, duration: 0.65, ease: "power1.inOut" }, 0)
          .to(overlay, { opacity: 0, duration: 0.7, ease: EASE.inOutCubic }, 0.1)
          .set(overlay, { display: "none" }, 0.81)
          .set([menu, links, ...ctas], { clearProps: "transform,opacity" });
      }
    },
    { dependencies: [menuOpen, menuMounted], scope: rootRef },
  );

  useEffect(() => {
    if (!menuOpen) return;
    lockScroll(true);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Leaving the tablet layout while the menu is open resets it.
  useEffect(() => {
    if (!isDesktop) return;
    const id = requestAnimationFrame(() => {
      setMenuOpen(false);
      setMenuMounted(false);
    });
    return () => cancelAnimationFrame(id);
  }, [isDesktop]);

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuMounted(true);
      setMenuOpen(true);
    }
    setOpenDropdown(null);
  };

  return (
    <div ref={rootRef} className={styles.navbarDiv}>
      <a href={announcement.href} className={styles.banner} data-collapsed={bannerCollapsed}>
        <span className={styles.bannerClip}>
          <span className={styles.bannerContent}>
            <span>{announcement.label}</span>
            <span className={styles.bannerArrow}>
              <BannerArrowIcon width="100%" />
            </span>
          </span>
        </span>
      </a>

      <div className={styles.navbar} data-solid={navSolid} data-menu-open={menuOpen} role="banner">
        <div className={styles.container}>
          <Link href="#hero" className={styles.brand} aria-label={brand.homeLabel} style={{ opacity: menuOpen ? 0 : 1 }}>
            <span className={styles.logo}>
              <BrandWordmark name={brand.name} suffix={brand.suffix} label={brand.homeLabel} />
            </span>
          </Link>

          <nav
            ref={menuRef}
            className={styles.navMenu}
            data-open={menuMounted}
            aria-label={nav.label}
            id="main-menu"
          >
            <div className={styles.ddOverlay} data-visible={isDesktop && openDropdown !== null} />
            <div className={styles.navScrollWrap}>
              <Link href="#hero" className={styles.mobileBrand} aria-label={brand.homeLabel} onClick={() => setMenuOpen(false)}>
                <span className={styles.logo}>
                  <BrandWordmark name={brand.name} suffix={brand.suffix} label={brand.homeLabel} />
                </span>
              </Link>
              <div className={styles.navLinks}>
                {nav.items.map((item) =>
                  isDropdown(item) ? (
                    <NavDropdown
                      key={item.label}
                      data={item}
                      hoverEnabled={isDesktop}
                      onNavigate={() => setMenuOpen(false)}
                      open={openDropdown === item.label}
                      onOpenChange={(open) =>
                        setOpenDropdown((current) => (open ? item.label : current === item.label ? null : current))
                      }
                    />
                  ) : (
                    <a key={item.label} href={item.href} className={styles.navlink} onClick={() => setMenuOpen(false)}>
                      <span>{item.label}</span>
                    </a>
                  ),
                )}
              </div>
              <div className={styles.ctaDiv}>
                <a href={nav.demo.href} className={buttonClass("yellow", "nav")} onClick={() => setMenuOpen(false)}>
                  {nav.demo.label}
                </a>
                <Link
                  href={nav.languageSwitch.href}
                  className={buttonClass("blue", "nav", styles.langSwitch)}
                  aria-label={nav.languageSwitch.ariaLabel}
                  hrefLang={nav.languageSwitch.href.slice(1)}
                >
                  {nav.languageSwitch.label}
                </Link>
              </div>
            </div>
          </nav>

          <button
            type="button"
            className={styles.menuButton}
            aria-label={menuOpen ? nav.closeMenu : nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            onClick={toggleMenu}
          >
            <span className={styles.menuIconWrap} data-open={menuOpen}>
              <span className={styles.menuLine} />
              <span className={styles.menuLine} />
            </span>
          </button>
        </div>
      </div>
      <div className={styles.mobileOverlay} aria-hidden="true" />
    </div>
  );
}
