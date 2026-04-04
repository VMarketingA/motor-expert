import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST() {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Delete all existing services
    await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    const services = [
      // Замена основных жидкостей
      { name_ru: 'Масло в ДВС + масляный фильтр', description_ru: 'Замена моторного масла и масляного фильтра', price_from: 1900, category: 'Замена основных жидкостей', sort_order: 1, is_active: true },
      { name_ru: 'Охлаждающая жидкость', description_ru: 'Замена охлаждающей жидкости в системе охлаждения', price_from: 3800, category: 'Замена основных жидкостей', sort_order: 2, is_active: true },
      { name_ru: 'АКПП ZF (работа + адаптации)', description_ru: 'Замена масла в автоматической коробке передач ZF с адаптациями', price_from: 5700, category: 'Замена основных жидкостей', sort_order: 3, is_active: true },
      { name_ru: 'Раздаточная коробка (работа + адаптации)', description_ru: 'Замена масла в раздаточной коробке с адаптациями', price_from: 3800, category: 'Замена основных жидкостей', sort_order: 4, is_active: true },
      { name_ru: 'Передний редуктор', description_ru: 'Замена масла в переднем редукторе', price_from: 3800, category: 'Замена основных жидкостей', sort_order: 5, is_active: true },
      { name_ru: 'Задний редуктор', description_ru: 'Замена масла в заднем редукторе', price_from: 1900, category: 'Замена основных жидкостей', sort_order: 6, is_active: true },

      // Замена фильтров
      { name_ru: 'Микрофильтр рециркуляции', description_ru: 'Замена микрофильтра рециркуляции отработанных газов', price_from: 1200, category: 'Замена фильтров', sort_order: 7, is_active: true },
      { name_ru: 'Воздушный фильтр', description_ru: 'Замена воздушного фильтра двигателя', price_from: 800, category: 'Замена фильтров', sort_order: 8, is_active: true },
      { name_ru: 'Салонный фильтр', description_ru: 'Замена салонного фильтра системы вентиляции', price_from: 1200, category: 'Замена фильтров', sort_order: 9, is_active: true },
      { name_ru: 'Топливный фильтр', description_ru: 'Замена топливного фильтра', price_from: 3800, category: 'Замена фильтров', sort_order: 10, is_active: true },

      // Зажигание, привода и топливо
      { name_ru: 'Запрос протокола ошибок эл. систем', description_ru: 'Компьютерная диагностика всех электронных систем автомобиля', price_from: 3800, category: 'Зажигание, привода и топливо', sort_order: 11, is_active: true },
      { name_ru: 'Свечи накаливания, замена', description_ru: 'Замена свечей накаливания дизельного двигателя', price_from: 6000, category: 'Зажигание, привода и топливо', sort_order: 12, is_active: true },
      { name_ru: 'Ремень привода н/а + натяжитель', description_ru: 'Замена ремня привода навесного оборудования и натяжителя', price_from: 5700, category: 'Зажигание, привода и топливо', sort_order: 13, is_active: true },
      { name_ru: 'Насос системы охлаждения', description_ru: 'Замена насоса системы охлаждения двигателя', price_from: 8000, category: 'Зажигание, привода и топливо', sort_order: 14, is_active: true },
      { name_ru: 'Термостат', description_ru: 'Замена термостата системы охлаждения', price_from: 6000, category: 'Зажигание, привода и топливо', sort_order: 15, is_active: true },
      { name_ru: 'Активация скрытых опций', description_ru: 'Активация и кодирование скрытых функций автомобиля', price_from: 3000, category: 'Зажигание, привода и топливо', sort_order: 16, is_active: true },
      { name_ru: 'Впускной коллектор + вихревые заслонки + охладитель ОГ системы EGR чистка', description_ru: 'Чистка впускного коллектора, вихревых заслонок и системы EGR', price_from: 40000, category: 'Зажигание, привода и топливо', sort_order: 17, is_active: true },

      // Тормозная система
      { name_ru: 'Диагностика тормозной системы', description_ru: 'Запрос протокола ошибок электронных систем тормозов', price_from: 3800, category: 'Тормозная система', sort_order: 18, is_active: true },
      { name_ru: 'Колодки передние', description_ru: 'Замена передних тормозных колодок', price_from: 3000, category: 'Тормозная система', sort_order: 19, is_active: true },
      { name_ru: 'Колодки задние', description_ru: 'Замена задних тормозных колодок', price_from: 3000, category: 'Тормозная система', sort_order: 20, is_active: true },
      { name_ru: 'Тормозные диски (П. ось)', description_ru: 'Замена тормозных дисков передней оси', price_from: 4000, category: 'Тормозная система', sort_order: 21, is_active: true },
      { name_ru: 'Тормозные диски (З. ось)', description_ru: 'Замена тормозных дисков задней оси', price_from: 4600, category: 'Тормозная система', sort_order: 22, is_active: true },
      { name_ru: 'Тормозная жидкость, замена + жидкость', description_ru: 'Замена тормозной жидкости с прокачкой системы', price_from: 5500, category: 'Тормозная система', sort_order: 23, is_active: true },
      { name_ru: 'Сброс сервиса по колодкам при замене', description_ru: 'Сброс сервисного интервала по колодкам (бесплатно при замене)', price_from: 0, category: 'Тормозная система', sort_order: 24, is_active: true },

      // Рулевой механизм
      { name_ru: 'Ввод в эксплуатацию рулевого управления', description_ru: 'Ввод в эксплуатацию и адаптация рулевого управления', price_from: 3800, category: 'Рулевой механизм', sort_order: 25, is_active: true },
      { name_ru: 'Тяга с наконечником, замена 1 шт.', description_ru: 'Замена рулевой тяги с наконечником (1 шт)', price_from: 3000, category: 'Рулевой механизм', sort_order: 26, is_active: true },
      { name_ru: 'Жидкость ГУР', description_ru: 'Замена жидкости гидроусилителя руля', price_from: 4600, category: 'Рулевой механизм', sort_order: 27, is_active: true },
      { name_ru: 'Рулевая рейка, ремонт', description_ru: 'Ремонт рулевой рейки', price_from: 55000, category: 'Рулевой механизм', sort_order: 28, is_active: true },
      { name_ru: 'Рулевая рейка, с/у', description_ru: 'Снятие/установка рулевой рейки', price_from: 11000, category: 'Рулевой механизм', sort_order: 29, is_active: true },
      { name_ru: 'Адаптация рулевого управления', description_ru: 'Адаптация и калибровка рулевого управления', price_from: 3800, category: 'Рулевой механизм', sort_order: 30, is_active: true },
      { name_ru: 'Сход-развал', description_ru: 'Регулировка углов установки колес (сход-развал)', price_from: 5700, category: 'Рулевой механизм', sort_order: 31, is_active: true },

      // Подвеска
      { name_ru: 'Диагностика подвески', description_ru: 'Запрос протокола ошибок электронных систем подвески', price_from: 3800, category: 'Подвеска', sort_order: 32, is_active: true },
      { name_ru: 'Аммортизатор передний', description_ru: 'Замена переднего амортизатора', price_from: 7600, category: 'Подвеска', sort_order: 33, is_active: true },
      { name_ru: 'Аммортизатор задний', description_ru: 'Замена заднего амортизатора', price_from: 3800, category: 'Подвеска', sort_order: 34, is_active: true },
      { name_ru: 'Стойка стабилизатора', description_ru: 'Замена стойки стабилизатора поперечной устойчивости', price_from: 1200, category: 'Подвеска', sort_order: 35, is_active: true },
      { name_ru: 'Ступица в сборе', description_ru: 'Замена ступицы колеса в сборе', price_from: 7600, category: 'Подвеска', sort_order: 36, is_active: true },
      { name_ru: 'Ступичный подшипник', description_ru: 'Замена ступичного подшипника', price_from: 9500, category: 'Подвеска', sort_order: 37, is_active: true },
      { name_ru: 'Пружина подвески', description_ru: 'Замена пружины подвески', price_from: 7600, category: 'Подвеска', sort_order: 38, is_active: true },
      { name_ru: 'Рычаг продольный', description_ru: 'Замена продольного рычага подвески', price_from: 3800, category: 'Подвеска', sort_order: 39, is_active: true },
      { name_ru: 'Рычаг поперечный', description_ru: 'Замена поперечного рычага подвески', price_from: 3800, category: 'Подвеска', sort_order: 40, is_active: true },
      { name_ru: 'Опора шаровая', description_ru: 'Замена шаровой опоры', price_from: 5700, category: 'Подвеска', sort_order: 41, is_active: true },
      { name_ru: 'Сайлентблок - перепрессовка', description_ru: 'Перепрессовка сайлентблоков рычагов подвески', price_from: 5000, category: 'Подвеска', sort_order: 42, is_active: true },
      { name_ru: 'Сход-развал подвески', description_ru: 'Регулировка углов установки колес после ремонта подвески', price_from: 5700, category: 'Подвеска', sort_order: 43, is_active: true },

      // Кондиционер
      { name_ru: 'Диагностика кондиционера', description_ru: 'Запрос протокола ошибок системы кондиционирования', price_from: 3800, category: 'Кондиционер', sort_order: 44, is_active: true },
      { name_ru: 'Перезаправка (без учета фреона)', description_ru: 'Перезаправка системы кондиционирования (фреон оплачивается отдельно)', price_from: 3800, category: 'Кондиционер', sort_order: 45, is_active: true },
      { name_ru: 'Антибактериальная обработка', description_ru: 'Антибактериальная обработка системы кондиционирования', price_from: 5000, category: 'Кондиционер', sort_order: 46, is_active: true },
      { name_ru: 'Компрессор кондиционера, замена', description_ru: 'Замена компрессора системы кондиционирования', price_from: 11400, category: 'Кондиционер', sort_order: 47, is_active: true },
      { name_ru: 'Диагностика утечки', description_ru: 'Диагностика и поиск утечек фреона в системе', price_from: 5700, category: 'Кондиционер', sort_order: 48, is_active: true },
      { name_ru: 'Радиатор ДВС - мойка со снятием (без учёта антифриза)', description_ru: 'Мойка радиатора двигателя со снятием (антифриз оплачивается отдельно)', price_from: 24000, category: 'Кондиционер', sort_order: 49, is_active: true },
    ];

    const { data, error } = await supabase.from('services').insert(services);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully populated ${services.length} services`
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
