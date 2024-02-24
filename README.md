
# E-commerce in Node.JS

## Introduction

This project is a comprehensive backend solution designed to provide robust API support for e-commerce functionalities. With features encompassing category listing, product listing, cart management, order placement, and secure user authentication, this API serves as a foundational platform for building e-commerce systems. Utilizing JWT tokens for authentication and Sequelize for database interactions, it ensures a secure and efficient data management process. Enhanced with Swagger documentation, this project offers clear insights into API endpoints for better integration and testing.

## Table of Contents

- [Installation](#installation)
- [Functionalities](#functionalities)
- [Swagger Documentation](#swagger-documentation)
- [Environment Setup](#environment-setup)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Error Handling and Security](#error-handling-and-security)

## Installation

To get this project up and running on your local device for development and testing purposes, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Omramanuj/node-Ecom.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd node-Ecom
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the server** (ensure the `.env` file is set up as described in [Environment Setup](#environment-setup)):
   ```bash
   npm start
   ```
5. **Testing**: The API endpoints can be tested using Postman or any similar service by targeting the defined endpoints.

## Functionalities

The API supports a wide range of e-commerce operations, including:

- **Category Listing**: Retrieves a list of product categories.
- **Product Listing**: Fetches a list of products with details like title, price, description, based on category ID.
- **Product Details**: Provides detailed information of a specific product by its ID.
- **Cart Management**: Allows users to add products to their cart, view the cart, update product quantities, and remove items.
- **Order Placement**: Enables users to place orders with products from their cart.
- **Order History**: Users can fetch their order history.
- **Order Details**: Users can retrieve detailed information of specific orders by ID.
- **User Registration and Login**: Includes APIs for user registration and authentication.

## Swagger Documentation

Detailed API documentation is available through Swagger UI, providing an interactive interface for exploring API endpoints and their specifications. To access the documentation, visit:

```
http://localhost:PORT/docs/
```

Ensure to replace `PORT` with your configured port number in the `.env` file.

## Environment Setup

To configure your environment, create a `.env` file in the project root with the following settings:

```
PORT=<YourPortNumber>
DB_HOST=<DatabaseHost>
DB_USER=<DatabaseUsername>
DB_PASS=<DatabasePassword>
DB_NAME=node-Ecom
DB_PORT=5432
secretKey=<YourJWTSecretKey>
```

## Technologies Used

- **JWT Tokens**: For secure user authentication.
- **Sequelize ORM**: For database management and interactions.
- **PostgreSQL**: As the primary database.
- **Rate Limiting**: To prevent abuse and ensure service availability.

## Project Structure

The project is organized into models, controllers, routes, and middleware, facilitating a modular and scalable architecture. For a detailed breakdown, refer to the `structure.txt` file.

## Error Handling and Security

Error handling is managed through `errorMiddleware`, ensuring that meaningful error messages and status codes are returned. `authMiddleware` secures sensitive API endpoints, with rate limiting implemented to protect against potential service disruptions. Special admin roles enable oversight and control over platform operations, allowing administrative actions without direct code modifications.

