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
  title?: string;
};

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
          Conversar no WhatsApp
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
        Conversar pelo WhatsApp
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
            Consultar horários no WhatsApp
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
            Consultar horários no WhatsApp
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
            Ver Instagram
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
              fill
              sizes="100vw"
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
        onOpen({ src: result.src, alt: result.alt, title: result.title })
      }
    >
      <span className="after-result-media">
        <Image
          src={result.src}
          alt={result.alt}
          fill
          sizes="(min-width: 900px) 32vw, 100vw"
          loading="lazy"
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
              src: pair.beforeSrc,
              alt: pair.beforeAlt,
              title: `${pair.title} - Antes`
            })
          }
        >
          <Image
            src={pair.beforeSrc}
            alt={pair.beforeAlt}
            fill
            sizes="(min-width: 900px) 20vw, 50vw"
            loading="lazy"
          />
          <span>Antes</span>
        </button>
        <button
          type="button"
          onClick={() =>
            onOpen({
              src: pair.afterSrc,
              alt: pair.afterAlt,
              title: `${pair.title} - Depois`
            })
          }
        >
          <Image
            src={pair.afterSrc}
            alt={pair.afterAlt}
            fill
            sizes="(min-width: 900px) 20vw, 50vw"
            loading="lazy"
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
            Chamar no WhatsApp
          </a>
          <a
            className="button button-secondary"
            href={business.instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            Ver Instagram
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
        <a href={business.instagramUrl} target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href={buildWhatsAppUrl(selectedService)} target="_blank" rel="noreferrer">
          WhatsApp
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
      WhatsApp
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
        WhatsApp
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
        fill
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
