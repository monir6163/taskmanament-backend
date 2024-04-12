const z = require("zod");

const userSchema = z.object({
  email: z.string().trim().email("invalid email"),
  password: z.string().trim().min(8, "Min 8 character strong password"),
  firstName: z
    .string()
    .trim()
    .min(3, "Min 3 character")
    .max(30, "Max 30 character"),
  lastName: z
    .string()
    .trim()
    .min(3, "Min 3 character")
    .max(20, "Max 20 character"),
  mobile: z
    .string()
    .trim()
    .min(11, "Must be 11 digits")
    .max(11, "Must be 11 digits"),
  photo: z.union([z.literal(""), z.string().trim().url()]),
});

const loginSchema = z.object({
  email: z.string().trim().email("invalid email"),
  password: z.string().trim().min(8, "Min 8 character strong password"),
});

const updateUserSchema = z.object({
  id: z.number().int(),
  firstName: z
    .string()
    .trim()
    .min(3, "Min 3 character")
    .max(30, "Max 30 character"),
  lastName: z
    .string()
    .trim()
    .min(3, "Min 3 character")
    .max(20, "Max 20 character"),
  mobile: z
    .string()
    .trim()
    .min(11, "Must be 11 digits")
    .max(11, "Must be 11 digits"),
  photo: z.union([z.literal(""), z.string().trim().url()]),
});

const taskSchema = z.object({
  userId: z.number().int(),
  title: z
    .string()
    .trim()
    .min(3, "Min 3 character")
    .max(30, "Max 30 character"),
  description: z
    .string()
    .trim()
    .min(3, "Min 3 character")
    .max(100, "Max 100 character"),
  status: z.enum(["new", "progress", "completed", "canceled"]),
});

module.exports = { userSchema, loginSchema, updateUserSchema, taskSchema };
