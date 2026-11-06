const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'language_portal',
  user: 'postgres',
  password: 'ваш_пароль' // <-- ЗАМЕНИ
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/courses', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, name FROM courses ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка БД' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { fullName, phone, email, courseId } = req.body;
  const errors = {};

  if (!/^[А-ЯЁа-яё\s-]{3,100}$/.test(fullName || '')) errors.fullName = 'ФИО: только кириллица, пробелы и дефис';
  if (!/^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(phone || '')) errors.phone = 'Телефон: формат +7(XXX)-XXX-XX-XX';
  if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/.test(email || '')) errors.email = 'E-mail введён некорректно';
  if (!courseId) errors.courseId = 'Выберите курс';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    await pool.query(
      'INSERT INTO applications (fullName, phone, email, courseId) VALUES ($1, $2, $3, $4)',
      [fullName.trim(), phone, email.trim(), courseId]
    );
    res.status(201).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при сохранении' });
  }
});

app.listen(3000, () => console.log('Сайт: http://localhost:3000'));