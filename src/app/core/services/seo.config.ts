import { SeoConfig } from '../services/seo.service';

export interface RouteSeoConfig {
  [route: string]: SeoConfig;
}

export const SEO_CONFIG: RouteSeoConfig = {
  '/': {
    title: 'DiffuZe. Immobilier - Accueil',
    description:
      "Page d'accueil de DiffuZe. Immobilier - Diffusez vos annonces immobilières sans abonnement",
    keywords:
      'immobilier, annonces, diffusion, sans abonnement, vente, location',
    ogTitle: 'DiffuZe. Immobilier - Accueil',
    ogDescription:
      "Découvrez nos services professionnels de diffusion d'annonces immobilières",
    ogImage: 'https://www.diffuze.fr/assets/img/photo/banniere.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://www.diffuze.fr/#organization',
          name: 'DiffuZe. Immobilier',
          url: 'https://www.diffuze.fr/',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.diffuze.fr/assets/img/logo/logo.png',
            width: 180,
            height: 60,
          },
          description:
            "Service de diffusion d'annonces immobilières sans abonnement pour les professionnels",
          sameAs: [
            'https://www.facebook.com/diffuze.immobilier',
            'https://www.linkedin.com/company/diffuze-immobilier',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+33XXXXXXXXX',
            contactType: 'customer service',
            availableLanguage: 'French',
          },
        },
        {
          '@type': 'WebSite',
          '@id': 'https://www.diffuze.fr/#website',
          url: 'https://www.diffuze.fr/',
          name: 'DiffuZe. Immobilier',
          publisher: {
            '@id': 'https://www.diffuze.fr/#organization',
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.diffuze.fr/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        },
        {
          '@type': 'WebPage',
          '@id': 'https://www.diffuze.fr/#webpage',
          url: 'https://www.diffuze.fr/',
          name: "DiffuZe. Immobilier - Diffusion d'annonces immobilières sans abonnement",
          isPartOf: {
            '@id': 'https://www.diffuze.fr/#website',
          },
          about: {
            '@id': 'https://www.diffuze.fr/#organization',
          },
          description:
            "Diffusez vos annonces immobilières sur plus de 50 plateformes sans abonnement. Solutions pour professionnels de l'immobilier.",
        },
        {
          '@type': 'Service',
          name: "Diffusion d'annonces immobilières",
          description:
            'Un prestataire unique pour prendre en charge la diffusion de votre annonce sur les plus grands portails immobiliers, sans abonnement',
          provider: {
            '@id': 'https://www.diffuze.fr/#organization',
          },
          serviceType: 'Diffusion immobilière',
          areaServed: 'France',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: "Services de diffusion d'annonces",
            itemListElement: [
              {
                '@type': 'Offer',
                name: 'Paiement immédiat',
                description: 'Paiement immédiat, unique et sans abonnement',
                url: 'https://www.diffuze.fr/service',
              },
              {
                '@type': 'Offer',
                name: 'Paiement au succès',
                description:
                  'Paiement au succès, en co-mandat et sans abonnement',
                url: 'https://www.diffuze.fr/service',
              },
            ],
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Sur quelles plateformes sont diffusées mes annonces ?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "Vos annonces sont diffusées sur plus de 50 plateformes immobilières incluant SeLoger, LeBonCoin, Belles Demeures, Jinka, Gens de Confiance, Green-Acres et bien d'autres portails de référence.",
              },
            },
            {
              '@type': 'Question',
              name: 'Comment fonctionne le paiement immédiat ?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Le paiement immédiat est un paiement unique sans abonnement. Vous payez une seule fois pour une diffusion de 60 jours sur plus de 20 portails immobiliers, avec possibilité de payer en 3 fois sans frais.',
              },
            },
            {
              '@type': 'Question',
              name: 'Comment fonctionne le paiement au succès ?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "Avec le paiement au succès, les frais de diffusion sont offerts. Vous ne payez qu'en cas de vente, selon un barème dégressif, sans avance ni engagement. La diffusion est illimitée jusqu'à la vente du bien.",
              },
            },
          ],
        },
        {
          '@type': 'AggregateRating',
          itemReviewed: {
            '@type': 'Organization',
            name: 'DiffuZe. Immobilier',
          },
          ratingValue: '4.9',
          bestRating: '5',
          worstRating: '1',
          ratingCount: '120',
        },
      ],
    },
  },
  '/service': {
    title: 'Nos Services - DiffuZe. Immobilier',
    description:
      "Découvrez nos services de diffusion d'annonces immobilières sans abonnement",
    keywords: 'services immobiliers, diffusion annonces, sans abonnement',
    ogTitle: 'Nos Services - DiffuZe. Immobilier',
    ogDescription:
      'Services professionnels pour diffuser vos annonces immobilières',
    structuredData: {
      '@context': 'http://schema.org',
      '@type': 'Product',
      name: "Diffusion d'annonces immobilières - DiffuZe",
      image: 'https://www.diffuze.fr/assets/img/photo/photo4.jpg',
      description:
        'Un prestataire unique pour prendre en charge la diffusion de votre annonce sur les plus grands portails immobiliers, sans abonnement',
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'EUR',
        offerCount: 2,
        offers: [
          {
            '@type': 'Offer',
            name: 'Offre Standard',
            description:
              'Diffusion de votre annonce sur les principaux portails immobiliers',
            price: '99',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            priceValidUntil: '2030-01-01',
            url: 'https://www.diffuze.fr/service/standard',
            itemOffered: {
              '@type': 'Service',
              name: 'Diffusion Standard',
              description: 'Diffusion sur les portails immobiliers principaux',
              serviceOutput: 'Visibilité immobilière optimisée',
              provider: {
                '@type': 'Organization',
                name: 'DiffuZe. Immobilier',
              },
              serviceType: "Diffusion d'annonces immobilières",
              potentialAction: {
                '@type': 'UseAction',
                target: 'https://www.diffuze.fr/service/standard',
              },
            },
            additionalProperty: [
              {
                '@type': 'PropertyValue',
                name: 'Portails inclus',
                value: 'SeLoger, LeBonCoin, Jinka, Gens de Confiance',
              },
              {
                '@type': 'PropertyValue',
                name: 'Nombre de photos',
                value: "Jusqu'à 10 photos",
              },
              {
                '@type': 'PropertyValue',
                name: 'Durée',
                value: 'Sans limite de temps',
              },
            ],
          },
          {
            '@type': 'Offer',
            name: 'Offre Premium',
            description:
              'Diffusion prioritaire avec photos professionnelles et visibilité accrue',
            price: '149',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            priceValidUntil: '2030-01-01',
            url: 'https://www.diffuze.fr/service/premium',
            itemOffered: {
              '@type': 'Service',
              name: 'Diffusion Premium',
              description:
                'Diffusion prioritaire sur tous les portails immobiliers premium',
              serviceOutput: 'Visibilité immobilière maximale',
              provider: {
                '@type': 'Organization',
                name: 'DiffuZe. Immobilier',
              },
              serviceType: "Diffusion d'annonces immobilières premium",
              potentialAction: {
                '@type': 'UseAction',
                target: 'https://www.diffuze.fr/service/premium',
              },
            },
            additionalProperty: [
              {
                '@type': 'PropertyValue',
                name: 'Portails premium inclus',
                value:
                  'SeLoger, LeBonCoin, Belles Demeures, Jinka, Gens de Confiance, Green-Acres',
              },
              {
                '@type': 'PropertyValue',
                name: 'Nombre de photos',
                value: "Jusqu'à 20 photos",
              },
              {
                '@type': 'PropertyValue',
                name: 'Boost hebdomadaire',
                value: 'Inclus',
              },
              {
                '@type': 'PropertyValue',
                name: 'Durée',
                value: 'Sans limite de temps',
              },
            ],
          },
        ],
      },
      brand: {
        '@type': 'Brand',
        name: 'DiffuZe. Immobilier',
      },
      positiveNotes: {
        '@type': 'ItemList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Paiement immédiat, unique et sans abonnement',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Paiement au succès, en co-mandat et sans abonnement',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: "Diffusion sur l'ensemble des plateformes immobilières",
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Assistance technique et juridique 6j/7',
          },
        ],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '120',
      },
      mainEntityOfPage: {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quelles sont les différences entre les offres Standard et Premium ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "L'offre Standard inclut une diffusion sur les principaux portails immobiliers avec jusqu'à 10 photos, tandis que l'offre Premium ajoute des plateformes exclusives comme Belles Demeures et Green-Acres, jusqu'à 20 photos et un boost hebdomadaire pour une visibilité maximale.",
            },
          },
          {
            '@type': 'Question',
            name: 'Comment fonctionne le paiement au succès ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Avec le paiement au succès, les frais de diffusion sont offerts. Vous ne payez qu'en cas de vente, selon un barème dégressif (de 8% à 2% pour les mandats simples et de 6% à 1% pour les mandats exclusifs), sans avance ni engagement. La diffusion est illimitée jusqu'à la vente du bien.",
            },
          },
          {
            '@type': 'Question',
            name: 'Puis-je modifier mon annonce après sa publication ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Oui, vous pouvez effectuer des modifications illimitées sur vos annonces, directement depuis votre espace DiffuZe ou votre logiciel métier. Les mises à jour sont synchronisées sur toutes les plateformes de diffusion.',
            },
          },
          {
            '@type': 'Question',
            name: 'Sur quelles plateformes premium mes annonces seront-elles diffusées ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Avec l'offre Premium, vos annonces sont diffusées sur des plateformes exclusives comme SeLoger, LeBonCoin, Belles Demeures, Jinka, Gens de Confiance et Green-Acres, en plus des autres portails immobiliers de référence.",
            },
          },
          {
            '@type': 'Question',
            name: 'Quelle est la durée de diffusion de mes annonces ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Pour le paiement immédiat, la durée de diffusion est de 60 jours, renouvelable. Pour le paiement au succès, la diffusion est illimitée jusqu'à la vente du bien.",
            },
          },
        ],
      },
    },
  },
  '/blog': {
    title: 'Blog Immobilier - DiffuZe. Immobilier',
    description: "Conseils, actualités et guides sur l'immobilier",
    keywords: 'blog immobilier, conseils immobiliers, actualités immobilières',
    ogTitle: 'Blog Immobilier - DiffuZe',
    ogDescription: "Découvrez nos articles sur l'immobilier",
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://www.diffuze.fr/blog/#webpage',
          url: 'https://www.diffuze.fr/blog/',
          name: 'Blog Immobilier - DiffuZe. Immobilier',
          isPartOf: {
            '@id': 'https://www.diffuze.fr/#website',
          },
          about: {
            '@type': 'Thing',
            name: 'Immobilier',
          },
          description:
            "Conseils, actualités et guides sur l'immobilier pour les professionnels et particuliers",
          breadcrumb: {
            '@id': 'https://www.diffuze.fr/blog/#breadcrumb',
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.diffuze.fr/blog/#breadcrumb',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Accueil',
              item: 'https://www.diffuze.fr/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blog',
              item: 'https://www.diffuze.fr/blog/',
            },
          ],
        },
        {
          '@type': 'CollectionPage',
          '@id': 'https://www.diffuze.fr/blog/#collectionpage',
          url: 'https://www.diffuze.fr/blog/',
          name: 'Blog Immobilier - DiffuZe',
          description:
            "Découvrez nos articles sur l'immobilier classés par catégories",
          isPartOf: {
            '@id': 'https://www.diffuze.fr/blog/#webpage',
          },
          about: {
            '@type': 'Thing',
            name: 'Immobilier',
          },
        },
        {
          '@type': 'ItemList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Tendances du marché',
              url: 'https://www.diffuze.fr/blog/type/1',
              description:
                'Les dernières tendances, conseils et analyses du marché immobilier',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Plateformes immobilières',
              url: 'https://www.diffuze.fr/blog/type/2',
              description:
                'Les plateformes et professionnels qui façonnent le marché immobilier',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Actualités immobilières',
              url: 'https://www.diffuze.fr/blog/type/3',
              description: "Les dernières actualités sur l'immobilier",
            },
          ],
        },
        {
          '@type': 'Blog',
          headline: 'Blog Immobilier DiffuZe',
          name: 'Blog DiffuZe',
          description:
            "Conseils, actualités et guides sur l'immobilier pour les professionnels",
          url: 'https://www.diffuze.fr/blog/',
          sameAs: [
            'https://www.facebook.com/diffuze.immobilier',
            'https://www.linkedin.com/company/diffuze-immobilier',
          ],
          publisher: {
            '@id': 'https://www.diffuze.fr/#organization',
          },
          blogPost: [
            {
              '@type': 'BlogPosting',
              headline: "Guide du vendeur : Tout ce qu'il faut savoir",
              description:
                'Découvrez tous les incontournables de la vente immobilière dans notre guide complet.',
              image: 'https://www.diffuze.fr/assets/img/photo/photo12.jpg',
              url: 'https://www.diffuze.fr/blog/article/guide-du-vendeur',
              datePublished: '2023-09-15T08:00:00+01:00',
              dateModified: '2023-09-15T08:00:00+01:00',
              author: {
                '@type': 'Person',
                name: 'Équipe DiffuZe',
              },
              publisher: {
                '@id': 'https://www.diffuze.fr/#organization',
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://www.diffuze.fr/blog/article/guide-du-vendeur',
              },
              articleSection: 'Tendances du marché',
            },
            {
              '@type': 'BlogPosting',
              headline: 'Les meilleures plateformes immobilières en 2023',
              description:
                'Découvrez notre classement des plateformes immobilières les plus performantes cette année.',
              image: 'https://www.diffuze.fr/assets/img/photo/photo8.jpg',
              url: 'https://www.diffuze.fr/blog/article/meilleures-plateformes',
              datePublished: '2023-08-22T10:30:00+01:00',
              dateModified: '2023-08-22T10:30:00+01:00',
              author: {
                '@type': 'Person',
                name: 'Équipe DiffuZe',
              },
              publisher: {
                '@id': 'https://www.diffuze.fr/#organization',
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id':
                  'https://www.diffuze.fr/blog/article/meilleures-plateformes',
              },
              articleSection: 'Plateformes immobilières',
            },
            {
              '@type': 'BlogPosting',
              headline: 'Évolution des prix immobiliers : tendances actuelles',
              description:
                'Analyse des dernières tendances du marché immobilier et prévisions pour les mois à venir.',
              image: 'https://www.diffuze.fr/assets/img/photo/photo5.jpg',
              url: 'https://www.diffuze.fr/blog/article/evolution-prix',
              datePublished: '2023-07-10T09:15:00+01:00',
              dateModified: '2023-07-10T09:15:00+01:00',
              author: {
                '@type': 'Person',
                name: 'Équipe DiffuZe',
              },
              publisher: {
                '@id': 'https://www.diffuze.fr/#organization',
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://www.diffuze.fr/blog/article/evolution-prix',
              },
              articleSection: 'Actualités immobilières',
            },
          ],
        },
      ],
    },
  },
  // Ajoutez d'autres routes selon vos besoins
};
