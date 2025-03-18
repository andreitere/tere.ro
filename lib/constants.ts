export const categories_colors = {
  vue: "#4cd137",
  tinkering: "#c23616",
  random: "#40739e",
  travel: "#0097e6",
  talks: "#9b59b6",
  tech: "#40739e",
  software: "#40739e",
  homelab: "#e67e22",
  development: "#40739e",
  blog: "#40739e",
};

export const getCategoryColor = (category: string) => {
  return (
    categories_colors[
      category.toLowerCase() as keyof typeof categories_colors
    ] || categories_colors.random
  );
};
