import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Note, NotesState } from '@/types';

function generateId(): string {
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],

      addNote: (noteData) => {
        const now = new Date().toISOString();
        const newNote: Note = {
          ...noteData,
          id: generateId(),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          notes: [newNote, ...state.notes],
        }));
      },

      updateNote: (id, content) => {
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id
              ? { ...n, content, updatedAt: new Date().toISOString() }
              : n
          ),
        }));
      },

      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        }));
      },

      toggleImportant: (id) => {
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, isImportant: !n.isImportant } : n
          ),
        }));
      },

      getNotesByCourse: (courseId) => {
        return get().notes.filter((n) => n.courseId === courseId);
      },

      getNotesByChapter: (courseId, chapterId) => {
        return get().notes.filter(
          (n) => n.courseId === courseId && n.chapterId === chapterId
        );
      },

      getNoteCountByChapter: (courseId, chapterId) => {
        return get().notes.filter(
          (n) => n.courseId === courseId && n.chapterId === chapterId
        ).length;
      },
    }),
    {
      name: 'skillup-notes-storage',
      partialize: (state) => ({ notes: state.notes }),
    }
  )
);
