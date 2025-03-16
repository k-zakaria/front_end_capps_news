
// src/app/model/article-res-vm.ts
export interface UserSummaryDTO {
  id: string;
  username: string;
}

export interface CategorySummaryDTO {
  id: number;
  name: string;
}

export interface TagSummaryDTO {
  id: number;
  name: string;
}

export interface ArticleResVM {
  id: string;  // UUID
  title: string;
  description: string;
  content: string;
  image: string | null; // Changez pour permettre explicitement null
  published: boolean;
  publicationDate: string | null | undefined; // Date ISO au format string, nullable
  author: UserSummaryDTO | null;
  category: CategorySummaryDTO | null;
  tags: TagSummaryDTO[];
}

// src/app/model/article-req-vm.ts
export interface ArticleReqVM {
  title: string;
  description: string;
  content: string;
  image: string;
  tagIds: number[];
  categoryId: number;
  published?: boolean;
}
