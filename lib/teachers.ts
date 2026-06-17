import { prisma } from "./prisma";

export async function getTeachers() {
  const teachers = await prisma.teacher.findMany({
    include: {
      ratings: {
        select: {
          stars: true
        }
      }
    },
    orderBy: [{ xp: "desc" }, { name: "asc" }]
  });

  return teachers.map((teacher) => {
    const ratingCount = teacher.ratings.length;
    const ratingAverage =
      ratingCount === 0
        ? 0
        : teacher.ratings.reduce((sum, rating) => sum + rating.stars, 0) / ratingCount;

    return {
      ...teacher,
      ratingAverage,
      ratingCount
    };
  });
}

export async function getTeacher(id: string) {
  const teacher = await prisma.teacher.findUnique({
    where: { id },
    include: {
      ratings: {
        include: {
          user: {
            select: {
              username: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  });

  if (!teacher) {
    return null;
  }

  const ratingCount = teacher.ratings.length;
  const ratingAverage =
    ratingCount === 0
      ? 0
      : teacher.ratings.reduce((sum, rating) => sum + rating.stars, 0) / ratingCount;

  return {
    ...teacher,
    ratingAverage,
    ratingCount
  };
}
