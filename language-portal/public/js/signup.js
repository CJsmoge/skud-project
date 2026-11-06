// Загружаем курсы из БД
fetch('/api/courses')
  .then(r => r.json())
  .then(list => {
    const sel = document.getElementById('courseId');
    list.forEach(c => {
      const o = document.createElement('option');
      o.value = c.id;
      o.textContent = c.name;
      sel.appendChild(o);
    });
  });

// Маска телефона
document.getElementById('phone').addEventListener('input', e => {
  let input = e.target.value.replace(/\D/g, '');
  if (input.startsWith('8')) input = '7' + input.slice(1);
  if (!input.startsWith('7')) input = '7' + input;
  input = input.slice(0, 11);

  let formatted = '+7';
  if (input.length > 1) formatted += '(' + input.slice(1, 4);
  if (input.length >= 4) formatted += ')';
  if (input.length > 4) formatted += '-' + input.slice(4, 7);
  if (input.length > 7) formatted += '-' + input.slice(7, 9);
  if (input.length > 9) formatted += '-' + input.slice(9, 11);

  e.target.value = formatted;
});

const rules = {
  fullName: v => /^[А-ЯЁа-яё\s-]{3,100}$/.test(v) || 'Введите ФИО кириллицей (минимум 3 символа)',
  phone: v => /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(v) || 'Формат: +7(XXX)-XXX-XX-XX',
  email: v => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v) || 'Введите корректный e-mail',
  courseId: v => v != '' || 'Выберите курс',
  agree: v => document.getElementById('agree').checked || 'Необходимо согласие на обработку ПДн'
};

function showError(id, msg) {
  const err = document.getElementById('err-' + id);
  if (msg === true) {
    err.textContent = '';
  } else {
    err.textContent = msg;
  }
}

document.getElementById('signupForm').addEventListener('submit', async e => {
  e.preventDefault();
  let ok = true;
  const data = {};
  
  for (const id of Object.keys(rules)) {
    const el = document.getElementById(id);
    const res = rules[id](el.value.trim());
    showError(id, res);
    if (res !== true) ok = false;
    else data[id] = el.value.trim();
  }
  
  if (!ok) return;

  const resp = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (resp.ok) {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('success').style.display = 'block';
  } else {
    const { errors } = await resp.json();
    for (const [id, msg] of Object.entries(errors)) showError(id, msg);
  }
});