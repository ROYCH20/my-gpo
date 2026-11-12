import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Search,
  ChevronDown,
  X,
  Layers,
  Target,
  Briefcase,
  GraduationCap,
  FileText
} from 'lucide-react';

const PRACTICES = [
  { id: 1, sheet: "053-М", topic: "Анализ бизнес-процессов медиацентра ТУСУР", company: "Центр компетенций ТУСУР (ЦК ТУСУР)", direction: "Анализ бизнес-процессов" },
  { id: 2, sheet: "053-М", topic: "Совершенствование методов разработки программных продуктов ЛИСМО ТУСУР", company: "ИИ ТУСУР, Лаборатория ЛИСМО", direction: "Совершенствование методов разработки" },
  { id: 3, sheet: "013-М", topic: "Теоретические основы модели 'ВУЗ-Предприятие' как фактор инновационного и технологического развития университета", company: "Кафедра ФИТ", direction: "Моделирование" },
  { id: 4, sheet: "013-М", topic: "Разработка системы оценки мероприятий для ИС 'Единый календарь мероприятий университета'", company: "Учебное управление (УУ) ТУСУР", direction: "Разработка системы" },
  { id: 5, sheet: "013-М", topic: "Разработка прототипа ИС оценки качества образовательных программ инженерного профиля", company: "Учебное управление (УУ) ТУСУР", direction: "Разработка системы" },
  { id: 6, sheet: "013-М", topic: "Разработка и внедрение интерактивного трекера успеваемости обучающихся", company: "МАОУ ДО 'Томский Хобби-центр'", direction: "Разработка трекера успеваемости" },
  { id: 7, sheet: "013-М", topic: "Анализ методик оценки качества ПО", company: "Лаборатория ЛИСМО ТУСУР", direction: "Анализ методик" },
  { id: 8, sheet: "033-М", topic: "Методические пособия по нейротехнологиям: мозг-компьютер", company: "Лаборатория робототехнических манипуляторов кафедры УИ, ТУСУР", direction: "Разработка методических пособий" },
  { id: 9, sheet: "033-М", topic: "Разработка системы видеоаналитики для распознавания СИЗ", company: "ООО 'Neo Stack Technology'", direction: "Разработка системы" },
  { id: 10, sheet: "033-М", topic: "Исследование возможностей роботизации процесса экспертизы промышленной безопасности", company: "ТУСУР, ФЭТ, Кафедра УИ, ФИТ", direction: "Роботизация процессов" },
  { id: 11, sheet: "033-М", topic: "Разработка ПО для гибридной оценки эмоционального состояния человека", company: "ООО 'ИНТЭК Промышленные системы'", direction: "Разработка ПО" },
  { id: 12, sheet: "033-М", topic: "Использование библиотеки стандартных компонентов для оптимизации производства", company: "ООО 'Завод ПСА' ЭлеСи", direction: "Оптимизация производства" },
  { id: 13, sheet: "033-М", topic: "Интеграция 'Блока контактного соединения' в систему умный дом", company: "ООО 'Аквилон'", direction: "Интеграция ПО" },
  { id: 14, sheet: "033-М", topic: "Инженерная реализация проекта 'DRONE FIGHTING'", company: "Лаборатория 'БАС'", direction: "Реализация проекта" },
  { id: 15, sheet: "014-М", topic: "Модернизация системы управления мониторинга качества электронных манометров", company: "кафедра УИ", direction: "Автоматизация бизнес-процессов" },
  { id: 16, sheet: "014-М", topic: "Анализ метода оценивания компетенций при помощи искусственного интеллекта", company: "кафедра УИ, лаборатория робототехники манипуляторов", direction: "Анализ метода" },
  { id: 17, sheet: "014-М", topic: "Проектирование и разработка инновационного детектора напряжения на высоковольтных проводах", company: "ООО 'Трансмаш-Томск'", direction: "Проектирование инновационного детектора" },
  { id: 18, sheet: "014-М", topic: "Реинжиниринг системы автоматизации секции грануляции полипропилена", company: "ООО НПП 'ТЭК'", direction: "Реинжиниринг" },
  { id: 19, sheet: "014-М", topic: "Разработка концепции цифровой трансформации на основе финтех-решений", company: "ППОС ТУСУР", direction: "Цифровая трансформация/управление рисками" },
  { id: 20, sheet: "014-М", topic: "Инновационные технологии реализации государственной молодежной политики", company: "ТОО Общероссийского профсоюза образования", direction: "Анализ ППОС" },
  { id: 21, sheet: "051", topic: "Проектирование карты процесса СМК 'Управление документацией' для АО 'НИИПП'", company: "АО 'Научно-исследовательский институт полупроводниковых приборов'", direction: "Управление документацией" },
  { id: 22, sheet: "051", topic: "Разработка проекта инструкции на процесс 'Тестирование программного обеспечения'", company: "Лаборатория ЛИСМО, ИИ ТУСУР", direction: "Разработка документации" },
  { id: 23, sheet: "051", topic: "Анализ и управление рисками ключевого бизнес-процесса", company: "ООО 'Бизнес Энерджи'", direction: "Анализ и управление рисками" },
  { id: 24, sheet: "051", topic: "Проведение внутреннего аудита процесса 'Фрезерование деталей'", company: "ООО 'Бизнес Энерджи'", direction: "Аудит" },
  { id: 25, sheet: "051", topic: "Разработка модели бизнес-процесса и нормативной документации для консультантов-менеджеров", company: "ООО 'ДИВА БУХГАЛТЕРИЯ'", direction: "Управление процессами" },
  { id: 26, sheet: "051", topic: "Анализ бизнес-процессов организации", company: "ООО 'МСТ'", direction: "Анализ процесса" },
  { id: 27, sheet: "051", topic: "Оптимизация бизнес-процессов", company: "ООО 'Сибкод'", direction: "Оптимизация процесса" },
  { id: 28, sheet: "051", topic: "Подготовка СМК института инноватики ко второму наблюдательному аудиту", company: "ОМКиИС, ТУСУР", direction: "Аудит" },
  { id: 29, sheet: "051", topic: "Анализ ключевого процесса организации", company: "ФБУ 'Алтайский ЦСМ'", direction: "Анализ процесса" },
  { id: 30, sheet: "050", topic: "Разработка и апробация регламента 'Аудит второй стороны'", company: "ОАО 'Манотомь'", direction: "Разработка регламента" },
  { id: 31, sheet: "050", topic: "Разработка и апробация методики оценки результативности СМК", company: "ОАО 'Манотомь'", direction: "Разработка методики" },
  { id: 32, sheet: "050", topic: "Внедрение элементов стандарта 'Государство для бизнеса'", company: "АНО 'ММКС'", direction: "Внедрение стандарта" },
  { id: 33, sheet: "050", topic: "Проведение внутренних аудитов в соответствии с ISO 9001:2015", company: "ГБУЗ РТ 'Республиканская больница №1'", direction: "Аудит" },
  { id: 34, sheet: "050", topic: "Моделирование процесса 'Ценообразование на продукцию' холдинга", company: "АО 'Сибагро'", direction: "Моделирование процесса" },
  { id: 35, sheet: "050", topic: "Моделирование и цифровизация процесса наставничества", company: "Кафе 'Желток'", direction: "Моделирование и цифровизация процесса" },
  { id: 36, sheet: "050", topic: "Разработка документации по управлению несоответствиями", company: "АО 'СХК'", direction: "Разработка документации" },
  { id: 37, sheet: "050", topic: "Проектирование документации СМК для IT-компании", company: "IT-компания 'TVODO'", direction: "Разработка документации" },
  { id: 38, sheet: "050", topic: "Разработка программы обеспечения качества программных средств", company: "НИ ТПУ", direction: "Разработка программы" },
  { id: 39, sheet: "050", topic: "Разработка и описание процессов СМК", company: "ООО 'МК-Полимер'", direction: "Разработка процессов" },
  { id: 40, sheet: "050", topic: "Проектирование модели бизнес-процессов и дорожной карты", company: "АО 'Melon fashion group'", direction: "Моделирование процесса" },
  { id: 41, sheet: "053", topic: "Разработка концепции приложения для автоматизации рекламного бизнеса", company: "ООО 'Глобал-Маркет'", direction: "Автоматизация процесса" },
  { id: 42, sheet: "053", topic: "Разработка стандарта операционной процедуры по процессу пайки", company: "АО 'Физтех-Энерго'", direction: "Разработка стандарта" },
  { id: 43, sheet: "053", topic: "Анализ процесса 'Закупки' предприятия", company: "НПП ООО 'ТЭК'", direction: "Анализ процессов" },
  { id: 44, sheet: "053", topic: "Анализ процесса 'Сервисное обслуживание' предприятия", company: "НПП ООО 'ТЭК'", direction: "Анализ процессов" },
  { id: 45, sheet: "053", topic: "Анализ процесса 'Производство электронных модулей' предприятия", company: "НПП ООО 'ТЭК'", direction: "Анализ процессов" },
  { id: 46, sheet: "053", topic: "Проведение внутреннего аудита организации ОПК", company: "АО 'НПЦ 'Полюс'", direction: "Аудит" },
  { id: 47, sheet: "053", topic: "Оптимизация работы участка автоклавного выщелачивания", company: "АО 'Покровский рудник' ОП 'ПАГК'", direction: "Оптимизация процессов" },
  { id: 48, sheet: "053", topic: "Внутренний аудит системы менеджмента качества", company: "АО 'СХК'", direction: "Аудит" },
  { id: 49, sheet: "053", topic: "Разработка реестра рисков для процессов мебельного цеха", company: "ИП Гузов Роман Сергеевич", direction: "Анализ рисков" },
  { id: 50, sheet: "053", topic: "Разработка реестра рисков для основных процессов", company: "ТОО 'IC GROUP LTD'", direction: "Анализ рисков" },
  { id: 51, sheet: "053", topic: "Анализ процесса 'Проведение поверки и калибровки СИ'", company: "КФ АО 'Национальный центр экспертизы и сертификации'", direction: "Анализ процесса" },
  { id: 52, sheet: "053", topic: "Анализ стандартов производства и внутреннего аудита", company: "АО 'ТЭМЗ'", direction: "Анализ стандартов и аудита" },
  { id: 53, sheet: "053", topic: "Управление качеством UX/UI-процессов", company: "ООО 'Rubius'", direction: "Управление качеством" },
  { id: 54, sheet: "053", topic: "Оптимизация процесса 'Входной контроль товаров'", company: "ООО 'Газпромнефть-Снабжение'", direction: "Оптимизация процесса" },
  { id: 55, sheet: "052", topic: "Формирование бизнес-процессов компании", company: "ООО 'МЕХАТРОНИКА-ТОМСК'", direction: "Моделирование бизнес-процесса" },
  { id: 56, sheet: "052", topic: "Построение карты потока создания ценности", company: "ООО 'Биолит'", direction: "Разработка карты бизнес-процессов" },
  { id: 57, sheet: "052", topic: "Разработка карты бизнес-процессов и документированной процедуры", company: "ООО 'Ди Эй Групп'", direction: "Разработка карты бизнес-процессов" },
  { id: 58, sheet: "052", topic: "Актуализация руководства по качеству Института инноватики ТУСУР", company: "Институт инноватики ТУСУР", direction: "Актуализация руководства по качеству" },
  { id: 59, sheet: "052", topic: "Обеспечение качества платформы E-commerce методами ручного тестирования", company: "ИП Березин Андрей Сеергеевич", direction: "Тестирование ПО" },
  { id: 60, sheet: "052", topic: "Моделирование бизнес-процесса 'Управление проектами'", company: "ООО 'Ди Эй Групп'", direction: "Моделирование бизнес-процесса" },
  { id: 61, sheet: "052", topic: "Разработка моделей бизнес-процессов и регламентированной документации", company: "ИП Саитова Ксения Викторовна", direction: "Моделирование бизнес-процесса" },
  { id: 62, sheet: "021-1", topic: "Разработка 2D игры для АНО ДО 'Детского технопарка Кванториум'", company: "АНО ДО 'Детский технопарк 'Кванториум'", direction: "Разработка игры" },
  { id: 63, sheet: "021-1", topic: "Разработка чат-бота в Telegram для детского технопарка 'Кванториум'", company: "АНО ДО 'Детский технопарк 'Кванториум'", direction: "Разработка чат-бота" },
  { id: 64, sheet: "021-1", topic: "Проектирование и разработка макета мобильного манипулятора", company: "АНО ДО 'Детский технопарк 'Кванториум'", direction: "Проектирование макета" },
  { id: 65, sheet: "021-1", topic: "Разработка чат-бота в Telegram для оптимизации работ ресторана", company: "АНО ДО 'Детский технопарк 'Кванториум'", direction: "Разработка чат-бота" },
  { id: 66, sheet: "021-1", topic: "Разработка веб-сайта", company: "АНО ДО 'Детский технопарк 'Кванториум'", direction: "Разработка веб-сайта" },
  { id: 67, sheet: "021-1", topic: "Программирование микроконтроллера ESP32 для зарядной станции", company: "ООО 'Икстроник'", direction: "Программирование микроконтроллера" },
  { id: 68, sheet: "021-1", topic: "Программирование микроконтроллера для зарядной станции электромобилей", company: "ООО 'Икстроник'", direction: "Программирование микроконтроллера" },
  { id: 69, sheet: "021-1", topic: "Система учета инвентаризации оборудования", company: "ТОФСГС Томскстат", direction: "Разработка системы учета" },
  { id: 70, sheet: "021-1", topic: "Разработка сайта правовой информации исполнительных органов", company: "ГУ 'ЗИЦ'", direction: "Разработка сайта" },
  { id: 71, sheet: "021-1", topic: "Подготовка среды разработки под Linux - Portable Bundle", company: "ООО 'ДиВиЛайн'", direction: "Подготовка среды разработки" },
  { id: 72, sheet: "021-1", topic: "Настройка развертывания системы для Code Review", company: "ООО 'ДиВиЛайн'", direction: "Подготовка среды разработки" },
  { id: 73, sheet: "021-1", topic: "Программирование электронного ключа Guardant Code Time", company: "ООО 'ДиВиЛайн'", direction: "Программирование микроконтроллера" },
  { id: 74, sheet: "021-1", topic: "Разработка сервиса генератора атмосферы", company: "ООО 'ЛЭМС-Т'", direction: "Разработка сервиса" },
  { id: 75, sheet: "021-1", topic: "Обслуживание электронного оборудования на АЗС", company: "ООО ИК 'СИБИНТЕК'", direction: "Обслуживание оборудования" },
  { id: 76, sheet: "011", topic: "Разработка страницы о компании и её внедрение на сайт", company: "АО 'НПФ МИКРАН'", direction: "Frontend/веб-дизайн" },
  { id: 77, sheet: "011", topic: "Формирование портрета потребителя компании для ИИС", company: "АО 'НПФ МИКРАН'", direction: "Анализ потребителей" },
  { id: 78, sheet: "011", topic: "Исследование и анализ рынка потребителей продукции", company: "АО 'НПФ МИКРАН'", direction: "Анализ потребителей" },
  { id: 79, sheet: "011", topic: "Оптимизация процесса заселения людей на нефтяные промыслы", company: "ООО 'Газпроснефть-Восток'", direction: "Оптимизация процессов" },
  { id: 80, sheet: "011", topic: "Решение прикладных задач по направлению НИД компании", company: "ООО 'Бизнес Энерджи'", direction: "Научно-исследовательская деятельность" },
  { id: 81, sheet: "011", topic: "Решение прикладных задач в области металлообработки", company: "ООО 'Бизнес Энерджи'", direction: "Научно-исследовательская деятельность" },
  { id: 82, sheet: "011", topic: "Конкурентный анализ рынка дополнительного образования резидентов Сколково", company: "ООО 'АСАП ЭДЬЮКЕЙШЕН'", direction: "Анализ рынка" },
  { id: 83, sheet: "011", topic: "Решение прикладных организационно-управленческих задач", company: "ООО 'Автоматика-сервис'", direction: "Научно-исследовательская деятельность" },
  { id: 84, sheet: "011", topic: "Разработка описательных и аналитических разделов бизнес-плана", company: "Союз 'ТПП Томской области'", direction: "Разработка бизнес-плана" },
  { id: 85, sheet: "011", topic: "Анализ проекта и поиск партнеров для компании", company: "ООО 'МИП 'ДИВА 3D'", direction: "Анализ проекта/партнеров" },
  { id: 86, sheet: "023", topic: "ВЫБОР ОПТИМАЛЬНОЙ СИСТЕМЫ РОБОРУКИ ДЛЯ СОРТИРОВКИ", company: "АСУТИТП ООО НПП 'ТЭК'", direction: "Робототехника" },
  { id: 87, sheet: "023", topic: "АВТОМАТИЗАЦИЯ ПРОЦЕССОВ ОБРАБОТКИ ИЗОБРАЖЕНИЙ", company: "Центр развития открытых анимационных технологий 'Моревна'", direction: "Автоматизация" },
  { id: 88, sheet: "023", topic: "Разработка редактора SCADA СИСТЕМ", company: "ООО 'НПФ Мехатроника - Про'", direction: "Разработка" },
  { id: 89, sheet: "023", topic: "РАЗРАБОТКА И ПРОГРАММНАЯ РЕАЛИЗАЦИЯ РОБОТИЗИРОВАННОГО КОМПЛЕКСА", company: "Зав.лабораторией робототехнических манипуляторов", direction: "Разработка" },
  { id: 90, sheet: "023", topic: "УПРАВЛЕНИЕ НАСОСАМИ. ПОВЫШЕНИЕ ЭФФЕКТИВНОСТИ РАБОТЫ НАСОСНЫХ СТАНЦИЙ", company: "АСУТИТП ООО НПП 'ТЭК'", direction: "Автоматизация" },
  { id: 91, sheet: "023", topic: "СОЗДАНИЕ ПРОГРАММЫ ДЛЯ РЕШЕНИЯ ПРЯМОЙ ЗАДАЧИ КИНЕМАТИКИ МАНИПУЛЯТОРА", company: "Заведующий учебной лабораторией робототехнических манипуляторов", direction: "Разработка" },
  { id: 92, sheet: "023", topic: "РАЗРАБОТКА МОДУЛЯ СБОРА ДАННЫХ И ХРАНЕНИЯ КОНФИГУРАЦИЙ ДЛЯ SCADA", company: "СРСПО,ООО 'НПФ Мехатроника-Про'", direction: "Разработка" },
  { id: 93, sheet: "023", topic: "РАЗРАБОТКА И РЕАЛИЗАЦИЯ ПЯТИ КООРДИНАТНОЙ СИСТЕМЫ УПРАВЛЕНИЯ ФРЕЗЕРНОГО СТАНКА", company: "Доцент кафедры ФЭ,В.Н.с.ЛИОР", direction: "Разработка" },
  { id: 94, sheet: "023", topic: "РАЗРАБОТКА ТРЕБОВАНИЙ ДЛЯ РЕАЛИЗАЦИИ ГРАФИЧЕСКОГО КОМПОНЕНТА SCADA", company: "ООО 'ДИ ЭЙ ГРУПП'", direction: "Разработка" },
  { id: 95, sheet: "023", topic: "РАЗРАБОТКА АППАРАТНОГО ДРАЙВЕРА УПРАВЛЕНИЯ OLED ДИСПЛЕЕМ SSD1306 НА ПЛИС", company: "ООО 'ЛЭМЗ-Т'", direction: "Разработка" },
  { id: 96, sheet: "023", topic: "РАЗРАБОТКА TELEGRAM-БОТА ДЛЯ АВТОМАТИЗАЦИИ ТЕХПОДДЕРЖКИ", company: "Управляющий ИП Шараева Тамара Васильева", direction: "Разработка" },
  { id: 97, sheet: "023", topic: "РАЗРАБОТКА ПРОЕКТА ВИЗУАЛИЗАЦИИ СИСТЕМЫ УПРАВЛЕНИЯ ОБОГРЕВОМ ТРУБОПРОВОДОВ", company: "ООО 'ИНТ'", direction: "Разработка" },
  { id: 98, sheet: "023", topic: "ИССЛЕДОВАНИЕ ПРОПУСКНОЙ СПОСОБНОСТИ КАНАЛА СВЯЗИ", company: "ООО 'ЛЭМЗ-Т'", direction: "Исследование" },
  { id: 99, sheet: "023", topic: "ИССЛЕДОВАНИЕ И РАЗРАБОТКА СИСТЕМЫ РАСПОЗНАВАНИЯ ЖЕСТОВ НА БАЗЕ RASPBERRY", company: "АО 'НПФ 'Микран'", direction: "Исследование" },
  { id: 100, sheet: "023", topic: "ОТСЛЕЖИВАНИЕ СОСТОЯНИЯ ПОВЕРХНОСТИ СТАЛЬНОГО ЛИСТА", company: "АСУТИТП ООО НПП 'ТЭК'", direction: "Мониторинг" },
  { id: 101, sheet: "023", topic: "КОНФИГУРАЦИЯ И ПУСКОНАЛАДКА КОМПЛЕКСА ИНЖЕНЕРНО-ТЕХНИЧЕСКИХ СРЕДСТВ ОХРАНЫ", company: "ООО 'АЗИС'", direction: "Автоматизация" },
  { id: 102, sheet: "023", topic: "РАЗРАБОТКА КОНФИГУРАЦИИ НА БАЗЕ ПЛАТФОРМЫ 1С:ПРЕДПРИЯТИЕ", company: "ООО '1C-Форус'", direction: "Разработка" },
  { id: 103, sheet: "023", topic: "РАЗРАБОТКА ПО ДЛЯ АНАЛИЗА СОСТОЯНИЯ ПРОМЫШЛЕННОГО ОБОРУДОВАНИЯ", company: "ООО 'ИНТ'", direction: "Разработка" },
  { id: 104, sheet: "023", topic: "ОПТИМИЗАЦИЯ И РАСШИРЕНИЕ ФУНКЦИОНАЛЬНОСТИ РЕДАКТОРА SCADA", company: "ООО 'НПФ 'Мехатроника-ПРО'", direction: "Разработка" },
  { id: 105, sheet: "023", topic: "РАЗРАБОТКА ПРОГРАММЫ КРУЖКА ПО РОБОТОТЕХНИКЕ НА БАЗЕ ARDUINO", company: "'Кош-Агачская СОШ им Л.И. Тюковой'", direction: "Разработка" },
  { id: 106, sheet: "023", topic: "ПРОЕКТИРОВАНИЕ И ТЕСТИРОВАНИЕ ПО ДЛЯ АНАЛИЗА СОСТОЯНИЯ ОБОРУДОВАНИЯ", company: "ООО 'ИНТ'", direction: "Разработка" }
];

