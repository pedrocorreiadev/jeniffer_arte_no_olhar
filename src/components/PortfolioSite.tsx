"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  beforeAfterResults,
  beforeAfterPairs,
  business,
  services,
  type BeforeAfterPair,
  type BeforeAfterResult,
  type Service,
  type ServiceCategory
} from "@/config/site";
import { buildWhatsAppUrl, formatPrice } from "@/lib/whatsapp";

type LightboxImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title?: string;
};

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 3.25a8.6 8.6 0 0 0-7.39 13.02L3.75 20.5l4.33-.82A8.61 8.61 0 1 0 12 3.25Zm0 1.7a6.91 6.91 0 0 1 5.83 10.62 6.85 6.85 0 0 1-8.97 2.36l-.28-.16-2.56.49.5-2.5-.18-.29A6.91 6.91 0 0 1 12 4.95Zm-2.33 3.6c-.16 0-.42.06-.64.32-.22.27-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.67 2.67 4.12 3.64 2.03.8 2.45.64 2.89.6.44-.04 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.44-.54-.44h-.47Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7.7 3.75h8.6a3.96 3.96 0 0 1 3.95 3.95v8.6a3.96 3.96 0 0 1-3.95 3.95H7.7a3.96 3.96 0 0 1-3.95-3.95V7.7A3.96 3.96 0 0 1 7.7 3.75Zm0 1.75A2.2 2.2 0 0 0 5.5 7.7v8.6a2.2 2.2 0 0 0 2.2 2.2h8.6a2.2 2.2 0 0 0 2.2-2.2V7.7a2.2 2.2 0 0 0-2.2-2.2H7.7Zm4.3 3.05a3.45 3.45 0 1 1 0 6.9 3.45 3.45 0 0 1 0-6.9Zm0 1.75a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4Zm4.04-2.58a.82.82 0 1 1 0 1.64.82.82 0 0 1 0-1.64Z" />
    </svg>
  );
}

const navigation = [
  { href: "#servicos", label: "Serviços e valores" },
  { href: "#antes-depois", label: "Antes e depois" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" }
];

const categoryLabels: Record<ServiceCategory, string> = {
  sobrancelhas: "Sobrancelhas",
  cilios: "Cílios",
  combo: "Combo"
};

export default function PortfolioSite() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");

  const selectedService =
    services.find((service) => service.id === selectedServiceId) ?? null;

  const pageClassName = selectedService
    ? "site-shell has-mobile-booking"
    : "site-shell";

  return (
    <main className={pageClassName}>
      <Header selectedService={selectedService} />
      <Hero selectedService={selectedService} />
      <ServicesSection
        selectedServiceId={selectedServiceId}
        selectedService={selectedService}
        onSelect={setSelectedServiceId}
      />
      <BeforeAfterSection />
      <AboutSection />
      <ContactSection selectedService={selectedService} />
      <Footer selectedService={selectedService} />
      <FloatingWhatsApp selectedService={selectedService} />
      <MobileBookingBar selectedService={selectedService} />
    </main>
  );
}

function Header({ selectedService }: { selectedService: Service | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <a className="brand-mark" href="#inicio" aria-label="Ir para o início">
        <span>{business.ownerName}</span>
        <small>{business.brandName}</small>
      </a>

      <nav className="desktop-nav" aria-label="Navegação principal">
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <a className="button button-small button-primary" href="#servicos">
          Escolher meu serviço
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={isMenuOpen ? "mobile-menu is-open" : "mobile-menu"}
        id="mobile-menu"
      >
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
        <a
          className="button button-primary"
          href={buildWhatsAppUrl(selectedService)}
          target="_blank"
          rel="noreferrer"
          onClick={closeMenu}
        >
          <WhatsAppIcon />
          <span>Conversar no WhatsApp</span>
        </a>
      </div>
    </header>
  );
}

