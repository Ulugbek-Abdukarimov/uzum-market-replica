# Product Requirements Document

## Uzum Market Replica

### 1. Product Overview

- **Product Name**: Uzum Market Replica  
- **Version**: 1.1  
- **Product Type**: Front-end Web Application  

**Uzum Market Replica** – This is an educational web project that replicates the main features and interface of *Uzum Market*.  
The goal of the project is to demonstrate understanding of frontend development, responsive UI/UX design, and working with a fake API.

---

### 2. Target Users

- **Students and Instructors** – For educational practice and project evaluation.  
- **Beginner Developers** – To demonstrate portfolio and technical skills.  
- **Frontend Learners** – To study adaptive layout and API interaction.

---

### 3. Core Features

#### 3.1 User Authentication and Authorization

- **User Registration** – Create a new user account.  
- **User Login** – Authenticate to access personalized features.  
- *(Optional)* Password reset and session persistence.

#### 3.2 Product Interaction

- **Main Page** – Displays categories, promotions, and all products.  
- **Product Page** – Shows detailed information about a selected product (image, description, price).  
- **Favorites** – Add and remove products from favorites.  
- **Cart** – Add, remove, and view products in the shopping cart.

---

### 4. Technical Specification

#### 4.1 Pages

- `/login` – Login Page  
- `/register` – Registration Page  
- `/home` – Main Page (includes categories, promotions, and all products)  
- `/product/:id` – Individual Product Page  
- `/favorites` – User’s Favorite Products  
- `/cart` – Shopping Cart Page  

#### 4.2 Layouts

- **Mobile** – starts from iPhone SE (360px)  
- **Tablet** – starts from iPad Mini  
- **Desktop** – starts from Full HD (1920×1080)

#### 4.3 Technology Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Backend (Fake API):** JSON file served locally via Node.js  
- **Data Handling:** Fetch API for retrieving and displaying product data  

---

### 5. Security Features

- Client-side validation of login and registration data  
- Local storage for user session, favorites, and cart  
- No real or sensitive user data used (for educational purposes)

---

### 6. Success Criteria

- Clear and modular folder structure (FSD architecture)  
- All main features work properly (catalog, cart, favorites, login/register)  
- Responsive and user-friendly interface for all devices  
- Pages load within 3 seconds  
- Correct data display from the fake JSON API  
- No critical bugs during demonstration

---

### 7. Future Improvements

- Add checkout (order placement) feature  
- Connect real backend and database  
- Add reviews and product ratings  
- Improve filtering and search functionality  
- Add pagination and sorting features  

---

### 8. Development Timeline

| Phase | Description | Duration |
|-------|--------------|-----------|
| 1 | Interface design and layout creation | 2–3 days |
| 2 | Project structure setup and Fake API creation | 2 days |
| 3 | Page implementation and navigation setup | 3 days |
| 4 | Functionality implementation (cart, favorites, login/register) | 3–4 days |
| 5 | Testing and debugging | 2 days |

**Total Duration:** ~3 weeks

---

### 9. Risks and Limitations

- No real backend or database connection  
- Simplified authentication logic  
- Limited JSON data  
- Checkout system not implemented  

---

### 10. References

- [Uzum Market Official Website](https://uzum.uz)  
- Node.js Documentation  
- Educational Materials from Learning Center


## 4. Основные функции (MVP)

| № | Функция | Описание |
|---|----------|-----------|
| 1 | Главная страница | Отображает категории и промо-товары. |
| 2 | Каталог товаров | Просмотр списка товаров, фильтрация и поиск. |
| 3 | Страница товара | Подробная информация о товаре (изображение, описание, цена). |
| 4 | Регистрация | Создание нового пользовательского аккаунта (frontend-логика). |
| 5 | Авторизация | Вход пользователя с проверкой данных (frontend). |
| 6 | Избранное | Добавление и удаление товаров из избранных. |
| 7 | Корзина | Добавление товаров в корзину и просмотр содержимого. |
| 8 | Страница изображений | Просмотр изображений товаров (галерея). |

---

## 5. Нефункциональные требования

- Интерфейс: адаптивный дизайн, похожий на оригинальный Uzum Market.  
- Производительность: страница должна загружаться менее чем за 3 секунды.  
- Безопасность: простая проверка данных на стороне клиента.  
- Технологии: HTML, CSS, JavaScript, Node.js (используется для локального сервера и работы с fake API).  
- Данные: JSON-файл, эмулирующий каталог товаров.

---

## 6. Архитектура (высокоуровнево)

- Frontend: полностью отвечает за интерфейс и взаимодействие с пользователем.  
- Fake API: JSON-файл, к которому обращается frontend через fetch-запросы.  
- Node.js сервер: используется для локального хостинга проекта и взаимодействия с данными.

---

## 7. Метрики успеха

- Все заявленные функции реализованы и работают корректно;  
- Отсутствуют критические ошибки в интерфейсе и логике;  
- Данные корректно отображаются из JSON-файла;  
- Успешно пройдена демонстрация проекта.

---

## 8. Этапы разработки

| Этап | Задачи | Срок |
|------|--------|------|
| 1 | Анализ Uzum Market и создание макета интерфейса | 2–3 дня |
| 2 | Настройка структуры проекта и fake API (JSON) | 2 дня |
| 3 | Реализация интерфейса и основных страниц | 3 дня |
| 4 | Реализация функций: избранное, корзина, логин и регистрация | 3–4 дня |
| 5 | Тестирование и исправление ошибок | 2 дня |

Общий срок: ~3 недели (при занятиях в учебном центре),  
Активная работа: ~1 неделя при плотной разработке.

---

## 9. Риски и ограничения

- Отсутствие реального backend и базы данных;  
- Работа только с фейковыми данными;  
- Нет функции оформления заказа;  
- Некоторые функции оригинального Uzum Market упрощены.

---

## 10. Будущие улучшения

- Добавить функцию оформления заказов (checkout).  
- Подключить реальную базу данных и API.  
- Реализовать отзывы и рейтинги товаров.  
- Улучшить систему фильтров и поиск по каталогу.  
- Добавить пагинацию для списка товаров.

---

## 11. Источники

- Официальный сайт Uzum Market — https://uzum.uz (https://uzum.uz/)  
- Учебные материалы центра  
- Документация по Node.js и JSON API

---