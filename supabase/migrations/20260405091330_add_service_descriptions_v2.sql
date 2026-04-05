/*
  # Add detailed descriptions to services

  1. Changes
    - Add `description` column to services table for detailed 500-character descriptions
    - Add `description_en` column for English descriptions
    - Populate all 49 services with detailed descriptions in Russian and English

  2. Security
    - No changes to RLS policies needed
*/

-- Add description columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'services' AND column_name = 'description'
  ) THEN
    ALTER TABLE services ADD COLUMN description text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'services' AND column_name = 'description_en'
  ) THEN
    ALTER TABLE services ADD COLUMN description_en text;
  END IF;
END $$;

-- Update services with detailed descriptions

-- Диагностика
UPDATE services SET 
  description = 'Компьютерная диагностика двигателя позволяет быстро выявить неисправности и ошибки в работе систем автомобиля. Мы используем современное оборудование для точного считывания кодов ошибок, анализа параметров работы двигателя, проверки датчиков и электронных блоков управления. Диагностика помогает предотвратить серьезные поломки и сэкономить на ремонте. Процедура занимает от 30 минут до 1 часа в зависимости от сложности проблемы.',
  description_en = 'Computer engine diagnostics allows quick detection of malfunctions and errors in your vehicle systems. We use modern equipment for accurate error code reading, engine performance analysis, sensor testing, and ECU diagnostics. Diagnostics helps prevent serious breakdowns and save on repairs. The procedure takes 30 minutes to 1 hour depending on problem complexity.'
WHERE slug = 'diagnostika';

UPDATE services SET 
  description = 'Профессиональная замена масла с использованием качественных материалов продлевает срок службы двигателя. Включает слив отработанного масла, замену масляного фильтра, заливку нового масла соответствующей вязкости и спецификации. Мы подбираем масло индивидуально для вашего автомобиля с учетом рекомендаций производителя, условий эксплуатации и пробега. Обязательная процедура каждые 10-15 тысяч км.',
  description_en = 'Professional oil change using quality materials extends engine life. Includes draining old oil, replacing oil filter, filling new oil with proper viscosity and specification. We select oil individually for your vehicle considering manufacturer recommendations, operating conditions, and mileage. Mandatory procedure every 10-15 thousand km.'
WHERE slug = 'zamena-masla';

UPDATE services SET 
  description = 'Ремонт и замена компонентов системы охлаждения предотвращает перегрев двигателя. Работаем с радиаторами, термостатами, помпами, патрубками, расширительными бачками. Проводим проверку герметичности системы, замену антифриза, промывку радиатора. Устраняем течи, заменяем изношенные детали. Правильная работа системы охлаждения критически важна для долговечности двигателя и предотвращения дорогостоящего ремонта.',
  description_en = 'Cooling system repair and component replacement prevents engine overheating. We work with radiators, thermostats, pumps, hoses, expansion tanks. We check system tightness, replace coolant, flush radiators. We eliminate leaks and replace worn parts. Proper cooling system operation is critical for engine longevity and preventing costly repairs.'
WHERE slug = 'sistema-ohlazhdeniya';

UPDATE services SET 
  description = 'Ремонт и обслуживание системы выпуска обеспечивает правильную работу двигателя и соответствие экологическим нормам. Занимаемся заменой и ремонтом глушителей, резонаторов, катализаторов, гофр, прокладок. Устраняем течи выхлопных газов, вибрацию и посторонние шумы. Используем качественные материалы для долговечного ремонта. Неисправная выхлопная система влияет на мощность двигателя и расход топлива.',
  description_en = 'Exhaust system repair and maintenance ensures proper engine operation and environmental compliance. We handle replacement and repair of mufflers, resonators, catalytic converters, flex pipes, gaskets. We eliminate exhaust leaks, vibration and unusual noises. We use quality materials for long-lasting repairs. Faulty exhaust system affects engine power and fuel consumption.'
WHERE slug = 'vypusknaya-sistema';

UPDATE services SET 
  description = 'Обслуживание топливной системы обеспечивает оптимальную подачу топлива в двигатель. Включает чистку форсунок, замену топливного фильтра, проверку топливного насоса и регулятора давления, диагностику топливопроводов. Чистые форсунки обеспечивают правильное распыление топлива, что улучшает динамику, снижает расход и выбросы. Рекомендуется проводить профилактику каждые 30-40 тысяч км для поддержания эффективности работы двигателя.',
  description_en = 'Fuel system maintenance ensures optimal fuel delivery to the engine. Includes injector cleaning, fuel filter replacement, fuel pump and pressure regulator inspection, fuel line diagnostics. Clean injectors ensure proper fuel atomization, improving dynamics, reducing consumption and emissions. Preventive maintenance recommended every 30-40 thousand km to maintain engine efficiency.'
WHERE slug = 'toplivnaya-sistema';

UPDATE services SET 
  description = 'Ремонт системы зажигания восстанавливает стабильную работу двигателя. Включает замену свечей зажигания, высоковольтных проводов, катушек зажигания, диагностику модуля зажигания. Исправная система зажигания обеспечивает легкий запуск, плавную работу на холостом ходу, хорошую динамику разгона. Неисправности проявляются пропусками зажигания, затрудненным пуском, повышенным расходом топлива. Своевременное обслуживание предотвращает повреждение катализатора.',
  description_en = 'Ignition system repair restores stable engine operation. Includes spark plug replacement, high-voltage wire replacement, ignition coil replacement, ignition module diagnostics. Proper ignition system ensures easy start, smooth idle, good acceleration dynamics. Malfunctions manifest as misfires, difficult starting, increased fuel consumption. Timely maintenance prevents catalytic converter damage.'
