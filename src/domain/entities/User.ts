/**
 * ENTIDAD: Usuario
 */
export interface User {
  id: string;                 
  email: string;              
  firstName: string;          
  lastName: string;           
  birthDate: string;          
  avatarUrl?: string;     
  totalScore: number;        
  gamesPlayed: number;      
  bestScore: number;         
  currentStreak: number;    
  createdAt: Date;           
  updatedAt: Date;            
}