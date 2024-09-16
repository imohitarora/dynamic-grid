import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>


export const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zipCode: z.string(),
})

export type Address = z.infer<typeof addressSchema>

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: addressSchema,
})

export type User = z.infer<typeof userSchema>
