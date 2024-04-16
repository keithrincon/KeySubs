'use server';

import { CreateTeamParams } from '@/types';

import { connectToDatabase } from '../database';
import Team from '@/lib/database/models/team.model';
import User from '@/lib/database/models/user.model';
import { handleError } from '@/lib/utils';
import CreateTeam from '@/app/(root)/teams/create/page';
import Category from '../database/models/category.model';

const populateTeam = async (query: any) => {
  return query
    .populate({
      path: 'organizer',
      model: User,
      select: '_id firstName lastName',
    })
    .populate({
      path: 'categories',
      model: Category,
      select: '_id firstName lastName',
    });
};

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateTeamParams) => {};

export const getTeamById = async (eventId: string) => {
  try {
    await connectToDatabase();

    const event = await Team.findById(eventId);

    if (!event) {
      throw new Error('Event not found');
    }

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};
