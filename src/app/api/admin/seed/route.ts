import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get("password");

  if (password !== (process.env.ADMIN_PASSWORD || "admin123")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 既存データの削除（重複防止）
    await prisma.symptom.deleteMany({});
    await prisma.therapist.deleteMany({});

    // 不調データの作成
    const symptoms = await Promise.all([
      prisma.symptom.create({ data: { name: "肩こり", category: "肩・背中" } }),
      prisma.symptom.create({ data: { name: "腰痛", category: "腰・下半身" } }),
      prisma.symptom.create({ data: { name: "首の痛み", category: "頭・首" } }),
      prisma.symptom.create({ data: { name: "眼精疲労", category: "頭・首" } }),
      prisma.symptom.create({ data: { name: "頭痛", category: "頭・首" } }),
      prisma.symptom.create({ data: { name: "不眠", category: "精神・自律神経" } }),
      prisma.symptom.create({ data: { name: "全身の疲れ", category: "その他" } }),
      prisma.symptom.create({ data: { name: "冷え性", category: "その他" } }),
      prisma.symptom.create({ data: { name: "坐骨神経痛", category: "腰・下半身" } }),
      prisma.symptom.create({ data: { name: "四十肩・五十肩", category: "肩・背中" } }),
      prisma.symptom.create({ data: { name: "膝の痛み", category: "腰・下半身" } }),
      prisma.symptom.create({ data: { name: "ストレス", category: "精神・自律神経" } }),
    ]);

    const getSymptomIds = (names: string[]) => {
      return symptoms
        .filter((s) => names.includes(s.name))
        .map((s) => ({ id: s.id }));
    };

    // セラピストデータの作成
    await prisma.therapist.create({
      data: {
        name: "佐藤 健一",
        role: "柔道整復師",
        clinicName: "さとう整骨院",
        address: "東京都渋谷区...",
        description: "根本改善をモットーに、一人ひとりの体に合わせた丁寧な施術を行います。",
        symptoms: { connect: getSymptomIds(["肩こり", "腰痛", "坐骨神経痛"]) },
      },
    });

    await prisma.therapist.create({
      data: {
        name: "田中 雅子",
        role: "鍼灸師",
        clinicName: "みやび鍼灸院",
        address: "東京都港区...",
        description: "東洋医学の知恵で、心と体のバランスを整えます。不眠やストレスでお悩みの方もどうぞ。",
        symptoms: { connect: getSymptomIds(["頭痛", "不眠", "ストレス", "眼精疲労"]) },
      },
    });

    await prisma.therapist.create({
      data: {
        name: "伊藤 裕二",
        role: "カイロプラクター",
        clinicName: "伊藤カイロオフィス",
        address: "東京都新宿区...",
        description: "背骨の歪みを整え、本来の自然治癒力を引き出します。姿勢改善も得意です。",
        symptoms: { connect: getSymptomIds(["腰痛", "首の痛み", "坐骨神経痛", "四十肩・五十肩"]) },
      },
    });

    await prisma.therapist.create({
      data: {
        name: "小林 玲奈",
        role: "アロマセラピスト",
        clinicName: "Healing Room Kobayashi",
        address: "東京都世田谷区...",
        description: "心地よい香りとトリートメントで、究極のリラックスタイムを提供します。",
        symptoms: { connect: getSymptomIds(["全身の疲れ", "冷え性", "不眠", "ストレス"]) },
      },
    });

    // 簡易化のため4名分のみにしていますが、必要に応じて増やせます。
    
    return NextResponse.json({ message: "Seed data created successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create seed data" }, { status: 500 });
  }
}
