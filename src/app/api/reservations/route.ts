import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { therapistId, userName, userEmail, userPhone, date, timeSlot, notes } = body;

    if (!therapistId || !userName || !userEmail || !date || !timeSlot) {
      return NextResponse.json(
        { error: "必須項目が不足しています。" },
        { status: 400 }
      );
    }

    const reservation = await prisma.reservation.create({
      data: {
        therapistId,
        userName,
        userEmail,
        userPhone,
        date: new Date(date),
        timeSlot,
        notes,
        status: "PENDING",
      },
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error("Reservation Error:", error);
    return NextResponse.json(
      { error: "予約の保存中にエラーが発生しました。" },
      { status: 500 }
    );
  }
}
