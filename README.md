# chat-social-mongodb-ki
Simple real-time chat &amp; social system using MongoDB

---

## 📁 Project Structure  
'''
chat-social-mongodb/
│
├── README.md
├── src/
│ └── chat_social_project.js
│
└── resources/
├── usage.txt
└── sample-data.txt
'''

---

## 📌 Description  
This project simulates a basic **chat and social media system** using MongoDB.  
It allows users to communicate, follow each other, and manage messages.

---

## 🚀 Features  
- User creation  
- Send messages  
- View chat between users  
- Follow other users  
- View following list  
- Delete messages  
- Delete users with related data cleanup  
- Input validation using MongoDB queries  

---

## 🗂️ Collections  
- `users` → Stores user details  
- `messages` → Stores chat messages  
- `followers` → Stores following relationships  

---

## 🛠️ How to Run  
1. Open **MongoDB Shell (mongosh)**  
2. Run the script:
 load("chat_social_project.js")
3. Execute functions manually  

---

## 📊 Example Operations  

### 🔹 Add User  
addUser("John")

### 🔹 Send Message  
sendMessage("userId1", "userId2", "Hello!")

### 🔹 View Chat  
viewChat("userId1", "userId2")

### 🔹 Follow User 
followUser("userId1", "userId2")

### 🔹 Get Following List 
getFollowing("userId")

### 🔹 Delete Message  
deleteMessage("messageId")

### 🔹 Delete User 
deleteUser("userId")

---

## 📄 Notes  
- Uses `ObjectId` for relationships  
- Includes validation checks (empty message, invalid user, self-follow prevention)  
- Demonstrates CRUD operations clearly  
