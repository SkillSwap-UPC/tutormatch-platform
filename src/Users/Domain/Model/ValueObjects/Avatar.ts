import { Column } from 'typeorm';

export class Avatar {
  @Column('text', { name: 'avatar_url' })
  private readonly _avatarUrl: string;

  constructor(avatarUrl: string) {
    if (!avatarUrl || avatarUrl.trim() === '') {
      throw new Error('Avatar URL cannot be null or blank');
    }
    this._avatarUrl = avatarUrl;
  }

  get avatarUrl(): string {
    return this._avatarUrl;
  }
}