WHERE slug = 'sistema-zazhiganiya';

UPDATE services SET 
  description = 'Замена ремня или цепи ГРМ критически важна для предотвращения серьезных повреждений двигателя. При обрыве ремня поршни могут встретиться с клапанами, что приведет к дорогостоящему капитальному ремонту. Выполняем замену ремня/цепи, роликов, натяжителей, помпы (при необходимости). Проводим точную установку меток ГРМ. Интервал замены зависит от модели автомобиля и обычно составляет 60-120 тысяч км.',
  description_en = 'Timing belt or chain replacement is critical for preventing serious engine damage. If belt breaks, pistons can hit valves, leading to costly overhaul. We perform belt/chain replacement, rollers, tensioners, water pump (if needed). We ensure precise timing mark alignment. Replacement interval depends on vehicle model, typically 60-120 thousand km.'
WHERE slug = 'zamena-remnya-grm';

UPDATE services SET 
  description = 'Капитальный ремонт двигателя восстанавливает его ресурс и характеристики. Включает полную разборку, дефектовку деталей, замену изношенных компонентов (поршни, кольца, вкладыши, прокладки), расточку или хонингование цилиндров, шлифовку коленвала, ремонт или замену головки блока. После сборки проводим обкатку и настройку. Качественный капремонт продлевает жизнь двигателя на 100-150 тысяч км. Используем оригинальные или качественные аналоги запчастей.',
  description_en = 'Engine overhaul restores its life and performance. Includes complete disassembly, parts inspection, worn component replacement (pistons, rings, bearings, gaskets), cylinder boring or honing, crankshaft grinding, cylinder head repair or replacement. After assembly we perform break-in and tuning. Quality overhaul extends engine life by 100-150 thousand km. We use OEM or quality aftermarket parts.'
WHERE slug = 'kapitalnyj-remont-dvigatelya';

UPDATE services SET 
  description = 'Замена сцепления восстанавливает надежную передачу крутящего момента от двигателя к коробке передач. Признаки износа: пробуксовка при разгоне, вибрации, затрудненное переключение передач, запах гари. Меняем комплект сцепления (диск, корзина, выжимной подшипник), проверяем маховик, регулируем привод. Используем качественные комплекты известных производителей. После замены сцепление служит 80-150 тысяч км в зависимости от стиля вождения.',
  description_en = 'Clutch replacement restores reliable torque transmission from engine to gearbox. Wear signs: slipping during acceleration, vibrations, difficult gear shifting, burning smell. We replace clutch kit (disc, pressure plate, release bearing), inspect flywheel, adjust linkage. We use quality kits from known manufacturers. After replacement clutch lasts 80-150 thousand km depending on driving style.'
WHERE slug = 'zamena-scepleniya';

UPDATE services SET 
  description = 'Ремонт механической коробки передач устраняет шумы, вибрации, затрудненное переключение передач. Выполняем замену масла, синхронизаторов, подшипников, сальников, шестерен. Проводим диагностику для точного определения неисправности. Восстанавливаем четкость переключения, устраняем вой и гул. При необходимости выполняем ремонт вилок, тяг, кулисы. Используем оригинальные запчасти или проверенные аналоги для долговечного результата.',
  description_en = 'Manual transmission repair eliminates noises, vibrations, difficult gear shifting. We perform oil change, synchronizer replacement, bearing replacement, seal replacement, gear replacement. We diagnose to accurately identify malfunction. We restore crisp shifting, eliminate whining and humming. If needed we repair forks, rods, linkage. We use OEM parts or proven alternatives for lasting results.'
WHERE slug = 'remont-mkpp';

UPDATE services SET 
  description = 'Обслуживание и ремонт автоматической коробки передач требует специализированного оборудования и опыта. Проводим замену масла и фильтра, диагностику электронного блока управления, ремонт гидроблока, замену соленоидов, фрикционов, планетарных механизмов. Устраняем рывки, пинки, пробуксовки, задержки переключения. Своевременное обслуживание АКПП каждые 60 тысяч км предотвращает дорогостоящий капитальный ремонт.',
  description_en = 'Automatic transmission service and repair requires specialized equipment and experience. We perform fluid and filter change, ECU diagnostics, valve body repair, solenoid replacement, clutch pack replacement, planetary gear repair. We eliminate jerks, kicks, slipping, shifting delays. Timely AT service every 60 thousand km prevents costly overhaul.'
WHERE slug = 'remont-akpp';

UPDATE services SET 
  description = 'Ремонт вариатора (CVT) восстанавливает плавную работу бесступенчатой трансмиссии. Специализируемся на замене ремня/цепи вариатора, конусов, подшипников, гидротрансформатора, клапанов. Проводим адаптацию после ремонта. Вариаторы требуют особого внимания к качеству и регулярности замены масла (каждые 40-60 тысяч км). Признаки неисправности: вибрации, шум, рывки при разгоне, падение динамики. Своевременный ремонт продлевает срок службы.',
  description_en = 'CVT repair restores smooth continuously variable transmission operation. We specialize in CVT belt/chain replacement, cone replacement, bearing replacement, torque converter repair, valve replacement. We perform adaptation after repair. CVTs require special attention to fluid quality and regular changes (every 40-60 thousand km). Malfunction signs: vibrations, noise, jerks during acceleration, loss of dynamics. Timely repair extends service life.'
