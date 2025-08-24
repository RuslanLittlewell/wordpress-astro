// src/lib/wp.ts
const WP = (import.meta.env.WP_API_INTERNAL_BASE ?? 'https://api.littlewell-app.work/wp-json').replace(/\/$/, '');

export type GoodsItem = {
  id: number;
  title: string;
  slug: string;
  acf?: any;
};

export async function fetchGoodsWithACF(ids: number[]): Promise<GoodsItem[]> {
  // требует плагин "ACF to REST API"
  const url = `${WP}/wp/v2/goods?include=${ids.join(",")}&per_page=${ids.length}&_embed`;
  const res = await fetch(url, { cache: "no-store" });
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
}

export async function wpFetch(url: string) {
  const res = await fetch(`${WP}${url}`);
  const data = await res.json();
  return data
}