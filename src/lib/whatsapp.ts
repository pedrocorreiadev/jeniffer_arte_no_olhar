import { business, type Service } from "@/config/site";

export function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(price);
}

export function buildWhatsAppMessage(service?: Service | null) {
  if (!service) {
    return "Olá, Jeniffer! Tudo bem? Vim pelo seu site e gostaria de conhecer melhor seus serviços e consultar horários.";
  }

  return `Olá, Jeniffer! Tudo bem? Vim pelo seu site e gostaria de agendar um atendimento.

Serviço escolhido: ${service.name}
Valor: ${formatPrice(service.price)}

Quais horários você tem disponíveis?`;
}

export function buildWhatsAppUrl(service?: Service | null) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
    buildWhatsAppMessage(service)
  )}`;
}
