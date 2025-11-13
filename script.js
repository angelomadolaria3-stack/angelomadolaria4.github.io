// script.js
// Loads content from data.json and populates the DOM.
// Edit data.json to change the site content.

async function loadData() {
  try {
    const res = await fetch('data.json');
    const data = await res.json();
    populate(data);
  } catch (err) {
    console.error('Failed to load data.json', err);
    // Fallback: minimal default
  }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  if (el.tagName === 'A') {
    el.href = value;
    el.textContent = value;
  } else {
    el.textContent = value;
  }
}

function populate(d) {
  // Basic header
  document.getElementById('name').textContent = d.name;
  document.getElementById('subtitle').textContent = d.title;
  document.getElementById('location').textContent = d.location;
  document.getElementById('facebook').href = d.facebook;
  document.getElementById('facebook').textContent = d.facebook;
  document.getElementById('contact').textContent = d.contact;
  document.getElementById('gmail').href = 'mailto:' + d.gmail;
  document.getElementById('gmail').textContent = d.gmail;

  // avatar
  const avatar = document.getElementById('avatar');
  if (d.avatar) avatar.src = d.avatar;

  // about
  document.getElementById('about').textContent = d.about;

  // Tech stack
  const techWrap = document.getElementById('tech-stack');
  techWrap.innerHTML = '';
  d.tech.forEach(group => {
    const div = document.createElement('div');
    div.className = 'tech-block';
    const h4 = document.createElement('h4');
    h4.textContent = group.title;
    div.appendChild(h4);
    const ul = document.createElement('ul');
    group.items.forEach(x => {
      const li = document.createElement('li');
      li.textContent = x;
      ul.appendChild(li);
    });
    div.appendChild(ul);
    techWrap.appendChild(div);
  });

  // Experience
  const expWrap = document.getElementById('experience');
  expWrap.innerHTML = '';
  d.experience.forEach(e => {
    const item = document.createElement('div');
    item.className = 'exp-item';
    const h4 = document.createElement('h4');
    h4.textContent = `${e.role} — ${e.company} · ${e.years}`;
    const p = document.createElement('p');
    p.textContent = e.description;
    item.appendChild(h4);
    item.appendChild(p);
    expWrap.appendChild(item);
  });

  // Skills
  const skills = document.getElementById('skills-list');
  skills.innerHTML = '';
  d.skills.forEach(sg => {
    const wrapper = document.createElement('div');
    wrapper.className = 'skill-group';
    const h4 = document.createElement('h4');
    h4.textContent = sg.title;
    const ul = document.createElement('ul');
    sg.items.forEach(it => {
      const li = document.createElement('li');
      li.textContent = '› ' + it;
      ul.appendChild(li);
    });
    wrapper.appendChild(h4);
    wrapper.appendChild(ul);
    skills.appendChild(wrapper);
  });

  // Education
  const eduWrap = document.getElementById('education');
  eduWrap.innerHTML = '';
  d.education.forEach(ed => {
    const div = document.createElement('div');
    div.className = 'education-item';
    div.textContent = `${ed.degree} — ${ed.place} · ${ed.year}`;
    eduWrap.appendChild(div);
  });

  // Achievements
  const achWrap = document.getElementById('achievements');
  achWrap.innerHTML = '';
  d.achievements.forEach(a => {
    const div = document.createElement('div');
    div.className = 'achievement';
    div.textContent = '• ' + a;
    achWrap.appendChild(div);
  });
}

loadData();
