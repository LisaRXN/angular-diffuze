import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, from, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrerenderService {
  // Simulons une base de données d'articles
  private articles = [
    {
      id: '1',
      url:'annonces-immobilieres-sans-abonnement',
      article_title: 'Belles Demeures : déposer une annonce pour votre bien immobilier haut-de-gamme',
      type_article: 1,
      author:"Victor, expert en transaction immobilière",
      article_preview:"assets/img/photo/property.png",
      article_description:"<p class='lead'> <strong> La <strong>gestion locative</strong> est une alternative salvatrice pour les <strong>propriétaires</strong> de <strong>bien immobilier</strong>. Elle leur permet de se libérer de nombreuses tâches chronophages et de pouvoir s’occuper d’autres activités. Découvrez sans plus attendre comment sont gérés les biens immobiliers par les <strong>agences immobilières</strong> à <strong>Montreuil</strong>, ainsi que les avantages et étapes à connaitre. </strong> </p>",
      creation_date:"2025-01-19 10:12:14",
      reading_time:5,
      html_code:"<div class='single-post-text my-3'> <div fxLayout='column' class='section-guide' fxLayoutAlign='center center' > <div class='article-text' fxFlex='70'> <h2 class='article-guide-title2'> Qu’est-ce que la gestion locative ? Définition </h2> <p> La <strong>gestion locative immobilière</strong> englobe la totalité des opérations liées à l’administration d’un <strong>bien immobilier</strong> en location. Il s’agit de toutes les démarches qui sont effectuées avant, pendant et en sortie de location. La <strong>gestion</strong> de bien immobilier est prise en charge par des agents immobiliers comme l’agence <a href='https://www.immobilier-surmesure.com/agences/agence-immobiliere-montreuil/' target='_blank' rel='external' > Immobilier sur Mesure à Montreuil</a >. </p> <p> Le <strong>gestionnaire de bien</strong> est sollicité par les propriétaires afin de se faire confier la gérance locative de leurs biens immobiliers. Les propriétaires peuvent ensuite continuer à louer leurs biens immobiliers sans se soucier des opérations administratives. Elles sont désormais à la charge du <strong>mandataire location</strong>. </p> </div> ",
      content:
        "Contenu 1 de l'article 1 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: '2',
      url:'annonces-immobilieres-sans-abonnement',
      article_title: 'Article 2',
      type_article: 1,
      author:"Victor, expert en transaction immobilière",   
      article_preview:"assets/img/photo/property.png",  
      article_description:"<p class='lead'> <strong> La <strong>gestion locative</strong> est une alternative salvatrice pour les <strong>propriétaires</strong> de <strong>bien immobilier</strong>. Elle leur permet de se libérer de nombreuses tâches chronophages et de pouvoir s’occuper d’autres activités. Découvrez sans plus attendre comment sont gérés les biens immobiliers par les <strong>agences immobilières</strong> à <strong>Montreuil</strong>, ainsi que les avantages et étapes à connaitre. </strong> </p>",
      creation_date:"2025-01-19 10:12:14",
      reading_time:4,
      html_code:"<div class='single-post-text my-3'> <div fxLayout='column' class='section-guide' fxLayoutAlign='center center' > <div class='article-text' fxFlex='70'> <h2 class='article-guide-title2'> Qu’est-ce que la gestion locative ? Définition </h2> <p> La <strong>gestion locative immobilière</strong> englobe la totalité des opérations liées à l’administration d’un <strong>bien immobilier</strong> en location. Il s’agit de toutes les démarches qui sont effectuées avant, pendant et en sortie de location. La <strong>gestion</strong> de bien immobilier est prise en charge par des agents immobiliers comme l’agence <a href='https://www.immobilier-surmesure.com/agences/agence-immobiliere-montreuil/' target='_blank' rel='external' > Immobilier sur Mesure à Montreuil</a >. </p> <p> Le <strong>gestionnaire de bien</strong> est sollicité par les propriétaires afin de se faire confier la gérance locative de leurs biens immobiliers. Les propriétaires peuvent ensuite continuer à louer leurs biens immobiliers sans se soucier des opérations administratives. Elles sont désormais à la charge du <strong>mandataire location</strong>. </p> </div> ",
      content:
        "Contenu 2 de l'article 2 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: '3',
      url:'annonces-immobilieres-sans-abonnement',
      article_title: 'Article 3',
      type_article: 2,
      author:"Victor, expert en transaction immobilière",
      article_preview:"assets/img/photo/property.png",
      article_description:"<p class='lead'> <strong> La <strong>gestion locative</strong> est une alternative salvatrice pour les <strong>propriétaires</strong> de <strong>bien immobilier</strong>. Elle leur permet de se libérer de nombreuses tâches chronophages et de pouvoir s’occuper d’autres activités. Découvrez sans plus attendre comment sont gérés les biens immobiliers par les <strong>agences immobilières</strong> à <strong>Montreuil</strong>, ainsi que les avantages et étapes à connaitre. </strong> </p>",
      creation_date:"2025-01-19 10:12:14",
      reading_time:3,
      html_code:"<div class='single-post-text my-3'> <div fxLayout='column' class='section-guide' fxLayoutAlign='center center' > <div class='article-text' fxFlex='70'> <h2 class='article-guide-title2'> Qu’est-ce que la gestion locative ? Définition </h2> <p> La <strong>gestion locative immobilière</strong> englobe la totalité des opérations liées à l’administration d’un <strong>bien immobilier</strong> en location. Il s’agit de toutes les démarches qui sont effectuées avant, pendant et en sortie de location. La <strong>gestion</strong> de bien immobilier est prise en charge par des agents immobiliers comme l’agence <a href='https://www.immobilier-surmesure.com/agences/agence-immobiliere-montreuil/' target='_blank' rel='external' > Immobilier sur Mesure à Montreuil</a >. </p> <p> Le <strong>gestionnaire de bien</strong> est sollicité par les propriétaires afin de se faire confier la gérance locative de leurs biens immobiliers. Les propriétaires peuvent ensuite continuer à louer leurs biens immobiliers sans se soucier des opérations administratives. Elles sont désormais à la charge du <strong>mandataire location</strong>. </p> </div> ",
      content:
        "Contenu 3 de l'article 3 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: '4',
      url:'annonces-immobilieres-sans-abonnement',
      article_title: 'Article 4',
      type_article: 2,
      author:"Victor, expert en transaction immobilière",
      article_preview:"assets/img/photo/property.png",
      article_description:"<p class='lead'> <strong> La <strong>gestion locative</strong> est une alternative salvatrice pour les <strong>propriétaires</strong> de <strong>bien immobilier</strong>. Elle leur permet de se libérer de nombreuses tâches chronophages et de pouvoir s’occuper d’autres activités. Découvrez sans plus attendre comment sont gérés les biens immobiliers par les <strong>agences immobilières</strong> à <strong>Montreuil</strong>, ainsi que les avantages et étapes à connaitre. </strong> </p>",
      creation_date:"2025-01-19 10:12:14",
      reading_time:4,
      html_code:"<div class='single-post-text my-3'> <div fxLayout='column' class='section-guide' fxLayoutAlign='center center' > <div class='article-text' fxFlex='70'> <h2 class='article-guide-title2'> Qu’est-ce que la gestion locative ? Définition </h2> <p> La <strong>gestion locative immobilière</strong> englobe la totalité des opérations liées à l’administration d’un <strong>bien immobilier</strong> en location. Il s’agit de toutes les démarches qui sont effectuées avant, pendant et en sortie de location. La <strong>gestion</strong> de bien immobilier est prise en charge par des agents immobiliers comme l’agence <a href='https://www.immobilier-surmesure.com/agences/agence-immobiliere-montreuil/' target='_blank' rel='external' > Immobilier sur Mesure à Montreuil</a >. </p> <p> Le <strong>gestionnaire de bien</strong> est sollicité par les propriétaires afin de se faire confier la gérance locative de leurs biens immobiliers. Les propriétaires peuvent ensuite continuer à louer leurs biens immobiliers sans se soucier des opérations administratives. Elles sont désormais à la charge du <strong>mandataire location</strong>. </p> </div> ",
      content:
        "Contenu 4 de l'article 4 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: '5',
      url:'annonces-immobilieres-sans-abonnement',
      article_title: 'Article 5',
      type_article: 3,
      author:"Victor, expert en transaction immobilière",
      article_preview:"assets/img/photo/property.png",
      article_description:"<p class='lead'> <strong> La <strong>gestion locative</strong> est une alternative salvatrice pour les <strong>propriétaires</strong> de <strong>bien immobilier</strong>. Elle leur permet de se libérer de nombreuses tâches chronophages et de pouvoir s’occuper d’autres activités. Découvrez sans plus attendre comment sont gérés les biens immobiliers par les <strong>agences immobilières</strong> à <strong>Montreuil</strong>, ainsi que les avantages et étapes à connaitre. </strong> </p>",
      creation_date:"2025-01-19 10:12:14",
      reading_time:6,
      html_code:"<div class='single-post-text my-3'> <div fxLayout='column' class='section-guide' fxLayoutAlign='center center' > <div class='article-text' fxFlex='70'> <h2 class='article-guide-title2'> Qu’est-ce que la gestion locative ? Définition </h2> <p> La <strong>gestion locative immobilière</strong> englobe la totalité des opérations liées à l’administration d’un <strong>bien immobilier</strong> en location. Il s’agit de toutes les démarches qui sont effectuées avant, pendant et en sortie de location. La <strong>gestion</strong> de bien immobilier est prise en charge par des agents immobiliers comme l’agence <a href='https://www.immobilier-surmesure.com/agences/agence-immobiliere-montreuil/' target='_blank' rel='external' > Immobilier sur Mesure à Montreuil</a >. </p> <p> Le <strong>gestionnaire de bien</strong> est sollicité par les propriétaires afin de se faire confier la gérance locative de leurs biens immobiliers. Les propriétaires peuvent ensuite continuer à louer leurs biens immobiliers sans se soucier des opérations administratives. Elles sont désormais à la charge du <strong>mandataire location</strong>. </p> </div> ",
      content:
        "Contenu 5 de l'article 5 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  private types = [
    {
      id:1,
      type:"Guide/conseils/tips"
    },
    {
      id:2,
      type:"Acteurs de l’immo"
    },
    {
      id:3,
      type:"Actualité"
    },
  ]

  http = inject(HttpClient)
  url = "http://data.barnabe-immo.fr/articles/pro/:cate/:page/:limit"

  constructor() {}

  // Méthode utilisée par app.routes.server.ts
  async getArticleIds(): Promise<string[]> {
    return this.articles.map((article) => article.id);
  }

  async getArticleUrls(): Promise<string[]> {
    return this.articles.map((article) => article.url);
  }

  // Méthode pour récupérer tous les articles
  getArticles(): Observable<any[]> {
    // En production, remplacer par un vrai appel API
    return from([this.articles]);
  }
  

  // Méthode pour récupérer un article spécifique
  getArticleById(id: string): Observable<any> {
    // En production, remplacer par un vrai appel API
    const article = this.articles.find((a) => a.id === id);
    return from([article]);
  }


  getArticleTypes(): Observable<any[]> {
    return from([this.types]);
  }
  
  getArticlesByType(type_id: number): Observable<any[]> {
    const articlesFiltered = this.articles.filter( article => type_id === article.type_article )
    return from([articlesFiltered])
     
  }


}
