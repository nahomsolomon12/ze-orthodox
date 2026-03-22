-- Run this in the Supabase SQL editor to create the required tables.

-- Modules catalogue
create table if not exists modules (
  id          serial primary key,
  title       text    not null,
  description text    not null,
  lessons     int     not null default 0,
  type        text    not null check (type in ('video', 'text')),
  duration    text    not null
);

-- Seed modules from the existing front-end data
insert into modules (id, title, description, lessons, type, duration) values
  (1, 'Introduction to Orthodoxy',  'The foundations of Eastern Orthodox faith and tradition',       8,  'text',  '2 hours'),
  (2, 'The Divine Liturgy',         'Understanding the central worship service of the Church',       12, 'video', '4 hours'),
  (3, 'Church Fathers & Theology',  'Exploring the writings of the early Church Fathers',            10, 'text',  '5 hours'),
  (4, 'Icons & Sacred Art',         'The theology and tradition of iconography',                      6, 'video', '3 hours'),
  (5, 'The Sacraments',             'The seven Holy Mysteries of the Orthodox Church',                7, 'text',  '3.5 hours'),
  (6, 'Fasting & Feasts',           'The liturgical calendar and fasting traditions',                 9, 'video', '3 hours')
on conflict (id) do nothing;

-- Per-user lesson progress
create table if not exists user_progress (
  user_id           uuid references auth.users on delete cascade,
  module_id         int  references modules on delete cascade,
  completed_lessons int  not null default 0,
  updated_at        timestamptz default now(),
  primary key (user_id, module_id)
);

-- Quizzes catalogue
create table if not exists quizzes (
  id        serial primary key,
  title     text not null,
  module_id int  references modules on delete cascade,
  questions int  not null default 0
);

-- Seed quizzes
insert into quizzes (id, title, module_id, questions) values
  (1, 'Foundations Quiz',    1, 10),
  (2, 'Liturgy Basics',      2, 15),
  (3, 'Patristics Overview', 3, 12)
on conflict (id) do nothing;

-- Per-user quiz results
create table if not exists quiz_results (
  user_id  uuid references auth.users on delete cascade,
  quiz_id  int  references quizzes on delete cascade,
  score    int  not null check (score between 0 and 100),
  passed   boolean not null default false,
  taken_at timestamptz default now(),
  primary key (user_id, quiz_id)
);

-- Contact form submissions
create table if not exists contact_messages (
  id         serial primary key,
  name       text        not null,
  email      text        not null,
  message    text        not null,
  created_at timestamptz default now()
);
