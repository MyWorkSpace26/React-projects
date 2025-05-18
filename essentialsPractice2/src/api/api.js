import { getAuthToken } from "./auth";

const API_URL = "https://reqres.in/api";

async function fetchWithAuth(url, options = {}) {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "x-api-key": "reqres-free-v1",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function getUsers(page = 1) {
  return fetchWithAuth(`/users?page=${page}`);
}

export async function getUser(id) {
  return fetchWithAuth(`/users/${id}`);
}

export async function getUserDetails(id) {
  const { data: user } = await getUser(id);

  // Generate position based on user ID
  const positions = [
    "Партнер",
    "Разработчик",
    "Дизайнер",
    "Менеджер",
    "Аналитик",
    "Маркетолог",
  ];
  const position = positions[id % positions.length];

  // Generate phone number
  const phone = `+7 (9${id % 10}${id % 5}) ${100 + id}-${10 + id}-${20 + id}`;

  // Generate bio based on first name
  const bioTemplates = [
    (name) =>
      `${name} является экспертом по вопросам разработки комплексных решений финансовых продуктов...`,
    (name) =>
      `${name} специализируется на разработке пользовательских интерфейсов...`,
    (name) => `${name} руководит командой разработчиков...`,
  ];

  const bioTemplate = bioTemplates[id % bioTemplates.length];
  const bio = bioTemplate(user.first_name);

  // Generate skills
  const allSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "UI/UX",
    "Product Management",
    "Data Analysis",
    "Marketing",
  ];
  const skills = Array.from(
    { length: 3 + (id % 4) },
    (_, i) => allSkills[(id + i) % allSkills.length]
  );

  // Generate projects
  const allProjects = [
    "Финансовый портал",
    "Мобильное приложение",
    "CRM система",
    "Аналитическая платформа",
    "Маркетплейс",
  ];
  const projects = Array.from(
    { length: 2 + (id % 3) },
    (_, i) => allProjects[(id + i) % allProjects.length]
  );

  return {
    ...user,
    phone,
    position,
    bio,
    skills,
    projects,
  };
}