const AREA_DIRECTIONS = {
  'Документооборот': [
    'Управление документацией', 'Разработка документации', 'Аудит', 'Управление процессами',
    'Анализ процесса', 'Оптимизация процесса', 'Разработка регламента', 'Разработка методики',
    'Внедрение стандарта', 'Моделирование процесса', 'Моделирование и цифровизация процесса',
    'Разработка процессов', 'Разработка программы', 'Актуализация руководства по качеству',
    'Управление качеством', 'Анализ стандартов и аудита', 'Анализ рисков', 'Анализ и управление рисками',
    'Разработка стандарта', 'Моделирование бизнес-процесса', 'Разработка карты бизнес-процессов',
    'Автоматизация бизнес-процессов', 'Реинжиниринг', 'Цифровая трансформация/управление рисками',
    'Анализ ППОС', 'Оптимизация процессов', 'Анализ бизнес-процессов', 'Совершенствование методов разработки',
    'Анализ процессов'
  ],
  'Инновационная деятельность': [
    'Моделирование', 'Разработка системы', 'Разработка трекера успеваемости', 'Анализ методик',
    'Анализ потребителей', 'Анализ рынка', 'Научно-исследовательская деятельность',
    'Разработка бизнес-плана', 'Анализ проекта/партнеров', 'Проектирование инновационного детектора',
    'Исследование', 'Анализ метода', 'Оптимизация производства', 'Реализация проекта',
    'Разработка методических пособий'
  ],
  'Программирование': [
    'Разработка ПО', 'Интеграция ПО', 'Программирование микроконтроллера', 'Разработка игры',
    'Разработка чат-бота', 'Разработка веб-сайта', 'Разработка сайта', 'Разработка сервиса',
    'Подготовка среды разработки', 'Frontend/веб-дизайн', 'Тестирование ПО',
    'Разработка системы учета', 'Обслуживание оборудования', 'Автоматизация процесса',
    'Разработка системы', 'Разработка', 'Автоматизация'
  ],
  'Робототехника': [
    'Роботизация процессов', 'Робототехника', 'Мониторинг', 'Проектирование макета'
  ]
};

