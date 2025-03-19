import { SeoConfig } from '../services/seo.service';

export interface RouteSeoConfig {
  [route: string]: SeoConfig;
}

export const SEO_CONFIG: RouteSeoConfig = {
  '/': {
    title: 'Diffuze - Maîtrisez vos coûts de diffusion immobilière​',
    description:
      'Découvrez Diffuze, votre partenaire pour booster la visibilité de vos annonces immobilières sur plus de 50 plateformes, sans abonnement ni engagement.​',
    keywords:
      'immobilier, annonces, diffusion, sans abonnement, vente, location, booster la visibilité, coûts de diffusion',
    ogTitle: 'Diffuze - Maîtrisez vos coûts de diffusion immobilière​',
    ogDescription:
      'Découvrez Diffuze, votre partenaire pour booster la visibilité de vos annonces immobilières sur plus de 50 plateformes, sans abonnement ni engagement.​',
    ogImage: 'https://data.barnabe-immo.fr/img/google/paiement-immediat.jpeg',
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://www.diffuze.fr/',
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
            'https://www.linkedin.com/company/diffuze-immobilier',
            'https://www.instagram.com/diffuze.immo/',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            availableLanguage: 'French',
            url: 'https://app.lemcal.com/@diffuze/15min',
            contactOption: 'Prise de rendez-vous en ligne',
          },
        },
        {
          '@type': 'WebSite',
          '@id': 'https://www.diffuze.fr/',
          url: 'https://www.diffuze.fr/',
          name: 'DiffuZe. Immobilier',
          publisher: {
            '@id': 'https://www.diffuze.fr/',
          },
          potentialAction: {
            '@type': 'UseAction',
            target: 'https://www.diffuze.fr/notre-offre',
          },
        },
        {
          '@type': 'WebPage',
          '@id': 'https://www.diffuze.fr/',
          url: 'https://www.diffuze.fr/',
          name: "DiffuZe. Immobilier - Diffusion d'annonces immobilières sans abonnement",
          isPartOf: {
            '@id': 'https://www.diffuze.fr/',
          },
          about: {
            '@id': 'https://www.diffuze.fr/',
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
                url: 'https://www.diffuze.fr/notre-offre',
              },
              {
                '@type': 'Offer',
                name: 'Paiement au succès',
                description:
                  'Paiement au succès, en co-mandat et sans abonnement',
                url: 'https://www.diffuze.fr/notre-offre',
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
                text: 'Le paiement immédiat est un paiement unique sans abonnement. Vous payez une seule fois pour une diffusion de 60 jours sur plus de 50 plateformes immobiliers, avec possibilité de payer en 3 fois sans frais.',
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
          worstRating: '4',
          ratingCount: '20',
        },
      ],
    },
  },
  '/notre-offre': {
    title:
      "Nos Offres - Diffuze : Solutions de diffusion pour professionnels de l'immobilier​",
    description:
      'Explorez nos solutions de diffusion : paiement immédiat ou au succès, pour maximiser la visibilité de vos biens immobiliers tout en maîtrisant vos coûts.​',
    keywords:
      'services immobiliers, diffusion annonces, sans abonnement, coûts de diffusion, booster la visibilité, annonces immobilières',
    ogTitle:
      "Nos Offres - Diffuze : Solutions de diffusion pour professionnels de l'immobilier​",
    ogDescription:
      'Explorez nos solutions de diffusion : paiement immédiat ou au succès, pour maximiser la visibilité de vos biens immobiliers tout en maîtrisant vos coûts.​',
    structuredData: {
      '@context': 'http://schema.org',
      '@type': 'Product',
      name: "Diffusion d'annonces immobilières - DiffuZe",
      image: 'https://data.barnabe-immo.fr/img/google/paiement-immediat.jpeg',
      description:
        'Un prestataire unique pour prendre en charge la diffusion de votre annonce sur les plus grands portails immobiliers, sans abonnement',
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'EUR',
        offerCount: 2,
        offers: [
          {
            '@type': 'Offer',
            name: 'Paiement immédiat',
            description:
              'Diffusion de votre annonce sur les principaux portails immobiliers sans abonnement',
            price: '99',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            priceValidUntil: '2030-01-01',
            url: 'https://www.diffuze.fr/notre-offre',
            image:
              'https://data.barnabe-immo.fr/img/google/paiement-immediat.jpeg',
            itemOffered: {
              '@type': 'Service',
              name: 'Diffusion paiement immédiat',
              description:
                'Diffusion sur les portails immobiliers principaux sans abonnement',
              serviceOutput: 'Visibilité immobilière optimisée',
              provider: {
                '@type': 'Organization',
                name: 'DiffuZe. Immobilier',
              },
              serviceType: "Diffusion d'annonces immobilières",
              potentialAction: {
                '@type': 'UseAction',
                target: 'https://www.diffuze.fr/notre-offre',
              },
            },
            additionalProperty: [
              {
                '@type': 'PropertyValue',
                name: 'Portails inclus',
                value:
                  'SeLoger, Belles Demeures, Jinka, Gens de Confiance, Green-Acres',
              },
              {
                '@type': 'PropertyValue',
                name: 'Boost hebdomadaire de votre annonce',
                value: 'Oui',
              },
              {
                '@type': 'PropertyValue',
                name: 'Estimation en ligne',
                value: 'Grâce à notre outil gratuit en ligne',
              },
              {
                '@type': 'PropertyValue',
                name: 'Rédaction de votre annonce par IA',
                value: 'Grâce à notre outil gratuit en ligne',
              },

              {
                '@type': 'PropertyValue',
                name: 'Durée',
                value: '60 jours',
              },
            ],
          },
          {
            '@type': 'Offer',
            name: 'Paiement au succès',
            description:
              'Diffusion prioritaire avec photos professionnelles et visibilité accrue',
            price: '149',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            priceValidUntil: '2030-01-01',
            url: 'https://www.diffuze.fr/notre-offre',
            image:
              'https://data.barnabe-immo.fr/img/google/paiement-comandat.jpeg',
            itemOffered: {
              '@type': 'Service',
              name: 'Diffusion paiement au succès',
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
                target: 'https://www.diffuze.fr/notre-offre',
              },
            },
            additionalProperty: [
              {
                '@type': 'PropertyValue',
                name: 'Portails inclus',
                value:
                  'SeLoger, Belles Demeures, Jinka, Gens de Confiance, Green-Acres',
              },
              {
                '@type': 'PropertyValue',
                name: 'Nombre de photos',
                value: "Jusqu'à 20 photos",
              },
              {
                '@type': 'PropertyValue',
                name: 'Estimation en ligne',
                value: 'Grâce à notre outil gratuit en ligne',
              },
              {
                '@type': 'PropertyValue',
                name: 'Rédaction de votre annonce par IA',
                value: 'Grâce à notre outil gratuit en ligne',
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
        name: 'DiffuZe.',
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
        reviewCount: '20',
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
    title: 'Blog Diffuze - Actualités et conseils en diffusion immobilière​',
    description:
      "Consultez notre blog pour des actualités, conseils et astuces sur la diffusion d'annonces immobilières et les meilleures pratiques du secteur.​",
    keywords: 'blog immobilier, conseils immobiliers, actualités immobilières',
    ogTitle: 'Blog Immobilier - DiffuZe',
    ogDescription: "Découvrez nos articles sur l'immobilier",
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://www.diffuze.fr/blog/',
          url: 'https://www.diffuze.fr/blog/',
          name: 'Blog Immobilier - DiffuZe. Immobilier',
          isPartOf: {
            '@id': 'https://www.diffuze.fr/',
          },
          about: {
            '@type': 'Thing',
            name: 'Immobilier',
          },
          description:
            "Conseils, actualités et guides sur l'immobilier pour les professionnels et particuliers",
          breadcrumb: {
            '@id': 'https://www.diffuze.fr/blog/',
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.diffuze.fr/blog/',
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
          '@id': 'https://www.diffuze.fr/blog/',
          url: 'https://www.diffuze.fr/blog/',
          name: 'Blog Immobilier - DiffuZe',
          description:
            "Découvrez nos articles sur l'immobilier classés par catégories",
          isPartOf: {
            '@id': 'https://www.diffuze.fr/blog/',
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
              name: 'Conseils pour les vendeurs',
              url: 'https://www.diffuze.fr/blog/type/1',
              description:
                "Conseils pour les vendeurs, conseils pour les acquéreurs, conseils pour les professionnels de l'immobilier",
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
            'https://www.linkedin.com/company/diffuze-immobilier',
            'https://www.instagram.com/diffuze.immo/',
          ],
          publisher: {
            '@id': 'https://www.diffuze.fr/',
          },
        },
      ],
    },
  },
  '/annonces': {
    title: 'Annonces Immobilières - Trouvez votre bien idéal avec Diffuze',
    description:
      "Explorez notre sélection d'annonces immobilières de qualité, publiées par des professionnels de l'immobilier partenaires de Diffuze. Trouvez votre prochain bien facilement.",
    keywords:
      'annonces immobilières, recherche immobilière, biens à vendre, biens à louer, immobilier, DiffuZe',
    ogTitle: 'Annonces Immobilières - Trouvez votre bien idéal | Diffuze',
    ogDescription:
      "Explorez notre sélection d'annonces immobilières de qualité. Filtrez par type, prix, localisation et trouvez le bien qui répond à vos attentes.",
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://www.diffuze.fr/annonces/',
          url: 'https://www.diffuze.fr/annonces/',
          name: 'Annonces Immobilières - Trouvez votre bien idéal | Diffuze',
          description:
            "Recherchez parmi nos annonces immobilières de qualité, publiées par des professionnels de l'immobilier partenaires",
          isPartOf: {
            '@id': 'https://www.diffuze.fr/',
          },
          breadcrumb: {
            '@id': 'https://www.diffuze.fr/annonces/#breadcrumb',
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.diffuze.fr/annonces/#breadcrumb',
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
              name: 'Annonces Immobilières',
              item: 'https://www.diffuze.fr/annonces/',
            },
          ],
        },
        {
          '@type': 'SearchResultsPage',
          '@id': 'https://www.diffuze.fr/annonces/#searchresults',
          about: {
            '@type': 'RealEstateListing',
            name: 'Annonces immobilières',
          },
          mainContentOfPage: {
            '@type': 'WebPageElement',
            isPartOf: {
              '@id': 'https://www.diffuze.fr/annonces/',
            },
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate:
                'https://www.diffuze.fr/annonces/?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        },
        {
          '@type': 'ItemList',
          '@id': 'https://www.diffuze.fr/annonces/#listings',
          name: 'Annonces immobilières disponibles',
          description: 'Liste des biens immobiliers à vendre ou à louer',
          numberOfItems: '{{dynamicNumberOfItems}}',
          itemListOrder: 'https://schema.org/ItemListOrderDescending',
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: "Comment filtrer mes recherches d'annonces immobilières ?",
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Vous pouvez filtrer vos recherches par type de bien (appartement, maison, terrain), par prix, par surface, par nombre de pièces et par localisation pour trouver facilement le bien qui correspond à vos critères.',
              },
            },
            {
              '@type': 'Question',
              name: 'Les annonces sont-elles vérifiées ?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "Oui, toutes nos annonces sont publiées par des professionnels de l'immobilier partenaires de Diffuze. La qualité et la véracité des informations sont vérifiées avant publication.",
              },
            },
            {
              '@type': 'Question',
              name: "Comment contacter l'agent immobilier pour une annonce ?",
              acceptedAnswer: {
                '@type': 'Answer',
                text: "Sur la page détaillée de chaque annonce, vous trouverez les coordonnées de l'agent immobilier en charge du bien, ainsi qu'un formulaire de contact pour demander plus d'informations ou organiser une visite.",
              },
            },
          ],
        },
      ],
    },
    ogImage: 'https://data.barnabe-immo.fr/img/google/paiement-immediat.jpeg',
  },
  '/nos-partenaires': {
    title:
      'Avis Clients - Diffuze : Ils nous font confiance pour leur diffusion immobilière​​',
    description:
      "Découvrez les professionnels de l'immobilier qui ont choisi Diffuze pour optimiser la visibilité de leurs annonces et maîtriser leurs coûts de diffusion. Leur satisfaction est notre priorité !​",
    keywords:
      'partenaires, diffusion annonces, sans abonnement, coûts de diffusion, booster la visibilité, annonces immobilières',
    ogTitle:
      'Avis Clients - Diffuze : Ils nous font confiance pour leur diffusion immobilière​​',
    ogDescription:
      "Découvrez les professionnels de l'immobilier qui ont choisi Diffuze pour optimiser la visibilité de leurs annonces et maîtriser leurs coûts de diffusion. Leur satisfaction est notre priorité !​",
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://www.diffuze.fr/nos-partenaires/',
          url: 'https://www.diffuze.fr/nos-partenaires/',
          name: 'Avis Clients - Diffuze : Ils nous font confiance',
          isPartOf: {
            '@id': 'https://www.diffuze.fr/',
          },
          description:
            "Découvrez les professionnels de l'immobilier qui ont choisi Diffuze pour optimiser la visibilité de leurs annonces",
          breadcrumb: {
            '@id': 'https://www.diffuze.fr/nos-partenaires/',
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.diffuze.fr/nos-partenaires/',
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
              name: 'Avis Clients',
              item: 'https://www.diffuze.fr/nos-partenaires/',
            },
          ],
        },
        {
          '@type': 'ItemList',
          itemListElement: [
            {
              '@type': 'Review',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '5',
                bestRating: '5',
              },
              author: {
                '@type': 'Organization',
                name: 'Agence Century 21',
              },
              itemReviewed: {
                '@type': 'Service',
                name: "Diffusion d'annonces immobilières",
              },
              reviewBody:
                'Un outil simple, efficace et surtout adapté à nos besoins. La flexibilité des offres et la diffusion sur les grands portails immobiliers en font une solution incontournable pour les petites agences.',
            },
            {
              '@type': 'Review',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '5',
                bestRating: '5',
              },
              author: {
                '@type': 'Organization',
                name: 'Agence Laforêt',
              },
              itemReviewed: {
                '@type': 'Service',
                name: "Diffusion d'annonces immobilières",
              },
              reviewBody:
                "Simple, rapide et efficace. Tout ce qu'on attend d'un bon service de diffusion d'annonces immobilières ! Je recommande sans hésitation.",
            },
            {
              '@type': 'Review',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '4',
                bestRating: '5',
              },
              author: {
                '@type': 'Organization',
                name: 'TOC immobilier',
              },
              itemReviewed: {
                '@type': 'Service',
                name: "Diffusion d'annonces immobilières",
              },
              reviewBody:
                "Une solution parfaite pour les agences souhaitant optimiser leur budget tout en bénéficiant d'une visibilité sur les plus grands portails. Bravo pour cette initiative !",
            },
          ],
        },
        {
          '@type': 'AggregateRating',
          itemReviewed: {
            '@type': 'Service',
            name: "Diffusion d'annonces immobilières - DiffuZe",
            provider: {
              '@type': 'Organization',
              name: 'DiffuZe. Immobilier',
            },
          },
          ratingValue: '4.9',
          bestRating: '5',
          worstRating: '1',
          ratingCount: '42',
          reviewCount: '38',
        },
      ],
    },
  },
  '/conditions-generales​': {
    title:
      "Conditions Générales de Vente - Diffuze : Diffusion d'annonces immobilières​",
    description:
      "Prenez connaissance des conditions générales d'utilisation de Diffuze, votre service de diffusion d'annonces immobilières.​​",
  },
  '/protection-des-donnees​': {
    title: 'Protection des Données - Diffuze : Confidentialité et sécurité​',
    description:
      'Découvrez comment Diffuze protège vos données personnelles conformément aux réglementations en vigueur.​',
  },

  // Ajoutez d'autres routes selon vos besoins
};