WHERE slug = 'remont-variatora';

UPDATE services SET 
  description = 'Ремонт раздаточной коробки обеспечивает надежную работу полного привода. Занимаемся заменой подшипников, сальников, цепей, муфт, актуаторов. Устраняем шумы, вибрации, пробуксовку при включении полного привода. Проводим диагностику электронных систем управления. Восстанавливаем корректную работу блокировок и режимов движения. Используем качественные детали для обеспечения долговечности. Регулярная замена масла в раздатке каждые 40-60 тысяч км продлевает ее ресурс.',
  description_en = 'Transfer case repair ensures reliable all-wheel drive operation. We handle bearing replacement, seal replacement, chain replacement, coupling replacement, actuator replacement. We eliminate noises, vibrations, slipping when engaging AWD. We diagnose electronic control systems. We restore proper lock and mode operation. We use quality parts for durability. Regular transfer case fluid change every 40-60 thousand km extends its life.'
WHERE slug = 'remont-razdatochnoj-korobki';

UPDATE services SET 
  description = 'Ремонт карданного вала устраняет вибрации и биение при движении. Выполняем замену крестовин, подшипников, эластичных муфт, балансировку вала. Признаки неисправности: вибрация на скорости, стук при трогании, гул. Изношенные крестовины могут привести к разрушению карданного вала и повреждению других элементов трансмиссии. Проводим тщательную диагностику, устраняем люфты, обеспечиваем плавную передачу момента на задний или передний мост.',
  description_en = 'Driveshaft repair eliminates vibrations and runout during driving. We perform universal joint replacement, bearing replacement, flex disc replacement, shaft balancing. Malfunction signs: vibration at speed, knock when starting, humming. Worn universal joints can lead to driveshaft failure and damage to other transmission components. We thoroughly diagnose, eliminate play, ensure smooth torque transmission to rear or front axle.'
WHERE slug = 'remont-kardannogo-vala';

UPDATE services SET 
  description = 'Ремонт приводов (ШРУСов) восстанавливает передачу крутящего момента на колеса. Меняем внутренние и наружные шарниры равных угловых скоростей, пыльники, хомуты. Признаки неисправности: хруст при поворотах, вибрации на скорости, стук. Поврежденный пыльник приводит к попаданию грязи и воды, что быстро выводит ШРУС из строя. Своевременная замена пыльников предотвращает дорогостоящую замену привода. Используем качественные запчасти для длительной эксплуатации.',
  description_en = 'CV joint repair restores torque transmission to wheels. We replace inner and outer constant velocity joints, boots, clamps. Malfunction signs: clicking when turning, vibrations at speed, knocking. Damaged boot leads to dirt and water ingress, quickly damaging CV joint. Timely boot replacement prevents costly axle replacement. We use quality parts for long-term operation.'
WHERE slug = 'remont-privodov';

UPDATE services SET 
  description = 'Замена тормозных колодок обеспечивает безопасное торможение. Устанавливаем качественные колодки для дисковых и барабанных тормозов. Проверяем состояние тормозных дисков/барабанов, при необходимости выполняем проточку или замену. Признаки износа колодок: скрип, визг, увеличение тормозного пути, биение педали. Рекомендуется замена передних колодок каждые 20-40 тысяч км, задних - 40-80 тысяч км в зависимости от условий эксплуатации и стиля вождения.',
  description_en = 'Brake pad replacement ensures safe braking. We install quality pads for disc and drum brakes. We check brake disc/drum condition, perform machining or replacement if needed. Pad wear signs: squeaking, squealing, increased braking distance, pedal pulsation. Front pad replacement recommended every 20-40 thousand km, rear - 40-80 thousand km depending on operating conditions and driving style.'
WHERE slug = 'zamena-tormoznyh-kolodok';

UPDATE services SET 
  description = 'Замена тормозных дисков восстанавливает эффективность торможения. Признаки износа: биение при торможении, глубокие борозды, коррозия, трещины, минимальная допустимая толщина. Устанавливаем диски проверенных производителей, обязательно парами на одной оси. Проводим проточку дисков при небольшом износе. Новые диски требуют притирки колодок на протяжении 200-300 км. Одновременно проверяем и при необходимости меняем колодки для оптимальной работы тормозной системы.',
  description_en = 'Brake disc replacement restores braking efficiency. Wear signs: pulsation when braking, deep grooves, corrosion, cracks, minimum allowable thickness. We install discs from proven manufacturers, always in pairs per axle. We machine discs with minor wear. New discs require pad bedding over 200-300 km. We simultaneously check and replace pads if needed for optimal brake system operation.'
WHERE slug = 'zamena-tormoznyh-diskov';

UPDATE services SET 
  description = 'Замена тормозной жидкости обеспечивает надежную работу гидравлической системы тормозов. Тормозная жидкость гигроскопична - впитывает влагу, что снижает температуру кипения и эффективность торможения. Проводим полную замену с прокачкой всех контуров, удалением воздуха. Используем жидкость соответствующего класса (DOT 3, DOT 4, DOT 5.1). Рекомендуется замена каждые 2 года независимо от пробега. Свежая жидкость предотвращает коррозию, обеспечивает четкую работу педали.',
  description_en = 'Brake fluid replacement ensures reliable hydraulic brake system operation. Brake fluid is hygroscopic - absorbs moisture, reducing boiling point and braking efficiency. We perform complete replacement with bleeding all circuits, air removal. We use proper class fluid (DOT 3, DOT 4, DOT 5.1). Replacement recommended every 2 years regardless of mileage. Fresh fluid prevents corrosion, ensures crisp pedal feel.'
