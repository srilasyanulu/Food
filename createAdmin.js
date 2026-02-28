const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
 
    const User = require('./models/User');

    // Admin details - CHANGE THESE if you want
    const adminData = {
      name: 'Admin User',
      email: 'admin@fooddelivery.com',
      password: 'admin123',
      phone: '9999999999',
      role: 'admin'
    };

    // Check if admin already exists
    const existing = await User.findOne({ email: adminData.email });
    if (existing) {
      console.log('⚠️  Admin with this email already exists!');
      console.log('📧 Email:', existing.email);
      console.log('👑 Role:', existing.role);
      mongoose.disconnect();
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // Create admin
    const admin = await User.create({
      name: adminData.name,
      email: adminData.email,
      password: hashedPassword,
      phone: adminData.phone,
      role: 'admin'
    });

    console.log('');
    console.log('🎉 Admin created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:   ', admin.email);
    console.log('🔑 Password:', adminData.password);
    console.log('👑 Role:    ', admin.role);
    console.log('📱 Phone:   ', admin.phone);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');

    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    mongoose.disconnect();
  }
};36

createAdmin();