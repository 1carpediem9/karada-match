import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 既存のデータをクリア
  await prisma.therapist.deleteMany()
  await prisma.symptom.deleteMany()

  // 不調マスターデータの作成
  const symptomsData = [
    { name: '首の痛み', category: '頭・首' },
    { name: '肩こり', category: '肩・背中' },
    { name: '背中の張り', category: '肩・背中' },
    { name: '腰痛', category: '腰・足' },
    { name: '膝の痛み', category: '腰・足' },
    { name: '眼精疲労', category: '頭・首' },
    { name: '頭痛', category: '頭・首' },
    { name: '全身の疲れ', category: 'その他' },
    { name: '冷え性', category: 'その他' },
    { name: '不眠', category: '精神' },
  ]

  const createdSymptoms = await Promise.all(
    symptomsData.map((s) => prisma.symptom.create({ data: s }))
  )

  const getSymptoms = (names: string[]) =>
    createdSymptoms.filter((s) => names.includes(s.name)).map((s) => ({ id: s.id }))

  // セラピストデータの作成 (12名)
  const therapistsData = [
    {
      name: '佐藤 健一',
      role: '柔道整復師',
      description: 'スポーツ障害や慢性的な腰痛の改善を得意としています。痛みの根本原因にアプローチします。',
      clinicName: '佐藤整骨院',
      address: '東京都渋谷区神南1-1-1',
      symptoms: getSymptoms(['腰痛', '膝の痛み', '背中の張り']),
    },
    {
      name: '鈴木 真由美',
      role: '鍼灸師',
      description: '女性特有の悩みや冷え性、自律神経の乱れに対するアプローチが得意です。優しい鍼を使用します。',
      clinicName: 'すずき鍼灸院',
      address: '東京都新宿区西新宿2-2-2',
      symptoms: getSymptoms(['冷え性', '不眠', '肩こり', '頭痛']),
    },
    {
      name: '高橋 洋平',
      role: '整体師',
      description: '骨格調整と筋膜リリースを組み合わせ、姿勢改善と全身の疲労回復をサポートします。',
      clinicName: 'バランス整体 高橋',
      address: '東京都豊島区池袋3-3-3',
      symptoms: getSymptoms(['全身の疲れ', '肩こり', '首の痛み']),
    },
    {
      name: '田中 愛',
      role: 'あん摩マッサージ指圧師',
      description: '強めの指圧で頑固なコリをほぐします。特に眼精疲労や首肩の重だるさにお悩みの方におすすめです。',
      clinicName: 'リラクゼーション田中',
      address: '東京都港区六本木4-4-4',
      symptoms: getSymptoms(['眼精疲労', '肩こり', '首の痛み']),
    },
    {
      name: '伊藤 大輔',
      role: '理学療法士',
      description: '医療機関での経験を活かし、科学的根拠に基づいたリハビリテーションと運動指導を行います。',
      clinicName: '伊藤フィジオスタジオ',
      address: '東京都世田谷区三軒茶屋5-5-5',
      symptoms: getSymptoms(['腰痛', '膝の痛み', '全身の疲れ']),
    },
    {
      name: '渡辺 裕子',
      role: '鍼灸師・柔道整復師',
      description: '急性期のケガから慢性的な不調まで幅広く対応可能です。美容鍼も行っています。',
      clinicName: '渡辺総合治療院',
      address: '東京都中央区銀座6-6-6',
      symptoms: getSymptoms(['頭痛', '眼精疲労', '腰痛']),
    },
    {
      name: '山本 健太',
      role: 'カイロプラクター',
      description: '背骨と骨盤の歪みを整え、神経の働きを正常化させます。姿勢の悪さが気になる方に。',
      clinicName: 'カイロプラクティック山本',
      address: '東京都目黒区中目黒7-7-7',
      symptoms: getSymptoms(['首の痛み', '背中の張り', '腰痛']),
    },
    {
      name: '中村 美咲',
      role: 'アロマセラピスト',
      description: '厳選された精油を使用し、心身の深いリラックスを促します。ストレスからくる不調に効果的です。',
      clinicName: 'アロマサロン 美咲',
      address: '東京都武蔵野市吉祥寺8-8-8',
      symptoms: getSymptoms(['不眠', '全身の疲れ', '冷え性']),
    },
    {
      name: '小林 修',
      role: '整体師',
      description: '痛みのないソフトな整体です。強い刺激が苦手な方や高齢の方にも安心して受けていただけます。',
      clinicName: 'ソフト整体 小林',
      address: '東京都品川区大崎9-9-9',
      symptoms: getSymptoms(['全身の疲れ', '肩こり', '背中の張り']),
    },
    {
      name: '加藤 理恵',
      role: '鍼灸師',
      description: '東洋医学の観点から体質改善を目指します。胃腸の不調やアレルギー体質の方の相談も承ります。',
      clinicName: '東洋はり灸院 加藤',
      address: '東京都台東区上野10-10-10',
      symptoms: getSymptoms(['冷え性', '不眠', '全身の疲れ']),
    },
    {
      name: '吉田 翔太',
      role: 'スポーツトレーナー',
      description: 'アスリートのケア経験が豊富です。パフォーマンス向上やスポーツ障害の予防に特化しています。',
      clinicName: '吉田コンディショニングルーム',
      address: '東京都新宿区高田馬場11-11-11',
      symptoms: getSymptoms(['膝の痛み', '腰痛', '全身の疲れ']),
    },
    {
      name: '山田 花子',
      role: '柔道整復師',
      description: '産後の骨盤矯正やマタニティケアを得意としています。キッズスペース完備でお子様連れも歓迎です。',
      clinicName: '山田マタニティ整体院',
      address: '東京都杉並区荻窪12-12-12',
      symptoms: getSymptoms(['腰痛', '肩こり', '冷え性']),
    },
  ]

  for (const therapist of therapistsData) {
    await prisma.therapist.create({
      data: {
        name: therapist.name,
        role: therapist.role,
        description: therapist.description,
        clinicName: therapist.clinicName,
        address: therapist.address,
        symptoms: {
          connect: therapist.symptoms,
        },
      },
    })
  }

  console.log('Seed data created successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
