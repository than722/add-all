export type UserRole = 'student' | 'teacher' | 'admin' | 'superadmin' | 'guest';

export function getRole(roleNumber: number): UserRole | undefined {
  switch (roleNumber) {
    case 1:
      return 'student';
    case 2:
      return 'teacher';
    case 3:
      return 'admin';
    case 4:
      return 'superadmin';
    case 5:
      return 'guest';
    default:
      return undefined;
  }
}
