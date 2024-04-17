'use server';

import { connectToDatabase } from '../database';
import Team from '@/lib/database/models/team.model';
import User from '../database/models/user.model';
import Category from '../database/models/category.model';
import { handleError } from '@/lib/utils';

import { CreateTeamParams } from '@/types';

const populateTeam = async (query: any) => {
  return query
    .populate({
      path: 'organizer',
      model: User,
      select: '_id firstName lastName',
    })
    .populate({
      path: 'category',
      model: Category,
      select: '_id name',
    });
};

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateTeamParams) => {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) {
      throw new Error('Organizer not found');
    }

    // this is the part newEvent to newTeam
    const newEvent = await Team.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};

export const getTeamById = async (eventId: string) => {
  try {
    await connectToDatabase();

    const event = await populateTeam(Team.findById(eventId));
    // const team = await populateTeam(Team.findById(eventId));

    // const query = Team.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};
