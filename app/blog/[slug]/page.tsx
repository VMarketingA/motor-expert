'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import DatabaseError from '@/components/DatabaseError';
import { useI18n } from '@/lib/i18n';
import { formatBlogContent } from '@/lib/format-content';
import { ArrowLeft, Phone } from 'lucide-react';

interface BlogPost {
  id: string;
  slug: string;
  title_ru: string;
  title_en: string | null;
  subtitle_ru: string | null;
  subtitle_en: string | null;
  content_ru: string;
  content_en: string | null;
  cta_ru: string;
  cta_en: string | null;
  image_url: string;
  category: string;
  published_at: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useI18n();

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error: fetchError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (!data) {
          setError('Blog post not found');
        } else {
          setPost(data);
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err instanceof Error ? err.message : 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (error) {
    return <DatabaseError message={error} />;
  }

  if (loading) {
    return (
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="h-96 bg-gray-200 rounded mb-8"></div>
          <div className="h-12 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            {language === 'ru' ? 'Статья не найдена' : 'Post not found'}
          </h1>
          <Link href="/blog" className="text-[#003366] hover:underline">
            {language === 'ru' ? '← Вернуться к блогу' : '← Back to blog'}
          </Link>
        </div>
      </main>
    );
  }

  const title = language === 'ru' ? post.title_ru : (post.title_en || post.title_ru);
  const subtitle = language === 'ru' ? post.subtitle_ru : (post.subtitle_en || post.subtitle_ru);
  const rawContent = language === 'ru' ? post.content_ru : (post.content_en || post.content_ru);
  const content = formatBlogContent(rawContent);
  const cta = language === 'ru' ? post.cta_ru : (post.cta_en || post.cta_ru);

  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-[#003366] hover:underline mb-8 font-semibold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'ru' ? 'Вернуться к блогу' : 'Back to blog'}
        </Link>

        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-[#003366] text-white px-4 py-1 rounded-full text-sm font-semibold">
                {post.category.toUpperCase()}
              </span>
              <span className="text-gray-500">
                {new Date(post.published_at).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {title}
            </h1>

            {subtitle && (
              <p className="text-xl text-gray-600 mb-6">
                {subtitle}
              </p>
            )}
          </div>

          <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-12 shadow-2xl">
            <img
              src={post.image_url}
              alt={language === 'ru' ? 'Лучший автосервис БМВ в Москве рядом со мной' : 'Best BMW service center in Moscow near me'}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-6 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#003366] to-[#004488] text-white rounded-xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              {cta}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a
                href="tel:+74951145552"
                className="inline-flex items-center justify-center bg-white text-[#003366] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                +7 (495) 114-55-52
              </a>
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#003366] transition-colors"
              >
                {language === 'ru' ? 'Контакты' : 'Contacts'}
              </Link>
            </div>
          </div>
        </article>

        <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center text-[#003366] hover:underline font-semibold text-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {language === 'ru' ? 'Все статьи блога' : 'All blog posts'}
          </Link>
        </div>
      </div>
    </main>
  );
}
