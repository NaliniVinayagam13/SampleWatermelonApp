import { Model } from '@nozbe/watermelondb'
import { field, text } from '@nozbe/watermelondb/decorators'

export default class Post extends Model {
  static table = 'posts'

  @field('posts_id') posts_id!: number
  @field('title') title!: string
  @field('content') content!: string
}