function Hero({ selectedService }: { selectedService: Service | null }) {
  return (
    <section className="hero-section section" id="inicio">
      <div className="hero-content">
        <p className="eyebrow">{business.positioning}</p>
        <h1>Seu olhar em destaque. Sua beleza em cada detalhe.</h1>
        <p className="hero-copy">
          Cílios Look Francês e design de sobrancelhas em Rio Branco - AC, para
          valorizar sua expressão.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#servicos">
            Ver serviços e valores
          </a>
          <a className="button button-secondary" href="#antes-depois">
            Ver antes e depois
          </a>
        </div>
        <div className="hero-meta" aria-label="Informações principais">
          <span>{business.specialty}</span>
          <span>{business.location}</span>
        </div>
      </div>

      <div className="portrait-card hero-portrait">
        <OwnerPortrait priority />
        <div className="portrait-caption">
          <span>{business.ownerName}</span>
          <small>{business.brandName}</small>
        </div>
      </div>

      <a
        className="hero-whatsapp"
        href={buildWhatsAppUrl(selectedService)}
        target="_blank"
        rel="noreferrer"
      >
        <WhatsAppIcon />
        <span>Conversar pelo WhatsApp</span>
      </a>
    </section>
  );
}

function ServicesSection({
  selectedServiceId,
  selectedService,
  onSelect
}: {
  selectedServiceId: string;
  selectedService: Service | null;
  onSelect: (serviceId: string) => void;
}) {
  return (
    <section className="section services-section" id="servicos">
      <div className="section-heading">
        <p className="eyebrow">Serviços e valores</p>
        <h2>Escolha o atendimento que combina com o resultado que você procura.</h2>
      </div>

      <div className="services-layout">
        <fieldset className="service-options">
          <legend className="sr-only">Selecione um serviço</legend>
          {services.map((service) => {
            const isSelected = selectedServiceId === service.id;

            return (
              <label
                className={isSelected ? "service-card is-selected" : "service-card"}
                key={service.id}
              >
                <input
                  checked={isSelected}
                  name="service"
                  onChange={() => onSelect(service.id)}
                  type="radio"
                  value={service.id}
                />
                <span className="service-card-top">
                  <span className="radio-indicator" aria-hidden="true" />
                  <span className="service-title-group">
                    {service.badge ? (
                      <span className="service-badge">{service.badge}</span>
                    ) : null}
                    <strong>{service.name}</strong>
                  </span>
                  <span className="selection-state">
                    {isSelected ? "Selecionado" : "Escolher"}
                  </span>
                </span>
                <span className="service-description">{service.description}</span>
                <span className="service-price">{formatPrice(service.price)}</span>
              </label>
            );
          })}
        </fieldset>

        <ServiceSummary selectedService={selectedService} />
      </div>
    </section>
  );
}

function ServiceSummary({
  selectedService
}: {
  selectedService: Service | null;
}) {
  return (
    <aside className="service-summary" aria-live="polite">
      <p className="summary-kicker">Resumo</p>
      {selectedService ? (
        <>
          <h3>{selectedService.name}</h3>
          <p className="summary-price">{formatPrice(selectedService.price)}</p>
          <a
            className="button button-primary summary-button"
            href={buildWhatsAppUrl(selectedService)}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon />
            <span>Consultar horários no WhatsApp</span>
          </a>
          <p className="summary-note">O horário será combinado pelo WhatsApp.</p>
        </>
      ) : (
        <>
          <h3>Escolha um serviço para consultar horários</h3>
          <p className="summary-placeholder">
            O serviço e o valor selecionados aparecerão aqui antes de abrir a
            conversa.
          </p>
          <button className="button button-primary summary-button" disabled type="button">
            <WhatsAppIcon />
            <span>Consultar horários no WhatsApp</span>
          </button>
        </>
      )}
    </aside>
  );
}

