export function getCategoryTranslationKey(category: string): string {
  const categoryMap: { [key: string]: string } = {
    'fluids': 'category_fluids',
    'filters': 'category_filters',
    'ignition_fuel': 'category_ignition_fuel',
    'brakes': 'category_brakes',
    'suspension': 'category_suspension',
    'steering': 'category_steering',
    'ac': 'category_ac',
    'Замена основных жидкостей': 'category_fluids',
    'Замена фильтров': 'category_filters',
    'Зажигание, привода и топливо': 'category_ignition_fuel',
    'Тормозная система': 'category_brakes',
    'Подвеска': 'category_suspension',
    'Рулевой механизм': 'category_steering',
    'Кондиционер': 'category_ac',
  };

  return categoryMap[category] || category;
}
