#!/usr/bin/env tsx

/**
 * Master seed script that populates the database with dummy data
 * Run with: npx tsx scripts/seed-all.ts
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

const scripts = [
  'seed-countries.ts',
  'seed-languages.ts', 
  'seed-professional-fields.ts',
  'seed-organizers.ts',
  'seed-users.ts',
  'seed-startups-simple.ts'
];

console.log('🌱 Starting database seeding process...\n');

for (const script of scripts) {
  const scriptPath = path.join(__dirname, script);
  
  if (!existsSync(scriptPath)) {
    console.log(`⚠️  Script not found: ${script}`);
    continue;
  }

  console.log(`📝 Running ${script}...`);
  
  try {
    execSync(`npx tsx ${scriptPath}`, { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    console.log(`✅ ${script} completed successfully\n`);
  } catch (error) {
    console.error(`❌ ${script} failed:`, error);
    console.log(`⏭️  Continuing with next script...\n`);
  }
}

console.log('🎉 Database seeding process completed!');
console.log('\n📊 Summary of seeded data:');
console.log('   • Countries: 100+ countries with flags');
console.log('   • Languages: 100+ languages');
console.log('   • Professional Fields: 50+ fields');
console.log('   • Organizers: 5 event organizers');
console.log('   • Users: 8 dummy users with profiles');
console.log('   • Startups: 5 startup companies');
console.log('\n🚀 Your database is now populated with dummy data!');
console.log('   Visit http://localhost:3030 to see the application in action.');
