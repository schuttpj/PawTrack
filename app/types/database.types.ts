export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      dogs: {
        Row: {
          id: string;
          name: string;
          breed: string;
          age: number;
          photo: string;
          owner_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          breed: string;
          age: number;
          photo: string;
          owner_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          breed?: string;
          age?: number;
          photo?: string;
          owner_id?: string;
          created_at?: string;
        };
      };
      walks: {
        Row: {
          id: string;
          dog_id: string;
          date: string;
          distance: number;
          duration: number;
          route: string;
          calories: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          dog_id: string;
          date: string;
          distance: number;
          duration: number;
          route: string;
          calories: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          dog_id?: string;
          date?: string;
          distance?: number;
          duration?: number;
          route?: string;
          calories?: number;
          created_at?: string;
        };
      };
      achievements: {
        Row: {
          id: string;
          dog_id: string;
          title: string;
          description: string;
          icon: string;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          dog_id: string;
          title: string;
          description: string;
          icon: string;
          date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          dog_id?: string;
          title?: string;
          description?: string;
          icon?: string;
          date?: string;
          created_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          dog_id: string | null;
          text: string;
          image: string | null;
          location: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          dog_id?: string | null;
          text: string;
          image?: string | null;
          location?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          dog_id?: string | null;
          text?: string;
          image?: string | null;
          location?: string | null;
          created_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          text: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          text: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
          text?: string;
          created_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          username: string;
          avatar: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          avatar?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          avatar?: string | null;
          created_at?: string;
        };
      };
      routes: {
        Row: {
          id: string;
          name: string;
          distance: number;
          popularity: number;
          image: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          distance: number;
          popularity: number;
          image: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          distance?: number;
          popularity?: number;
          image?: string;
          created_at?: string;
        };
      };
    };
  };
}
