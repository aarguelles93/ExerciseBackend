# Exercise Tracker API

A Node.js-based API for managing workout exercises, using XML as the data store.

## Features
- CRUD operations for exercises
- XML-based storage for exercises
- Organized file structure with separate business logic and utility modules
- Integrated ESLint and Prettier for consistent code formatting

## Requirements
- Node.js (v12 or later)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Scripts
- **Start the server**:
  ```bash
  npm start
  ```
- **Run linting**:
  ```bash
  npx eslint . --fix
  ```

## API Endpoints
### 1. **Get all exercises**
   ```
   GET /exercises
   ```
   - **Response**: Array of all exercises

### 2. **Get exercise by ID**
   ```
   GET /exercises/:id
   ```
   - **Response**: Exercise object matching the ID

### 3. **Add a new exercise**
   ```
   POST /exercises
   ```
   - **Body**:
     ```json
     {
       "name": "string",
       "sets": "number",
       "reps": "number",
       "weight": "number",
       "date": "YYYY-MM-DD"
     }
     ```
   - **Response**: The created exercise

### 4. **Update an existing exercise**
   ```
   PUT /exercises/:id
   ```
   - **Body**: Only the fields to update
   - **Response**: The updated exercise

### 5. **Delete an exercise**
   ```
   DELETE /exercises/:id
   ```
   - **Response**: The deleted exercise

## Project Structure
```
├── data/
│   └── exercises.xml         # XML file for storing exercise data
├── services/
│   └── exerciseService.js    # Business logic for managing exercises
├── utils/
│   └── xmlUtils.js           # XML-JSON conversion utilities
├── app.js                    # Main server file
├── package.json              # Project dependencies and scripts
├── .eslintrc.json            # ESLint configuration
├── .gitignore                # Git ignored files
```

## License
This project is licensed under the [MIT License](LICENSE).
