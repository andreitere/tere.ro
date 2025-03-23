export const categories_colors = {
  vue: "#a8e99e",
  tinkering: "#e78a76",
  random: "#8fb3d1",
  travel: "#7fcbf2",
  talks: "#c9a3d9",
  tech: "#8fb3d1",
  software: "#8fb3d1",
  homelab: "#f1b87c",
  development: "#8fb3d1",
  blog: "#8fb3d1",
};

export const categories_colors_muted = {
  vue: "#a8e99e",
  tinkering: "#e78a76",
  random: "#8fb3d1",
  travel: "#7fcbf2",
  talks: "#c9a3d9",
  tech: "#8fb3d1",
  software: "#8fb3d1",
  homelab: "#f1b87c",
  development: "#8fb3d1",
  blog: "#8fb3d1",
};

export const getCategoryColor = (category: string) => {
  return (
    categories_colors[
      category.toLowerCase() as keyof typeof categories_colors
    ] || categories_colors.random
  );
};
