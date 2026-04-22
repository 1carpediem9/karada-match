"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function upsertTherapist(formData: FormData, id?: string) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const description = formData.get("description") as string;
  const clinicName = formData.get("clinicName") as string;
  const address = formData.get("address") as string;
  const symptomIds = formData.getAll("symptoms") as string[];

  const data = {
    name,
    role,
    description,
    clinicName,
    address,
    symptoms: {
      set: [], // 一旦リセット
      connect: symptomIds.map((id) => ({ id })),
    },
  };

  if (id) {
    await prisma.therapist.update({
      where: { id },
      data,
    });
  } else {
    await prisma.therapist.create({
      data,
    });
  }

  revalidatePath("/admin");
  revalidatePath("/therapists");
  redirect("/admin");
}

export async function deleteTherapist(id: string) {
  await prisma.therapist.delete({
    where: { id },
  });

  revalidatePath("/admin");
  revalidatePath("/therapists");
}
