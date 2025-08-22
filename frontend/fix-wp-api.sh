#!/bin/bash

echo "🔧 Исправляем все файлы с WordPress API..."

# Исправляем contacts/index.astro
echo "📝 Исправляем contacts/index.astro..."
cat > src/pages/contacts/index.astro << 'EOF'
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import Container from "@/layouts/Container.astro";
import { wpFetch } from "@/lib/wp";

let acf;
try {
  const data = await wpFetch('/acf/v3/options/options');
  acf = data.acf;
} catch (error) {
  console.warn('Не удалось получить ACF опции из WordPress API');
  acf = {
    phone: '+375 29 123-45-67',
    email: 'info@example.com',
    address: 'Гродно, ул. Примерная, 1'
  };
}
---

<BaseLayout title="Контакты">
  <Container class:list="mt-32 mb-16 bg-zinc-50">
    <h1 class="mb-8 text-4xl font-bold">Контакты</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 class="text-2xl font-semibold mb-4">Свяжитесь с нами</h2>
        <p class="mb-2"><strong>Телефон:</strong> {acf.phone}</p>
        <p class="mb-2"><strong>Email:</strong> {acf.email}</p>
        <p class="mb-4"><strong>Адрес:</strong> {acf.address}</p>
      </div>
    </div>
  </Container>
</BaseLayout>
EOF

# Исправляем terms/index.astro
echo "📝 Исправляем terms/index.astro..."
cat > src/pages/terms/index.astro << 'EOF'
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import Container from "@/layouts/Container.astro";
import { wpFetch } from "@/lib/wp";

let pageData;
try {
  const data = await wpFetch(`/acf/v3/pages/75`);
  pageData = data.acf;
} catch (error) {
  console.warn('Не удалось получить данные страницы из WordPress API');
  pageData = {
    title: 'Условия использования',
    content: 'Содержимое страницы'
  };
}
---

<BaseLayout title={pageData.title}>
  <Container class:list="mt-32 mb-16 bg-zinc-50">
    <h1 class="mb-8 text-4xl font-bold">{pageData.title}</h1>
    <div class="prose prose-lg max-w-none" set:html={pageData.content} />
  </Container>
</BaseLayout>
EOF

# Исправляем posts/index.astro
echo "📝 Исправляем posts/index.astro..."
cat > src/pages/posts/index.astro << 'EOF'
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import Container from "@/layouts/Container.astro";
import { wpFetch } from "@/lib/wp";

let posts;
try {
  posts = await wpFetch(`/wp/v2/posts?_fields=id,title,excerpt,slug,date,acf`);
} catch (error) {
  console.warn('Не удалось получить посты из WordPress API');
  posts = [
    {
      id: 1,
      title: { rendered: 'Пост по умолчанию' },
      excerpt: { rendered: 'Описание поста' },
      slug: 'default',
      date: new Date().toISOString(),
      acf: { image: '' }
    }
  ];
}
---

<BaseLayout title="Новости">
  <Container class:list="mt-32 mb-16 bg-zinc-50">
    <h1 class="mb-8 text-4xl font-bold">Новости</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post: any) => (
        <article class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            <h2 class="text-xl font-semibold mb-2" set:html={post.title.rendered} />
            <p class="text-gray-600 mb-4" set:html={post.excerpt.rendered} />
            <a href={`/posts/${post.slug}`} class="text-blue-600 hover:underline">
              Читать далее
            </a>
          </div>
        </article>
      ))}
    </div>
  </Container>
</BaseLayout>
EOF

echo "✅ Все файлы исправлены!"
