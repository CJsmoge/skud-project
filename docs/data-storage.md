# Структура хранения данных

## Логическая модель

| Таблица | Атрибуты | PK | FK |
|---|---|---|---|
| access_levels | id, name, description | id | — |
| employees | id, full_name, department, position, phone, email, created_at | id | — |
| zones | id, name, description, level_id | id | level_id → access_levels.id |
| cards | id, employee_id, number, status, issued_at, blocked_at | id | employee_id → employees.id |
| controllers | id, zone_id, name, location, is_active | id | zone_id → zones.id |
| requests | id, employee_id, card_id, zone_id, controller_id, event_time, direction | id | employee_id, card_id, zone_id, controller_id |
| status_history | id, card_id, old_status, new_status, changed_at | id | card_id → cards.id |

## Физическая модель (PostgreSQL)

**СУБД:** PostgreSQL 15+

### Таблицы и ограничения

| Таблица | Индексы | Ограничения |
|---|---|---|
| access_levels | PK(id) | name NOT NULL |
| employees | PK(id), UNIQUE(email) | full_name, department, position NOT NULL |
| zones | PK(id), INDEX(level_id) | name, level_id NOT NULL |
| cards | PK(id), UNIQUE(number), INDEX(employee_id), INDEX(status) | employee_id, number, status NOT NULL |
| controllers | PK(id), INDEX(zone_id) | zone_id, name, is_active NOT NULL |
| requests | PK(id), INDEX(card_id), INDEX(zone_id), INDEX(event_time) | все FK NOT NULL |
| status_history | PK(id), INDEX(card_id) | card_id, old_status, new_status NOT NULL |

### Обоснование индексов

- **UNIQUE(email)** — email должен быть уникальным.
- **UNIQUE(number)** — номер карты уникален.
- **INDEX(employee_id)** — быстрый поиск карт сотрудника.
- **INDEX(status)** — фильтрация карт по статусу.
- **INDEX(card_id), INDEX(zone_id)** — JOIN и поиск событий.
- **INDEX(event_time)** — отчёты по периодам.

## DDL

См. `sql/schema.sql`.