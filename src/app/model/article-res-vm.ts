export interface ArticleResVM {
    id: string;
    title: string;
    content: string;
    categoryId: number;
    createdAt: string;
    imageUrl?: string; 
    categoryName?: string;
  }