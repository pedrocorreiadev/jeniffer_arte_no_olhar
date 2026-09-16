# Jeniffer Souza | Arte no Olhar

Site de portfólio profissional para Jeniffer Souza, especialista em cílios e sobrancelhas em Rio Branco - AC.

## Como executar

```bash
npm install
npm run dev
```

Depois abra `http://localhost:3000`.

Para verificar a versão de produção:

```bash
npm run build
npm run start
```

## Onde editar serviços, preços e links

As informações comerciais ficam em `src/config/site.ts`.

Edite nesse arquivo:

- Nome, marca, localização, Instagram e WhatsApp em `business`.
- Serviços e preços em `services`.
- Pares de antes/depois em `beforeAfterPairs`.
- Fotos extras da seção de antes/depois em `beforeAfterResults`.

Os preços são armazenados como números e formatados em BRL pelo site.

## Foto da Jeniffer

Coloque a foto original da proprietária em:

```text
public/images/perfil/jeniffer-souza.png
```

O projeto já está configurado com `business.ownerPhoto.available` como `true`.

## Fotos de antes e depois

Adicione imagens em:

```text
public/images/antes-depois/
```

Depois cadastre os caminhos em `src/config/site.ts`. Exemplo:

```ts
export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "sobrancelhas-01",
    beforeSrc: "/images/antes-depois/sobrancelhas-01-antes.jpg",
    afterSrc: "/images/antes-depois/sobrancelhas-01-depois.jpg",
    beforeAlt: "Antes do design de sobrancelhas",
    afterAlt: "Depois do design de sobrancelhas",
    category: "sobrancelhas",
    title: "Design de sobrancelhas"
  }
];
```

Quando houver apenas a foto do depois, cadastre em `beforeAfterResults`:

```ts
export const beforeAfterResults: BeforeAfterResult[] = [
  {
    id: "sobrancelhas-resultado-01",
    src: "/images/antes-depois/sobrancelhas-resultado-01.jpg",
    alt: "Resultado de design de sobrancelhas feito por Jeniffer Souza",
    category: "sobrancelhas",
    title: "Design de sobrancelhas",
    label: "Depois"
  }
];
```
