# skud-project

# Электронная проходная (СКУД)

Учебный проект по УП.01 ПМ.01 «Проектирование и разработка информационных ресурсов».

**Тема:** Проектирование и разработка информационного ресурса «Электронная проходная (СКУД)».

**Автор:** Филонов Кирилл Александрович, группа 2ВР-2-25.

**Период:** 12.10.2026 — 07.11.2026.

## Описание

Веб-приложение для контроля и управления доступом на территорию организации. Позволяет:
- Регистрировать сотрудников и выдавать карты.
- Блокировать утерянные карты за ≤ 3 клика.
- Фиксировать события проходов через турникеты.
- Просматривать журнал событий в реальном времени.
- Формировать отчёты по посещаемости.

## Структура репозитория

- `docs/` — документация (анализ, требования, архитектура, данные).
- `diagrams/` — ER- и UML-диаграммы.
- `sql/` — DDL-скрипт для PostgreSQL.

## Документация

| Файл | Описание |
|---|---|
| [analysis.md](docs/analysis.md) | Анализ предметной области |
| [glossary.md](docs/glossary.md) | Глоссарий |
| [goals.md](docs/goals.md) | Цели и задачи (SMART) |
| [audience.md](docs/audience.md) | Целевая аудитория |
| [swot.md](docs/swot.md) | SWOT-анализ |
| [risks.md](docs/risks.md) | Реестр рисков |
| [requirements.md](docs/requirements.md) | Требования (ФТ, НФТ, MoSCoW) |
| [stakeholders.md](docs/stakeholders.md) | Стейкхолдеры |
| [user-stories.md](docs/user-stories.md) | User Story |
| [entities.md](docs/entities.md) | Сущности и атрибуты |
| [normalization.md](docs/normalization.md) | Нормализация (3НФ) |
| [architecture.md](docs/architecture.md) | Архитектура ИР |
| [data-storage.md](docs/data-storage.md) | Структура хранения |

## Диаграммы

- [er-diagram.png](diagrams/er-diagram.png) — ER-диаграмма.
- [uml-component.png](diagrams/uml-component.png) — UML компоненты.
- [uml-usecase.png](diagrams/uml-usecase.png) — UML Use Case.
- [uml-class.png](diagrams/uml-class.png) — UML классы.

## DDL

- [schema.sql](sql/schema.sql) — DDL для PostgreSQL.

## Технологии

- **Backend:** Flask, SQLAlchemy.
- **БД:** PostgreSQL.
- **Frontend:** HTML + Jinja2.
- **Архитектура:** монолит + MVC + слоистая.

## Версии

- `v0.1-analysis` — анализ ПрО (неделя 1).
- `v0.2-requirements` — требования (неделя 2).
- `v0.3-data` — модель данных (неделя 3).
- `v1.0-analysis` — итоговая версия (неделя 4).