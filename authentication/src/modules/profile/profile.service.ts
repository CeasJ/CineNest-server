import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entity';
import { Repository } from 'typeorm';
import { ProfileDto } from './dtos/profile.dto';
import { transformToDTO } from 'src/common/transform.ultil';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
  ) {}

  async create(data: ProfileDto): Promise<ProfileDto> {
    const saved = await this.profileRepo.save({ ...data });
    return transformToDTO(ProfileDto, saved);
  }
}
