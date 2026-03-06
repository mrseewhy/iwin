import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"
import type { PledgeFormData } from "../types/pledges"

export async function savePledge(data: PledgeFormData): Promise<void> {
    await addDoc(collection(db, "pledges"), {
        name: data.name,
        email: data.email,
        phone: data.phone,
        state: data.state,
        committedToVote: data.committedToVote,
        willEngage: data.willEngage,
        reachCategory: data.reachCategory,
        starCount: data.starCount,
        createdAt: serverTimestamp(),
    })
}