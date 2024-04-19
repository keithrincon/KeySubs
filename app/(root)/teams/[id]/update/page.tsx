import TeamForm from '@/components/shared/TeamForm';
import { getTeamById } from '@/lib/actions/event.action';
import { auth } from '@clerk/nextjs';

type UpdateTeamProps = {
  params: {
    id: string;
  };
};

const UpdateTeam = async ({ params: { id } }: UpdateTeamProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const team = await getTeamById(id);

  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <h3 className='wrapper h3-bold text-center sm:text-left'>
          Update Team
        </h3>
      </section>

      <div className='wrapper my-8'>
        <TeamForm type='Update' team={team} teamId={team._id} userId={userId} />
      </div>
    </>
  );
};

export default UpdateTeam;
