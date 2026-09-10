import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/userModel.ts';
import connectDB from '../config/db.ts';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@clothingstore.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin@clothingstore.com';

    // 1. Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists in database.');
      process.exit(0);
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    // 3. Create admin user document
    const adminUser = new User({
      name: 'Store Administrator',
      email: adminEmail,
      passwordHash,
      isAdmin: true,
    });

    await adminUser.save();
    console.log(`Admin user created successfully! Email: ${adminEmail}`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();