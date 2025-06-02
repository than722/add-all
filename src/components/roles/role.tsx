export type UserRole = 'student' | 'teacher' | 'admin';

export function getRole(roleNumber: number): UserRole | undefined {
  switch (roleNumber) {
    case 1:
      return 'student';
    case 2:
      return 'teacher';
    case 3:
      return 'admin';
    default:
      return undefined;
  }
}