WHERE slug = 'zamena-tormoznoj-zhidkosti';

UPDATE services SET 
  description = 'Ремонт суппортов устраняет заклинивание поршней, течи тормозной жидкости, неравномерный износ колодок. Выполняем разборку, чистку, замену манжет, пыльников, направляющих, поршней. Восстанавливаем подвижность механизма, обеспечиваем равномерное прижатие колодок. Признаки неисправности: увод при торможении, нагрев одного колеса, подклинивание, течь жидкости. После ремонта обязательна прокачка тормозов. Используем оригинальные ремкомплекты для надежного восстановления.',
  description_en = 'Caliper repair eliminates piston seizure, brake fluid leaks, uneven pad wear. We perform disassembly, cleaning, seal replacement, boot replacement, guide replacement, piston replacement. We restore mechanism mobility, ensure even pad clamping. Malfunction signs: pulling when braking, one wheel heating, dragging, fluid leak. Brake bleeding mandatory after repair. We use OEM repair kits for reliable restoration.'
WHERE slug = 'remont-supportov';

UPDATE services SET 
  description = 'Прокачка тормозов удаляет воздух из гидравлической системы, восстанавливая жесткость педали и эффективность торможения. Необходима после замены жидкости, ремонта суппортов, главного тормозного цилиндра, тормозных шлангов. Используем ручной или вакуумный метод прокачки. Проверяем отсутствие течей, правильную работу всех контуров. Мягкая педаль, проваливание, увеличенный тормозной путь - признаки воздуха в системе. Процедура обязательна для безопасности движения.',
  description_en = 'Brake bleeding removes air from hydraulic system, restoring pedal firmness and braking efficiency. Required after fluid replacement, caliper repair, master cylinder repair, brake hose replacement. We use manual or vacuum bleeding method. We check for leaks, proper operation of all circuits. Soft pedal, sinking, increased braking distance - signs of air in system. Procedure mandatory for driving safety.'
WHERE slug = 'prokachka-tormozov';

UPDATE services SET 
  description = 'Замена стоек амортизаторов восстанавливает комфорт и управляемость автомобиля. Признаки износа: раскачка кузова, пробои подвески на неровностях, увеличение тормозного пути, течь масла из амортизатора, неравномерный износ шин. Меняем амортизаторы парами на одной оси. Одновременно проверяем и при необходимости меняем опорные подшипники, отбойники, пыльники. После замены рекомендуется развал-схождение. Используем амортизаторы проверенных производителей.',
  description_en = 'Shock absorber replacement restores comfort and handling. Wear signs: body bouncing, suspension bottoming on bumps, increased braking distance, oil leak from shock, uneven tire wear. We replace shocks in pairs per axle. We simultaneously check and replace if needed strut mounts, bump stops, dust boots. Wheel alignment recommended after replacement. We use shocks from proven manufacturers.'
WHERE slug = 'zamena-stoek-amortizatorov';

UPDATE services SET 
  description = 'Замена пружин восстанавливает дорожный просвет и плавность хода. Признаки износа: проседание кузова, разная высота углов автомобиля, стук в подвеске, трещины на пружине. Меняем пружины парами на одной оси для сохранения геометрии. Устанавливаем стандартные или усиленные пружины в зависимости от условий эксплуатации. При замене проверяем состояние амортизаторов, опорных подшипников. После установки обязательна проверка и регулировка углов установки колес.',
  description_en = 'Spring replacement restores ride height and smoothness. Wear signs: body sagging, different corner heights, suspension noise, spring cracks. We replace springs in pairs per axle to maintain geometry. We install standard or heavy-duty springs depending on operating conditions. During replacement we check shock absorbers, strut mounts. Wheel alignment check and adjustment mandatory after installation.'
WHERE slug = 'zamena-pruzhin';

UPDATE services SET 
  description = 'Замена шаровых опор обеспечивает безопасность и точность управления. Шаровые опоры соединяют рычаги подвески со ступицей, обеспечивая поворот колеса. Признаки износа: стук при проезде неровностей, люфт колеса, скрип, неравномерный износ шин. Изношенная шаровая может разрушиться, что приведет к аварии. Проверяем люфт, меняем при обнаружении износа. Используем качественные детали. После замены обязательна проверка развал-схождения для правильной геометрии колес.',
  description_en = 'Ball joint replacement ensures safety and steering precision. Ball joints connect suspension arms to hub, enabling wheel turning. Wear signs: knocking over bumps, wheel play, squeaking, uneven tire wear. Worn ball joint can fail, causing accident. We check play, replace when wear detected. We use quality parts. Wheel alignment check mandatory after replacement for proper wheel geometry.'
WHERE slug = 'zamena-sharovyh-opor';

UPDATE services SET 
  description = 'Замена сайлентблоков устраняет люфты и стуки в подвеске, восстанавливает четкость управления. Сайлентблоки - резинометаллические шарниры, гасящие вибрации и удары. Признаки износа: стук на кочках, увод автомобиля, неравномерный износ шин, вибрации на руле, трещины резины. Меняем сайлентблоки рычагов, стабилизатора, балки. Используем полиуретановые для улучшенных характеристик или оригинальные резиновые. После замены обязательна регулировка развал-схождения.',
  description_en = 'Bushing replacement eliminates play and noise in suspension, restores precise handling. Bushings are rubber-metal joints absorbing vibrations and impacts. Wear signs: knocking on bumps, vehicle pulling, uneven tire wear, steering wheel vibrations, rubber cracks. We replace control arm bushings, sway bar bushings, beam bushings. We use polyurethane for improved performance or OEM rubber. Wheel alignment mandatory after replacement.'
