export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string
          name_ru: string
          name_en: string
          description_ru: string
          description_en: string
          price_from: number
          category: 'maintenance' | 'engine' | 'suspension'
          created_at: string
        }
        Insert: {
          id?: string
          name_ru: string
          name_en: string
          description_ru: string
          description_en: string
          price_from: number
          category: 'maintenance' | 'engine' | 'suspension'
          created_at?: string
        }
        Update: {
          id?: string
          name_ru?: string
          name_en?: string
          description_ru?: string
          description_en?: string
          price_from?: number
          category?: 'maintenance' | 'engine' | 'suspension'
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          author_name: string
          avatar_url: string
          rating: number
          text_ru: string
          text_en: string
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          author_name: string
          avatar_url: string
          rating: number
          text_ru: string
          text_en: string
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          author_name?: string
          avatar_url?: string
          rating?: number
          text_ru?: string
          text_en?: string
          date?: string
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          image_url: string
          author_name: string
          created_at: string
        }
        Insert: {
          id?: string
          image_url: string
          author_name: string
          created_at?: string
        }
        Update: {
          id?: string
          image_url?: string
          author_name?: string
          created_at?: string
        }
      }
      gallery_photos: {
        Row: {
          id: string
          model: string
          image_url: string
          description_ru: string
          description_en: string
          type: 'before' | 'after' | 'engine' | 'suspension' | 'general'
          created_at: string
        }
        Insert: {
          id?: string
          model: string
          image_url: string
          description_ru: string
          description_en: string
          type: 'before' | 'after' | 'engine' | 'suspension' | 'general'
          created_at?: string
        }
        Update: {
          id?: string
          model?: string
          image_url?: string
          description_ru?: string
          description_en?: string
          type?: 'before' | 'after' | 'engine' | 'suspension' | 'general'
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
