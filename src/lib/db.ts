import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Detect a stale cached client (created before newer models existed) and
// discard it so a fresh client is built from the current generated code.
function hasAllModels(client: unknown): boolean {
  if (!client || typeof client !== 'object') return false
  const c = client as Record<string, unknown>
  return typeof c.blogPost !== 'undefined' && typeof c.subscriber !== 'undefined'
}

if (globalForPrisma.prisma && !hasAllModels(globalForPrisma.prisma)) {
  try {
    void (globalForPrisma.prisma as { $disconnect?: () => Promise<unknown> })
      .$disconnect?.()
  } catch {
    /* ignore disconnect errors */
  }
  globalForPrisma.prisma = undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
