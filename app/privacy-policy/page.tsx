import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | Мотор Эксперт',
  description: 'Политика конфиденциальности автосервиса Мотор Эксперт',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-gray-600 hover:text-[#003366] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Вернуться на главную
      </Link>

      <div className="bg-white border border-black p-6 sm:p-8 lg:p-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center">
          ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
        </h1>

        <div className="space-y-8 text-sm sm:text-base">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">1. Общие положения</h2>
            <div className="space-y-3 text-gray-700">
              <p>1.1. Настоящая Политика конфиденциальности (далее — Политика) определяет порядок обработки и защиты персональных данных пользователей сайта [адрес сайта] (далее — Сайт).</p>
              <p>1.2. Оператором персональных данных является [Название автосервиса / ФИО ИП], ИНН [указать], ОГРН/ОГРНИП [указать] (далее — Оператор).</p>
              <p>1.3. Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».</p>
              <p>1.4. Настоящая Политика не является публичной офертой.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">2. Какие данные собираем</h2>
            <div className="space-y-3 text-gray-700">
              <p>2.1. Оператор обрабатывает следующие персональные данные:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Имя (если указано пользователем в форме);</li>
                <li>Номер телефона (если указан пользователем в форме);</li>
                <li>IP-адрес (собирается автоматически при посещении Сайта).</li>
              </ul>
              <p>2.2. Оператор не собирает паспортные данные, адреса электронной почты, данные геолокации и иные персональные данные, не указанные в п. 2.1.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">3. Цели обработки</h2>
            <div className="space-y-3 text-gray-700">
              <p>3.1. Персональные данные обрабатываются в следующих целях:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Обработка заявки на запись в автосервис, консультацию или ремонт;</li>
                <li>Обратная связь с пользователем по заявке;</li>
                <li>Аналитика посещаемости Сайта (Google Analytics).</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">4. Передача данных</h2>
            <div className="space-y-3 text-gray-700">
              <p>4.1. Персональные данные не передаются третьим лицам, за исключением случаев, предусмотренных законодательством Российской Федерации.</p>
              <p>4.2. IP-адреса передаются в Google Analytics в обезличенном виде исключительно для целей статистического анализа посещаемости Сайта.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">5. Сроки хранения</h2>
            <div className="space-y-3 text-gray-700">
              <p>5.1. Персональные данные хранятся в течение 1 (одного) года с момента последней заявки или до момента отзыва согласия на обработку.</p>
              <p>5.2. После истечения срока хранения персональные данные удаляются или обезличиваются.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">6. Права субъекта</h2>
            <div className="space-y-3 text-gray-700">
              <p>6.1. Пользователь имеет право:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Получать информацию о своих персональных данных;</li>
                <li>Требовать исправления неточных данных;</li>
                <li>Требовать удаления персональных данных;</li>
                <li>Отозвать согласие на обработку персональных данных.</li>
              </ul>
              <p>6.2. Для реализации прав необходимо направить запрос Оператору по контактам, указанным в п. 7.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">7. Контакты оператора</h2>
            <div className="space-y-3 text-gray-700">
              <p>7.1. Для связи с Оператором используйте:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Адрес: [указать адрес]</li>
                <li>Телефон: [указать телефон]</li>
                <li>Время работы: [указать время]</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">8. Заключительные положения</h2>
            <div className="space-y-3 text-gray-700">
              <p>8.1. Согласие на обработку персональных данных предоставляется пользователем путём заполнения формы на Сайте и нажатия кнопки «Отправить» / «Записаться».</p>
              <p>8.2. Оператор принимает необходимые организационные и технические меры для защиты персональных данных от неправомерного доступа, уничтожения, изменения, блокирования и иных неправомерных действий.</p>
              <p>8.3. Оператор вправе вносить изменения в Политику. Новая редакция вступает в силу с момента размещения на Сайте.</p>
              <p>8.4. Актуальная редакция Политики всегда доступна по адресу: [адрес страницы с политикой].</p>
              <p>8.5. Дата последнего обновления: {new Date().toLocaleDateString('ru-RU')}.</p>
            </div>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <Link
              href="/privacy-policy-en"
              className="text-[#003366] hover:underline font-medium"
            >
              English version →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
