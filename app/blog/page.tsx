'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import DatabaseError from '@/components/DatabaseError';
import { useI18n } from '@/lib/i18n';

interface BlogPost {
  id: string;
  slug: string;
  title_ru: string;
  title_en: string | null;
  subtitle_ru: string | null;
  subtitle_en: string | null;
  image_url: string;
  category: string;
  published_at: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useI18n();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error: fetchError } = await supabase
          .from('blog_posts')
          .select('id, slug, title_ru, title_en, subtitle_ru, subtitle_en, image_url, category, published_at')
          .order('published_at', { ascending: false });

        if (fetchError) throw fetchError;

        setPosts(data || []);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (error) {
    return <DatabaseError message={error} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-6">
              {language === 'ru' ? 'Блог' : 'Blog'}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              {language === 'ru'
                ? 'Полезные статьи о ремонте и обслуживании BMW от профессионалов с многолетним опытом'
                : 'Useful articles about BMW repair and maintenance from professionals with years of experience'}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {language === 'ru' ? 'Пока нет опубликованных статей' : 'No published articles yet'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={language === 'ru' ? post.title_ru : (post.title_en || post.title_ru)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-[#003366] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category.toUpperCase()}
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-[#003366] transition-colors">
                      {language === 'ru' ? post.title_ru : (post.title_en || post.title_ru)}
                    </h2>
                    {(post.subtitle_ru || post.subtitle_en) && (
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {language === 'ru' ? post.subtitle_ru : (post.subtitle_en || post.subtitle_ru)}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>
                        {new Date(post.published_at).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="text-[#003366] font-semibold group-hover:underline">
                        {language === 'ru' ? 'Читать →' : 'Read →'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