WHERE slug = 'zamena-sajlentblokov';

UPDATE services SET 
  description = 'Замена рулевых наконечников восстанавливает четкость и безопасность рулевого управления. Наконечники передают усилие от рулевой рейки на поворотные кулаки колес. Признаки износа: люфт в рулевом управлении, стук при повороте руля, неравномерный износ шин, увод автомобиля. Изношенный наконечник может разрушиться, что приведет к потере управления. Проверяем люфт, меняем при обнаружении износа. После замены обязательна регулировка развал-схождения для правильных углов установки колес.',
  description_en = 'Tie rod end replacement restores steering precision and safety. Tie rod ends transmit force from steering rack to wheel knuckles. Wear signs: steering play, knocking when turning wheel, uneven tire wear, vehicle pulling. Worn tie rod end can fail, causing loss of control. We check play, replace when wear detected. Wheel alignment mandatory after replacement for proper wheel angles.'
WHERE slug = 'zamena-rulevyh-nakonechnikov';

UPDATE services SET 
  description = 'Ремонт рулевой рейки устраняет люфт, течи, тяжелый ход руля. Проводим ревизию, замену сальников, пыльников, втулок, подшипников. Восстанавливаем герметичность, регулируем зацепление. Признаки неисправности: стук в рейке, течь масла, тяжелый руль, люфт. Рейки с электроусилителем требуют диагностики электроники. Используем качественные ремкомплекты. После ремонта обязательна прокачка ГУР (если есть) и проверка углов установки колес. Своевременный ремонт дешевле замены рейки.',
  description_en = 'Steering rack repair eliminates play, leaks, heavy steering. We perform overhaul, seal replacement, boot replacement, bushing replacement, bearing replacement. We restore tightness, adjust mesh. Malfunction signs: rack knocking, oil leak, heavy steering, play. Electric power steering racks require electronics diagnostics. We use quality repair kits. Power steering bleeding (if equipped) and wheel alignment check mandatory after repair. Timely repair cheaper than rack replacement.'
WHERE slug = 'remont-rulevoj-rejki';

UPDATE services SET 
  description = 'Замена ступичного подшипника устраняет гул и вибрацию от колеса. Подшипник обеспечивает вращение колеса. Признаки износа: гул, нарастающий со скоростью, вибрация руля или кузова, люфт колеса, неравномерный нагрев. Изношенный подшипник может заклинить или разрушиться, что опасно. Меняем подшипник со ступицей или отдельно в зависимости от конструкции. Проверяем состояние тормозных дисков, колодок. Используем качественные подшипники известных производителей для долгого срока службы.',
  description_en = 'Wheel bearing replacement eliminates wheel humming and vibration. Bearing ensures wheel rotation. Wear signs: humming increasing with speed, steering wheel or body vibration, wheel play, uneven heating. Worn bearing can seize or fail, which is dangerous. We replace bearing with hub or separately depending on design. We check brake disc and pad condition. We use quality bearings from known manufacturers for long service life.'
WHERE slug = 'zamena-stupichnogo-podshipnika';

UPDATE services SET 
  description = 'Развал-схождение (регулировка углов установки колес) обеспечивает правильную геометрию подвески для равномерного износа шин, хорошей управляемости и курсовой устойчивости. Регулируем углы развала, схождения, кастера на современном 3D стенде. Обязательна после замены элементов подвески, рулевого управления, шин. Признаки нарушения: увод автомобиля, неравномерный износ шин, тяжелый руль. Рекомендуется проверка каждые 15-20 тысяч км и после попадания в яму.',
  description_en = 'Wheel alignment (wheel angle adjustment) ensures proper suspension geometry for even tire wear, good handling and directional stability. We adjust camber, toe, caster angles on modern 3D equipment. Mandatory after suspension component replacement, steering replacement, tire replacement. Misalignment signs: vehicle pulling, uneven tire wear, heavy steering. Check recommended every 15-20 thousand km and after hitting pothole.'
WHERE slug = 'razval-shozhdenie';

UPDATE services SET 
  description = 'Ремонт глушителя устраняет течи выхлопных газов, громкий звук, дребезжание. Выполняем аргонную сварку трещин и прогаров, замену секций, установку пламегасителя вместо катализатора. Глушитель снижает шум двигателя и направляет выхлопные газы. Признаки неисправности: громкий выхлоп, запах газов в салоне, потеря мощности. Используем нержавеющую сталь для долговечности. Исправный глушитель обеспечивает комфорт, соответствие нормам, оптимальную работу двигателя.',
  description_en = 'Muffler repair eliminates exhaust gas leaks, loud sound, rattling. We perform argon welding of cracks and burn-throughs, section replacement, flame arrester installation instead of catalytic converter. Muffler reduces engine noise and directs exhaust gases. Malfunction signs: loud exhaust, gas smell in cabin, power loss. We use stainless steel for durability. Proper muffler ensures comfort, compliance, optimal engine operation.'
WHERE slug = 'remont-glushitelya';

