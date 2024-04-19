'use server';

import { revalidatePath } from 'next/cache';

import { connectToDatabase } from '../database';
import Team from '@/lib/database/models/team.model';
import User from '../database/models/user.model';
import Category from '../database/models/category.model';
import { handleError } from '@/lib/utils';

import {
  CreateTeamParams,
  UpdateTeamParams,
  DeleteTeamParams,
  GetAllTeamsParams,
  GetTeamsByUserParams,
  GetRelatedTeamsByCategoryParams,
} from '@/types';

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } });
};

const populateTeam = (query: any) => {
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

// CREATE
export async function createTeam({ userId, team, path }: CreateTeamParams) {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) throw new Error('Organizer not found');

    const newTeam = await Team.create({
      ...team,
      category: team.categoryId,
      organizer: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newTeam));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE TEAM BY ID
export async function getTeamById(teamId: string) {
  try {
    await connectToDatabase();

    const team = await populateTeam(Team.findById(teamId));

    if (!team) throw new Error('Team not found');

    return JSON.parse(JSON.stringify(team));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateTeam({ userId, team, path }: UpdateTeamParams) {
  try {
    await connectToDatabase();

    const teamToUpdate = await Team.findById(team._id);
    if (!teamToUpdate || teamToUpdate.organizer.toHexString() !== userId) {
      throw new Error('Team not found or unauthorized');
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      team._id,
      { ...team, category: team.categoryId },
      { new: true }
    );
    revalidatePath(path);
    return JSON.parse(JSON.stringify(updatedTeam));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteTeam({ teamId, path }: DeleteTeamParams) {
  try {
    await connectToDatabase();

    const deletedTeam = await Team.findByIdAndDelete(teamId);

    if (deletedTeam) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL TEAMS
export async function getAllTeams({
  query,
  limit = 6,
  page,
  category,
}: GetAllTeamsParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: 'i' } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const teamsQuery = Team.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit);

    const teams = await populateTeam(teamsQuery);
    const teamsCount = await Team.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(teams)),
      totalPages: Math.ceil(teamsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET TEAMS BY ORGANIZER
export async function getTeamsByUser({
  userId,
  limit = 6,
  page,
}: GetTeamsByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;

    const teamsQuery = Team.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit);

    const teams = await populateTeam(teamsQuery);
    const teamsCount = await Team.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(teams)),
      totalPages: Math.ceil(teamsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED TEAMS: TEAMS WITH SAME CATEGORY
export async function getRelatedTeamsByCategory({
  categoryId,
  teamId,
  limit = 3,
  page = 1,
}: GetRelatedTeamsByCategoryParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: teamId } }],
    };

    const teamsQuery = Team.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit);

    const teams = await populateTeam(teamsQuery);
    const teamsCount = await Team.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(teams)),
      totalPages: Math.ceil(teamsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
