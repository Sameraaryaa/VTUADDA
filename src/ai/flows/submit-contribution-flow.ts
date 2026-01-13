
'use server';
/**
 * @fileOverview A flow to handle user contributions and save them to Firestore.
 *
 * - submitContribution - A function that saves contribution data to Firestore.
 */

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { ContributionInput } from '@/lib/types';


// This is a simple server function to save the contribution to Firestore.
export async function submitContribution(input: ContributionInput): Promise<void> {
  if (!db) {
    throw new Error('Firestore is not initialized. Check your Firebase configuration.');
  }

  try {
    const contributionsCollection = collection(db, 'contributions');
    await addDoc(contributionsCollection, {
      ...input,
      status: 'pending', // Add a status for admin review
      createdAt: serverTimestamp(),
    });
    console.log('Contribution saved to Firestore successfully.');

  } catch (error) {
    console.error('Error saving contribution to Firestore:', error);
    throw new Error('Failed to save contribution to the database.');
  }
}
