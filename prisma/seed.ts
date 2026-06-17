import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { calculateLevel } from "../lib/xp";

const prisma = new PrismaClient();

async function main() {
  const adminHash = await bcrypt.hash("admin123456", 12);
  const studentHash = await bcrypt.hash("student123456", 12);

  await prisma.user.upsert({
    where: { email: "admin@school.test" },
    update: {},
    create: {
      username: "Admin",
      email: "admin@school.test",
      passwordHash: adminHash,
      role: Role.ADMIN
    }
  });

  await prisma.user.upsert({
    where: { email: "student@school.test" },
    update: {},
    create: {
      username: "Lena",
      email: "student@school.test",
      passwordHash: studentHash,
      role: Role.USER
    }
  });

  await prisma.inviteCode.upsert({
    where: { code: "CODE-DEMO2026" },
    update: {},
    create: {
      code: "CODE-DEMO2026",
      maxUses: 25,
      expiresAt: new Date("2026-12-31T23:59:59.000Z")
    }
  });

  const teachers = [
    { name: "Herr Mueller", subject: "Mathematik", school: "Gymnasium Mitte", xp: 1250 },
    { name: "Frau Schmidt", subject: "Deutsch", school: "Gymnasium Mitte", xp: 1180 },
    { name: "Herr Meyer", subject: "Geschichte", school: "Realschule Nord", xp: 1040 },
    { name: "Frau Becker", subject: "Biologie", school: "Gesamtschule West", xp: 760 }
  ];

  for (const teacher of teachers) {
    await prisma.teacher.upsert({
      where: { id: teacher.name.toLowerCase().replace(/\s+/g, "-") },
      update: {
        xp: teacher.xp,
        level: calculateLevel(teacher.xp)
      },
      create: {
        id: teacher.name.toLowerCase().replace(/\s+/g, "-"),
        ...teacher,
        level: calculateLevel(teacher.xp)
      }
    });
  }
}

main()
  .catch(async (error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
