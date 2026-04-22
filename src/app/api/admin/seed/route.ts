import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get("password");

  if (password !== (process.env.ADMIN_PASSWORD || "admin123")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.symptom.deleteMany({});
    await prisma.therapist.deleteMany({});

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

    const therapistData = [
      { name: "佐藤 健一", role: "柔道整復師", clinic: "さとう整骨院", symptoms: ["肩こり", "腰痛", "坐骨神経痛"], desc: "根本改善をモットーに、一人ひとりの体に合わせた丁寧な施術を行います。" },
      { name: "田中 雅子", role: "鍼灸師", clinic: "みやび鍼灸院", symptoms: ["頭痛", "不眠", "ストレス", "眼精疲労"], desc: "東洋医学の知恵で、心と体のバランスを整えます。不眠やストレスでお悩みの方もどうぞ。" },
      { name: "伊藤 裕二", role: "カイロプラクター", clinic: "伊藤カイロオフィス", symptoms: ["腰痛", "首の痛み", "四十肩・五十肩"], desc: "背骨の歪みを整え、本来の自然治癒力を引き出します。姿勢改善も得意です。" },
      { name: "小林 玲奈", role: "アロマセラピスト", clinic: "Healing Room Kobayashi", symptoms: ["全身の疲れ", "冷え性", "ストレス"], desc: "心地よい香りとトリートメントで、究極のリラックスタイムを提供します。" },
      { name: "高橋 浩", role: "整体師", clinic: "高橋ボディケア", symptoms: ["肩こり", "腰痛", "全身の疲れ"], desc: "ボキボキしない優しい整体です。慢性的な疲れが取れない方はぜひ。" },
      { name: "渡辺 恵子", role: "リフレクソロジスト", clinic: "足裏専科 わたなべ", symptoms: ["冷え性", "全身の疲れ", "不眠"], desc: "足裏から全身の不調にアプローチ。痛気持ちいい刺激でスッキリしましょう。" },
      { name: "山本 隆", role: "理学療法士", clinic: "山本リハビリセンター", symptoms: ["膝の痛み", "腰痛", "坐骨神経痛"], desc: "医学的根拠に基づいた運動療法と手技で、動ける体を取り戻します。" },
      { name: "斎藤 まどか", role: "ドライヘッドスパ講師", clinic: "おやすみヘッドスパ", symptoms: ["不眠", "眼精疲労", "頭痛"], desc: "水もオイルも使わないヘッドスパ。脳疲労を解消し、深い眠りへ誘います。" },
      { name: "松田 剛", role: "スポーツトレーナー", clinic: "マツダ・パフォーマンス", symptoms: ["四十肩・五十肩", "膝の痛み", "全身の疲れ"], desc: "アスリートのケアから一般の方の健康維持まで、幅広くサポートします。" },
      { name: "中島 節子", role: "あん摩マッサージ指圧師", clinic: "中島指圧所", symptoms: ["肩こり", "首の痛み", "全身の疲れ"], desc: "伝統的な指圧で、凝り固まった筋肉を丁寧にほぐしていきます。" },
      { name: "清水 健治", role: "オステオパシー講師", clinic: "清水自然療法", symptoms: ["頭痛", "ストレス", "不眠"], desc: "体全体のつながりを重視し、繊細なタッチで自己治癒力を高めます。" },
      { name: "岡田 智子", role: "ヨガインストラクター/整体", clinic: "Yoga & Body Care Tomo", symptoms: ["冷え性", "腰痛", "ストレス"], desc: "ヨガと整体を組み合わせた独自のアプローチで、しなやかな体を作ります。" },
    ];

    for (const data of therapistData) {
      await prisma.therapist.create({
        data: {
          name: data.name,
          role: data.role,
          clinicName: data.clinic,
          address: "東京都内某所",
          description: data.desc,
          symptoms: { connect: getSymptomIds(data.symptoms) },
        },
      });
    }

    return NextResponse.json({ message: "Seed data created successfully with 12 therapists!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create seed data" }, { status: 500 });
  }
}
