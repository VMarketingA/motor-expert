'use client';

import Link from 'next/link';
import { CircleAlert as AlertCircle } from 'lucide-react';

export default function DatabaseError({ message }: { message?: string }) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
        <h2 className="text-2xl font-bold mb-2">Ошибка подключения к базе данных</h2>
        <p className="mb-6 text-gray-600">
          К сожалению, мы не можем загрузить данные прямо сейчас. Пожалуйста, попробуйте обновить страницу или свяжитесь с нами напрямую.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-[#003366] text-white px-6 py-3 font-semibold hover:bg-[#004488] transition-colors"
          >
            Обновить страницу
          </button>
          <Link
            href="/#contacts"
            className="block w-full border-2 border-[#003366] text-[#003366] px-6 py-3 font-semibold hover:bg-[#003366] hover:text-white transition-colors"
          >
            Связаться с нами
          </Link>
        </div>
      </div>
    </div>
  );
}
