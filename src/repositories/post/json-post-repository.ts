import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { resolve } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { asyncDelay } from '@/utils/async-delay';

const simulateWaitMs = Number(process.env.SIMULATE_WAIT_IN_MS) || 0;

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  'src',
  'db',
  'seed',
  'posts.json',
);

export class JsonPostRepository implements PostRepository {
  // [REFATORADO] Reaproveita o utilitário `asyncDelay` em vez de duplicar
  // a mesma lógica de espera.
  private async simulateWait() {
    await asyncDelay(simulateWaitMs);
  }

  private async readFromDisk(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, 'utf-8');
    const parsedJson = JSON.parse(jsonContent);
    const { posts } = parsedJson;
    return posts;
  }

  private async writeToDisk(posts: PostModel[]): Promise<void> {
    const jsonToString = JSON.stringify({ posts }, null, 2);
    await writeFile(JSON_POSTS_FILE_PATH, jsonToString, 'utf-8');
  }

  async findAllPublic(): Promise<PostModel[]> {
    await this.simulateWait();

    const posts = await this.readFromDisk();
    return posts.filter(post => post.published);
  }

  async findAll(): Promise<PostModel[]> {
    await this.simulateWait();

    const posts = await this.readFromDisk();
    return posts;
  }

  // [REFATORADO] BUG CORRIGIDO: antes buscava só em posts publicados
  // (findAllPublic), então a edição de rascunhos falhava neste repositório.
  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAll();
    const post = posts.find(post => post.id === id);

    if (!post) throw new Error('Post não encontrado para ID');

    return post;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find(post => post.slug === slug);

    if (!post) throw new Error('Post não encontrado para slug');

    return post;
  }

  // [REFATORADO] Valida a entrada antes de tocar no disco e não muta o
  // array original (`[...posts, post]` no lugar de push).
  async create(post: PostModel): Promise<PostModel> {
    if (!post.id || !post.slug) {
      throw new Error('Post sem ID ou Slug');
    }

    const posts = await this.findAll();
    const isDuplicate = posts.some(
      saved => saved.id === post.id || saved.slug === post.slug,
    );

    if (isDuplicate) throw new Error('ID ou Slug devem ser únicos');

    await this.writeToDisk([...posts, post]);

    return post;
  }

  // [REFATORADO] `find` + `filter` no lugar de findIndex + splice (mutação).
  async delete(id: string): Promise<PostModel> {
    const posts = await this.findAll();
    const post = posts.find(p => p.id === id);

    if (!post) throw new Error('Post não existe');

    await this.writeToDisk(posts.filter(p => p.id !== id));

    return post;
  }

  // [REFATORADO] BUG CORRIGIDO: antes lia `posts[postIndex]` ANTES de checar
  // se o índice era válido (-1). Agora checa primeiro e usa `map`.
  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    const posts = await this.findAll();
    const savedPost = posts.find(p => p.id === id);

    if (!savedPost) throw new Error('Post não existe');

    const updatedPost = {
      ...savedPost,
      ...newPostData,
      updatedAt: new Date().toISOString(),
    };

    await this.writeToDisk(posts.map(p => (p.id === id ? updatedPost : p)));

    return updatedPost;
  }
}
