# 🧠 Image Caption Generator using Node.js + Python (Hugging Face BLIP)

This project allows users to upload an image through a React-based frontend, sends it to a Node.js backend, which then invokes a Python script using Hugging Face's BLIP model to generate a descriptive caption for the image.

---

## 🚀 Features

- Upload an image and generate a natural language description (caption)
- Uses `Salesforce/blip-image-captioning-base` from Hugging Face Transformers
- Node.js handles image uploads and calls Python for model inference
- Multer used for file handling
- Fast, accurate caption generation

---

## 📂 Project Structure

project/
├── backend/
│ ├── server.js # Node.js server
│ └── caption.py # Python script using HuggingFace BLIP
├── frontend/
│ └── App.tsx # React or Vite-based frontend
├── uploads/ # Temp image uploads
├── screenshot/
│ └── Screenshot 2025-07-27 182227.png
├── package.json # Node dependencies
└── README.md

yaml
Copy
Edit

---

## 🧪 Example Output

### Uploaded Image and Result Screenshot:

![Generated Result](screenshot/Screenshot%202025-07-27%20182227.png)

> **Caption Example:**
>
> `"a man riding a surfboard on a wave"`

---

## ⚙️ Setup Instructions

### ✅ Prerequisites

- Node.js & npm
- Python 3.8+
- pip installed for Python packages

---

## 📦 Backend Setup

```bash
cd backend
npm install