UPDATE services SET 
  description = 'Замена катализатора восстанавливает экологические показатели выхлопа и нормальную работу двигателя. Катализатор очищает выхлопные газы от вредных веществ. Признаки неисправности: потеря мощности, повышенный расход топлива, ошибки кислородных датчиков, дребезжание внутри. Забитый катализатор создает сопротивление выхлопу. Предлагаем замену на оригинальный катализатор или установку пламегасителя с перепрошивкой ЭБУ для удаления ошибок.',
  description_en = 'Catalytic converter replacement restores emission performance and normal engine operation. Catalytic converter cleans exhaust gases from harmful substances. Malfunction signs: power loss, increased fuel consumption, oxygen sensor errors, internal rattling. Clogged catalyst creates exhaust restriction. We offer replacement with OEM catalyst or flame arrester installation with ECU reprogramming to remove errors.'
WHERE slug = 'zamena-katalizatora';

UPDATE services SET 
  description = 'Замена сажевого фильтра (DPF) актуальна для дизельных двигателей стандарта Евро-5 и выше. Сажевый фильтр улавливает твердые частицы из выхлопа. Признаки забитого фильтра: потеря мощности, повышенный расход, переход в аварийный режим, ошибки. Регенерация не всегда помогает. Предлагаем замену на оригинальный фильтр или физическое удаление с программным отключением. После удаления возвращается мощность, снижается расход топлива, нет проблем с регенерацией.',
  description_en = 'DPF (Diesel Particulate Filter) replacement relevant for Euro-5+ diesel engines. DPF captures solid particles from exhaust. Clogged filter signs: power loss, increased consumption, limp mode, errors. Regeneration not always helps. We offer OEM filter replacement or physical removal with software deletion. After removal power returns, fuel consumption decreases, no regeneration issues.'
WHERE slug = 'zamena-sazhevogo-filtra';

UPDATE services SET 
  description = 'Ремонт системы AdBlue (SCR) для дизельных двигателей восстанавливает работу системы нейтрализации оксидов азота. Занимаемся заменой дозатора, нагревателя бачка, датчиков, трубок. Устраняем ошибки, связанные с качеством жидкости, замерзанием, неисправностью компонентов. Без исправной системы AdBlue автомобиль переходит в аварийный режим с ограничением мощности или не заводится. Используем оригинальные запчасти, качественную жидкость AdBlue. Проводим адаптацию после ремонта.',
  description_en = 'AdBlue system (SCR) repair for diesel engines restores nitrogen oxide neutralization system operation. We handle doser replacement, tank heater replacement, sensor replacement, line replacement. We eliminate errors related to fluid quality, freezing, component malfunction. Without proper AdBlue system vehicle enters limp mode with power limitation or will not start. We use OEM parts, quality AdBlue fluid. We perform adaptation after repair.'
WHERE slug = 'remont-sistemy-adblue';

UPDATE services SET 
  description = 'Замена аккумулятора обеспечивает надежный запуск двигателя и питание электрооборудования. Признаки слабого аккумулятора: затрудненный пуск, тусклый свет фар, быстрая разрядка. Подбираем аккумулятор правильной емкости, полярности и размера для вашего автомобиля. Проверяем генератор, утечки тока. Устанавливаем, программируем (для современных авто), утилизируем старый. Срок службы аккумулятора 3-5 лет. Предлагаем кальциевые, AGM, EFB технологии в зависимости от требований автомобиля.',
  description_en = 'Battery replacement ensures reliable engine start and electrical system power. Weak battery signs: difficult starting, dim headlights, quick discharge. We select battery with proper capacity, polarity and size for your vehicle. We check alternator, current leaks. We install, program (for modern cars), dispose old one. Battery life 3-5 years. We offer calcium, AGM, EFB technologies depending on vehicle requirements.'
WHERE slug = 'zamena-akkumulyatora';

UPDATE services SET 
  description = 'Ремонт генератора восстанавливает зарядку аккумулятора и питание электрики. Признаки неисправности: горит лампа зарядки, разряжается аккумулятор, тусклый свет, нестабильное напряжение. Меняем диодный мост, регулятор напряжения, щетки, подшипники, обмотку. Проверяем на стенде до и после ремонта. Неисправный генератор приводит к разрядке аккумулятора и остановке автомобиля. Своевременный ремонт дешевле замены генератора. Используем качественные комплектующие для надежной работы.',
  description_en = 'Alternator repair restores battery charging and electrical power. Malfunction signs: charge light on, battery draining, dim lights, unstable voltage. We replace diode bridge, voltage regulator, brushes, bearings, winding. We test on bench before and after repair. Faulty alternator leads to battery drain and vehicle breakdown. Timely repair cheaper than alternator replacement. We use quality components for reliable operation.'
WHERE slug = 'remont-generatora';

UPDATE services SET 
  description = 'Замена стартера обеспечивает надежный запуск двигателя. Признаки неисправности: щелчки при попытке пуска, медленное вращение, посторонние звуки, отсутствие реакции. Причины: износ щеток, бендикса, втягивающего реле, обмотки, подшипников. Предлагаем ремонт (замена изношенных деталей) или установку нового стартера. Проверяем на стенде, гарантируем качество. Также диагностируем проводку, замок зажигания, иммобилайзер. Быстрая замена, чтобы вы не остались без мобильности.',
  description_en = 'Starter replacement ensures reliable engine start. Malfunction signs: clicking when trying to start, slow cranking, unusual sounds, no response. Causes: worn brushes, bendix, solenoid, winding, bearings. We offer repair (worn parts replacement) or new starter installation. We bench test, guarantee quality. We also diagnose wiring, ignition switch, immobilizer. Quick replacement so you are not stranded.'
WHERE slug = 'zamena-startera';

