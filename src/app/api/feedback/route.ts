
import { NextRequest, NextResponse } from 'next/server';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  if (!isFirebaseConfigured || !db) {
    return NextResponse.json({ error: 'Firebase is not configured.' }, { status: 500 });
  }

  try {
    const { feedback, rating } = await req.json();

    if (feedback === undefined || feedback === null || typeof feedback !== 'string') {
      return NextResponse.json({ error: 'Feedback must be a string.' }, { status: 400 });
    }
     if (rating === null || rating === undefined) {
      return NextResponse.json({ error: 'Rating is required.' }, { status: 400 });
    }

    const feedbackCollection = collection(db, 'feedback');
    await addDoc(feedbackCollection, {
      feedback: feedback.trim(),
      rating: rating,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true, message: 'Feedback submitted successfully.' });

  } catch (error: any) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
