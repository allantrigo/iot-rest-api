import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  Patch,
  UseGuards,
  UsePipes,
  Param,
  NotFoundException,
  Delete,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { TokenDecorator } from 'src/decorator/token.decorator';
import { UserService } from 'src/user/shared/user.service';
import { JoiValidationPipe } from 'src/validator/joi.pipe';
import { Ownership, OwnershipTypes } from './entity/ownership';
import { OwnershipService } from './shared/ownership.service';
import { OwnershipValidator } from 'src/validator/shared/ownership.validator';

@UseGuards(JwtAuthGuard)
@Controller('ownership')
export class OwnershipController {
  constructor(
    private ownershipService: OwnershipService,
    private userService: UserService,
  ) {}

  @Post()
  @UsePipes(new JoiValidationPipe(new OwnershipValidator().create()))
  async create(
    @Body()
    body: { userId: string; deviceId: string; ownership: OwnershipTypes },
    @TokenDecorator() jwtUserId: string,
  ): Promise<Ownership> {
    const sessionOwnership = await this.ownershipService.findByUserAndId(
      jwtUserId,
      body.deviceId,
    );
    if (
      sessionOwnership &&
      sessionOwnership.ownership === OwnershipTypes.OWNER
    ) {
      const newUser = await this.userService.findById(body.userId);
      const ownership = new Ownership(
        newUser,
        sessionOwnership.device,
        body.ownership,
      );
      return await this.ownershipService.create(ownership);
    }
    throw new ForbiddenException();
  }

  @Patch(':id')
  @UsePipes(new JoiValidationPipe(new OwnershipValidator().edit()))
  async edit(
    @Body() body: { ownership: OwnershipTypes },
    @Param('id') ownershipId: string,
    @TokenDecorator() jwtUserId: string,
  ): Promise<Ownership> {
    const ownershipToEdit = await this.ownershipService.findById(ownershipId);
    if (ownershipToEdit) {
      const sessionOwnership = await this.ownershipService.findByUserAndId(
        jwtUserId,
        ownershipToEdit.device.id,
      );
      if (
        (sessionOwnership &&
          sessionOwnership.ownership === OwnershipTypes.OWNER) ||
        sessionOwnership.id === ownershipId
      ) {
        ownershipToEdit.ownership = body.ownership;
        return await this.ownershipService.edit(ownershipToEdit);
      }
      throw new ForbiddenException();
    }
    throw new NotFoundException();
  }

  @Delete(':id')
  async delete(
    @Param('id') ownershipId: string,
    @TokenDecorator() jwtUserId: string,
  ): Promise<Ownership> {
    const ownershipToDelete = await this.ownershipService.findById(ownershipId);
    if (ownershipToDelete) {
      const sessionUser = await this.userService.findById(jwtUserId);
      const sessionOwnership = await this.ownershipService.findByUserAndId(
        jwtUserId,
        ownershipToDelete.device.id,
      );
      if (
        sessionUser &&
        sessionOwnership &&
        sessionOwnership.ownership === OwnershipTypes.OWNER
      ) {
        return await this.ownershipService.delete(ownershipToDelete);
      }
      throw new ForbiddenException();
    }
    throw new NotFoundException();
  }

  @Get(':id')
  async findByDevice(@Param('id') deviceId: string): Promise<Ownership[]> {
    const ownerships = await this.ownershipService.findByDevice(deviceId);
    if (ownerships) {
      return ownerships;
    }
    throw new NotFoundException();
  }
}
