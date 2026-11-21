import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { drizzleDb } from '@/db/drizzle';
import { asyncDelay } from '@/utils/async-delay';
import { postsTable } from '@/db/drizzle/schemas';
import { eq } from 'drizzle-orm';

const simulateWaitMs = Number(process.env.SIMULATE_WAIT_IN_MS) || 0;
const POST_NOT_FOUND = 'Post não existe';

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(simulateWaitMs, true);

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(simulateWaitMs, true);

    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.published, true), eq(posts.slug, slug)),
    });

    if (!post) throw new Error('Post não encontrado para slug');

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(simulateWaitMs, true);

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }

  // Helper extraído: o mesmo findFirst-por-id estava copiado em 3 métodos.
  private async findOrThrow(id: string, message: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error(message);

    return post;
  }

  // [REFATORADO] Reaproveita findOrThrow.
  async findById(id: string): Promise<PostModel> {
    await asyncDelay(simulateWaitMs, true);

    return this.findOrThrow(id, 'Post não encontrado para ID');
  }

  // [REFATORADO] `!!postExists` -> o próprio valor já é "truthy/falsy".
  async create(post: PostModel): Promise<PostModel> {
    const duplicate = await drizzleDb.query.posts.findFirst({
      where: (posts, { or, eq }) =>
        or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    });

    if (duplicate) {
      throw new Error('Post com ID ou Slug já existe na base de dados');
    }

    await drizzleDb.insert(postsTable).values(post);
    return post;
  }

  // [REFATORADO] Reaproveita findOrThrow.
  async delete(id: string): Promise<PostModel> {
    const post = await this.findOrThrow(id, POST_NOT_FOUND);

    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

    return post;
  }

  // [REFATORADO] Desestruturação no lugar de copiar campo a campo, e
  // `changes` é reaproveitado tanto no UPDATE quanto no retorno.
  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    const oldPost = await this.findOrThrow(id, POST_NOT_FOUND);

    const { author, content, coverImageUrl, excerpt, published, title } =
      newPostData;
    const changes = {
      author,
      content,
      coverImageUrl,
      excerpt,
      published,
      title,
      updatedAt: new Date().toISOString(),
    };

    await drizzleDb
      .update(postsTable)
      .set(changes)
      .where(eq(postsTable.id, id));

    return { ...oldPost, ...changes };
  }
}
