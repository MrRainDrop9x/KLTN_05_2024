'use client';
import { MediaRoom } from '@/components/media-room';
import { useAuth } from '@clerk/nextjs';

const Room = () => {
	const { userId } = useAuth();

	return (
		<div className="h-full">
			{userId && <MediaRoom chatId={'general'} video={true} audio={true} />}
		</div>
	);
};

export default Room;
