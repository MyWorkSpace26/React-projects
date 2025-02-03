import fs from "node:fs"; //هذا يسمح لنا بالعمل مع نظام الملفات

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error('Loading meals failed');
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true }); //lower - بحيث يجبر جميع الأحرف على أن تكون صغيرة
  //إزالة أي محتوى ضار من تلك التعليمات
  meal.instructions = xss(meal.instructions);
  //split - سأستدعي التقسيم لتقسيمه على النقطة
  //pop - امتداد الملف
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  //نحتاج الآن إلى كتابة ذلك في ملف موجود في هذا المجلد العام.
  //createWriteStream - يسمح لنا بكتابة البيانات إلى ملف معين.
  const stream = fs.createWriteStream(`public/images/${fileName}`);

  //arrayBuffer - تحويل الصورة إلى صورة مخزنة مؤقتً
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  //storing in database
  meal.image = `/images/${fileName}`; //just stored a path

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}
