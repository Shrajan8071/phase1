import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  message: text("message"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
