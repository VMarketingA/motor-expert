export function getCategoryTranslationKey(category: string): string {
  const categoryMap: { [key: string]: string } = {
    'Fluid Replacement': 'category_fluid_replacement',
    'Filter Replacement': 'category_filter_replacement',
    'Ignition, Drive and Fuel': 'category_ignition_drive_fuel',
    'Brake System': 'category_brake_system',
    'Suspension': 'category_suspension',
    'Steering System': 'category_steering_system',
    'Air Conditioning': 'category_air_conditioning',
  };

  return categoryMap[category] || category;
}