function BeforeAfterSection() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "todos">(
    "todos"
  );
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);

  const hasPhotos = beforeAfterPairs.length > 0 || beforeAfterResults.length > 0;
  const availableCategories = useMemo(() => {
    const categories = new Set<ServiceCategory>();
    beforeAfterPairs.forEach((pair) => categories.add(pair.category));
    beforeAfterResults.forEach((result) => categories.add(result.category));
    return Array.from(categories);
  }, []);

  const shouldShowFilters =
    hasPhotos &&
    availableCategories.length > 1 &&
    beforeAfterPairs.length + beforeAfterResults.length >= 4;

  const filteredPairs = beforeAfterPairs.filter(
    (pair) => activeCategory === "todos" || pair.category === activeCategory
  );
  const filteredResults = beforeAfterResults.filter(
    (result) => activeCategory === "todos" || result.category === activeCategory
  );

  useEffect(() => {
    if (!lightboxImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage]);

  return (
    <section className="section results-section" id="antes-depois">
      <div className="section-heading">
        <p className="eyebrow">Antes e depois</p>
        <h2>Registros reais para comparar a valorização do olhar.</h2>
      </div>

      {!hasPhotos ? (
        <div className="empty-media-panel">
          <p>
            Os registros de antes e depois serão publicados aqui em breve.
            Enquanto isso, conheça o portfólio pelo Instagram.
          </p>
          <a
            className="button button-secondary"
            href={business.instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon />
            <span>Ver Instagram</span>
          </a>
        </div>
      ) : (
        <>
          {shouldShowFilters ? (
            <div className="filter-tabs" aria-label="Filtrar resultados">
              <button
                className={activeCategory === "todos" ? "is-active" : ""}
                type="button"
                onClick={() => setActiveCategory("todos")}
              >
                Todos
              </button>
              {availableCategories.map((category) => (
                <button
                  className={activeCategory === category ? "is-active" : ""}
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>
          ) : null}

          <div className="gallery-grid">
            {filteredPairs.map((pair) => (
              <BeforeAfterCard
                key={pair.id}
                pair={pair}
                onOpen={setLightboxImage}
              />
            ))}
            {filteredResults.map((result) => (
              <AfterResultCard
                key={result.id}
                result={result}
                onOpen={setLightboxImage}
              />
            ))}
          </div>
        </>
      )}

      {lightboxImage ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImage.title ?? lightboxImage.alt}
        >
          <button
            className="lightbox-close"
            type="button"
            onClick={() => setLightboxImage(null)}
          >
            Fechar
          </button>
          <div className="lightbox-frame">
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              width={lightboxImage.width}
              height={lightboxImage.height}
              sizes="100vw"
              className="lightbox-image"
            />
          </div>
          {lightboxImage.title ? <p>{lightboxImage.title}</p> : null}
        </div>
      ) : null}
    </section>
  );
}

function AfterResultCard({
  result,
  onOpen
}: {
  result: BeforeAfterResult;
  onOpen: (image: LightboxImage) => void;
}) {
  return (
    <button
      className="after-result-card"
      type="button"
      onClick={() =>
        onOpen({
          src: result.src,
          alt: result.alt,
          width: result.width,
          height: result.height,
          title: result.title
        })
      }
    >
      <span className="after-result-media">
        <Image
          src={result.src}
          alt={result.alt}
          width={result.width}
          height={result.height}
          sizes="(min-width: 900px) 18vw, 100vw"
          loading="lazy"
          className="result-image"
        />
        <span>{result.label}</span>
      </span>
      <strong>{result.title}</strong>
    </button>
  );
}

function BeforeAfterCard({
  pair,
  onOpen
}: {
  pair: BeforeAfterPair;
  onOpen: (image: LightboxImage) => void;
}) {
  return (
    <article className="before-after-card">
      <h3>{pair.title}</h3>
      <div className="before-after-grid">
        <button
          type="button"
          onClick={() =>
            onOpen({
              src: pair.before.src,
              alt: pair.before.alt,
              width: pair.before.width,
              height: pair.before.height,
              title: `${pair.title} - Antes`
            })
          }
        >
          <Image
            src={pair.before.src}
            alt={pair.before.alt}
            width={pair.before.width}
            height={pair.before.height}
            sizes="(min-width: 900px) 10vw, 50vw"
            loading="lazy"
            className="result-image"
          />
          <span>Antes</span>
        </button>
        <button
          type="button"
          onClick={() =>
            onOpen({
              src: pair.after.src,
              alt: pair.after.alt,
              width: pair.after.width,
              height: pair.after.height,
              title: `${pair.title} - Depois`
            })
          }
        >
          <Image
            src={pair.after.src}
            alt={pair.after.alt}
            width={pair.after.width}
            height={pair.after.height}
            sizes="(min-width: 900px) 10vw, 50vw"
            loading="lazy"
            className="result-image"
          />
          <span>Depois</span>
        </button>
      </div>
    </article>
  );
}

function AboutSection() {
  return (
    <section className="section about-section" id="sobre">
      <div className="portrait-card about-portrait">
        <OwnerPortrait />
      </div>
      <div className="about-copy">
        <p className="eyebrow">Sobre</p>
        <h2>Jeniffer Souza</h2>
        <p>
          Sou Jeniffer Souza e meu trabalho é valorizar a beleza do olhar. Atuo
          com Cílios Look Francês e design de sobrancelhas em Rio Branco - AC.
          Conheça os serviços e entre em contato para conversar sobre o resultado
          que você procura.
        </p>
        <a className="button button-primary" href="#servicos">
          Escolher meu serviço
        </a>
      </div>
    </section>
  );
}

function ContactSection({
  selectedService
}: {
  selectedService: Service | null;
}) {
  return (
    <section className="section contact-section" id="contato">
      <div className="contact-card">
        <p className="eyebrow">Contato</p>
        <h2>Vamos valorizar o seu olhar?</h2>
        <p>
          Selecione um serviço e consulte horários diretamente pelo WhatsApp. O
          atendimento é combinado por conversa, sem cadastro no site.
        </p>
        <div className="contact-actions">
          <a
            className="button button-primary"
            href={buildWhatsAppUrl(selectedService)}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon />
            <span>Chamar no WhatsApp</span>
          </a>
          <a
            className="button button-secondary"
            href={business.instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon />
            <span>Ver Instagram</span>
          </a>
        </div>
        <dl className="contact-details">
          <div>
            <dt>Localização</dt>
            <dd>{business.location}</dd>
          </div>
          <div>
            <dt>Especialidade</dt>
            <dd>{business.specialty}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function Footer({ selectedService }: { selectedService: Service | null }) {
  return (
    <footer className="site-footer">
      <div>
        <strong>{business.ownerName}</strong>
        <span>{business.brandName}</span>
      </div>
      <nav aria-label="Links sociais">
        <a
          className="social-link"
          href={business.instagramUrl}
          target="_blank"
          rel="noreferrer"
        >
          <InstagramIcon />
          <span>Instagram</span>
        </a>
        <a
          className="social-link"
          href={buildWhatsAppUrl(selectedService)}
          target="_blank"
          rel="noreferrer"
        >
          <WhatsAppIcon />
          <span>WhatsApp</span>
        </a>
      </nav>
    </footer>
  );
}

function FloatingWhatsApp({
  selectedService
}: {
  selectedService: Service | null;
}) {
  return (
    <a
      className="floating-whatsapp"
      href={buildWhatsAppUrl(selectedService)}
      target="_blank"
      rel="noreferrer"
    >
      <WhatsAppIcon />
      <span>WhatsApp</span>
    </a>
  );
}

function MobileBookingBar({
  selectedService
}: {
  selectedService: Service | null;
}) {
  if (!selectedService) {
    return null;
  }

  return (
    <div className="mobile-booking-bar" role="region" aria-label="Serviço selecionado">
      <div>
        <span>{selectedService.shortName}</span>
        <strong>{formatPrice(selectedService.price)}</strong>
      </div>
      <a
        className="button button-primary"
        href={buildWhatsAppUrl(selectedService)}
        target="_blank"
        rel="noreferrer"
      >
        <WhatsAppIcon />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}

function OwnerPortrait({ priority = false }: { priority?: boolean }) {
  if (business.ownerPhoto.available) {
    return (
      <Image
        src={business.ownerPhoto.src}
        alt={business.ownerPhoto.alt}
        width={business.ownerPhoto.width}
        height={business.ownerPhoto.height}
        sizes="(min-width: 900px) 42vw, 100vw"
        priority={priority}
        className="portrait-image"
      />
    );
  }

  return (
    <div className="portrait-fallback" aria-label={business.ownerPhoto.alt}>
      <span>{business.brandName}</span>
      <strong>{business.ownerName}</strong>
      <small>{business.specialty}</small>
    </div>
  );
}
