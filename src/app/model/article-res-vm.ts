export interface ArticleResVM {
    id: string;
    title: string;
    content: string;
    categoryId: number;
    tagIds: number[];
    createdAt: string;
    userId: number;
    image?: string; 
  }

  export interface ArticleReqVM {
  title: string; // Titre de l'article
  content: string; // Contenu de l'article
  categoryId: number; // Identifiant de la catégorie
  tagIds: number[]; // Liste des identifiants des tags associés à l'article
  userId: number; // Identifiant de l'utilisateur qui crée l'article
}
