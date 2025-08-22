// src/lib/wp.ts
const WP = process.env.WP_API_INTERNAL_BASE!;

export type GoodsItem = {
  id: number;
  title: string;
  slug: string;
  acf?: any;
};

export async function fetchGoodsWithACF(ids: number[]): Promise<GoodsItem[]> {
  try {
    // требует плагин "ACF to REST API"
    const url = `${WP}/wp/v2/goods?include=${ids.join(",")}&per_page=${ids.length}&_embed`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const posts = await res.json();
    return posts.map((p: any) => {
      return {
        id: p.id,
        title: p.title?.rendered ?? p.title,
        link: `/catalog/${p._embedded['wp:term'][0][0].slug}/${p.slug}`,
        image: p.acf.image,
        price: p.acf.price_1_day,  
        // all: p            // <-- тут приедут ACF-поля
      }
    });
  } catch (error) {
    console.warn('Ошибка при получении товаров с ACF:', error);
    return [];
  }
}


export async function wpFetch(url: string) {
  try {
    const res = await fetch(`${WP}${url}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn(`Ошибка при запросе к WordPress API: ${url}`, error);
    throw error;
  }
}