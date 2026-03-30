// ================= DATABASE =================
use chatAppDB


// ================= USERS =================
db.users.insertMany([
  {
    _id: ObjectId("69c16c06c00b3b8189267611"),
    name: "Keerthana"
  },
  {
    _id: ObjectId("69c16c06c00b3b8189267612"),
    name: "Ram"
  }
])


// ================= MESSAGES =================
db.messages.insertMany([
  {
    senderId: ObjectId("69c16c06c00b3b8189267611"),
    receiverId: ObjectId("69c16c06c00b3b8189267612"),
    message: "Hello Ram!",
    timestamp: new Date()
  }
])


// ================= FOLLOWERS =================
db.followers.insertOne({
  userId: ObjectId("69c16c06c00b3b8189267611"),
  follows: []
})


// ================= FUNCTIONS =================

// 🔹 ADD USER
function addUser(name) {
  if (!name) {
    print("❌ Invalid name")
    return
  }

  db.users.insertOne({ name: name })
  print("✅ User added")
}


// 🔹 SEND MESSAGE
function sendMessage(sender, receiver, msg) {

  if (!msg) {
    print("❌ Message cannot be empty")
    return
  }

  const senderUser = db.users.findOne({ _id: ObjectId(sender) })
  const receiverUser = db.users.findOne({ _id: ObjectId(receiver) })

  if (!senderUser || !receiverUser) {
    print("❌ User not found")
    return
  }

  db.messages.insertOne({
    senderId: ObjectId(sender),
    receiverId: ObjectId(receiver),
    message: msg,
    timestamp: new Date()
  })

  print("✅ Message sent")
}


// 🔹 VIEW CHAT
function viewChat(user1, user2) {

  const u1 = db.users.findOne({ _id: ObjectId(user1) })
  const u2 = db.users.findOne({ _id: ObjectId(user2) })

  if (!u1 || !u2) {
    print("❌ User not found")
    return
  }

  db.messages.find({
    $or: [
      { senderId: ObjectId(user1), receiverId: ObjectId(user2) },
      { senderId: ObjectId(user2), receiverId: ObjectId(user1) }
    ]
  }).sort({ timestamp: 1 }).forEach(printjson)
}


// 🔹 FOLLOW USER
function followUser(userId, followId) {

  if (userId === followId) {
    print("❌ Cannot follow yourself")
    return
  }

  const user = db.users.findOne({ _id: ObjectId(userId) })
  const followUser = db.users.findOne({ _id: ObjectId(followId) })

  if (!user || !followUser) {
    print("❌ User not found")
    return
  }

  db.followers.updateOne(
    { userId: ObjectId(userId) },
    { $addToSet: { follows: ObjectId(followId) } },
    { upsert: true }
  )

  print("✅ Followed user")
}


// 🔹 GET FOLLOWING LIST
function getFollowing(userId) {

  const data = db.followers.findOne({
    userId: ObjectId(userId)
  })

  if (!data) {
    print("❌ No data found")
    return
  }

  printjson(data)
}


// 🔹 DELETE MESSAGE
function deleteMessage(messageId) {

  const result = db.messages.deleteOne({
    _id: ObjectId(messageId)
  })

  if (result.deletedCount === 0) {
    print("❌ Message not found")
    return
  }

  print("🗑️ Message deleted")
}


// 🔹 DELETE USER
function deleteUser(userId) {

  const result = db.users.deleteOne({
    _id: ObjectId(userId)
  })

  if (result.deletedCount === 0) {
    print("❌ User not found")
    return
  }

  db.messages.deleteMany({
    $or: [
      { senderId: ObjectId(userId) },
      { receiverId: ObjectId(userId) }
    ]
  })

  db.followers.deleteMany({
    userId: ObjectId(userId)
  })

  print("🗑️ User deleted")
}