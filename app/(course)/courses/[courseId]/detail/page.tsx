import { Preview } from '@/components/preview';
// import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import Image from 'next/image';
import FeedbackItem from './_components/feedback-item';
import FeedbackForm from './_components/feedback-form';
import { Feedback as Feedback } from '@prisma/client';
import { fetchCourseDetail, fetchFeedBacks } from '@/lib/data';

export default async function CourseDetailPage ({ params }: { params: { courseId: string } }) {
	const { courseId } = params;
	const course = await fetchCourseDetail(courseId);
	const feedbacks = await fetchFeedBacks(courseId);

	return (
		<div className="p-8">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 center-content">
				<div>
					<div className="px-[15px] py-[12px] text-3xl font-bold">
						{course?.title}
					</div>

					<div
						className={cn(
							'text-sm mt-2',
							!course?.description && 'text-slate-500 italic'
						)}
					>
						{!course?.description && 'No description'}

						{course?.description && <Preview value={course?.description} />}
					</div>

					{/* <div className="px-4">
						<Button className="mt-4 w-full">Continue Studying</Button>
					</div> */}
				</div>

				<div>
					{course?.imageUrl && (
						<div className="w-full h-[300px] relative">
							<Image
								className="rounded-md shadow-md object-fill "
								src={course.imageUrl}
								alt="course-image"
								fill
							/>
						</div>
					)}
				</div>
			</div>

			<div className="mt-12 pl-4">
				<div className="flex items-center text-2xl font-bold mt-8 mb-4">
					<p>Feedbacks</p>
					<p className="ml-3 text-sm text-slate-500">{`(${feedbacks.length} đánh giá)`}</p>
				</div>

				<div className="grid grid-cols-1 gap-y-3">
					{feedbacks.map((feedback:Feedback, index:number) => (
						<FeedbackItem
							key={feedback.id}
							content={feedback.content}
							fullName={feedback.fullName}
							imageUrl={feedback.avatarUrl}
							rating={5}
							duration={index + 1}
						/>
					))}
				</div>

				{course && (
					<FeedbackForm
						courseId={course.id}
					/>
				)}
			</div>
		</div>
	);
};