UPDATE services SET 
  description = 'Диагностика электрики выявляет неисправности в электрооборудовании автомобиля. Находим причины: не работают фары, стеклоподъемники, печка, сигнализация, центральный замок, мультимедиа. Проверяем проводку, предохранители, реле, блоки управления, датчики, актуаторы. Используем мультиметры, осциллографы, сканеры. Устраняем короткие замыкания, обрывы, утечки тока, окисление контактов. Восстанавливаем работу всех электрических систем. Современные автомобили насыщены электроникой - доверьте диагностику профессионалам.',
  description_en = 'Electrical diagnostics identifies electrical equipment malfunctions. We find causes: non-working lights, windows, heater, alarm, central locking, multimedia. We check wiring, fuses, relays, control units, sensors, actuators. We use multimeters, oscilloscopes, scanners. We eliminate short circuits, breaks, current leaks, contact oxidation. We restore all electrical system operation. Modern cars packed with electronics - trust diagnostics to professionals.'
WHERE slug = 'diagnostika-elektriki';

UPDATE services SET 
  description = 'Ремонт проводки устраняет короткие замыкания, обрывы, окисление контактов, повреждения изоляции. Восстанавливаем жгуты проводов, заменяем поврежденные участки, устанавливаем новые разъемы, обрабатываем контакты. Причины проблем: перетирание, коррозия, грызуны, неквалифицированное вмешательство. Признаки: не работают приборы, перегорают предохранители, запах гари, разрядка аккумулятора. Используем качественные провода нужного сечения, термоусадку, гофру. Обеспечиваем надежные контакты и защиту от влаги.',
  description_en = 'Wiring repair eliminates short circuits, breaks, contact oxidation, insulation damage. We restore wire harnesses, replace damaged sections, install new connectors, treat contacts. Problem causes: chafing, corrosion, rodents, unqualified intervention. Signs: non-working devices, blown fuses, burning smell, battery drain. We use quality wires of proper gauge, heat shrink, conduit. We ensure reliable contacts and moisture protection.'
WHERE slug = 'remont-provodki';

UPDATE services SET 
  description = 'Установка сигнализации защищает автомобиль от угона и проникновения. Устанавливаем современные охранные системы с обратной связью, GSM/GPS модулями, автозапуском, иммобилайзером, датчиками удара и наклона. Подбираем систему под ваши требования и бюджет. Скрытая установка блоков усложняет обход злоумышленниками. Программируем брелоки, настраиваем чувствительность датчиков, интегрируем со штатной электроникой. Предоставляем гарантию. Профессиональная установка обеспечивает надежную защиту вашего автомобиля.',
  description_en = 'Alarm system installation protects vehicle from theft and intrusion. We install modern security systems with feedback, GSM/GPS modules, remote start, immobilizer, shock and tilt sensors. We select system for your requirements and budget. Hidden block installation complicates bypass by criminals. We program remotes, adjust sensor sensitivity, integrate with factory electronics. We provide warranty. Professional installation ensures reliable vehicle protection.'
WHERE slug = 'ustanovka-signalizacii';

UPDATE services SET 
  description = 'Установка парктроников (датчиков парковки) облегчает маневрирование и предотвращает повреждения при парковке. Устанавливаем задние и передние датчики, камеры заднего вида, парковочные радары. Врезные или накладные датчики, подбор по цвету автомобиля. Монитор или индикация на приборной панели/зеркале. Звуковые и визуальные сигналы о препятствиях. Аккуратная установка, скрытая прокладка проводов, настройка чувствительности. Парктроники особенно полезны для больших автомобилей и ограниченной видимости.',
  description_en = 'Parking sensor installation facilitates maneuvering and prevents parking damage. We install rear and front sensors, backup cameras, parking radars. Flush or surface-mount sensors, color-matched to vehicle. Monitor or display on dashboard/mirror. Audio and visual obstacle alerts. Neat installation, hidden wire routing, sensitivity adjustment. Parking sensors especially useful for large vehicles and limited visibility.'
WHERE slug = 'ustanovka-parktronikov';

UPDATE services SET 
  description = 'Установка камеры заднего вида улучшает обзорность при движении задним ходом, повышает безопасность парковки. Устанавливаем камеры с разметкой траектории движения, широким углом обзора, ночным режимом. Интеграция с штатным монитором или установка отдельного дисплея. Размещение в ручке багажника, рамке номера, штатном месте. Подключаем активацию при включении задней передачи. Камера незаменима для автомобилей с ограниченной видимостью, больших кузовов, для парковки в тесных условиях. Четкое изображение в любую погоду.',
  description_en = 'Backup camera installation improves rear visibility, increases parking safety. We install cameras with trajectory guidelines, wide viewing angle, night mode. Integration with factory monitor or separate display installation. Mounting in trunk handle, license plate frame, factory location. We connect activation when reverse gear engaged. Camera essential for vehicles with limited visibility, large bodies, tight parking. Clear image in any weather.'
WHERE slug = 'ustanovka-kamery-zadnego-vida';

UPDATE services SET 
  description = 'Ремонт печки (системы отопления) восстанавливает комфортную температуру в салоне зимой. Устраняем холодный воздух, слабый поток, посторонние звуки, запотевание стекол. Меняем радиатор печки, вентилятор, резистор, заслонки, краник. Промываем систему охлаждения, удаляем воздушные пробки, проверяем термостат. Ремонтируем блок управления климатом, заменяем датчики температуры. Восстанавливаем регулировку температуры и направления потоков. Работающая печка критична для безопасности - обеспечивает видимость и комфорт водителя.',
  description_en = 'Heater repair (heating system) restores comfortable cabin temperature in winter. We eliminate cold air, weak flow, unusual sounds, window fogging. We replace heater core, blower motor, resistor, flaps, valve. We flush cooling system, remove air locks, check thermostat. We repair climate control unit, replace temperature sensors. We restore temperature and flow direction control. Working heater critical for safety - ensures visibility and driver comfort.'
