import { Database } from '@nozbe/watermelondb'
import postsSchema from '../models/postsSchema'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import post from '../models/post'

const postsDbAdapter = new SQLiteAdapter({
    schema: postsSchema,
})

export const database = new Database({
    adapter: postsDbAdapter,
    modelClasses: [post],
})