const PRACTICE_SHEET = 'Все направления';
const PRACTICE_COMPANY = 'Все места практики';
const PRACTICE_DIRECTION = 'Все направления практики';
const PRACTICE_AREA = 'Все области';

const sortWithAllFirst = (a, b, allValue) => {
  if (a === allValue) return -1;
  if (b === allValue) return 1;
  return a.localeCompare(b, 'ru');
};

const barColors = ['bg-tusur-blue', 'bg-tusur-purple', 'bg-tusur-green', 'bg-blue-500', 'bg-indigo-500'];

export default function InternshipPlatform() {
  const [selectedArea, setSelectedArea] = useState(PRACTICE_AREA);
  const [selectedSheet, setSelectedSheet] = useState(PRACTICE_SHEET);
  const [selectedCompany, setSelectedCompany] = useState(PRACTICE_COMPANY);
  const [selectedDirection, setSelectedDirection] = useState(PRACTICE_DIRECTION);
  const [searchQuery, setSearchQuery] = useState('');

  const availableDirectionsByArea = useMemo(() => {
    if (selectedArea === PRACTICE_AREA) {
      return [...new Set(PRACTICES.map(p => p.direction))].sort();
    }
    return AREA_DIRECTIONS[selectedArea] || [];
  }, [selectedArea]);

  const availableSheets = useMemo(() => {
    const filtered = PRACTICES.filter(p => 
      (selectedCompany === PRACTICE_COMPANY || p.company === selectedCompany) &&
      (selectedDirection === PRACTICE_DIRECTION || p.direction === selectedDirection) &&
      (selectedArea === PRACTICE_AREA || AREA_DIRECTIONS[selectedArea]?.includes(p.direction))
    );
    return [PRACTICE_SHEET, ...new Set(filtered.map(p => p.sheet))].sort((a, b) => sortWithAllFirst(a, b, PRACTICE_SHEET));
  }, [selectedCompany, selectedDirection, selectedArea]);

  const availableCompanies = useMemo(() => {
    const filtered = PRACTICES.filter(p => 
      (selectedSheet === PRACTICE_SHEET || p.sheet === selectedSheet) &&
      (selectedDirection === PRACTICE_DIRECTION || p.direction === selectedDirection) &&
      (selectedArea === PRACTICE_AREA || AREA_DIRECTIONS[selectedArea]?.includes(p.direction))
    );
    return [PRACTICE_COMPANY, ...new Set(filtered.map(p => p.company))].sort((a, b) => sortWithAllFirst(a, b, PRACTICE_COMPANY));
  }, [selectedSheet, selectedDirection, selectedArea]);

  const availableDirections = useMemo(() => {
    const filtered = PRACTICES.filter(p => 
      (selectedSheet === PRACTICE_SHEET || p.sheet === selectedSheet) &&
      (selectedCompany === PRACTICE_COMPANY || p.company === selectedCompany) &&
      (selectedArea === PRACTICE_AREA || AREA_DIRECTIONS[selectedArea]?.includes(p.direction))
    );
    const directions = [...new Set(filtered.map(p => p.direction))].sort((a, b) => sortWithAllFirst(a, b, PRACTICE_DIRECTION));
    
    if (selectedArea !== PRACTICE_AREA) {
      return [PRACTICE_DIRECTION, ...availableDirectionsByArea.filter(d => directions.includes(d))];
    }
    return directions;
  }, [selectedSheet, selectedCompany, selectedArea, availableDirectionsByArea]);

  const handleAreaChange = (val) => {
    setSelectedArea(val);
    setSelectedDirection(PRACTICE_DIRECTION);
  };

  const filteredPractices = useMemo(() => {
    return PRACTICES.filter(p => {
      const matchArea = selectedArea === PRACTICE_AREA || AREA_DIRECTIONS[selectedArea]?.includes(p.direction);
      const matchSheet = selectedSheet === PRACTICE_SHEET || p.sheet === selectedSheet;
      const matchCompany = selectedCompany === PRACTICE_COMPANY || p.company === selectedCompany;
      const matchDirection = selectedDirection === PRACTICE_DIRECTION || p.direction === selectedDirection;
      const matchSearch = searchQuery === '' || 
        p.topic.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.company.toLowerCase().includes(searchQuery.toLowerCase());
      return matchArea && matchSheet && matchCompany && matchDirection && matchSearch;
    });
  }, [selectedArea, selectedSheet, selectedCompany, selectedDirection, searchQuery]);

  const stats = useMemo(() => {
    const total = filteredPractices.length;
    const companies = new Set(filteredPractices.map(p => p.company)).size;
    
    const directionCounts = {};
    filteredPractices.forEach(p => {
      directionCounts[p.direction] = (directionCounts[p.direction] || 0) + 1;
    });
    
    const topDirections = Object.entries(directionCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([name, count]) => ({ name, count }));

    return { total, companies, topDirections };
  }, [filteredPractices]);

  const isFiltered = selectedArea !== PRACTICE_AREA || selectedSheet !== PRACTICE_SHEET || selectedCompany !== PRACTICE_COMPANY || selectedDirection !== PRACTICE_DIRECTION || searchQuery !== '';

  const handleReset = () => {
    setSelectedArea(PRACTICE_AREA);
    setSelectedSheet(PRACTICE_SHEET);
    setSelectedCompany(PRACTICE_COMPANY);
    setSelectedDirection(PRACTICE_DIRECTION);
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Hero */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-tusur-blue tracking-tight mb-4">Дашборд практик ТУСУР</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">Аналитическая панель баз практик. Фильтры синхронизированы: выбор одного параметра автоматически сужает варианты в остальных, а диаграммы обновляются в реальном времени.</p>
      </div>

      {/* Controls Panel - Sticky */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 lg:sticky lg:top-24 lg:z-30">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          
          {/* Область практики */}
          <div className="flex-1 flex flex-col">
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2 h-6">
              <Layers className="text-tusur-purple w-4 h-4 flex-shrink-0" />
              Область практики
            </label>
            <div className="relative flex-1 flex items-center">
              <select
                value={selectedArea}
                onChange={(e) => handleAreaChange(e.target.value)}
                className="w-full h-12 appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-tusur-blue focus:border-tusur-blue px-4 pr-10 font-sans transition-all cursor-pointer"
              >
                <option value={PRACTICE_AREA}>Все области</option>
                <option value="Документооборот">Документооборот</option>
                <option value="Инновационная деятельность">Инновационная деятельность</option>
                <option value="Программирование">Программирование</option>
                <option value="Робототехника">Робототехника</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Направление подготовки */}
          <div className="flex-1 flex flex-col">
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2 h-6">
              <GraduationCap className="text-tusur-purple w-4 h-4 flex-shrink-0" />
              Направление подготовки
            </label>
            <div className="relative flex-1 flex items-center">
              <select
                value={selectedSheet}
                onChange={(e) => setSelectedSheet(e.target.value)}
                className="w-full h-12 appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-tusur-blue focus:border-tusur-blue px-4 pr-10 font-sans transition-all cursor-pointer"
              >
                {availableSheets.map(sheet => (
                  <option key={sheet} value={sheet}>{sheet}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Место практики */}
          <div className="flex-1 flex flex-col">
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2 h-6">
              <Building2 className="text-tusur-purple w-4 h-4 flex-shrink-0" />
              Место практики
            </label>
            <div className="relative flex-1 flex items-center">
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full h-12 appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-tusur-blue focus:border-tusur-blue px-4 pr-10 font-sans transition-all cursor-pointer"
              >
                {availableCompanies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Направление практики */}
          <div className="flex-1 flex flex-col">
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2 h-6">
              <Briefcase className="text-tusur-purple w-4 h-4 flex-shrink-0" />
              Направление практики
            </label>
            <div className="relative flex-1 flex items-center">
              <select
                value={selectedDirection}
                onChange={(e) => setSelectedDirection(e.target.value)}
                className="w-full h-12 appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-tusur-blue focus:border-tusur-blue px-4 pr-10 font-sans transition-all cursor-pointer"
              >
                {availableDirections.map(dir => (
                  <option key={dir} value={dir}>{dir}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Поиск по теме */}
          <div className="lg:w-72 flex flex-col">
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2 h-6">
              <Search className="text-tusur-purple w-4 h-4 flex-shrink-0" />
              Тема практики
            </label>
            <div className="relative flex-1 flex items-center">
              <input
                type="text"
                placeholder="Поиск по теме или предприятию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-tusur-blue focus:border-tusur-blue px-4 pl-10 font-sans transition-all"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Results Count & Reset */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-lg font-semibold text-slate-900 font-sans">
          Найдено практик: <span className="text-tusur-blue font-bold">{filteredPractices.length}</span>
        </h3>
        {isFiltered && (
          <button
            onClick={handleReset}
            className="text-sm text-tusur-purple hover:text-tusur-blue font-semibold flex items-center gap-1 transition-colors font-sans self-start sm:self-auto"
          >
            <X className="w-4 h-4" />
            Сбросить фильтры
          </button>
        )}
      </div>

      {/* Dashboard & List Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start lg:pb-24">
        
        {/* Left Sidebar: Dynamic Dashboard Charts */}
        <aside className="w-full lg:w-80 flex flex-col gap-6 flex-shrink-0 lg:sticky lg:top-48 lg:z-20">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-md">
            <div className="p-3 bg-tusur-blue/10 rounded-xl mb-3">
              <Layers className="text-tusur-blue w-6 h-6" />
            </div>
            <p className="text-sm text-slate-500 font-medium">Всего практик</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">{stats.total}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-md">
            <div className="p-3 bg-tusur-purple/10 rounded-xl mb-3">
              <Building2 className="text-tusur-purple w-6 h-6" />
            </div>
            <p className="text-sm text-slate-500 font-medium">Предприятий-партнёров</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">{stats.companies}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <Target className="text-tusur-green w-4 h-4" />
              Топ направлений
            </h4>
            <div className="space-y-4">
              {stats.topDirections.map((dir, index) => {
                const percentage = stats.total > 0 ? (dir.count / stats.total) * 100 : 0;
                const colorClass = barColors[index % barColors.length];
                return (
                  <div key={dir.name}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-600 font-medium truncate pr-2" title={dir.name}>
                        {dir.name}
                      </span>
                      <span className="text-slate-800 font-bold flex-shrink-0">{dir.count}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                        className={`${colorClass} h-2.5 rounded-full`}
                      />
                    </div>
                  </div>
                );
              })}
              {stats.topDirections.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4">Нет данных для отображения</p>
              )}
            </div>
          </div>
        </aside>

        {/* Right Content: Practices List */}
        <div className="flex-1 w-full">
          <AnimatePresence mode="popLayout">
            {filteredPractices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {filteredPractices.map((practice) => (
                  <motion.div
                    key={practice.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl border border-slate-200 hover:shadow-lg hover:border-tusur-blue/30 transition-all duration-300 flex flex-col overflow-hidden group"
                  >
                    <div className="p-6 flex-1 relative">
                      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FileText className="w-24 h-24 text-tusur-blue" />
                      </div>
                      
                      <div className="flex justify-between items-start mb-3 relative z-10">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-tusur-lightBlue/20 text-tusur-blue font-sans">
                          {practice.sheet}
                        </span>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-tusur-purple/10 text-tusur-purple font-sans">
                          {practice.direction}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 font-sans leading-tight relative z-10">
                        {practice.topic}
                      </h3>
                      
                      <div className="flex flex-col gap-2 relative z-10">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Building2 className="w-4 h-4 flex-shrink-0 text-tusur-green" />
                          <span className="text-sm font-medium font-sans truncate">{practice.company}</span>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
                      <button className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-tusur-blue border border-slate-200 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md font-sans">
                        Подробнее
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300"
              >
                <div className="w-16 h-16 bg-tusur-lightBlue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-tusur-blue" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-sans">Практики не найдены</h3>
                <p className="text-slate-500 max-w-md mx-auto font-sans">
                  Попробуйте изменить параметры фильтрации или нажмите «Сбросить фильтры».
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}