WHERE slug = 'remont-pechki';

UPDATE services SET 
  description = 'Заправка и ремонт кондиционера обеспечивают прохладу в салоне летом. Проверяем давление фреона, герметичность системы, работу компрессора, конденсора, испарителя. Дозаправляем хладагент (R134a или R1234yf), меняем масло компрессора, заменяем фильтр-осушитель. Устраняем утечки, меняем изношенные компоненты. Признаки неисправности: теплый воздух, слабое охлаждение, посторонние звуки, запах. Регулярное обслуживание кондиционера продлевает его срок службы. Чистый, холодный воздух для вашего комфорта.',
  description_en = 'AC recharge and repair ensure cabin coolness in summer. We check refrigerant pressure, system tightness, compressor operation, condenser, evaporator. We recharge refrigerant (R134a or R1234yf), change compressor oil, replace receiver-drier. We eliminate leaks, replace worn components. Malfunction signs: warm air, weak cooling, unusual sounds, smell. Regular AC maintenance extends its life. Clean, cold air for your comfort.'
WHERE slug = 'zapravka-kondicionera';

UPDATE services SET 
  description = 'Чистка системы вентиляции и кондиционирования устраняет неприятные запахи, улучшает качество воздуха в салоне, повышает эффективность работы климатической системы. Проводим антибактериальную обработку испарителя кондиционера, где скапливаются бактерии и грибок. Чистим воздуховоды, меняем салонный фильтр. Удаляем пыль, пыльцу, листья из системы. Обработка специальными составами убивает микроорганизмы. Рекомендуется ежегодная чистка весной перед началом использования кондиционера. Свежий воздух без запахов.',
  description_en = 'Ventilation and AC system cleaning eliminates odors, improves cabin air quality, increases climate system efficiency. We perform antibacterial treatment of AC evaporator where bacteria and mold accumulate. We clean air ducts, replace cabin filter. We remove dust, pollen, leaves from system. Treatment with special compounds kills microorganisms. Annual spring cleaning recommended before AC use season. Fresh air without odors.'
WHERE slug = 'chistka-sistemy-ventilyacii';

UPDATE services SET 
  description = 'Замена лобового стекла восстанавливает видимость и безопасность, устраняет трещины и сколы, которые ухудшают обзор и ослабляют конструкцию. Используем оригинальные или качественные неоригинальные стекла с подогревом, датчиками, тонировкой согласно вашим требованиям. Аккуратный демонтаж старого стекла, подготовка проема, установка на качественный полиуретановый клей. Подключаем подогрев, датчики дождя. Соблюдаем технологию для герметичности и прочности. После замены автомобиль готов к эксплуатации через 3-24 часа в зависимости от клея.',
  description_en = 'Windshield replacement restores visibility and safety, eliminates cracks and chips that impair view and weaken structure. We use OEM or quality aftermarket glass with heating, sensors, tinting per your requirements. Careful old glass removal, opening preparation, installation with quality polyurethane adhesive. We connect heating, rain sensors. We follow technology for tightness and strength. Vehicle ready after 3-24 hours depending on adhesive.'
WHERE slug = 'zamena-lobovogo-stekla';

UPDATE services SET 
  description = 'Ремонт сколов и трещин лобового стекла останавливает распространение повреждений, сохраняет оптические свойства, избавляет от необходимости дорогостоящей замены стекла. Заполняем скол или трещину специальной полимерной смолой, которая после полимеризации УФ-лампой становится прозрачной и прочной. Ремонт эффективен при размере скола до 2 см и длине трещины до 30 см. Процедура занимает 30-60 минут. Важно сделать ремонт как можно быстрее, пока повреждение не увеличилось от вибраций и перепадов температуры.',
  description_en = 'Windshield chip and crack repair stops damage spread, preserves optical properties, avoids costly glass replacement. We fill chip or crack with special polymer resin that becomes transparent and strong after UV lamp curing. Repair effective for chip up to 2 cm and crack up to 30 cm. Procedure takes 30-60 minutes. Important to repair ASAP before damage grows from vibrations and temperature changes.'
WHERE slug = 'remont-skolov-lobovogo-stekla';

UPDATE services SET 
  description = 'Полировка кузова восстанавливает блеск лакокрасочного покрытия, удаляет мелкие царапины, потертости, окисление, следы от птичьего помета. Применяем абразивные и финишные полироли в несколько этапов. Используем роторные и эксцентриковые машинки, профессиональную химию. Восстанавливаем глубину цвета, создаем защитный слой. Полировка возвращает автомобилю вид нового, повышает стойкость ЛКП к внешним воздействиям. Рекомендуется 1-2 раза в год. После полировки возможно нанесение защитных составов - воска, керамики, жидкого стекла.',
  description_en = 'Body polishing restores paint finish shine, removes minor scratches, scuffs, oxidation, bird dropping marks. We apply abrasive and finishing polishes in multiple stages. We use rotary and orbital machines, professional chemicals. We restore color depth, create protective layer. Polishing returns vehicle to new appearance, increases paint durability to external factors. Recommended 1-2 times per year. After polishing possible to apply protective coatings - wax, ceramic, liquid glass.'
WHERE slug = 'polirovka-kuzova';
