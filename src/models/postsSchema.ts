import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'posts',
      columns: [
        { name: 'posts_id', type: 'number', isIndexed: true, isOptional: false },
        { name: 'title', type: 'string' },
        { name: 'content', type: 'string' },
      ],
    }),
  ],
})
