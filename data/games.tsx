import { ImagePreview } from "@/components/image-preview";

export type Game = {
  id: string;
  title: string;
  slug: string;
  image?: string;
  preview?: React.ReactNode;
  categories: string[];
};

export const games: Game[] = [
  {
    id: "stroop-effect-test",
    title: "Stroop Effect Test",
    slug: "stroop-effect-test",
    preview: <ImagePreview src="/games/stroop-effect.png" />,
    categories: [
      "selective-attention",
      "cognitive-flexibility",
      "reaction-time",
      "adhd-games",
    ],
  }
];

export function getGames(): Game[] {
  return games;
}

export function getGame(id: string): Game | undefined {
  return games.find(game => game.id === id);
}

export function getGameBySlug(slug: string): Game | undefined {
  return games.find(game => game.slug === slug);
}

export function getGamesByCategory(categoryId: string): Game[] {
  return games.filter(game => game.categories.includes(categoryId));
}

export function getFeaturedGames(): Game[] {
  return games;
}

export function getLatestGames(limit: number = 3): Game[] {
  return games.slice(0, limit);
}

export function getFeaturedGamesForCarousel(gamesPerPage: number = 6): Game[][] {
  const pages: Game[][] = [];
  for (let i = 0; i < games.length; i += gamesPerPage) {
    pages.push(games.slice(i, i + gamesPerPage));
  }
  return pages;
}
