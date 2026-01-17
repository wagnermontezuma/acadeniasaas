
export enum UserRole {
  ADMIN = 'admin',
  PROFESSOR = 'professor',
  STUDENT = 'student',
  BACKOFFICE = 'backoffice',
  COORDINATION = 'coordination'
}

export interface NavLinkItem {
  path: string;
  label: string;
  icon: string;
}

export interface User {
  name: string;
  email: string;
  role: string;
  status: 'Ativo' | 'Pendente' | 'Inativo';
}

export interface AuditLog {
  time: string;
  user: string;
  module: string;
  action: string;
  desc: string;
}
