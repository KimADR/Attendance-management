import { boolean, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";


export const GRADES=mysqlTable('grades',{
    id:int('id',{length:11}).primaryKey(),
    grade:varchar('grade',{length:10}).notNull()
});

export const STUDENTS=mysqlTable('students',{
    id:int('id',{length:11}).autoincrement().primaryKey(),
    name:varchar('name',{length:100}).notNull(),
    grade:varchar('grade',{length:10}).notNull(),
    contact:varchar('contact',{length:20}),
    address:varchar('address',{length:100})
})

export const ATTENDANCE=mysqlTable('attendance',{
    id:int('id',{length:11}).autoincrement().primaryKey(),
    studentId:int('studentId',{length:11}).notNull(),
    date:varchar('date',{length:11}).notNull(),
    present:boolean('present',{length:10}).default(false),
    day:int('day',{length:11}).notNull()
})