export type Timestamp = any; // Assuming Firebase Timestamp for now

export interface User {
  id: string;
  email: string;
  roleId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Profile {
  id: string; // matches userId
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Role {
  id: string; // e.g. 'guest', 'student', 'instructor', etc.
  name: string;
  permissions: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  instructorId: string;
  price: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CourseCategory {
  id: string;
  name: string;
  description?: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  videoUrl?: string;
  content?: string;
  order: number;
  createdAt: Timestamp;
}

export interface Tutorial {
  id: string;
  title: string;
  content: string;
  authorId: string;
  tags: string[];
  createdAt: Timestamp;
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  steps: string[]; // references to courses or tutorials
  createdAt: Timestamp;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: Timestamp;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  passingScore: number;
}

export interface Question {
  id: string;
  quizId: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  issuedAt: Timestamp;
  certificateUrl: string;
}

export interface Resource {
  id: string;
  title: string;
  url: string; // e.g. PDF link
  uploadedBy: string;
  createdAt: Timestamp;
}

export interface Blog {
  id: string;
  authorId: string;
  title: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Post {
  id: string;
  authorId: string;
  communityId?: string;
  content: string;
  mediaUrls?: string[];
  createdAt: Timestamp;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: Timestamp;
}

export interface Forum {
  id: string;
  title: string;
  description: string;
  createdAt: Timestamp;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  members: string[]; // array of userIds
  createdAt: Timestamp;
}

export interface Community {
  id: string;
  name: string;
  organizationId?: string;
  description?: string;
  createdAt: Timestamp;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId?: string;
  groupId?: string;
  content: string;
  sentAt: Timestamp;
  readAt?: Timestamp;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: Timestamp;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  organizerId: string;
  date: Timestamp;
  location?: string;
  type: 'workshop' | 'hackathon' | 'webinar' | 'meetup';
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  registeredAt: Timestamp;
  attended: boolean;
}

export interface Internship {
  id: string;
  companyId: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  stipend?: string;
  createdAt: Timestamp;
}

export interface Application {
  id: string;
  userId: string;
  type: 'internship' | 'job';
  targetId: string; // internshipId or jobId
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: Timestamp;
}

export interface Job {
  id: string;
  companyId: string;
  title: string;
  description: string;
  requirements: string[];
  salary?: string;
  createdAt: Timestamp;
}

export interface JobApplication { 
  id: string;
  jobId: string;
  userId: string;
  status: 'pending' | 'interviewing' | 'hired' | 'rejected';
  appliedAt: Timestamp;
}

export interface FreelanceProject {
  id: string;
  clientId: string;
  title: string;
  description: string;
  budget: number;
  status: 'open' | 'in-progress' | 'completed';
  createdAt: Timestamp;
}

export interface Proposal {
  id: string;
  freelanceProjectId: string;
  freelancerId: string;
  coverLetter: string;
  bidAmount: number;
  status: 'pending' | 'accepted' | 'rejected';
  submittedAt: Timestamp;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  website?: string;
  logoUrl?: string;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  contactEmail: string;
}

export interface Team {
  id: string;
  name: string;
  members: string[]; // userIds
  organizationId?: string;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Timestamp;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired';
  expiresAt: Timestamp;
}

export interface Wallet {
  id: string; // matches userId
  balance: number;
  currency: string;
  updatedAt: Timestamp;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Achievement {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt: Timestamp;
}

export interface Leaderboard {
  id: string;
  type: 'global' | 'course' | 'community';
  targetId?: string;
  rankings: { userId: string; score: number }[];
  updatedAt: Timestamp;
}

export interface Report {
  id: string;
  reporterId: string;
  targetType: 'user' | 'post' | 'comment' | 'course';
  targetId: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: Timestamp;
}

export interface Analytics {
  id: string;
  type: 'pageView' | 'courseCompletion' | 'eventAttendance';
  userId?: string;
  data: Record<string, any>;
  timestamp: Timestamp;
}

export interface Settings {
  id: string; // matches userId or 'global'
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  targetId?: string;
  details: Record<string, any>;
  timestamp: Timestamp;
}
