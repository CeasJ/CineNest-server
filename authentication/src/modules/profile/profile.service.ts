import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entity';
import { Not, Repository } from 'typeorm';
import { ProfileDto } from './dtos/profile.dto';
import { transformToDTO } from 'src/common/transform.ultil';
import { CreateProfileRequestDto } from './dtos/request/create-profile.dto';
import { UpdateProfileRequest } from './dtos/request/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
  ) {}

  async findByAccountId(id: string) {
    return this.profileRepo.findOne({ where: { accountId: id } });
  }

  async create(data: CreateProfileRequestDto): Promise<ProfileDto> {
    const saved = await this.profileRepo.save({ ...data });
    return transformToDTO(ProfileDto, saved);
  }

  async update(accountId: string, data: UpdateProfileRequest) {
    const profile = await this.profileRepo.update(accountId, data);
    if (profile.affected === 0)
      throw new NotFoundException('Profile not found');

    const updated = await this.profileRepo.findOne({
      where: { id: accountId },
    });
    return transformToDTO(ProfileDto, updated);
  }

  async delete(id: string) {
    const profile = await this.findByAccountId(id);
    if (!profile) throw new NotFoundException('Profile cannot found');
    return this.profileRepo.softDelete(profile);
  }
}
