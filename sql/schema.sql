-- ============================================
-- Схема БД: Электронная проходная (СКУД)
-- СУБД: PostgreSQL
-- ============================================

-- 1. AccessLevel (уровни доступа)
CREATE TABLE access_levels (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(50) NOT NULL,
    description TEXT
);

-- 2. Employees (сотрудники)
CREATE TABLE employees (
    id          SERIAL PRIMARY KEY,
    full_name   VARCHAR(100) NOT NULL,
    department  VARCHAR(100) NOT NULL,
    position    VARCHAR(100) NOT NULL,
    phone       VARCHAR(20),
    email       VARCHAR(255) UNIQUE,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Zones (зоны доступа)
CREATE TABLE zones (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    description TEXT,
    level_id    INT NOT NULL REFERENCES access_levels(id)
);

-- 4. Cards (карты)
CREATE TABLE cards (
    id          SERIAL PRIMARY KEY,
    employee_id INT NOT NULL REFERENCES employees(id),
    number      VARCHAR(20) NOT NULL UNIQUE,
    status      VARCHAR(20) NOT NULL DEFAULT 'active',
    issued_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    blocked_at  TIMESTAMP
);

-- 5. Controllers (турникеты)
CREATE TABLE controllers (
    id          SERIAL PRIMARY KEY,
    zone_id     INT NOT NULL REFERENCES zones(id),
    name        VARCHAR(100) NOT NULL,
    location    VARCHAR(255),
    is_active   BOOLEAN NOT NULL DEFAULT TRUE
);

-- 6. Requests (события прохода)
CREATE TABLE requests (
    id            SERIAL PRIMARY KEY,
    employee_id   INT NOT NULL REFERENCES employees(id),
    card_id       INT NOT NULL REFERENCES cards(id),
    zone_id       INT NOT NULL REFERENCES zones(id),
    controller_id INT NOT NULL REFERENCES controllers(id),
    event_time    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    direction     VARCHAR(10) NOT NULL
);

-- 7. StatusHistory (история статуса карты)
CREATE TABLE status_history (
    id          SERIAL PRIMARY KEY,
    card_id     INT NOT NULL REFERENCES cards(id),
    old_status  VARCHAR(20) NOT NULL,
    new_status  VARCHAR(20) NOT NULL,
    changed_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Индексы
-- ============================================
CREATE INDEX idx_cards_employee ON cards(employee_id);
CREATE INDEX idx_cards_status ON cards(status);
CREATE INDEX idx_requests_card ON requests(card_id);
CREATE INDEX idx_requests_zone ON requests(zone_id);
CREATE INDEX idx_requests_time ON requests(event_time);
CREATE INDEX idx_controllers_zone ON controllers(zone_id);
CREATE INDEX idx_status_history_card ON status_history(card_id);
CREATE INDEX idx_zones_level ON zones(level_id);