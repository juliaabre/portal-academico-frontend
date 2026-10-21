import { demoUsers } from '@/mocks/seed'

export function findDemoUser(email: string, password: string) {
  if (password !== 'portal2026') return undefined
  return demoUsers.find((user) => user.email.toLowerCase() === email.trim().toLowerCase())
}
